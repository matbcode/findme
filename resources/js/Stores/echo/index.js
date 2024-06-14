import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

import { useUserStore } from '@/Stores/user'
import { useEventBusStore } from '@/Stores/eventBus'

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

export const useEchoStore = defineStore('echo', () => {
    const userStore = useUserStore()
    const eventBus = useEventBusStore()

    window.Pusher = Pusher

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: false,
    })

    const userEventsEchoHandlers = ref([
        {
            eventName: 'Comment\\CommentCreated',
            handler: (e) => {
                eventBus.echoEvent.emit(
                    eventBus.ECHO_EVENTS.COMMENT_CREATED,
                    e,
                )
            },
        },
        {
            eventName: 'Comment\\CommentDeleted',
            handler: (e) => {
                eventBus.echoEvent.emit(
                    eventBus.ECHO_EVENTS.COMMENT_DELETED,
                    e,
                )
            },
        },
        {
            eventName: 'Comment\\CommentUpdated',
            handler: (e) => {
                eventBus.echoEvent.emit(
                    eventBus.ECHO_EVENTS.COMMENT_UPDATED,
                    e,
                )
            },
        },
        {
            eventName: 'File\\FileCreated',
            handler: (e) => {
                eventBus.echoEvent.emit(
                    eventBus.ECHO_EVENTS.FILE_CREATED,
                    e,
                )
            },
        },
        {
            eventName: 'Campaign\\CampaignUpdated',
            handler: (e) => {
                eventBus.echoEvent.emit(
                    eventBus.ECHO_EVENTS.CAMPAIGN_UPDATED,
                    e,
                )
            },
        },
    ])

    function attachEventListeners() {
        const userChannel = `user.${userStore.info.id}`

        userEventsEchoHandlers.value.forEach((event) => {
            window.Echo.private(userChannel).listen(
                event.eventName,
                event.handler,
            )
        })
    }

    function attachNotificationListener() {
        window.Echo.private(`user.${userStore.info.id}`).notification(
            (notification) => {
                eventBus.notificationEvent.emit(
                    eventBus.NOTIFICATION_EVENTS.RECEIVE,
                    notification,
                )
            },
        )
    }

    watch(
        userStore.info,
        (user, old) => {
            if (user && user.id !== old?.id) {
                attachEventListeners()
                attachNotificationListener()
            }
        },
        { immediate: true },
    )

    return {}
})
