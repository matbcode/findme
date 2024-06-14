<script setup>
import { computed } from "vue";
import { useGlobalStore } from "@/Stores";

import SelectButton from "primevue/selectbutton";

const store = useGlobalStore();

const { setView } = store.calendar;

const value = computed(() =>
    store.calendar.views.find((v) => v.value === store.calendar.view),
);

const onViewChange = (event) => {
    setView(event.value);
};
</script>

<template>
    <SelectButton
        class="min-w-max"
        :modelValue="value"
        :options="store.calendar.views"
        @change="onViewChange"
        :allowEmpty="false"
    >
        <template #option="slotProps">
            <span class="material-icons">{{ slotProps.option.icon }}</span>
        </template>
    </SelectButton>
</template>
