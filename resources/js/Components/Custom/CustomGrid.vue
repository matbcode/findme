<script setup>
import { ref } from "vue";

import DataView from "primevue/dataview";

import SectionHeader from "@/Components/PageWrappers/SectionHeader.vue";

const props = defineProps({
    /**
     * Array of items to be displayed
     */
    value: {
        type: Array,
        required: true,
    },
    /**
     * Props to be passed to the SectionHeader component
     */
    headerProps: {
        type: Object,
        default: () => ({}),
    },
    /**
     * Message to be displayed when the collection is empty
     */
    emptyMessage: {
        type: String,
        default: "No records found",
    },
    /**
     * Component to be used for the list layout
     */
    listComponent: {
        type: Object,
        default: () => ({}),
    },
    /**
     * Component to be used for the grid layout
     */
    gridComponent: {
        type: Object,
        default: () => ({}),
    },
    /**
     * Props to be passed to the list/grid component
     */
    bindProps: {
        type: Object,
        default: () => ({}),
    },
    /**
     * Events to be passed to the list/grid component
     */
    bindEvents: {
        type: Object,
        default: () => ({}),
    },
    /**
     * Name of the prop to be passed to the list/grid component
     */
    itemPropsName: {
        type: String,
        default: "item",
    },
});

const layout = ref("grid");
</script>
<template>
    <DataView :value :layout :paginator="value.length > 6" :rows="6">
        <template #header>
            <SectionHeader v-bind="headerProps" />
        </template>

        <template #list="slotProps">
            <div class="flex flex-wrap">
                <div
                    v-for="(item, index) in slotProps.items"
                    :key="index"
                    class="w-full p-3"
                >
                    <component
                        :is="listComponent"
                        :[itemPropsName]="item"
                        v-bind="bindProps"
                        v-on="bindEvents"
                    />
                </div>
            </div>
        </template>

        <template #grid="slotProps">
            <div class="@container flex flex-wrap gap-0">
                <div
                    v-for="(item, index) in slotProps.items"
                    :key="index"
                    class="w-full h-[400px] p-3 @2xl:w-6/12 @4xl:w-4/12"
                >
                    <component
                        :is="gridComponent"
                        :[itemPropsName]="item"
                        v-bind="bindProps"
                        v-on="bindEvents"
                    />
                </div>
            </div>
        </template>
    </DataView>
</template>
