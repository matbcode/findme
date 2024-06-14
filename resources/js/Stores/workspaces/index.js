import { ref, computed, markRaw } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
import { defineStore } from 'pinia'

import { useGlobalStore } from '@/Stores'
import { useProjectsStore } from '@/Stores/projects'
import { useCookiesStore } from '@/Stores/cookies'
import { useModalsStore } from '@/Stores/modals'
import { useApiStore } from '@/Stores/api'
import { useUploadStore } from '@/Stores/upload'

import { userRoles } from '@/Defaults'
import { useI18n } from 'vue-i18n'

import CreateWorkspaceDialog from '@/Components/Dialog/CreateWorkspaceDialog/CreateWorkspaceDialog.vue'

export const useWorkspacesStore = defineStore('workspaces', () => {
    /**
     * Stores and composables
     */
    const page = usePage()
    const api = useApiStore()
    const store = useGlobalStore()
    const projects = useProjectsStore()
    const modals = useModalsStore()
    const upload = useUploadStore()
    const { uploadWorkspaceImage } = upload
    const { showToast, showConfirm, showFormModal, showDialog } =
        modals
    const cookiesStore = useCookiesStore()
    const cookie = cookiesStore.getUserCookie()
    const { t } = useI18n({})

    /**
     * reference to translations
     */
    const i18n = ref(t)

    /**
     * Current Workspace
     */
    const current = computed(
        () =>
            page.props.currentWorkspace ||
            cookie.currentWorkspace ||
            null,
    )

    /**
     * Last workspace reference in cases where the current workspace from inertia is not available e.g. on page refresh in profile page
     */
    const lastWorkspace = ref(current.value)

    /**
     * List of workspaces
     */
    const workspaces = computed(() => page.props.workspaces)

    /**
     * Collection of available actions with icons
     */
    const actions = ref({
        createWorkspace: {
            label: t('@Workspaces.actions.createWorkspace'),
            icon: 'fa-solid fa-folder-plus',
            command: () => createWorkspaceModal(),
        },
        createProject: ({ workspace, users }) => ({
            label: t('@Workspaces.actions.createProject'),
            icon: 'fa-solid fa-folder-plus',
            command: () =>
                projects.modals.createProjectModal({
                    workspace,
                    users,
                }),
        }),
        inviteUser: (workspace) => ({
            label: t('@Workspaces.actions.inviteUser'),
            icon: 'fa-solid fa-user-plus',
            command: () => inviteUserModal({ workspace }),
        }),
        deleteWorkspace: {
            label: t('@Workspaces.actions.deleteWorkspace'),
            icon: 'fa-regular fa-trash-can',
            severity: 'danger',
            command: () => deleteWorkspaceModal(),
        },
        manageUserRoles: {
            label: t('@Workspaces.actions.manageUserRoles'),
            icon: 'fa-solid fa-users-cog',
            command: () => {},
        },
    })

    /**
     * Get the update workspace form
     *
     * @param {object} workspace
     * @returns {object}
     */
    function getUpdateWorkspaceForm({ workspace } = {}) {
        return {
            method: 'post',
            route: route('workspace.update', {
                slug: workspace?.slug || current.value.slug,
            }),
            fields: {
                image: {
                    label: 'Image',
                    type: 'avatar',
                    props: {
                        user: workspace || current.value,
                        size: '148px',
                        editable: true,
                        rounded: false,
                    },
                    events: {
                        click: () =>
                            uploadWorkspaceImage({
                                image:
                                    workspace?.image_path ||
                                    current.value.image_path,
                                workspace: workspace || current.value,
                                onSuccess: (image) => {
                                    // workspace.image_path = image
                                    console.log(
                                        'image',
                                        image,
                                        workspace,
                                    )
                                },
                            }),
                    },
                    included: false,
                    classes: 'col-span-2 row-span-2',
                },
                name: {
                    label: 'Name',
                    type: 'text',
                    value: workspace?.name || current.value.name,
                    presentationType: 'title',
                    presentation: true,
                    classes: 'col-span-10',
                    props: {
                        placeholder: 'Workspace name',
                        required: true,
                    },
                },
                description: {
                    label: 'Description',
                    type: 'textarea',
                    props: {
                        value:
                            workspace?.description ||
                            current.value.description,
                        placeholder: 'Workspace description',
                        required: true,
                    },
                    presentationType: 'markdown',
                    presentation: true,
                    editable: true,
                    classes: 'col-span-12',
                },
            },
        }
    }

    /**
     * Show the create workspace modal form
     */
    function createWorkspaceModal() {
        showDialog(
            markRaw(CreateWorkspaceDialog),
            {
                header: 'Create workspace',
                modal: true,
                draggable: false,
                dismissableMask: true,
            },
            {
                data: {},
            },
        )
        // showFormModal({
        //     title: t('@Workspaces.modals.createWorkspaceModal.title'),
        //     subtitle: t(
        //         '@Workspaces.modals.createWorkspaceModal.subtitle',
        //     ),
        //     formBody: {
        //         method: 'post',
        //         route: route('workspace.store'),
        //         fields: {
        //             name: {
        //                 value: '',
        //                 type: 'text',
        //                 props: {
        //                     autofocus: true,
        //                 },
        //             },
        //         },
        //     },
        //     formExtendedProps: {
        //         confirmButtonProps: {
        //             label: t(
        //                 '@Workspaces.modals.createWorkspaceModal.confirm',
        //             ),
        //             icon: 'pi pi-plus',
        //         },
        //         cancelButtonProps: {
        //             label: t(
        //                 '@Workspaces.modals.createWorkspaceModal.cancel',
        //             ),
        //             icon: 'pi pi-times',
        //             class: 'hidden',
        //         },
        //     },
        // })
    }

    /**
     * Show the delete workspace modal form
     *
     * @param {object} workspace
     * @returns {void}
     */
    function deleteWorkspaceModal({ workspace } = {}) {
        showConfirm({
            title: t('@Workspaces.modals.deleteWorkspaceModal.title'),
            inlineMessage: {
                props: {
                    severity: 'error',
                },
                text: t(
                    '@Workspaces.modals.deleteWorkspaceModal.inlineMessage',
                ),
            },
            confirmText: 'DELETE',
            message: t(
                '@Workspaces.modals.deleteWorkspaceModal.subtitle',
            ),
            confirmButtonProps: {
                label: 'Delete',
                icon: 'delete_forever',
                severity: 'danger',
            },
            onConfirm: () => {
                router.delete(
                    route('workspace.destroy', {
                        slug: workspace?.slug || current.value.slug,
                    }),
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            showToast({
                                summary: t(
                                    '@Workspaces.toast.delete.successSummary',
                                ),
                                severity: 'success',
                                detail: t(
                                    '@Workspaces.toast.delete.successMessage',
                                ),
                            })
                        },
                        onError: () => {
                            showToast({
                                summary: t(
                                    '@Workspaces.toast.delete.errorSummary',
                                ),
                                severity: 'error',
                                detail: t(
                                    '@Workspaces.toast.delete.errorMessage',
                                ),
                            })
                        },
                    },
                )
            },
        })
    }

    /**
     * Show the invite user modal form
     *
     * @param {object} workspace
     * @returns {void}
     */
    function inviteUserModal({ workspace } = {}) {
        showFormModal({
            title: t('@Workspaces.modals.inviteUserModal.title'),
            subtitle: t(
                '@Workspaces.modals.inviteUserModal.subtitle',
            ),
            formBody: {
                method: 'post',
                route: route(
                    'workspace.invite',
                    workspace?.slug || current.value.slug,
                ),
                fields: {
                    email: {
                        value: null,
                        type: 'email',
                    },
                    role_id: {
                        value: null,
                        type: 'dropdown',
                        props: {
                            options: workspace.roles.map((role) => ({
                                value: role.id,
                                label: role.name,
                            })),
                        },
                    },
                },
                options: {
                    onSuccess: (form) => {
                        showToast({
                            summary: t(
                                '@Workspaces.toast.inviteUser.successSummary',
                            ),
                            severity: 'success',
                            detail: t(
                                '@Workspaces.toast.inviteUser.successMessage',
                                {
                                    email: form.email,
                                    role: form.role,
                                    workspace:
                                        workspace?.name ||
                                        current.value.name,
                                },
                            ),
                            life: 7000,
                            button: {
                                props: {
                                    label: t('@Workspaces.cancel'),
                                    icon: 'cancel',
                                    severity: 'danger',
                                },
                                onClick: () => {
                                    cancelInvitation(form.id)
                                },
                            },
                        })
                    },
                    onError: (e) => {
                        showToast({
                            summary: t(
                                '@Workspaces.toast.inviteUser.errorSummary',
                            ),
                            severity: 'error',
                            detail: JSON.stringify(e),
                        })
                    },
                },
            },
            formExtendedProps: {
                confirmButtonProps: {
                    label: t(
                        '@Workspaces.modals.inviteUserModal.confirm',
                    ),
                    icon: 'pi pi-send',
                },
                cancelButtonProps: {
                    label: t(
                        '@Workspaces.modals.inviteUserModal.cancel',
                    ),
                    icon: 'pi pi-times',
                    class: 'hidden',
                },
            },
        })
    }

    /**
     * Remove user from workspace modal
     *
     * @param {object} workspace
     * @param {object} user
     * @returns {void}
     */
    function removeUserFromWorkspaceModal({ workspace, user } = {}) {
        showConfirm({
            title: 'Are you sure?',
            message:
                'Are you sure you want to remove this user from the workspace?',
            confirmButtonProps: {
                label: 'Remove',
                icon: 'pi pi-trash',
                severity: 'danger',
            },
            onConfirm: () => {
                router.post(
                    route('workspace.detach', {
                        slug: workspace?.slug || current.value.slug,
                    }),
                    {
                        user_id: user.id,
                    },
                    {
                        preserveState: false,
                        preserveScroll: true,
                        onSuccess: () => {
                            showToast({
                                summary: 'Success',
                                severity: 'success',
                                detail: 'User removed was removed from the workspace.',
                            })
                        },
                        onError: () => {
                            showToast({
                                summary: 'Error',
                                severity: 'error',
                                detail: 'An error occurred while removing the user.',
                            })
                        },
                    },
                )
            },
        })
    }

    /**
     * Edit user role modal
     *
     * @param {object} workspace
     * @param {object} user
     * @returns {void}
     */
    function editUserRoleModal({ workspace, user } = {}) {
        showFormModal({
            title: `Change role for ${user.full_name}`,
            subtitle: 'Change the role of this user in the workspace',
            formBody: {
                method: 'patch',
                route: route(
                    'workspace.role',
                    workspace?.slug || current.value.slug,
                ),
                fields: {
                    user_id: {
                        value: user.id,
                        hidden: true,
                    },
                    role: {
                        value: userRoles.find(
                            (role) => role.value === user.pivot.role,
                        ),
                        type: 'dropdown',
                        props: {
                            options: userRoles,
                        },
                    },
                },
            },
            formExtendedProps: {
                confirmButtonProps: {
                    label: 'Change role',
                    icon: 'done',
                },
                cancelButtonProps: {
                    label: 'Cancel',
                    icon: 'pi pi-times',
                    class: 'hidden',
                },
            },
        })
    }

    /**
     * Cancel an invitation
     *
     * @param {number} invitationId
     * @returns {void}
     */
    function cancelInvitationModal({ workspace, invitationId } = {}) {
        showConfirm({
            title: 'Abort invitation',
            message:
                'Are you sure you want to abort this invitation?',
            confirmButtonProps: {
                label: 'Yes, abort',
                icon: 'pi pi-check',
                severity: 'danger',
            },
            onConfirm: () => {
                router.visit(
                    route('workspace.uninvite', {
                        slug: workspace?.slug || current.value.slug,
                        invitation: invitationId,
                    }),
                    {
                        method: 'get',
                        preserveScroll: true,
                        onSuccess: () => {
                            showToast({
                                summary: 'Success',
                                severity: 'success',
                                detail: 'Invitation aborted successfully!',
                            })
                        },
                        onError: () => {},
                    },
                )
            },
        })
    }

    /**
     * Update the current workspace when the route changes and emit an event
     */
    router.on('navigate', (event) => {
        if (
            lastWorkspace.value &&
            current.value !== lastWorkspace.value
        ) {
            store.eventBus.workspaceEvent.emit(
                store.eventBus.WORKSPACE_EVENTS
                    .CURRENT_WORKSPACE_CHANGED,
                current.value,
            )
            store.cookies.setUserCookie('current', current.value)
        }

        lastWorkspace.value = current.value
    })

    return {
        i18n,
        current,
        workspaces,
        actions,
        forms: {
            ...api.workspace,
        },
        getUpdateWorkspaceForm,
        modals: {
            createWorkspaceModal,
            deleteWorkspaceModal,
            inviteUserModal,
            removeUserFromWorkspaceModal,
            editUserRoleModal,
            cancelInvitationModal,
            uploadImageModal: uploadWorkspaceImage,
        },
    }
})
