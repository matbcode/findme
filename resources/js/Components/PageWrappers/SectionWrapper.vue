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
    actions: {
        type: Array,
    },
});
</script>
<template>
    <section>
        <header v-bind="$props" />
        <form class="mt-6 space-y-6">
            <slot />
        </form>
    </section>
</template>
