<script setup>
const props = defineProps({
    platform: Object,
})
</script>

<template>
    <div
        class="flex w-full items-center gap-8 rounded-2xl border border-surface-500/40 p-4"
    >
        <div class="h-12 w-12 rounded-full">
            <img
                :src="platform.icon"
                alt="platform image"
                class="h-12 w-12 fill-current"
            />
        </div>
        <div>
            <div class="text-xl">{{ platform.name }}</div>
            <div>{{ platform.description }}</div>
        </div>
    </div>
</template>
