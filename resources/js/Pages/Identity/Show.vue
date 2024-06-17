<script setup>
import { ref, onMounted } from 'vue'

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

const isMissingInfoVisible = ref(false)

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

    background.value.style.transform = `translateY(-${0 * 0.25}px)`

    document.addEventListener('scroll', (e) => {
        background.value.style.transform = `translateY(-${window.scrollY * 0.25}px)`
        avatar.value.style.transform = `translateY(${window.scrollY * 0.1}px)`
    })
})
</script>
<template>
    <img
        ref="background"
        id="thumbnail"
        src="https://images.unsplash.com/photo-1559762717-99c81ac85459?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="background fixed w-screen scale-[1.2]"
    />
    <div class="flex flex-col items-center justify-center gap-8">
        <div
            v-if="isMissingInfoVisible"
            class="sticky top-0 z-20 flex flex-col gap-4 bg-red-600 p-4 text-white shadow-2xl"
        >
            <div class="absolute right-2 top-2">
                <CustomButton
                    icon="fa-solid fa-times"
                    rounded
                    outlined
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
                />

                <CustomButton
                    label="Call"
                    icon="fa-solid fa-phone"
                    class="w-full"
                    rounded
                    outlined
                />
            </div>
        </div>

        <div class="flex max-w-screen-lg flex-col gap-4">
            <!-- <div class="m-4">
                <Logo />
            </div> -->

            <div class="relative mt-[30vh] lg:mb-8">
                <div
                    class="border-1 min-h-[70vh] rounded-2xl border border-2 border-white/50 bg-white/90 p-2 shadow-xl backdrop-blur-3xl sm:p-4"
                >
                    <div
                        class="flex w-full items-center justify-center"
                    >
                        <div class="flex w-full flex-col gap-8 pt-32">
                            <!-- Person details -->
                            <!-- <div class="flex w-full justify-center"> -->
                            <div
                                class="absolute -top-[140px] left-1/2 h-[250px] w-[250px] -translate-x-1/2 overflow-hidden rounded-full border-4 border-surface-50 bg-surface-50 shadow-2xl"
                            >
                                <img
                                    ref="avatar"
                                    :src="
                                        `/storage/` + identity.image
                                    "
                                />
                            </div>
                            <!-- 
                            <Avatar
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
                                <div class="text-sm font-light">
                                    About:
                                </div>
                                <div class="">
                                    {{ identity.description }}
                                </div>
                            </div>

                            <!-- <div class="flex gap-4">
                                <CustomButton
                                    label="Maria Kowalski"
                                    icon="fa-brands fa-facebook"
                                    rounded
                                    @click="
                                        isMissingInfoVisible = true
                                    "
                                />
                                <CustomButton
                                    label="maria.12"
                                    icon="fa-brands fa-instagram"
                                    rounded
                                    @click="
                                        isMissingInfoVisible = true
                                    "
                                />
                            </div> -->

                            <!-- <div
                                v-if="identity.date_of_birth"
                                class="flex w-full flex-col"
                            >
                                <div class="text-sm font-light">
                                    Date of birth:
                                </div>
                                <div class="">
                                    {{ identity.date_of_birth }}
                                </div>
                            </div> -->

                            <div
                                v-if="identity.blood_type"
                                class="flex w-full flex-col"
                            >
                                <div class="text-sm font-light">
                                    Blood type:
                                </div>
                                <div class="mt-2 flex gap-2">
                                    <div
                                        class="rounded-full bg-red-500 px-3 py-1 font-semibold text-white"
                                    >
                                        {{ identity.blood_type }}
                                    </div>
                                </div>
                            </div>

                            <div
                                v-if="identity.conditions"
                                class="flex w-full flex-col"
                            >
                                <div class="text-sm font-light">
                                    Conditions:
                                </div>
                                <div class="gap-g mt-2 flex">
                                    <div
                                        v-for="condition in identity.conditions.split(
                                            ',',
                                        )"
                                        class="rounded-full bg-orange-400 px-3 py-1 font-semibold text-white"
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
                                <div class="text-sm font-light">
                                    Allergies:
                                </div>
                                <div class="mt-2 flex gap-2">
                                    <div
                                        v-for="allergy in identity.allergies.split(
                                            ',',
                                        )"
                                        class="rounded-full bg-red-500 px-3 py-1 font-semibold text-white"
                                    >
                                        {{ allergy }}
                                    </div>
                                </div>
                            </div>

                            <!-- <Divider /> -->
                            <CaregiverInfo :identity />
                            <!-- <Divider /> -->

                            <Logo />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
