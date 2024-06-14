<script setup>
const props = defineProps({
    isNavVisible: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div class="flex min-h-screen flex-col gap-0">
        <slot />
    </div>
</template>
