<script setup>
import { useGlobalStore } from '@/Stores'

import FormWrapper from '@/Components/PageWrappers/FormWrapper.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n({})

const store = useGlobalStore()
const { showToast, showFormModal } = store.modals

const formBody = {
    method: 'delete',
    fields: {
        warning: {
            type: 'inlinemessage',
            props: {
                included: false,
                severity: 'error',
                text: t('@Profile.DeleteAccount.subtitle'),
            },
        },
        password: {
            type: 'password',
            props: {
                name: 'password',
                placeholder: 'Type your password to confirm',
                required: true,
                autofocus: true,
            },
        },
    },
    route: route('profile.destroy'),
    options: {
        preserveScroll: true,
        onError: () => {
            showToast({
                summary: 'Error',
                severity: 'error',
                detail: t('@Profile.DeleteAccount.error'),
            })
        },
    },
}

const buttonProps = {
    icon: 'pi pi-trash',
    severity: 'danger',
    label: t('@Profile.DeleteAccount.confirmButtonLabel'),
}

const onDelete = () => {
    showFormModal({
        title: t('@Profile.DeleteAccount.title'),
        icon: 'pi pi-exclamation-triangle',
        formBody,
        formExtendedProps: {
            confirmButtonProps: buttonProps,
            cancelButtonProps: {
                class: 'hidden',
            },
        },
    })
}
</script>

<template>
    <FormWrapper
        :title="t('@Profile.DeleteAccount.title')"
        :subtitle="t('@Profile.DeleteAccount.subtitle')"
        icon="delete"
        :formBody="formBody"
        :confirmButtonProps="buttonProps"
    >
        <CustomButton
            label="Delete this account"
            size="small"
            severity="danger"
            icon="delete"
            class="w-full"
            @click="onDelete"
        />
    </FormWrapper>
</template>
