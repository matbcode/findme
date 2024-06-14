import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { defineStore } from 'pinia'
import { useWorkspacesStore } from '@/Stores/workspaces'
import { useModalsStore } from '@/Stores/modals'
import { useStatusesStore } from '@/Stores/statuses'
import { usePostsStore } from '@/Stores/posts'
import { useApiStore } from '@/Stores/api'
import { getCurrentDateOffset } from '@/Components/Calendar/Utils/utils'
import axios from 'axios'

export const useCampaignsStore = defineStore('campaigns', () => {
    const modals = useModalsStore()
    const workspaces = useWorkspacesStore()
    const posts = usePostsStore()
    const statusesStore = useStatusesStore()
    const api = useApiStore()

    const { showFormModal, showConfirm } = modals
    const { getStatus } = statusesStore
    const { showCreatePostModal } = posts

    const collection = ref([])
    const isFetching = ref(false)

    const statuses = {
        DRAFT: 'draft',
        SCHEDULED: 'scheduled',
        QUEUED: 'queued',
        ERROR: 'error',
        RELEASED: 'released',
    }

    async function fetch({ project }) {
        isFetching.value = true
        return axios
            .get(
                route('campaign.retrieve', {
                    slug: workspaces.current.slug,
                    projects: [project.id],
                    // status: ['draft'],
                    // start: getCurrentDateOffset({ days: -14 }),
                    // end: getCurrentDateOffset({ days: 14 }),
                }),
            )
            .then((response) => {
                console.log(response.data)
                collection.value = response.data
                isFetching.value = false
            })
    }

    function getActions({ project, campaign, channels }) {
        return {
            createCampaign: {
                label: 'Create Campaign',
                icon: 'add',
                rounded: true,
                text: true,
                command: () => {
                    const form = api.campaign.store({ project })
                    api.prepareForm(form)
                    form.submit()
                },
            },
            deleteCampaign: {
                label: 'Delete Campaign',
                icon: 'fa-solid fa-trash-can',
                severity: 'danger',
                command: () => {
                    showDeleteCampaignModal({
                        project_id: project.id,
                        campaign,
                    })
                },
            },
            releaseCampaign: {
                label: 'Release now',
                icon: 'fa-regular fa-paper-plane',
                command: () => {
                    releaseCampaignNow({
                        campaign,
                    })
                },
            },
        }
    }

    function getUpdateCampaignForm({ workspace, campaign } = {}) {
        return {
            method: 'patch',
            route: route('campaign.update', {
                slug: workspace?.slug || workspaces.current.slug,
                project: campaign.project_id,
                campaign: campaign.id,
            }),
            fields: {
                title: {
                    label: 'Campaign Title',
                    value: campaign.title,
                    type: 'text',
                },
                description: {
                    label: 'Campaign Description',
                    name: 'description',
                    value: campaign.description,
                    type: 'textarea',
                },
                release_at: {
                    type: 'date',
                    label: 'Scheduled date',
                    value: campaign.release_at,
                    props: {
                        showIcon: true,
                        iconDisplay: 'input',
                        showTime: true,
                        hourFormat: '24',
                        minDate: getCurrentDateOffset(1),
                    },
                    onMount: ({ fields, form }) => {
                        fields.release_at.props.disabled =
                            form.status === statuses.SCHEDULED
                    },
                    onUpdateModel: ({ key, value, fields, form }) => {
                        form[key] = value

                        fields.status.props.options[2].disabled =
                            value === null
                    },
                },
                status: {
                    label: 'Status',
                    value: campaign.status,
                    type: 'dropdown',
                    hidden: true,
                    props: {
                        options: [
                            {
                                label: 'Draft',
                                value: statuses.DRAFT,
                            },
                            {
                                label: 'Awaiting Approval',
                                value: statuses.AWAITING_APPROVAL,
                            },
                            {
                                label: 'Scheduled',
                                value: statuses.SCHEDULED,
                            },
                        ],
                    },
                    onMount: ({ fields }) => {
                        fields.status.props.options[2].disabled =
                            campaign.release_at === null
                    },
                    onUpdateModel: ({ key, value, fields, form }) => {
                        form[key] = value

                        fields.release_at.props.disabled =
                            value === statuses.SCHEDULED
                    },
                },
            },
        }
    }

    function showCreateCampaignModal({ project }) {
        showFormModal({
            title: 'Create Campaign',
            subtitle: `Create new campaign in ${project.name}`,
            formBody: {
                method: 'post',
                route: route('campaign.store', {
                    slug: workspaces.current.slug,
                    project: project.id,
                }),
                fields: {
                    title: {
                        label: 'Title',
                        placeholder: 'Enter campaign title',
                        type: 'text',
                    },
                    description: {
                        label: 'Description',
                        placeholder: 'Enter campaign description',
                        type: 'textarea',
                    },
                },
            },
            formExtendedProps: {
                confirmButtonProps: {
                    label: 'Create campaign',
                    icon: 'add',
                },
                cancelButtonProps: {
                    label: 'Cancel',
                    icon: 'pi pi-times',
                    class: 'hidden',
                },
            },
        })
    }

    function showUpdateCampaignModal(campaign) {
        showFormModal({
            title: 'Update Campaign',
            subtitle: 'Update event details',
            formBody: {
                method: 'patch',
                route: route('campaign.update', {
                    slug: workspaces.current.slug,
                    project: campaign.project_id,
                    campaign: campaign.id,
                }),
                fields: {
                    title: {
                        label: 'Campaign Title',
                        value: campaign.title,
                        type: 'text',
                    },
                    description: {
                        label: 'Campaign Description',
                        value: campaign.description,
                        type: 'textarea',
                    },
                    status: {
                        label: 'Status',
                        value: campaign.status,
                        type: 'selectbutton',
                        props: {
                            options: [
                                {
                                    label: 'Draft',
                                    value: statuses.value.DRAFT,
                                },
                                {
                                    label: 'Awaiting Approval',
                                    value: statuses.value
                                        .AWAITING_APPROVAL,
                                },
                                {
                                    label: 'Scheduled',
                                    value: statuses.value.SCHEDULED,
                                },
                            ],
                        },
                        onMount: ({ fields }) => {
                            fields.status.props.options[2].disabled =
                                campaign.release_at === null
                        },
                        onUpdateModel: ({
                            key,
                            value,
                            fields,
                            form,
                        }) => {
                            form[key] = value

                            fields.release_at.props.disabled =
                                value === statuses.value.SCHEDULED
                        },
                    },
                    release_at: {
                        type: 'date',
                        label: 'Scheduled date',
                        value: campaign.release_at,
                        props: {
                            showIcon: true,
                            iconDisplay: 'input',
                            showTime: true,
                            hourFormat: '24',
                            minDate: getCurrentDateOffset(1),
                        },
                        onMount: ({ fields, form }) => {
                            fields.release_at.props.disabled =
                                form.status ===
                                statuses.value.SCHEDULED
                        },
                        onUpdateModel: ({
                            key,
                            value,
                            fields,
                            form,
                        }) => {
                            form[key] = value

                            fields.status.props.options[2].disabled =
                                value === null
                        },
                    },
                },
            },
            formExtendedProps: {
                confirmButtonProps: {
                    label: 'Update campaign',
                    icon: 'done',
                },
                cancelButtonProps: {
                    label: 'Clear',
                    icon: 'pi pi-times',
                    class: 'hidden',
                },
            },
        })
    }

    function showDeleteCampaignModal({ project_id, campaign }) {
        showConfirm({
            title: `Delete ${campaign.name} campaign`,
            inlineMessage: {
                text: 'Deleting this campaign will remove all posts and cannot be undone.',
                severity: 'warn',
            },
            message: `Are you sure you want to delete ${campaign.name} campaign?}`,
            confirmButtonProps: {
                label: 'Delete',
                icon: 'delete_forever',
                severity: 'danger',
            },
            onConfirm: () => {
                router.delete(
                    route('campaign.destroy', {
                        slug: workspaces.current.slug,
                        project: project_id,
                        campaign: campaign.id,
                    }),
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            showToast({
                                summary: 'Success',
                                severity: 'success',
                                detail: 'Campaign deleted successfully!',
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

    function releaseCampaignNow({ campaign }) {
        showConfirm({
            title: `Release ${campaign.name} campaign`,
            inlineMessage: {
                text: 'Releasing this campaign will publish all posts to their respective channels.',
                severity: 'warn',
            },
            message: `Are you sure you want to release ${campaign.title} campaign?`,
            confirmButtonProps: {
                label: 'Release',
                icon: 'send',
            },
            onConfirm: () => {
                router.get(
                    route('campaign.release', {
                        slug: workspaces.current.slug,
                        project: campaign.project_id,
                        campaign: campaign.id,
                    }),
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            showToast({
                                summary: 'Success',
                                severity: 'success',
                                detail: 'Campaign released successfully!',
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

    return {
        collection,
        statuses,
        isFetching,
        fetch,
        getUpdateCampaignForm,
        getActions,
        getStatus,
        showCreateCampaignModal,
        showUpdateCampaignModal,
        showDeleteCampaignModal,
        releaseCampaignNow,
    }
})
