<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    example: {
        type: String,
    },
})
</script>
<template>
    <div
        class="flex w-full flex-col gap-2 rounded-xl bg-surface-50 p-3"
    >
        <span class="font-semibold">
            {{ title }}
        </span>
        <span class="text-sm">
            {{ description }}
        </span>
        <div v-if="example" class="text-sm font-light">
            <span class="font-semibold">examples:</span>
            {{ example }}
        </div>
    </div>
</template>
