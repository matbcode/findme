<script setup>
import { ref, onMounted } from 'vue'
import { router } from '@inertiajs/vue3'

import Message from 'primevue/message'

import CustomCard from '@/Components/Custom/CustomCard.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import Avatar from '@/Components/Custom/Avatar.vue'

import MainLayout from '@/Layouts/MainLayout.vue'

defineOptions({ layout: MainLayout })

const props = defineProps({
    identity: {
        type: Object,
    },
})

onMounted(() => {
    console.log('Identity:', props.identity)
    navigator.geolocation.getCurrentPosition(
        () => {
            console.log('Geolocation is available')
        },
        () => {
            console.log('Geolocation is not available')
        },
    )
})
</script>
<template>
    <WideWrapper>
        <div
            class="rounded-2xl p-4 outline outline-4 outline-red-500"
        >
            <Message severity="warn">
                <span class="text-2xl">
                    This person was mark as missing. Please allow your
                    device location to help us find this person and
                    contact the authorities or caregiver who reported
                    this person as missing.
                </span>
            </Message>
            <div class="flex w-full items-center justify-center">
                <div class="flex w-full flex-col gap-4">
                    Person details
                    <Avatar size="300px" :user="identity" />

                    <div class="flex w-full items-center gap-4">
                        <div class="flex w-full flex-col">
                            <div class="text-sm font-light">
                                Full name:
                            </div>
                            <div class="text-xl font-semibold">
                                {{ identity.title }}
                                {{ identity.first_name }}
                                {{ identity.middle_name }}
                                {{ identity.last_name }}
                            </div>
                        </div>
                        <div
                            v-if="identity.date_of_birth"
                            class="flex w-full flex-col"
                        >
                            <div class="text-sm font-light">
                                Date of birth:
                            </div>
                            <div class="text-xl font-semibold">
                                {{ identity.date_of_birth }}
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="identity.blood_type"
                        class="flex w-full flex-col"
                    >
                        <div class="text-sm font-light">
                            Blood type:
                        </div>
                        <div
                            class="text-2xl font-semibold text-red-500"
                        >
                            {{ identity.blood_type }}
                        </div>
                    </div>
                    <div
                        v-if="identity.description"
                        class="flex w-full flex-col"
                    >
                        <div class="text-sm font-light">
                            Description:
                        </div>
                        <div class="text-2xl font-semibold">
                            {{ identity.description }}
                        </div>
                    </div>

                    <div
                        v-if="identity.conditions"
                        class="flex w-full flex-col"
                    >
                        <div class="text-sm font-light">
                            Conditions:
                        </div>
                        <div class="text-2xl font-semibold">
                            {{ identity.conditions }}
                        </div>
                    </div>

                    <div
                        v-if="identity.allergies"
                        class="flex w-full flex-col"
                    >
                        <div class="text-sm font-light">
                            Allergies:
                        </div>
                        <div class="text-2xl font-semibold">
                            {{ identity.allergies }}
                        </div>
                    </div>

                    <div
                        v-if="
                            identity.caregiver_first_name ||
                            identity.caregiver_last_name ||
                            identity.caregiver_address ||
                            identity.caregiver_email ||
                            identity.caregiver_telephone
                        "
                    >
                        <span class="text-4xl">
                            Caregiver details:
                        </span>
                    </div>
                    <CustomCard>
                        <div
                            v-if="
                                identity.caregiver_first_name ||
                                identity.caregiver_last_name
                            "
                            class="flex w-full flex-col"
                        >
                            <div class="text-sm font-light">
                                Full name:
                            </div>
                            <div class="text-2xl font-semibold">
                                {{ identity.caregiver_first_name }}
                                {{ identity.caregiver_last_name }}
                            </div>
                        </div>

                        <div
                            v-if="identity.caregiver_address"
                            class="flex w-full flex-col"
                        >
                            <div class="text-sm font-light">
                                Address
                            </div>
                            <div class="text-2xl font-semibold">
                                {{ identity.caregiver_address }}
                            </div>
                        </div>

                        <div
                            v-if="identity.caregiver_email"
                            class="flex w-full flex-col"
                        >
                            <div class="text-sm font-light">
                                E-mail
                            </div>
                            <div class="text-2xl font-semibold">
                                {{ identity.caregiver_email }}
                            </div>
                        </div>

                        <div
                            v-if="identity.caregiver_telephone"
                            class="flex w-full flex-col"
                        >
                            <div class="text-sm font-light">
                                Telephone
                            </div>
                            <div class="text-2xl font-semibold">
                                {{ identity.caregiver_telephone }}
                            </div>
                        </div>
                    </CustomCard>
                </div>
            </div>
        </div>
    </WideWrapper>
</template>
