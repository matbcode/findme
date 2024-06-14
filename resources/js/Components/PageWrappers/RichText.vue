<script setup>
import { computed } from 'vue'

const props = defineProps({
    description: {
        type: String,
        default: null,
    },
})
</script>

<template>
    <div v-if="description">
        <div
            class="prose dark:prose-invert"
            v-sanitize.basic="description"
        ></div>
    </div>
</template>
