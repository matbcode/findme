<script setup>
const props = defineProps({
    event: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <div class="w-full p-1">
        <div
            class="event-wrapper border-1 group relative flex cursor-pointer flex-col gap-0.5 rounded-2xl border border-surface-100 bg-white p-3 text-black hover:bg-primary-100 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-50 dark:hover:bg-surface-700"
        >
            <div class="flex justify-between">
                <p class="m-0 truncate">
                    <b>{{ event.title }}</b>
                </p>
            </div>
        </div>
    </div>
</template>
