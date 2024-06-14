<script setup>
import Image from 'primevue/image'

import { useGlobalStore } from '@/Stores'

import TileWrapper from '@/Components/TileWrapper.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'

const store = useGlobalStore()

const props = defineProps({
    file: Object,
})
</script>

<template>
    <TileWrapper>
        <div
            :draggable="true"
            class="h-full w-full overflow-hidden"
            @click="store.files.showFilePreview(file)"
            @dragstart="
                store.drag.dragStart($event, {
                    type: 'image',
                    data: file,
                })
            "
            @dragend="store.drag.dragEnd"
            :style="{
                backgroundImage: `url(/storage/${file.filename})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }"
        ></div>
        <template #actions>
            <CustomButton
                icon="fa-solid fa-trash"
                class="opacity-0 group-hover:opacity-100"
                text
                severity="danger"
                @click="store.files.deleteFile(file)"
            />
        </template>
        <template #details>
            <div class="p-2">
                <font-awesome-icon icon="fa-solid fa-file-image" />
            </div>
        </template>
        <template #footer>
            {{ file.original_filename }}
        </template>
    </TileWrapper>
</template>
