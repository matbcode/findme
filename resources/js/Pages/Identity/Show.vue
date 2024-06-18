<script setup>
import { ref, onMounted } from 'vue'

import Divider from 'primevue/divider'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import Logo from '@/Components/Navbar/Logo.vue'
import CaregiverInfo from './CaregiverInfo.vue'

const props = defineProps({
    identity: {
        type: Object,
    },
})

const background = ref(null)
const avatar = ref(null)

const isMissingInfoVisible = ref(true)

const onShareLocation = () => {
    console.log('Share location')
    navigator.geolocation.getCurrentPosition(
        () => {
            console.log('Geolocation is available')
        },
        () => {
            console.log('Geolocation is not available')
        },
    )
}

onMounted(() => {
    console.log('Identity:', props.identity)

    // background.value.style.transform = `translateY(-${0 * 0.25}px)`

    // document.addEventListener('scroll', (e) => {
    // background.value.style.transform = `translateY(-${window.scrollY * 0.25}px)`
    // avatar.value.style.transform = `translateY(${window.scrollY * 0.1}px)`
    // })
})
</script>
<template>
    <img
        ref="background"
        id="thumbnail"
        src="https://images.unsplash.com/photo-1617055669577-64245d59b81a?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="background fixed w-screen scale-[1.2]"
    />
    <div
        class="flex flex-col items-center justify-center gap-8 bg-surface-50"
    >
        <div
            v-if="isMissingInfoVisible"
            class="sticky top-0 z-20 flex w-full max-w-screen-xl flex-col gap-8 rounded-3xl bg-red-600 p-4 text-white shadow-2xl"
        >
            <div class="absolute right-2 top-2">
                <CustomButton
                    icon="fa-solid fa-times"
                    rounded
                    text
                    @click="isMissingInfoVisible = false"
                />
            </div>
            <span class="text-center text-xl font-semibold">
                MISSING PERSON
            </span>
            <span>
                This person was mark as missing. Please allow your
                device location to help us find this person and
                contact the authorities or caregiver who reported this
                person as missing.
            </span>

            <div class="flex gap-4">
                <CustomButton
                    label="Share location"
                    icon="fa-solid fa-location-crosshairs"
                    class="w-full"
                    rounded
                    outlined
                    @click="onShareLocation"
                />

                <a
                    :href="`tel:${identity.caregiver_telephone}`"
                    class="w-full"
                >
                    <CustomButton
                        label="Call"
                        icon="fa-solid fa-phone"
                        class="w-full"
                        rounded
                        outlined
                    />
                </a>
            </div>
        </div>

        <div class="flex max-w-screen-xl flex-col gap-4">
            <!-- <div class="m-4">
                <Logo />
            </div> -->

            <div class="relative mt-[20vh] sm:p-4">
                <div
                    class="border-1 min-h-[80vh] rounded-t-2xl bg-white drop-shadow-xl backdrop-blur-[100px] sm:rounded-2xl"
                >
                    <div
                        class="mb-4 flex w-full flex-col items-center justify-center gap-6 p-3 sm:p-4"
                    >
                        <div
                            class="flex w-full flex-col gap-8 pt-[100px]"
                        >
                            <!-- Person details -->
                            <!-- <div class="flex w-full justify-center"> -->
                            <div
                                class="absolute -top-[140px] left-1/2 h-[240px] w-[240px] -translate-x-1/2 overflow-hidden rounded-full border-4 border-white drop-shadow-xl sm:left-8 sm:translate-x-0"
                            >
                                <img
                                    ref="avatar"
                                    :src="
                                        `/storage/` + identity.image
                                    "
                                />
                            </div>

                            <!-- <Avatar
                                size="250px"
                                :user="identity"
                                class="absolute -top-[140px] hidden rounded-full border-4 border-surface-50 bg-surface-50 shadow-2xl sm:block"
                                rounded
                            /> -->

                            <!-- </div> -->

                            <!-- <span class="text-lg">
                                Person details
                            </span> -->
                            <div class="flex w-full flex-col">
                                <!-- <div class="text-sm font-light">
                                    Full name:
                                </div> -->
                                <div class="text-lg font-semibold">
                                    {{ identity.title }}
                                    {{ identity.first_name }}
                                    {{ identity.middle_name }}
                                    {{ identity.last_name }}
                                </div>
                            </div>

                            <div
                                v-if="identity.description"
                                class="flex w-full flex-col"
                            >
                                <div class="font-light">About:</div>
                                <div class="">
                                    {{ identity.description }}
                                </div>
                            </div>

                            <div class="flex justify-center gap-2">
                                <CustomButton
                                    label="Maria Kowalski"
                                    icon="fa-brands fa-facebook"
                                    rounded
                                />
                                <CustomButton
                                    label="maria.12"
                                    icon="fa-brands fa-instagram"
                                    rounded
                                />
                            </div>

                            <div
                                v-if="identity.date_of_birth"
                                class="flex w-full flex-col"
                            >
                                <div class="font-light">
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
                                <div class="font-light">
                                    Blood type:
                                </div>
                                <div class="mt-2 flex gap-2">
                                    <div
                                        class="rounded-full bg-red-500 px-6 py-2 text-white"
                                    >
                                        {{ identity.blood_type }}
                                    </div>
                                </div>
                            </div>

                            <div
                                v-if="identity.conditions"
                                class="flex w-full flex-col"
                            >
                                <div class="font-light">
                                    Conditions:
                                </div>
                                <div class="gap-g mt-2 flex">
                                    <div
                                        v-for="condition in identity.conditions.split(
                                            ',',
                                        )"
                                        class="rounded-full bg-blue-400 px-6 py-2 text-white"
                                    >
                                        {{ condition }}
                                    </div>
                                    <!-- {{ identity.conditions }} -->
                                </div>
                            </div>

                            <div
                                v-if="identity.allergies"
                                class="flex w-full flex-col"
                            >
                                <div class="font-light">
                                    Allergies:
                                </div>
                                <div class="mt-2 flex gap-2">
                                    <div
                                        v-for="allergy in identity.allergies.split(
                                            ',',
                                        )"
                                        class="rounded-full bg-orange-500 px-6 py-2 font-semibold text-white"
                                    >
                                        {{ allergy }}
                                    </div>
                                </div>
                            </div>

                            <Divider />
                            <CaregiverInfo :identity />
                        </div>
                    </div>
                    <div
                        class="flex gap-2 bg-surface-50 p-3 text-sm text-surface-300 sm:p-4"
                    >
                        <div class="flex flex-col gap-2">
                            <Logo width="125px" black />

                            Locately is a platform that helps you find
                            your loved ones

                            <div class="">
                                <span class="font-medium">
                                    Copyright © 2024 NeonByte Ltd
                                </span>
                                All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
