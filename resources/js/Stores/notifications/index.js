import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useEventBusStore } from '@/Stores/eventBus'
import { useModalsStore } from '@/Stores/modals'
import { useUrlStore } from '../url'
import axios from 'axios'

export const useNotificationsStore = defineStore(
    'notifications',
    () => {
        const eventBus = useEventBusStore()
        const modals = useModalsStore()
        const url = useUrlStore()

        const unreadNotifications = ref([])

        function fetchNotifications() {
            axios
                .get(route('profile.notifications.retrieve'))
                .then((response) => {
                    unreadNotifications.value = response.data
                })
                .catch((error) => {
                    console.error(
                        'Failed to fetch notifications',
                        error,
                    )
                })
        }

        function markAllAsRead() {
            axios
                .get(route('profile.notifications.mark-as-read'))
                .then(() => {
                    unreadNotifications.value = []
                })
                .catch((error) => {
                    console.error(
                        'Failed to mark notifications as read',
                        error,
                    )
                })
        }

        eventBus.notificationEvent.listen(
            eventBus.NOTIFICATION_EVENTS.RECEIVE,
            (data) => {
                console.log('notification received', data)
                fetchNotifications()
                modals.showNotification({ data })
            },
        )

        const handleCommentCreated = (data) => {
            console.log('comment created', data)

            // const isOutsideCampaign =
            //     data.comment.commentable_type ===
            //         'App\\Models\\Campaign' &&
            //     url.currentContext.campaign &&
            //     url.currentContext.campaign !=
            //         data.comment.commentable_id

            // const isOutsideProject =
            //     data.comment.commentable_type ===
            //         'App\\Models\\Project' &&
            //     url.currentContext.project &&
            //     url.currentContext.project !=
            //         data.comment.commentable_id

            // if (isOutsideCampaign && isOutsideProject) {
            modals.showNotification({
                data,
            })
            // }
        }

        eventBus.echoEvent.listen(
            eventBus.ECHO_EVENTS.COMMENT_CREATED,
            handleCommentCreated,
        )

        fetchNotifications()

        return {
            unreadNotifications,
            fetchNotifications,
            markAllAsRead,
        }
    },
)
