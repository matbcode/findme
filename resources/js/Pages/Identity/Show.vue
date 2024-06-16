<script setup>
import { ref, onMounted } from 'vue'
import { router } from '@inertiajs/vue3'

import Message from 'primevue/message'

import CustomCard from '@/Components/Custom/CustomCard.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import Avatar from '@/Components/Custom/Avatar.vue'
import Logo from '@/Components/Navbar/Logo.vue'

// import MainLayout from '@/Layouts/MainLayout.vue'

// defineOptions({ layout: MainLayout })

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
    <div class="flex justify-center gap-8 bg-white p-2">
        <div class="flex max-w-[800px] flex-col gap-4">
            <Logo />

            <div>
                <div class="flex w-full items-center justify-center">
                    <div class="flex w-full flex-col gap-4">
                        <!-- Person details -->
                        <!-- <div class="flex w-full justify-center"> -->
                        <!-- <Avatar size="300px" :user="identity" /> -->
                        <img
                            :src="'/storage/' + identity.image"
                            class="rounded-xl object-cover shadow-sm"
                        />
                        <!-- </div> -->
                        <CustomCard>
                            <div class="flex flex-col gap-4">
                                <span
                                    class="text-center text-3xl font-semibold text-red-600"
                                >
                                    MISSING PERSON
                                </span>
                                <span
                                    class="font-semibold text-red-600"
                                >
                                    This person was mark as missing.
                                    Please allow your device location
                                    to help us find this person and
                                    contact the authorities or
                                    caregiver who reported this person
                                    as missing.
                                </span>

                                <div class="flex gap-4">
                                    <CustomButton
                                        label="Share location"
                                        icon="fa-solid fa-location-crosshairs"
                                        class="w-full"
                                    />

                                    <CustomButton
                                        label="Call"
                                        icon="fa-solid fa-phone"
                                        class="w-full"
                                        severity="success"
                                        raised
                                    />
                                </div>
                            </div>
                        </CustomCard>
                        <CustomCard>
                            <span class="text-lg">
                                Person details
                            </span>
                            <div class="flex w-full flex-col">
                                <div class="text-sm font-light">
                                    Full name:
                                </div>
                                <div class="">
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
                                <div class="">
                                    {{ identity.date_of_birth }}
                                </div>
                            </div>
                            <div
                                v-if="identity.blood_type"
                                class="flex w-full flex-col"
                            >
                                <div class="text-sm font-light">
                                    Blood type:
                                </div>
                                <div class="">
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
                                <div class="">
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
                                <div class="">
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
                                <div class="">
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
                            ></div>
                        </CustomCard>
                        <CustomCard>
                            <span class="text-lg">
                                Caregiver details
                            </span>
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
                                <div class="">
                                    {{
                                        identity.caregiver_first_name
                                    }}
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
                                <div class="">
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
                                <div class="">
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
                                <div class="">
                                    {{ identity.caregiver_telephone }}
                                </div>
                            </div>

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1190.0974839004116!2d14.642374007399441!3d53.37556094108917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4700a7075be39cff%3A0xf80a242ae45b546d!2sGreen%20Planet!5e0!3m2!1spl!2spl!4v1718543722224!5m2!1spl!2spl"
                                width="100%"
                                height="450"
                                style="border: 0"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </CustomCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
