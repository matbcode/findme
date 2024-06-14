<script setup>
const props = defineProps({
    platform: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <div
        class="flex w-full gap-8 rounded-md px-8 text-sm dark:text-surface-300"
    >
        <div class="h-12 w-12 rounded-full">
            <font-awesome-icon :icon="platform.icon" size="4x" />
        </div>
        <div>
            <div class="text-lg">{{ platform.name }}</div>
            <div>
                {{ platform.longDescription }}
            </div>
        </div>
    </div>
</template>
