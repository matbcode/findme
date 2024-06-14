import { markRaw } from 'vue'
import { defineStore } from 'pinia'
import { useModalsStore } from '@/Stores/modals'
import { useWorkspacesStore } from '@/Stores/workspaces'

import CropImage from '@/Components/Custom/CropImage.vue'
import FileUpload from '@/Components/Custom/FileUpload.vue'

export const useUploadStore = defineStore('upload', () => {
    const modals = useModalsStore()
    const workspaces = useWorkspacesStore()

    const { showDialog } = modals

    function showAvatarUploadModal({ image }) {
        showDialog(
            markRaw(CropImage),
            {
                header: 'Upload avatar',
                modal: true,
                draggable: false,
            },
            {
                data: {
                    'stencil-component': 'circle-stencil',
                    canvas: {
                        height: 64,
                        width: 64,
                    },
                    // image,
                },
            },
        )
    }

    function uploadWorkspaceImage({ workspace, image, onSuccess }) {
        showDialog(
            markRaw(CropImage),
            {
                header: 'Upload image',
                modal: true,
                draggable: false,
            },
            {
                data: {
                    route: route('workspace.image', {
                        slug: workspace.slug,
                    }),
                    'stencil-component': 'circle-stencil',
                    canvas: {
                        height: 148,
                        width: 148,
                    },
                    // image,
                },
                events: {
                    imageCreated: onSuccess,
                },
            },
        )
    }

    function uploadProjectImage({
        workspace,
        project,
        image,
        onSuccess,
    }) {
        showDialog(
            markRaw(CropImage),
            {
                header: 'Upload image',
                modal: true,
                draggable: false,
            },
            {
                data: {
                    route: route('project.image', {
                        slug: workspace.slug,
                        project: project.id,
                    }),
                    'stencil-component': 'circle-stencil',
                    canvas: {
                        height: 148,
                        width: 148,
                    },
                    // image,
                },
                events: {
                    imageCreated: onSuccess,
                },
            },
        )
    }

    function showTwitterUploadImage({ image, post, callback }) {
        console.log('showTwitterUploadImage', image, post, callback)
        showDialog(
            markRaw(CropImage),
            {
                header: 'Upload image',
                modal: true,
                draggable: false,
            },
            {
                'stencil-props': {
                    minAspectRatio: '16/8',
                    maxAspectRatio: '4/8',
                },
                'resize-image': {
                    adjustStencil: false,
                },
                'image-restriction': 'stencil',
                'stencil-size': {
                    width: 280,
                    height: 280,
                },
                data: {
                    route: route('file.upload', {
                        slug: workspaces.current.slug,
                    }),
                    axiosForm: {
                        file: null,
                        file_id: image?.id || null,
                    },
                    formKey: 'file',
                    image: image.file_path,
                },
                events: {
                    imageCreated: callback,
                },
            },
        )
    }

    function showEventUploadModal({
        image,
        event,
        post,
        project,
        onSuccess,
    }) {
        showDialog(
            markRaw(FileUpload),
            {
                header: 'Upload image',
                modal: true,
                draggable: false,
            },
            {
                data: {
                    route: route('file.store', {
                        slug: workspaces.current.slug,
                    }),
                    data: {},
                    canvas: {
                        height: 64,
                        width: 64,
                    },
                    form: {
                        file: null,
                        type: 'event',
                        project_id: project.id,
                        event_id: event.id,
                        post_id: post.id,
                    },
                    formKey: 'file',
                    image,
                },
                events: {
                    imageCreated: onSuccess,
                },
            },
        )
    }

    return {
        showAvatarUploadModal,
        uploadWorkspaceImage,
        uploadProjectImage,
        showTwitterUploadImage,
        showEventUploadModal,
    }
})
