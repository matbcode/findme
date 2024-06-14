<script setup>
import { ref, computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import Button from 'primevue/button'
import OverlayPanel from 'primevue/overlaypanel'
import Badge from 'primevue/badge'

import NotificationElement from '@/Components/Navbar/NotificationElement.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'

const store = useGlobalStore()
const page = usePage()

const notifications_panel = ref(null)

const notificationsCount = computed(() => {
    return store.notifications.unreadNotifications.length
})

const toggle = (element, event) => {
    element.toggle(event)
}
</script>
<template>
    <div
        class="relative flex h-12 w-12 cursor-pointer items-center justify-center"
        @click="toggle(notifications_panel, $event)"
    >
        <font-awesome-icon icon="fa-regular fa-bell" size="lg" />
        <Badge
            v-if="notificationsCount"
            class="absolute right-0 top-0"
            :value="notificationsCount"
        ></Badge>
    </div>
    <OverlayPanel ref="notifications_panel">
        <!-- <div v-if="!page.props.invitations" class="p-4">
            <p>There are no notifications</p>
        </div> -->
        <div class="w-[400px] p-2">
            <div
                v-for="invitation in page.props.invitations"
                :key="invitation.id"
                class="flex flex-row p-4"
            >
                <p>New invitation: {{ invitation.workspace_id }}</p>
                <div>
                    <Button icon="pi pi-check" aria-label="Join" />
                    <Button
                        severity="danger"
                        icon="pi pi-times"
                        aria-label="Reject"
                    />
                </div>
            </div>

            <div
                v-if="store.notifications.unreadNotifications.length"
                class="my-4 flex flex-col gap-2"
            >
                <div>Notifications:</div>
                <div
                    class="flex flex-col gap-2 divide-y divide-surface-800"
                >
                    <NotificationElement
                        v-for="notification in store.notifications
                            .unreadNotifications"
                        :key="notification.id"
                        :notification
                    />
                </div>

                <CustomButton
                    label="Mark all as read"
                    text
                    class="w-full"
                    @click="store.notifications.markAllAsRead"
                />
            </div>

            <div
                v-if="
                    store.notifications.unreadNotifications.length ===
                    0
                "
            >
                <p class="p-8">No notifications</p>
            </div>
        </div>
    </OverlayPanel>
</template>
