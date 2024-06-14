<script setup>
import { ref, computed } from 'vue'

import { useGlobalStore } from '@/Stores'

import FileUpload from 'primevue/fileupload'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import Grid from '@/ComponentsNew/Grid/Grid.vue'
import FileGridElement from '@/ComponentsNew/Grid/SlotComponents/FileGridElement.vue'
import FileListElement from '@/ComponentsNew/Grid/SlotComponents/FileListElement.vue'

const store = useGlobalStore()

const props = defineProps({
    project: Object,
    columns: {
        type: Number,
        default: 5,
    },
    showToolbar: {
        type: Boolean,
        default: true,
    },
    showActionButton: {
        type: Boolean,
        default: true,
    },
})

const projectFiles = computed(() => {
    return store.files.files.filter(
        (file) => file.project_id === props.project.id,
    )
})

const validateFile = (files) => {
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'video/mp4',
    ]

    if (!files) {
        return false
    }

    if (files.length > 1) {
        store.modals.showToast({
            severity: 'error',
            summary: 'Error',
            detail: store.t(
                '@Projects.ProjectFilesGrid.errors.multipleFiles',
            ),
        })
        return false
    }

    const file = files[0]

    if (!allowedTypes.includes(file.type)) {
        store.modals.showToast({
            severity: 'error',
            summary: 'Error',
            detail: store.t(
                '@Projects.ProjectFilesGrid.errors.fileType',
                {
                    allowedTypes: allowedTypes
                        .join(', ')
                        .replaceAll('image/', '')
                        .replaceAll('video/', ''),
                },
            ),
        })
        return false
    }

    if (!file || file.size > 100 * 1024 * 1024) {
        store.modals.showToast({
            severity: 'error',
            summary: 'Error',
            detail: store.t(
                '@Projects.ProjectFilesGrid.errors.fileSize',
            ),
        })
        return false
    }

    return true
}

const onSelectImage = (e) => {
    const file = e.files[0]

    if (!validateFile(e.files)) {
        return
    }

    store.files.store({
        file,
        project: props.project,
    })
}

const onDrop = (e) => {
    e.preventDefault()

    if (store.drag.action) {
        store.drag.action({
            onSuccess: (file) => {
                store.files.store({
                    file,
                    project: props.project,
                })
            },
        })
    } else {
        const file = e.dataTransfer.files[0]

        if (!validateFile(e.dataTransfer.files)) {
            return
        }

        store.files.store({
            file,
            project: props.project,
        })
    }
}
</script>

<template>
    <Grid
        :value="projectFiles"
        :gridComponent="FileGridElement"
        :listComponent="FileListElement"
        itemPropsName="file"
        use-aspect-square
        :columns="3"
        :emptyMessage="
            store.t('@Projects.ProjectFilesGrid.emptyMessage')
        "
        :headerProps="{
            title: 'Project Files',
        }"
        :showToolbar
        :useDropzone="true"
        @drop="onDrop"
    >
        <template v-if="showActionButton" #toolbarAction>
            <FileUpload
                mode="basic"
                :chooseLabel="
                    store.t('@Projects.ProjectFilesGrid.uploadFile')
                "
                @select="onSelectImage"
            />
        </template>
        <template #empty>
            <div
                class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl p-8"
            >
                <div
                    class="text-lg font-semibold text-surface-800 dark:text-surface-200"
                >
                    No files uploaded to this project
                </div>
                <div
                    class="text-sm font-light text-surface-600 dark:text-surface-300"
                >
                    Drag and drop files here or click the upload
                    button
                </div>
                <FileUpload
                    mode="basic"
                    accept="image/*"
                    :chooseLabel="
                        store.t(
                            '@Projects.ProjectFilesGrid.uploadFile',
                        )
                    "
                    @select="onSelectImage"
                />
            </div>
        </template>
        <template #dropzone>
            <div
                class="flex h-48 animate-pulse flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-primary-500 text-primary-500"
            >
                <font-awesome-icon
                    icon="fa-solid fa-upload"
                    size="xl"
                />
                <p>
                    {{
                        store.t(
                            '@Projects.ProjectFilesGrid.dropFiles',
                        )
                    }}
                </p>
            </div>
        </template>
    </Grid>
</template>
