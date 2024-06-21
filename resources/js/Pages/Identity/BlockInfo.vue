<script setup>
import { computed } from 'vue'

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
    danger: {
        type: Boolean,
        default: false,
    },
})

const classes = computed(() => {
    return {
        'flex w-full flex-col gap-3 rounded-xl p-3 bg-surface-50': true,
        // 'border border-2 border-red-500': props.danger,
    }
})
</script>
<template>
    <div :class="classes">
        <span class="font-semibold">
            {{ title }}
        </span>
        <span class="pre-line whitespace-pre-line text-sm">
            {{ description }}
        </span>
        <div v-if="example" class="text-sm font-light">
            <span class="font-semibold">examples:</span>
            {{ example }}
        </div>
    </div>
</template>
