import { ref, markRaw } from 'vue'
import { router } from '@inertiajs/vue3'
import { defineStore } from 'pinia'
import { useWorkspacesStore } from '@/Stores/workspaces'
import { useModalsStore } from '@/Stores/modals'
import { useUrlStore } from '@/Stores/url'

import ConnectAccountDialog from '@/Components/Dialog/ConnectAccountDialog.vue'

export const defaultPlatforms = [
    {
        id: 'facebook',
        label: 'Facebook',
    },
    {
        id: 'instagram',
        label: 'Instagram',
    },
    {
        id: 'twitter',
        label: 'X',
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
    },
    {
        id: 'tiktok',
        label: 'TikTok',
    },
]

export const useChannelsStore = defineStore('channels', () => {
    const platforms = ref(defaultPlatforms)

    const workspaces = useWorkspacesStore()

    const modals = useModalsStore()
    const { showConfirm, showDialog } = modals

    const url = useUrlStore()
    const { setGoBackPage } = url

    function showConnectAccountModal({ accounts }) {
        setGoBackPage()
        showDialog(
            markRaw(ConnectAccountDialog),
            {
                header: 'Select Platform',
                modal: true,
                draggable: false,
                blockScroll: true,
            },
            {
                data: {
                    accounts,
                },
            },
        )
    }

    function getChannel(channels, channelId) {
        return channels.find((channel) => channel.id === channelId)
    }

    function getChannelUser(channels, channelId) {
        const channel = getChannel(channels, channelId)

        if (!channel) {
            return null
        }

        return channel.details
    }

    function getPlatform(platforms, platformId) {
        return platforms.find(
            (platform) => platform.id === platformId,
        )
    }

    function showDeleteChannelModal({ project_id, channel }) {
        showConfirm({
            title: `Delete ${channel.name} project`,
            inlineMessage: {
                text: 'Deleting this channel will remove all posts and cannot be undone.',
                severity: 'warn',
            },
            message: `Are you sure you want to delete ${channel.name} channel?}`,
            confirmButtonProps: {
                label: 'Delete',
                icon: 'delete_forever',
                severity: 'danger',
            },
            onConfirm: () => {
                router.delete(
                    route('channel.destroy', {
                        slug: workspaces.current.slug,
                        project: project_id,
                        channel: channel.id,
                    }),
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            showToast({
                                summary: 'Success',
                                severity: 'success',
                                detail: 'Channel deleted successfully!',
                            })
                        },
                        onError: (error) => {
                            showToast({
                                summary: 'Error',
                                severity: 'error',
                                detail: error.message,
                            })
                        },
                    },
                )
            },
        })
    }

    function goToCreateChannel(project) {
        router.get(
            route('channel.create', {
                slug: workspaces.current.slug,
                project: project.id,
            }),
        )
    }

    return {
        platforms,
        showConnectAccountModal,
        showDeleteChannelModal,
        getChannel,
        getChannelUser,
        getPlatform,
        goToCreateChannel,
    }
})
