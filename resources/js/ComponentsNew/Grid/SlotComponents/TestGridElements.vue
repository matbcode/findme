<script setup>
import { computed } from 'vue'
import { useGlobalStore } from '@/Stores'

import Image from 'primevue/image'

const store = useGlobalStore()

const props = defineProps({
    file: Object,
})

const icon = computed(() => {
    const mimeType = props.file.mimeType
    if (mimeType.includes('image')) {
        return 'fa-solid fa-file-image'
    }
    if (mimeType.includes('video')) {
        return 'fa-solid fa-file-video'
    }
    if (mimeType.includes('audio')) {
        return 'fa-solid fa-file-audio'
    }
    if (mimeType.includes('pdf')) {
        return 'fa-solid fa-file-pdf'
    }
    if (mimeType.includes('zip')) {
        return 'fa-solid fa-file-archive'
    }
    if (mimeType.includes('text')) {
        return 'fa-solid fa-file-alt'
    }
    if (mimeType.includes('spreadsheet')) {
        return 'fa-solid fa-file-excel'
    }
    if (mimeType.includes('presentation')) {
        return 'fa-solid fa-file-powerpoint'
    }
    if (mimeType.includes('document')) {
        return 'fa-solid fa-file-word'
    }
    return 'fa-solid fa-file'
})

const fetchFile = ({ onSuccess }) => {
    store.files.fetchGoogleFile({
        drive: { id: 1 },
        file: props.file,
        onSuccess: (response) => {
            let file = new File([response.data], props.file.name, {
                type: props.file.mimeType,
            })

            onSuccess(file)
        },
    })
}

const showFilePreview = (file) => {
    const objectURL = URL.createObjectURL(file)

    store.files.showFilePreview(objectURL)
}
</script>

<template>
    <div
        :draggable="true"
        class="group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-white p-4 shadow-sm hover:bg-surface-100 dark:bg-surface-800 dark:hover:bg-surface-700"
        @click="fetchFile({ onSuccess: showFilePreview })"
        @dragstart="
            store.drag.dragStart($event, {
                type: 'image',
                data: file,
                action: fetchFile,
            })
        "
        @dragend="store.drag.dragEnd"
    >
        <div
            class="absolute bottom-2 left-2 hidden truncate text-xs group-hover:block"
        >
            {{ file.name }}
        </div>
        <Image
            :draggable="false"
            :src="file.thumbnailLink.replace('=s220', '=s400')"
        />
    </div>
</template>
