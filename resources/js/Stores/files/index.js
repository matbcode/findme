import { ref, markRaw } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { useForm, router } from '@inertiajs/vue3'
import { defineStore } from 'pinia'
import { useWorkspacesStore } from '@/Stores/workspaces'
import { useEventBusStore } from '@/Stores/eventBus'
import { useModalsStore } from '@/Stores/modals'

import FilePreviewDialog from '@/Components/Dialog/FilePreviewDialog.vue'
import AddDriveDialog from '@/Components/Dialog/AddDriveDialog.vue'

/**
 * Custom store for managing files and connected drives.
 *
 * @returns {Object} The files store object.
 */
export const useFilesStore = defineStore('files', () => {
    const workspaces = useWorkspacesStore()
    const eventBus = useEventBusStore()
    const modals = useModalsStore()

    const { t } = useI18n({})
    const { showDialog, showConfirm } = modals

    const files = ref([])
    const connectedDrives = ref([])
    const isFetching = ref(false)

    /**
     * Fetches the files from the server.
     */
    function fetch() {
        if (!workspaces.current) return

        isFetching.value = true
        axios
            .get(
                route('file.retrieve', {
                    slug: workspaces.current.slug,
                }),
            )
            .then((response) => {
                files.value = response.data
                isFetching.value = false
            })
    }

    /**
     * Stores a file on the server.
     *
     * @param {Object} options - The options for storing the file.
     * @param {Object} options.project - The project object.
     * @param {Object} options.file - The file object.
     */
    function store({ project, file }) {
        isFetching.value = true
        router.post(
            route('file.store', {
                slug: workspaces.current.slug,
            }),
            {
                file,
                project_id: project.id,
            },
            {
                method: 'post',
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    isFetching.value = false
                },
            },
        )
    }

    /**
     * Shows a file preview dialog.
     *
     * @param {Object} file - The file object.
     */
    function showFilePreview(file) {
        showDialog(
            markRaw(FilePreviewDialog),
            {
                header: file.name,
                modal: true,
                draggable: false,
                dismissableMask: true,
            },
            { data: { file } },
        )
    }

    /**
     * Fetches the connected drives from the server.
     */
    function fetchDrives({ onSuccess = () => {} }) {
        isFetching.value = true
        axios.get(route('google-drive.retrieve')).then((response) => {
            connectedDrives.value = response.data
            onSuccess()
            isFetching.value = false
        })
    }

    function fetchGoogleFile({ drive, file, onSuccess = () => {} }) {
        isFetching.value = true
        axios
            .get(
                route('google-drive.file', {
                    drive: drive.id,
                    file: file.id,
                }),
                {
                    responseType: 'blob',
                    mimeType: 'image/jpeg',
                },
            )
            .then((response) => {
                // const imageUrl = URL.createObjectURL(response.data)
                onSuccess(response)
                isFetching.value = false
            })
    }

    /**
     * Connects a Google Drive.
     */
    function connectDrive({ onSuccess = () => {} }) {
        showDialog(
            markRaw(AddDriveDialog),
            { header: 'Add drive', modal: true, draggable: false },
            { data: {} },
        )
        // const form = useForm({})
        // form.post(route('drive.store'), {
        //     preserveScroll: true,
        //     preserveState: false,
        //     onSuccess,
        // })
    }

    /**
     * Destroys a connected drive.
     *
     * @param {Object} drive - The drive object.
     */
    function disconnectDrive({ drive, onSuccess = () => {} }) {
        const form = useForm({})

        showConfirm({
            title: t('@Profile.DrivesGrid.deleteConfirm.title'),
            message: t('@Profile.DrivesGrid.deleteConfirm.message'),
            confirmButtonProps: {
                label: t('@Profile.DrivesGrid.deleteConfirm.confirm'),
                icon: 'delete',
            },
            onConfirm: () =>
                form.delete(
                    route('drive.destroy', { id: drive.id }),
                    {
                        preserveScroll: true,
                        preserveState: false,
                        onSuccess,
                    },
                ),
        })
    }

    eventBus.sidePanelEvent.listen(
        eventBus.SIDEPANEL_EVENTS.OPEN,
        () => {
            fetch(), fetchDrives({ onSuccess: () => {} })
        },
    )

    return {
        files,
        isFetching,
        fetch,
        store,
        fetchDrives,
        connectedDrives,
        showFilePreview,
        connectDrive,
        disconnectDrive,
        fetchGoogleFile,
    }
})
