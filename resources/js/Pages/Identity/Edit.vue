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
import Logo from '@/Components/Navbar/Logo.vue'

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
            value: props.identity.title || 'Ms',
        },
        first_name: {
            name: 'first_name',
            label: 'First name',
            type: 'text',
            value: props.identity.first_name || 'Maria',
            required: true,
        },
        middle_name: {
            name: 'middle_name',
            label: 'Middle name',
            type: 'text',
            value: props.identity.middle_name || 'Luisa',
        },
        last_name: {
            name: 'last_name',
            label: 'Last name',
            type: 'text',
            value: props.identity.last_name || 'Kowalski',
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
            value: props.identity.blood_type || 'O+',
        },
        description: {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            value:
                props.identity.description ||
                'She has dementia and often experiences memory lapses. Maria is missing from her care home in Warsaw since June 10, 2024. She was last seen wearing a blue sweater and black pants. She has a medical bracelet with her name and caregiver contact information. She enjoys crossword puzzles and classical music.',
        },
        allergies: {
            name: 'allergies',
            label: 'Allergies',
            type: 'textarea',
            value:
                props.identity.allergies ||
                'Peanuts, shellfish, and penicillin',
        },
        conditions: {
            name: 'conditions',
            label: 'Conditions',
            type: 'textarea',
            value: props.identity.conditions || 'Dementia',
        },
        date_of_birth: {
            name: 'date_of_birth',
            label: 'Date of birth',
            type: 'Date',
            value: props.identity.date_of_birth || '1960-01-01',
        },
        caregiver_first_name: {
            name: 'caregiver_first_name',
            label: 'Caregiver first name',
            type: 'text',
            value: props.identity.caregiver_first_name || 'John',
        },
        caregiver_last_name: {
            name: 'caregiver_last_name',
            label: 'Caregiver last name',
            type: 'text',
            value: props.identity.caregiver_last_name || 'Doe',
        },
        caregiver_telephone: {
            name: 'caregiver_phone',
            label: 'Caregiver phone',
            type: 'text',
            value:
                props.identity.caregiver_telephone ||
                '+48 123 456 789',
        },
        caregiver_email: {
            name: 'caregiver_email',
            label: 'Caregiver email',
            type: 'email',
            value:
                props.identity.caregiver_email || 'Johndoe@test.uk',
        },
        caregiver_address: {
            name: 'caregiver_address',
            label: 'Caregiver address',
            type: 'text',
            value:
                props.identity.caregiver_address ||
                'Baker Street 221B, London, UK',
        },
    },
})

const onDelete = () => {
    // router.delete(route('identity.delete', props.identity.id))
    store.modals.showConfirm({
        title: 'Delete identity',
        message: 'Are you sure you want to delete this identity?',
        confirmButtonProps: {
            label: 'Delete',
            severity: 'danger',
            icon: 'fa-solid fa-trash',
        },
        onConfirm: () => {
            // store.modals.closeDialog()
            router.delete(route('identity.delete', props.identity.id))
        },
    })
}

const onEditAvatar = () => {
    store.upload.showAvatarUploadModal(props.identity.id)
}

const onShowIdentity = (identity) => {
    router.visit(route('identity.show', { identity }))
}

const onMarkAsMissing = () => {
    const form = useForm({
        ...props.identity,
    })

    form.post(route('identity.update', props.identity.id))
}
</script>
<template>
    <WideWrapper class="p-3 sm:p-4">
        <div class="flex justify-between">
            <Logo />
            <div class="flex gap-2">
                <CustomButton
                    icon="fa-solid fa-eye"
                    rounded
                    @click="onShowIdentity(identity)"
                />
                <CustomButton
                    icon="fa-solid fa-qrcode"
                    rounded
                    @click="onShowIdentity(identity)"
                />
            </div>
        </div>

        <div
            class="flex w-full flex-col items-center justify-center gap-8"
        >
            <div class="flex justify-center">
                <QRCodeVue3
                    :width="300"
                    :height="300"
                    :typeNumber="40"
                    :dotsOptions="{
                        colorDark: '#FF681F',
                        colorLight: '#FF681F',
                    }"
                    :value="`https://locately.uk/id/${identity.id}`"
                />
            </div>

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
        <!-- <h1 class="text-2xl font-semibold text-gray-800">
                Please fill in the details below
            </h1> -->
        <div class="flex justify-center">
            <Avatar
                size="300px"
                :user="identity"
                editable
                rounded
                class="rounded-full border border-4 border-white shadow-2xl"
                @edit="onEditAvatar"
            />
        </div>
        <FormWrapper :formBody class="h-full w-full" />
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1190.0974839004116!2d14.642374007399441!3d53.37556094108917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4700a7075be39cff%3A0xf80a242ae45b546d!2sGreen%20Planet!5e0!3m2!1spl!2spl!4v1718543722224!5m2!1spl!2spl"
            width="100%"
            height="450"
            style="border: 0"
            class="rounded-2xl shadow-2xl"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div class="flex w-full gap-2">
            <CustomButton
                label="Set missing"
                icon="fa-solid fa-person-circle-question"
                severity="warning"
                class="w-full"
                rounded
            />
            <CustomButton
                label="Delete"
                icon="fa-solid fa-trash"
                severity="danger"
                class="w-full"
                rounded
                @click="onDelete"
            />
        </div>
    </WideWrapper>
</template>
