<script setup>
import FormWrapper from "./FormWrapper.vue";

const props = defineProps({
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    formBody: {
        type: Object,
        default: null,
    },
    tags: {
        type: Array,
        default: () => [],
    },
});
</script>

<template>
    <div id="header">
        <FormWrapper v-bind="props" />
    </div>
</template>
