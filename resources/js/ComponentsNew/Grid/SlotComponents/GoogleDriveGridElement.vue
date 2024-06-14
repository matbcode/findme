<script setup>
import { computed } from 'vue'
import { useGlobalStore } from '@/Stores'

import AccountImage from '@/Components/Custom/AccountImage.vue'

const store = useGlobalStore()

const props = defineProps({
    drive: Object,
})

const details = computed(() => {
    return props.drive.google_account
        ? props.drive.google_account
        : null
})
</script>

<template>
    <div
        class="group relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl shadow-sm ease-in-out dark:bg-surface-700 dark:hover:bg-surface-800"
    >
        <AccountImage :image="details.image" />
        <div
            class="absolute bottom-4 text-sm opacity-0 group-hover:opacity-100"
        >
            {{ details.email }}
        </div>
        <font-awesome-icon
            icon="fa-brands fa-google-drive"
            size="lg"
            class="absolute inset-4"
        />
        <div class="absolute right-4 top-4">
            <font-awesome-icon
                icon="fa-solid fa-xmark"
                class="aspect-square cursor-pointer rounded-full bg-surface-950 p-1 text-surface-100 opacity-0 group-hover:opacity-100"
                @click="store.files.disconnectDrive({ drive })"
            />
        </div>
    </div>
</template>
