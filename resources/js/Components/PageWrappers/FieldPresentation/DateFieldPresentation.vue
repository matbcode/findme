<script setup>
import { useGlobalStore } from "@/Stores";

const store = useGlobalStore();
const { getFormattedDate } = store.user;

const props = defineProps({
    value: {
        type: String,
        required: true,
    },
});
</script>
<template>
    <div class="text-xl font-semibold">
        {{ getFormattedDate(value) }}
    </div>
</template>
