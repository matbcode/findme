import { markRaw } from 'vue'
import { router } from '@inertiajs/vue3'
import { defineStore } from 'pinia'
import { useApiStore } from '@/Stores/api'
import { useModalsStore } from '@/Stores/modals'
import { useWorkspacesStore } from '@/Stores/workspaces'

import CreatePostModal from '@/Components/CreatePostModal.vue'

export const usePostsStore = defineStore('posts', () => {
    const apiStore = useApiStore()
    const modals = useModalsStore()
    const workspaces = useWorkspacesStore()
    const { showDialog, showConfirm, showToast } = modals

    function showCreatePostModal({ campaign, account }) {
        console.log('showCreatePostModal', campaign, account)
        showDialog(
            markRaw(CreatePostModal),
            {
                header: 'Create Post',
                modal: true,
                draggable: false,
                // appendTo: '#wrapper-content',
                // position: 'right',
                contentClass: 'max-w-6xl',
            },
            {
                data: {
                    campaign,
                    account,
                },
            },
        )
    }

    function showDeletePostModal({ project_id, campaign_id, post }) {
        showConfirm({
            title: `Delete post`,
            inlineMessage: {
                text: 'Deleting this post will remove all saved data and cannot be undone.',
                severity: 'warn',
            },
            message: `Are you sure you want to delete this post?}`,
            confirmButtonProps: {
                label: 'Delete',
                icon: 'delete_forever',
                severity: 'danger',
            },
            onConfirm: () => {
                router.delete(
                    route('post.destroy', {
                        slug: workspaces.current.slug,
                        project: project_id,
                        campaign: campaign_id,
                        post: post.id,
                    }),
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            showToast({
                                summary: 'Success',
                                severity: 'success',
                                detail: 'Post deleted successfully!',
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

    function navigateToCreatePost({ project_id, campaign_id }) {
        const route = apiStore.post.create({
            project_id,
            campaign_id,
        })
        router.visit(route)
    }

    return {
        showCreatePostModal,
        navigateToCreatePost,
        showDeletePostModal,
    }
})
