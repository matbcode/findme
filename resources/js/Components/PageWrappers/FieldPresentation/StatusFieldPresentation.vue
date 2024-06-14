<script setup>
import { computed } from 'vue'
import { useGlobalStore } from '@/Stores'

import tag from 'primevue/tag'

const store = useGlobalStore()
const { getStatus } = store.campaigns

const props = defineProps({
    value: {
        type: String,
        required: true,
    },
})

const status = computed(() => getStatus(props.value))
</script>
<template>
    <div class="w-full">
        <tag
            class="w-full text-xl font-semibold"
            :value="status.title"
            :style="{ background: status.color }"
        />
    </div>
</template>
