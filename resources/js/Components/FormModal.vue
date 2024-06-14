<script setup>
import { useGlobalStore } from "@/Stores";

import Dialog from "primevue/dialog";
import FormWrapper from "@/Components/PageWrappers/FormWrapper.vue";
import FormHeader from "@/Components/PageWrappers/FormHeader.vue";

const store = useGlobalStore();
</script>

<template>
    <Dialog
        :visible="store.modals.isFormOpen"
        :style="{ width: '40rem', maxHeight: '85vh' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        modal
        blockScroll
        dismissableMask
        :draggable="false"
        v-bind="store.modals.formModalInfo.modalExtendedProps"
        @update:visible="store.modals.formModalInfo.onUpdateVisibility"
    >
        <template #header>
            <FormHeader
                :title="store.modals.formModalInfo.title"
                :subtitle="store.modals.formModalInfo.subtitle"
            />
        </template>
        <FormWrapper
            :showHeader="false"
            :formBody="store.modals.formModalInfo.formBody"
            showButtons="always"
            @submit="store.modals.formModalInfo.onConfirm"
            class="m-4"
            v-bind="store.modals.formModalInfo.formExtendedProps"
        />
    </Dialog>
</template>
