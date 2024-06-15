<script setup>
import { ref } from 'vue'
import { router, useForm } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import QRCodeVue3 from 'qrcode-vue3'
import FormWrapper from '@/Components/PageWrappers/FormWrapper.vue'
import CustomCard from '@/Components/Custom/CustomCard.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import Avatar from '@/Components/Custom/Avatar.vue'

import MainLayout from '@/Layouts/MainLayout.vue'

const store = useGlobalStore()

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
        blood_type: {
            name: 'blood_type',
            label: 'Blood type',
            type: 'text',
            value: props.identity.blood_type,
        },
        description: {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            value: props.identity.description,
        },
        allergies: {
            name: 'allergies',
            label: 'Allergies',
            type: 'textarea',
            value: props.identity.allergies,
        },
        conditions: {
            name: 'conditions',
            label: 'Conditions',
            type: 'textarea',
            value: props.identity.conditions,
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

const onEditAvatar = () => {
    store.upload.showAvatarUploadModal(props.identity.id)
}

const onMarkAsMissing = () => {
    const form = useForm({
        ...props.identity,
    })

    form.post(route('identity.update', props.identity.id))
}
</script>
<template>
    <WideWrapper>
        <div class="flex w-full flex-col gap-12">
            <div class="flex justify-between">
                <CustomButton
                    label="Back"
                    icon="fa-solid fa-arrow-left"
                    @click="router.visit(route('dashboard'))"
                />
                <div class="flex gap-2">
                    <CustomButton
                        icon="fa-solid fa-person-circle-question"
                        severity="warning"
                        label="Mark as missing"
                        @click="onDelete"
                    />
                    <CustomButton
                        icon="fa-solid fa-trash"
                        severity="danger"
                        @click="onDelete"
                    />
                </div>
            </div>

            <div
                class="flex w-full flex-col items-center justify-center gap-8"
            >
                <QRCodeVue3
                    :width="500"
                    :height="500"
                    :typeNumber="40"
                    :qrOptions="{ errorCorrectionLevel: 'H' }"
                    :dotsOptions="{
                        colorDark: '#000000',
                        colorLight: '#ffffff',
                    }"
                    :value="`https://findme.neonbyte.co.uk/id/${identity.id}`"
                />
                <!-- <GMapMap
                        :center="center"
                        :zoom="7"
                        map-type-id="terrain"
                        style="width: 500px; height: 300px"
                    >
                        <GMapCluster>
                            <GMapMarker
                                :key="index"
                                v-for="(m, index) in markers"
                                :position="m.position"
                                :clickable="true"
                                :draggable="true"
                                @click="center = m.position"
                            />
                        </GMapCluster>
                    </GMapMap> -->
            </div>
            <h1 class="text-2xl font-semibold text-gray-800">
                Please fill in the details below
            </h1>
            <Avatar
                size="120px"
                :user="identity"
                editable
                @edit="onEditAvatar"
            />
            <FormWrapper :formBody class="h-full w-full" />
        </div>
    </WideWrapper>
</template>
