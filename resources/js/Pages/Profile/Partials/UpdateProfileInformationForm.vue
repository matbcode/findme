<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePage } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import FormWrapper from '@/Components/PageWrappers/FormWrapper.vue'
import Avatar from '@/Components/Custom/Avatar.vue'
import SectionHeader from '@/Components/PageWrappers/SectionHeader.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n({})

const store = useGlobalStore()
const { theme, timezones } = storeToRefs(store.user)
const { showAvatarUploadModal } = store.upload

const user = usePage().props.auth.user

const formBody = {
    method: 'patch',
    route: route('profile.update'),
    i18nKeyPrefix: '@Profile.-.',
    fields: {
        email: {
            value: user.email,
            type: 'email',
            props: {
                disabled: true,
            },
        },
        username: {
            value: user.username,
            type: 'text',
        },
        first_name: {
            value: user.first_name,
            type: 'text',
        },
        last_name: {
            value: user.last_name,
            type: 'text',
        },
        phone_number: {
            value: user.phone_number,
            type: 'text',
        },
        timezone: {
            value: user.timezone,
            type: 'dropdown',
            hint: 'Set your local timezone to ensure the calendar displays events in your local time',
            props: {
                options: timezones.value,
                optionValue: 'id',
                filter: true,
            },
        },
        // disabled until we have a proper i18n implementation
        locale: {
            value: user.locale,
            type: 'selectbutton',
            props: {
                options: store.user.locales,
            },
            hidden: true,
        },
        theme: {
            value: theme.value,
            type: 'selectbutton',
            props: {
                options: [
                    {
                        label: 'Light',
                        value: 'light',
                    },
                    {
                        label: 'Dark',
                        value: 'dark',
                    },
                ],
            },
        },
    },
    confirmButtonProps: {
        label: t('@Profile.EditProfile.confirmButtonLabel'),
        icon: 'fa-solid fa-check',
    },
}

const onAvatarClicked = () =>
    showAvatarUploadModal({
        image: user.image_path,
    })
</script>

<template>
    <Avatar
        :user="user"
        size="80px"
        :editable="true"
        showName
        @edit="onAvatarClicked"
    />
    <FormWrapper
        icon="account_circle"
        :formBody="formBody"
        :confirmButtonProps="formBody.confirmButtonProps"
    />
</template>
