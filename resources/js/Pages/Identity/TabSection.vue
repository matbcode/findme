<script setup>
import { ref } from 'vue'

import SelectButton from 'primevue/selectbutton'

const props = defineProps({
    tabs: {
        type: Array,
        required: true,
    },
    initialTab: {
        type: String,
        default: null,
    },
})

const activeTab = ref(props.initialTab || props.tabs[0])
</script>

<template>
    <div class="flex flex-col gap-8">
        <SelectButton v-model="activeTab" :options="tabs">
            <template #option="{ option }">
                <div
                    class="flex w-full items-center justify-center gap-2 text-center text-sm font-semibold"
                >
                    <span>{{ option.label }}</span>
                </div>
            </template>
        </SelectButton>

        <template v-for="tab in tabs" :key="tab">
            <div v-if="tab.id === activeTab.id">
                <slot :name="tab.id" />
            </div>
        </template>
    </div>
</template>
