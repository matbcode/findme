<script setup>
const props = defineProps(['notification'])
</script>

<template>
    <div class="flex items-center gap-2 text-primary-100">
        <div
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-surface-800"
        >
            <font-awesome-icon icon="fa-solid fa-check" />
        </div>
        {{ notification.data.message }}
    </div>
</template>
