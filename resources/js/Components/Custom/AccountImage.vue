<script setup>
const props = defineProps({
    image: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <img
        v-if="image"
        :src="'/storage/' + image"
        class="h-[64px] w-[64px] rounded-full"
    />
    <div
        v-else
        class="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-surface-100 text-primary-400 dark:bg-surface-800"
    >
        <font-awesome-icon icon="fa-solid fa-user" size="2x" />
    </div>
</template>
