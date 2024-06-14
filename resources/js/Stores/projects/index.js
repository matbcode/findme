import { ref, markRaw } from 'vue'
import { defineStore } from 'pinia'
import { usePage, router } from '@inertiajs/vue3'
import { useWorkspacesStore } from '@/Stores/workspaces'
import { useModalsStore } from '@/Stores/modals'
import { useApiStore } from '@/Stores/api'
import { useCampaignsStore } from '@/Stores/campaigns'

import axios from 'axios'

import AssignAccountToProjectDialog from '@/Components/Dialog/AssignAccountToProjectDialog/AssignAccountToProjectDialog.vue'

export const useProjectsStore = defineStore('projects', () => {
    const page = usePage()

    const workspaces = useWorkspacesStore()
    const modals = useModalsStore()
    const campaignsStore = useCampaignsStore()
    const api = useApiStore()

    const { showFormModal, showConfirm, showDialog, showToast } =
        modals
    const { showCreateCampaignModal } = campaignsStore

    const collection = ref(page.props.availableProjects || [])

    function fetch() {
        if (!workspaces.current?.slug) {
            return
        }

        axios
            .get(
                route('project.retrieve', {
                    slug: workspaces.current.slug,
                }),
            )
            .then((response) => {
                collection.value = response.data
                console.log('projects', collection.value)
            })
            .catch((error) => {
                console.error('error', error)
            })
    }

    function getActions({ project, workspaceUsers, accounts }) {
        return {
            createEvent: {
                label: 'Create campaign',
                icon: 'fa-solid fa-calendar-plus',
                // size: 'small',
                // rounded: true,
                // text: true,
                command: () => {
                    const form = api.campaign.store({ project })
                    api.prepareForm(form)
                    form.submit()
                },
            },
            createChannel: {
                code: 'create_channel',
                label: 'Assign account',
                icon: 'fa-solid fa-user-plus',
                // size: 'small',
                // rounded: true,
                // text: true,
                command: () =>
                    assignAccountModal({ project, accounts }),
            },
            manageUsers: {
                code: 'manage_users',
                label: 'Assign users',
                icon: 'fa-solid fa-user-gear',
                // size: 'small',
                // rounded: true,
                // text: true,
                command: () =>
                    manageProjectUsersModal({
                        project,
                        workspaceUsers,
                    }),
            },
            removeUser: (userId) => ({
                label: 'Remove user',
                icon: 'fa-solid fa-user-minus',
                rounded: true,
                text: true,
                command: () =>
                    removeUserFromProjectModal({ project, userId }),
            }),
            deleteProject: {
                code: 'delete',
                label: 'Delete project',
                icon: 'fa-regular fa-trash-can',
                severity: 'danger',
                command: () => deleteProjectModal({ project }),
            },
        }
    }

    function getProject(id) {
        return collection.value.find((project) => project.id === id)
    }

    function updateCollection(data) {
        collection.value = data
    }

    function createProjectForm({ workspace, users } = {}) {
        return {
            title: 'New project',
            subtitle: 'Create a new project in this workspace',
            formBody: {
                ...api.project.store(users),
            },
            formExtendedProps: {
                confirmButtonProps: {
                    label: 'Create',
                    icon: 'check',
                },
                cancelButtonProps: {
                    label: 'Clear',
                    icon: 'pi pi-times',
                    class: 'hidden',
                },
            },
        }
    }

    function createProjectModal({ workspace, users } = {}) {
        showFormModal(createProjectForm({ workspace, users }))
    }

    function updateProjectModal({ project }) {
        showFormModal({
            title: 'Edit project',
            subtitle: 'Update the project details',
            formBody: {
                ...api.project.update(project),
            },
            formExtendedProps: {
                confirmButtonProps: {
                    label: 'Update',
                    icon: 'check',
                },
                cancelButtonProps: {
                    label: 'Cancel',
                    icon: 'close',
                },
            },
        })
    }

    function deleteProjectModal({ project }) {
        showConfirm({
            title: `Detete ${project.name} project`,
            inlineMessage: {
                text: 'Deleting this project will remove all associated data and cannot be undone.',
                severity: 'warn',
            },
            message: `Are you sure you want to delete ${project.name} project?`,
            confirmButtonProps: {
                label: 'Delete',
                icon: 'delete_forever',
                severity: 'danger',
            },
            onConfirm: () => {
                router.delete(
                    route('project.destroy', {
                        slug: workspaces.current.slug,
                        project: project.id,
                    }),
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            showToast({
                                summary: 'Success',
                                severity: 'success',
                                detail: 'Project deleted successfully!',
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

    function manageProjectUsersModal({ project, workspaceUsers }) {
        const currentUsers = ref([
            ...project.users.map((user) => ({
                label:
                    user.first_name && user.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : user.username,
                id: user.id,
            })),
        ])

        const availableUsers = ref([
            ...workspaceUsers.map((user) => ({
                label:
                    user.first_name && user.last_name
                        ? `${user.first_name} ${user.last_name}`
                        : user.username,
                id: user.id,
            })),
        ])

        showFormModal({
            title: 'Change users assigned to this project',
            subtitle: 'Select a users to add to this project',
            formBody: {
                method: 'post',
                route: route('project.sync', {
                    slug: workspaces.current.slug,
                    project: project.id,
                }),
                fields: {
                    users: {
                        value: [],
                        type: 'multiselect',
                        props: {
                            placeholder: 'Select users',
                            maxSelectedLabels: 3,
                            filter: true,
                            options: availableUsers.value,
                            optionValue: 'id',
                            model: [],
                        },
                        // Custom function to update the model
                        onUpdateModel: ({ form, key, value }) => {
                            form[key] = [
                                ...currentUsers.value.map(
                                    (user) => user.id,
                                ),
                                ...value,
                            ]
                        },
                    },
                },
                options: {
                    preserveScroll: true,
                    preserveState: false,
                    onSuccess: () => {
                        showToast({
                            summary: 'Success',
                            severity: 'success',
                            detail: "Project's users updated!",
                            life: 5000,
                        })
                    },
                    onError: () => {
                        showToast({
                            summary: 'Error',
                            severity: 'error',
                            detail: "Error updating project's users!",
                        })
                    },
                },
            },
            formExtendedProps: {
                confirmButtonProps: {
                    label: 'Add users',
                    icon: 'group_add',
                },
                cancelButtonProps: {
                    label: 'Clear',
                    icon: 'pi pi-times',
                    class: 'hidden',
                },
            },
        })
    }

    function removeUsersFromProjectModal({ project, selectedUsers }) {
        showConfirm({
            title: 'Are you sure?',
            message: `Are you sure you want to remove ${selectedUsers.length} selected users from the project?`,
            confirmButtonProps: {
                label: 'Remove',
                icon: 'person_remove',
                severity: 'danger',
            },
            onConfirm: () => {
                router.post(
                    route('project.sync', {
                        slug: workspaces.current.slug,
                        project: project.id,
                    }),
                    {
                        users: project.users
                            .filter(
                                (user) =>
                                    !selectedUsers.find(
                                        (selectedUser) =>
                                            selectedUser.id ===
                                            user.id,
                                    ),
                            )
                            .map((user) => user.id),
                    },
                    {
                        method: 'post',
                        preserveScroll: true,
                        preserveState: false,
                        onSuccess: () => {
                            showToast({
                                summary: 'Success',
                                severity: 'success',
                                detail: 'Users removed from project!',
                                life: 5000,
                            })
                        },
                        onError: (error) => {
                            console.error('error', error)
                            showToast({
                                summary: 'Error',
                                severity: 'error',
                                detail: 'Error removing users!',
                            })
                        },
                    },
                )
            },
        })
    }

    function removeUserFromProjectModal({ project, userId }) {
        showConfirm({
            title: 'Are you sure?',
            message:
                'Are you sure you want to remove this user from the project?',
            confirmButtonProps: {
                label: 'Remove',
                icon: 'person_remove',
                severity: 'danger',
            },
            onConfirm: () => {
                router.post(
                    route('project.sync', {
                        slug: workspaces.current.slug,
                        project: project.id,
                    }),
                    {
                        users: project.users
                            .filter((user) => user.id !== userId)
                            .map((user) => user.id),
                    },
                    {
                        method: 'post',
                        preserveScroll: true,
                        onSuccess: () => {
                            showToast({
                                summary: 'Success',
                                severity: 'success',
                                detail: 'User was removed from project!',
                                life: 5000,
                            })
                        },
                        onError: (error) => {
                            console.error('error', error)
                        },
                    },
                )
            },
        })
    }

    function assignAccountModal({ project, accounts }) {
        showDialog(
            markRaw(AssignAccountToProjectDialog),
            {
                header: 'Assign account to project',
                modal: true,
                draggable: false,
            },
            {
                data: {
                    project,
                    accounts,
                },
            },
        )
    }

    function gotoEditProject({ id }) {
        router.visit(
            route('project.edit', {
                slug: workspaces.current.slug,
                project: id,
            }),
        )
    }

    fetch()

    return {
        collection,
        fetch,
        getActions,
        getProject,
        updateCollection,
        getProject,
        createProjectForm,
        modals: {
            createProjectModal,
            updateProjectModal,
            deleteProjectModal,
            manageProjectUsersModal,
            removeUsersFromProjectModal,
            removeUserFromProjectModal,
            assignAccountModal,
        },
        gotoEditProject,
    }
})
