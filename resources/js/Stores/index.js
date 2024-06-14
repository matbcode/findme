import { ref, computed, watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useCalendarStore } from '@/Stores/calendar'
import { useEventBusStore } from '@/Stores/eventBus'
import { useProjectsStore } from '@/Stores/projects'
import { useStatusesStore } from '@/Stores/statuses'
import { useChannelsStore } from '@/Stores/channels'
import { useUserStore } from '@/Stores/user'
import { useWorkspacesStore } from '@/Stores/workspaces'
import { useModalsStore } from '@/Stores/modals'
// import { useStorageStore } from '@/Stores/storage'
import { useClipboardStore } from '@/Stores/clipboard'
import { useCookiesStore } from '@/Stores/cookies'
import { useCampaignsStore } from '@/Stores/campaigns'
import { useUrlStore } from '@/Stores/url'
import { useApiStore } from '@/Stores/api'
import { useUploadStore } from '@/Stores/upload'
import { usePostsStore } from '@/Stores/posts'
import { useRolesStore } from '@/Stores/roles'
import { useFilesStore } from '@/Stores/files'
import { useDragStore } from '@/Stores/drag'
import { useEchoStore } from '@/Stores/echo'
import { useNotificationsStore } from '@/Stores/notifications'

export const useGlobalStore = defineStore('global', () => {
    /**
     * References to other stores
     */
    const { t } = useI18n()
    const eventBus = useEventBusStore()
    const projects = useProjectsStore()
    const statuses = useStatusesStore()
    const channels = useChannelsStore()
    const user = useUserStore()
    const workspaces = useWorkspacesStore()
    const modals = useModalsStore()
    // const storage = useStorageStore()
    const calendar = useCalendarStore()
    const clipboard = useClipboardStore()
    const cookies = useCookiesStore()
    const campaigns = useCampaignsStore()
    const url = useUrlStore()
    const api = useApiStore()
    const upload = useUploadStore()
    const posts = usePostsStore()
    const roles = useRolesStore()
    const files = useFilesStore()
    const drag = useDragStore()
    const echo = useEchoStore()
    const notifications = useNotificationsStore()

    /**
     *
     */
    const feed = ref(null)

    /**
     * Update the feed when the current workspace changes
     *
     * @param {object} workspace
     * @returns {void}
     */
    function updateFeed(workspace) {
        const projectsIds = projects.collection.map(
            (project) => project.id,
        )

        if (!workspace) {
            return
        }

        feed.value = route('campaign.retrieve', {
            slug: workspace.slug,
        })
    }

    updateFeed(workspaces.current)

    eventBus.workspaceEvent.listen(
        eventBus.WORKSPACE_EVENTS.CURRENT_WORKSPACE_CHANGED,
        updateFeed,
    )

    return {
        t,
        feed,
        calendar,
        eventBus,
        statuses,
        projects,
        channels,
        user,
        workspaces,
        modals,
        // storage,
        clipboard,
        cookies,
        campaigns,
        url,
        api,
        upload,
        posts,
        roles,
        files,
        drag,
        echo,
        notifications,
        updateFeed,
    }
})
