<script setup>
import { useGlobalStore } from '@/Stores'

import FormWrapper from '@/Components/PageWrappers/FormWrapper.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n({})

const store = useGlobalStore()
const { showToast, showFormModal } = store.modals

const formBody = {
    method: 'put',
    fields: {
        current_password: {
            value: '',
            type: 'password',
        },
        password: {
            value: '',
            type: 'password',
        },
        password_confirmation: {
            value: '',
            type: 'password',
        },
    },
    route: route('password.update'),
    options: {
        preserveScroll: true,
        onSuccess: () => {
            form.reset()
            showToast({
                summary: 'Success',
                severity: 'success',
                detail: t('@Profile.UpdatePassword.success'),
            })
        },
        onError: () => {
            showToast({
                summary: 'Error',
                severity: 'error',
                detail: t('@Profile.UpdatePassword.error'),
            })
        },
    },
}

const onUpdatePassword = () => {
    showFormModal({
        title: 'Confirm',
        message: 'Are you sure you want to update your password?',
        formBody,
        formExtendedProps: {
            confirmButtonProps: {
                label: 'Update password',
                icon: 'pi pi-check',
            },
            cancelButtonProps: {
                label: 'Clear',
                icon: 'pi pi-times',
                class: 'hidden',
            },
        },
    })
}
</script>

<template>
    <FormWrapper
        :title="t('@Profile.UpdatePassword.title')"
        :subtitle="t('@Profile.UpdatePassword.subtitle')"
        icon="vpn_key"
        :formBody="formBody"
        :confirmButtonProps="{
            label: $t('@Profile.UpdatePassword.confirmButtonLabel'),
            icon: 'pi pi-check',
        }"
    >
        <CustomButton
            label="Change password"
            icon="edit"
            size="small"
            class="w-full"
            @click="onUpdatePassword"
        />
    </FormWrapper>
</template>
