<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        default: null,
    },
});
</script>
<template>
    <header v-if="title || subtitle">
        <div>
            <div class="flex gap-2">
                <div v-if="icon">
                    <span class="material-icons"> {{ icon }}</span>
                </div>
                <div class="font-semibold text-xl">
                    {{ title }}
                </div>
            </div>

            <p
                v-if="subtitle"
                class="mt-1 text-surface-800 dark:text-surface-300"
            >
                {{ subtitle }}
            </p>

            <slot name="subtitle" />
        </div>
    </header>
</template>
