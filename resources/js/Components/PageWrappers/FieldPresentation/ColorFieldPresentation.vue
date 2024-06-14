<script setup>
const props = defineProps({
    value: {
        type: String,
        required: true,
    },
})
</script>
<template>
    <div
        class="h-8 w-8 rounded-2xl"
        :style="{ background: value }"
    ></div>
</template>
