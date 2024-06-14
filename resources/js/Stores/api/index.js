import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useModalsStore } from '@/Stores/modals'
import { useWorkspacesStore } from '@/Stores/workspaces'
import { useUserStore } from '@/Stores/user'
import { useUploadStore } from '@/Stores/upload'

function fieldsToFormData(fields) {
    return Object.keys(fields).reduce((acc, key) => {
        //Note: check if the key is included and if it's not, skip it and continue with the next one
        if (fields[key].included === false) {
            return acc
        }

        acc[key] = fields[key].value
        return acc
    }, {})
}

export const useApiStore = defineStore('api', () => {
    const modalsStore = useModalsStore()
    const workspacesStore = useWorkspacesStore()
    const userStore = useUserStore()
    const uploadStore = useUploadStore()
    const { showToast } = modalsStore
    const { uploadProjectImage, uploadWorkspaceImage } = uploadStore

    function onSuccessWrapper(event, handler, message) {
        if (handler) {
            handler(event)
        } else {
            showToast({
                severity: 'success',
                summary: 'Success',
                detail: message || 'Success!',
            })
        }
    }

    function onErrorWrapper(event, handler, message) {
        showToast({
            severity: 'error',
            summary: 'Error',
            detail: message || 'Error!',
        })

        if (handler) {
            handler(event)
        }
    }

    /**
     * Fetch comments for a project or event.
     *
     * @param {Object} options - The options for fetching comments.
     * @param {Object} options.project - The project object.
     * @param {Object} options.event - The event object.
     * @param {Function} options.callback - The callback function to handle the fetched comments.
     * @returns {Promise} A promise that resolves with the fetched comments.
     */
    async function fetchComments({ project, campaign, callback }) {
        const type = !!campaign ? 'Campaign' : 'Project'

        return axios
            .get(
                route('comment.retrieve', {
                    slug: workspacesStore.current.slug,
                    type,
                    parentId: !!campaign ? campaign.id : project.id,
                }),
            )
            .then((response) => {
                callback(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function prepareForm(endpoint) {
        endpoint.form = useForm(fieldsToFormData(endpoint.fields))
        endpoint.reset = () => {
            endpoint.form.reset()
            endpoint.form.clearErrors()
        }
        endpoint.submit = () =>
            endpoint.form.submit(endpoint.method, endpoint.route, {
                onSuccess: (e) =>
                    onSuccessWrapper(
                        e,
                        endpoint.onSuccess,
                        endpoint.successMessage,
                    ),
                onError: (e) =>
                    onErrorWrapper(
                        e,
                        endpoint.onError,
                        endpoint.errorMessage,
                    ),
            })
    }

    /**
     * Workspace endpoints
     *
     * store - Create a new workspace
     *
     */
    const workspace = ref({
        // store: () => ref({
        //     method: 'post',
        //     route: route('workspace.store'),
        //     fields: {
        //         name: {
        //             value: '',
        //             type: 'text',
        //         }
        //     },
        // }),
        update: ({ workspace }) =>
            ref({
                method: 'post',
                route: route('workspace.update', {
                    slug: workspace.slug,
                }),
                fields: {
                    name: {
                        label: 'Name',
                        type: 'text',
                        value: workspace.name,
                        props: {
                            placeholder: 'Workspace name',
                            required: true,
                        },
                    },
                    description: {
                        label: 'Description',
                        type: 'textarea',
                        props: {
                            value: workspace.description,
                            placeholder: 'Workspace description',
                            required: true,
                        },
                    },
                },
            }),
    })

    /**
     * Project endpoints
     *
     * store - Create a new project
     *
     */
    const project = ref({
        store: (users) => ({
            method: 'post',
            route: route('project.store', {
                slug: workspacesStore.current.slug,
            }),
            fields: {
                name: {
                    value: '',
                    type: 'text',
                },
                description: {
                    value: '',
                    type: 'textarea',
                    hint: 'Provide a detailed project description. Use Markdown to format text, add links, and more',
                },
                users: {
                    value: [],
                    type: 'multiselect',
                    props: {
                        placeholder: 'Select users',
                        maxSelectedLabels: 3,
                        filter: true,
                        options: users?.map((user) => ({
                            label:
                                user.first_name && user.last_name
                                    ? `${user.first_name} ${user.last_name}`
                                    : user.username,
                            value: user.id,
                        })),
                        model: [],
                    },
                },
                timezone: {
                    type: 'dropdown',
                    value: userStore.timezone,
                    props: {
                        options: userStore.timezones,
                        optionValue: 'id',
                    },
                },
                color: {
                    value:
                        '#' +
                        Math.floor(Math.random() * 16777215).toString(
                            16,
                        ), // Random color
                    type: 'color',
                },
            },
        }),
        update: (project) => ({
            method: 'patch',
            route: route('project.update', {
                slug: workspacesStore.current.slug,
                project: project.id,
            }),
            fields: {
                image: {
                    type: 'avatar',
                    // value: props.project.image,
                    props: {
                        user: project,
                        size: '148px',
                        editable: true,
                        rounded: false,
                    },
                    events: {
                        edit: () =>
                            uploadProjectImage({
                                image: project.image_path,
                                workspace: workspacesStore.current,
                                project,
                            }),
                    },
                    included: false,
                    classes: 'col-span-2 row-span-2',
                },
                name: {
                    value: project.name,
                    type: 'text',
                    presentationType: 'title',
                    presentation: true,
                    editable: true,
                    classes: 'col-span-7',
                },
                timezone: {
                    type: 'dropdown',
                    value: project.timezone,
                    presentation: true,
                    editable: true,
                    classes: 'col-span-2 text-center',
                    props: {
                        options: userStore.timezones,
                        optionValue: 'id',
                        filter: true,
                    },
                    onUpdateModel: ({ form, key, value, fields }) => {
                        if (value !== form[key]) {
                            fields.inlinemessage.hidden = false
                        }

                        form[key] = value
                        fields[key].value = value
                    },
                },
                color: {
                    value: project.color,
                    type: 'color',
                    presentation: true,
                    editable: true,
                    classes:
                        'col-span-1 text-center justify-self-center',
                    onUpdateModel: ({ form, key, value }) => {
                        form[key] = `#${value}`
                    },
                },
                inlinemessage: {
                    include: false,
                    type: 'inlinemessage',
                    hidden: true,
                    props: {
                        severity: 'info',
                        text: "Changing the project's timezone will not re-schedule current events",
                    },
                },
                description: {
                    value: project.description,
                    type: 'textarea',
                    hint: 'Provide a detailed project description. Use Markdown to format text, add links, and more',
                    presentationType: 'markdown',
                    presentation: true,
                    editable: true,
                    classes: 'col-span-12',
                },
            },
        }),
        destroy: (project) => ({
            method: 'delete',
            route: route('project.destroy', {
                slug: workspacesStore.current.slug,
                project: project.id,
            }),
        }),
    })

    const channel = ref({
        create: (project, platforms) => ({
            method: 'post',
            route: route('channel.store', {
                slug: workspacesStore.current.slug,
                project: project.id,
            }),
            fields: {
                platform_id: {
                    label: 'Platform',
                    type: 'dropdown',
                    props: {
                        options: platforms,
                        optionLabel: 'name',
                        optionValue: 'id',
                    },
                },
                name: {
                    label: 'Channel Name',
                    type: 'text',
                },
                description: {
                    label: 'Description',
                    type: 'textarea',
                },
            },
        }),
    })

    const statuses = {
        DRAFT: 'draft',
        SCHEDULED: 'scheduled',
        QUEUED: 'queued',
        ERROR: 'error',
        RELEASED: 'released',
    }

    const campaign = ref({
        store: ({ project }) => ({
            method: 'post',
            route: route('campaign.store', {
                slug: workspacesStore.current.slug,
                project: project.id,
            }),
            fields: {
                title: {
                    label: 'Campaign Title',
                    value: 'New Campaign',
                    type: 'text',
                },
                description: {
                    label: 'Campaign Description',
                    value: '',
                    type: 'textarea',
                },
                status: {
                    label: 'Status',
                    value: statuses.DRAFT,
                    type: 'selectbutton',
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
                    // onMount: ({ fields }) => {
                    //     fields.status.props.options[2].disabled =
                    //         campaign.release_at === null
                    // },
                    // onUpdateModel: ({
                    //     key,
                    //     value,
                    //     fields,
                    //     form,
                    // }) => {
                    //     form[key] = value

                    //     fields.release_at.props.disabled =
                    //         value === statuses.value.SCHEDULED
                    // },
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
                    },
                    // onMount: ({ fields, form }) => {
                    //     fields.release_at.props.disabled =
                    //         form.status ===
                    //         statuses.value.SCHEDULED
                    // },
                    // onUpdateModel: ({
                    //     key,
                    //     value,
                    //     fields,
                    //     form,
                    // }) => {
                    //     form[key] = value

                    //     fields.status.props.options[2].disabled =
                    //         value === null
                    // },
                },
            },
            onSuccess: (e) => {
                onSuccessWrapper(e, null, 'Campaign created!')
                modalsStore.close()
            },
            onError: (e) => {
                onErrorWrapper(e, null, 'Failed to create campaign!')
            },
        }),
    })

    const post = ref({
        create: ({ project_id, campaign_id, account }) =>
            route('post.create', {
                slug: workspacesStore.current.slug,
                project: project_id,
                campaign: campaign_id,
            }),
        store: ({ project_id, campaign_id, account }) => ({
            method: 'post',
            route: route('post.store', {
                slug: workspacesStore.current.slug,
                project: project_id,
                campaign: campaign_id,
            }),
            fields: {
                account: {
                    value: {
                        id: account.id,
                        projectable_type:
                            account.pivot.projectable_type,
                    },
                },
                payload: {
                    value: {},
                },
                // attachments: {
                //     value: [],
                // },
            },
            onSuccess: (e) => {
                onSuccessWrapper(e, null, 'Post created!')
                modalsStore.close()
            },
            onError: (e) => {
                onErrorWrapper(e, null, 'Failed to create post!')
            },
        }),
        update: ({ project_id, campaign_id, channels, post }) => ({
            method: 'patch',
            route: route('post.update', {
                slug: workspacesStore.current.slug,
                project: project_id,
                campaign: campaign_id,
                post: post.id,
            }),
            fields: {
                channel_id: {
                    type: 'dropdown',
                    value: post.channel_id,
                    props: {
                        placeholder: 'Select channel',
                        optionValue: 'id',
                        optionLabel: 'name',
                        options: channels,
                        disabled: true,
                    },
                    hidden: true,
                },
                format_id: {
                    type: 'text',
                    value: '1',
                    props: {
                        disabled: true,
                    },
                    hidden: true,
                },
                payload: {
                    type: 'textarea',
                    value: post.payload,
                    // hidden: true,
                },
            },
            onSuccess: (e) => {
                onSuccessWrapper(e, null, 'Post updated!')
                modalsStore.close()
            },
            onError: (e) => {
                onErrorWrapper(e, null, 'Failed to update post!')
            },
        }),
    })

    // TODO: Should be enabled when formWrapper refactor is done
    // prepareForm(workspace.value.store);

    return {
        workspace,
        project,
        channel,
        campaign,
        post,
        fetchComments,
        prepareForm,
    }
})
