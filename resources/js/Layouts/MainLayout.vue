<script setup>
import DynamicDialog from 'primevue/dynamicdialog'
import Dialog from 'primevue/dialog'

import GuestLayout from '@/Layouts/GuestLayout.vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
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
    <AuthenticatedLayout>
        <div class="min-h-screen">
            <slot />
        </div>
    </AuthenticatedLayout>
    <Footer />
</template>
