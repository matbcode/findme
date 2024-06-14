<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

import QRCodeVue3 from 'qrcode-vue3'
import TextInput from '@/Components/Inputs/TextInput.vue'
import FormWrapper from '@/Components/PageWrappers/FormWrapper.vue'
import CustomCard from '@/Components/Custom/CustomCard.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
import CenteredLayout from '@/Layouts/CenteredLayout.vue'

defineOptions({ layout: MainLayout })

const props = defineProps({
    identity: {
        type: Object,
    },
})

const formBody = ref({
    route: route('identity.update', props.identity.id),
    method: 'patch',
    fields: {
        title: {
            name: 'title',
            label: 'Title',
            type: 'text',
            value: props.identity.title,
        },
        first_name: {
            name: 'first_name',
            label: 'First name',
            type: 'text',
            value: props.identity.first_name,
            required: true,
        },
        middle_name: {
            name: 'middle_name',
            label: 'Middle name',
            type: 'text',
            value: props.identity.middle_name,
        },
        last_name: {
            name: 'last_name',
            label: 'Last name',
            type: 'text',
            value: props.identity.last_name,
        },
        nickname: {
            name: 'nickname',
            label: 'Nickname',
            type: 'text',
            value: props.identity.nickname,
        },
        description: {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            value: props.identity.description,
        },
        date_of_birth: {
            name: 'date_of_birth',
            label: 'Date of birth',
            type: 'Date',
            value: props.identity.date_of_birth,
        },
    },
})

const onDelete = () => {
    router.delete(route('identity.delete', props.identity.id))
}
</script>
<template>
    <CenteredLayout>
        <CustomCard>
            <div class="flex w-full flex-col gap-12">
                <div class="flex justify-between">
                    <CustomButton
                        label="Back"
                        icon="fa-solid fa-arrow-left"
                        @click="router.visit(route('dashboard'))"
                    />
                    <CustomButton
                        icon="fa-solid fa-trash"
                        severity="danger"
                        @click="onDelete"
                    />
                </div>
                <h1 class="text-2xl font-semibold text-gray-800">
                    Please fill in the details below
                </h1>
                <div class="flex w-full justify-center">
                    <QRCodeVue3
                        :width="500"
                        :height="500"
                        :typeNumber="40"
                        :qrOptions="{ errorCorrectionLevel: 'H' }"
                        :dotsOptions="{
                            colorDark: '#000000',
                            colorLight: '#ffffff',
                        }"
                        :value="`https://imlost.co.uk/id/${identity.id}`"
                    />
                </div>

                <FormWrapper :formBody class="w-full" />
            </div>
        </CustomCard>
    </CenteredLayout>
</template>
