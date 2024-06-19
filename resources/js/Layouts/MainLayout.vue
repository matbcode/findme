<script setup>
import DynamicDialog from 'primevue/dynamicdialog'

import ConfirmModal from '@/Components/ConfirmModal.vue'
import FormModal from '@/Components/FormModal.vue'
import CustomToast from '@/ComponentsNew/Global/Toast/CustomToast.vue'
import CustomContextMenu from '@/ComponentsNew/Global/ContextMenu/CustomContextMenu.vue'
import Footer from '@/Components/Footers/Footer.vue'
</script>

<template>
    <ConfirmModal />
    <FormModal />
    <DynamicDialog />
    <CustomToast />
    <CustomContextMenu />
    <div class="flex min-h-screen w-screen justify-center">
        <slot />
    </div>
    <Footer />
</template>
