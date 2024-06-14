<script setup>
import Image from 'primevue/image'

import { useGlobalStore } from '@/Stores'

const store = useGlobalStore()

const props = defineProps({
    file: Object,
})
</script>

<template>
    <div
        :draggable="true"
        class="bg-surface-white group relative flex h-[42px] w-full cursor-pointer items-center overflow-hidden rounded-2xl p-4 shadow-sm hover:bg-surface-100 dark:bg-surface-900 dark:hover:bg-surface-700"
        @click="store.files.showFilePreview(file)"
    >
        <Image :draggable="false" :src="file.file_path" width="128" />
    </div>
</template>
