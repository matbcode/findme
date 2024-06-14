<script setup>
const props = defineProps({
    shortcut: String,
})
</script>

<template>
    <span
        class="mx-1 rounded bg-surface-100 p-1 dark:border-surface-600 dark:bg-surface-900"
        >{{ shortcut }}</span
    >
</template>
