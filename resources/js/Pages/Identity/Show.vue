<script setup>
import { ref, onMounted } from 'vue'

import Divider from 'primevue/divider'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import Logo from '@/Components/Navbar/Logo.vue'
import CaregiverInfo from './CaregiverInfo.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'

import BlockInfo from './BlockInfo.vue'

const props = defineProps({
    identity: {
        type: Object,
    },
})

const background = ref(null)
const avatar = ref(null)

const isMissingInfoVisible = ref(false)

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
        src="https://images.unsplash.com/photo-1586455122341-927f2dec0691?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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

        <WideWrapper>
            <div class="relative mt-[30vh] sm:p-4">
                <div
                    class="border-1 min-h-[70vh] bg-white drop-shadow-xl backdrop-blur-[100px] sm:rounded-2xl"
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
                                class="absolute -top-[140px] left-1/2 h-[240px] w-[240px] -translate-x-1/2 overflow-hidden rounded-full border-4 border-white shadow-2xl sm:left-8 sm:translate-x-0"
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
                            <div
                                class="flex w-full flex-col gap-3 text-center sm:text-left"
                            >
                                <!-- <div class="text-sm font-light">
                                    Full name:
                                </div> -->
                                <div class="text-xl font-semibold">
                                    {{ identity.title }}
                                    {{ identity.first_name }}
                                    {{ identity.middle_name }}
                                    {{ identity.last_name }}
                                </div>

                                <div>
                                    Aspiring
                                    {{
                                        identity.profession ||
                                        'Software Engineer'
                                    }}
                                </div>

                                <div
                                    class="flex justify-center gap-2 sm:justify-start"
                                >
                                    <font-awesome-icon
                                        icon="fa-solid fa-location-dot"
                                        size="xl"
                                    />
                                    <span class="font-semibold">
                                        {{
                                            identity.location ||
                                            'Birmingham, UK'
                                        }}
                                    </span>
                                </div>
                            </div>

                            <div
                                class="flex w-full justify-center gap-2 divide-x divide-surface-100 rounded-2xl bg-surface-50 text-center shadow-xl sm:w-max"
                            >
                                <div class="w-1/3 p-4">
                                    <span
                                        class="text-xl font-semibold"
                                        >12</span
                                    >
                                    <div class="text-surface-300">
                                        Acknowledges
                                    </div>
                                </div>
                                <div class="w-1/3 p-4">
                                    <span
                                        class="text-xl font-semibold"
                                        >30</span
                                    >
                                    <div class="text-surface-300">
                                        Following
                                    </div>
                                </div>
                                <div class="w-1/3 p-4">
                                    <span
                                        class="text-xl font-semibold"
                                        >122</span
                                    >
                                    <div class="text-surface-300">
                                        Followers
                                    </div>
                                </div>
                            </div>

                            <div
                                class="flex justify-center sm:justify-start"
                            >
                                <div
                                    class="flex w-full gap-2 sm:w-1/2 lg:w-1/4"
                                >
                                    <!-- <CustomButton
                                        label="Get in touch"
                                        class="w-full"
                                        outlined
                                    /> -->
                                    <!-- <CustomButton
                                        label="Follow"
                                        class="w-full"
                                        rounded
                                        outlined
                                    /> -->
                                    <CustomButton
                                        label="Follow"
                                        class="w-full"
                                        rounded
                                        outlined
                                    />
                                    <CustomButton
                                        label="Give kudos"
                                        icon="fa-solid fa-thumbs-up"
                                        class="w-full"
                                        severity="info"
                                        rounded
                                        raised
                                    />
                                </div>
                            </div>

                            <Divider />

                            <div
                                v-if="identity.description"
                                class="flex w-full flex-col"
                            >
                                <!-- <div class="font-light">About:</div> -->
                                <div
                                    class=""
                                    style="white-space: pre-line"
                                >
                                    {{ identity.description }}
                                </div>
                            </div>

                            <div class="flex flex-col gap-3">
                                <div class="font-semibold">
                                    Areas for Growth:
                                </div>
                                <div
                                    class="grid grid-cols-1 gap-3 sm:grid-cols-2"
                                >
                                    <BlockInfo
                                        title="🧠 Memory & Information Processing"
                                        description="Issues with short-term memory, information processing, and recalling details."
                                    />
                                    <BlockInfo
                                        title="🎯 Focus & Attention"
                                        description="Problems with maintaining attention and staying focused on tasks over time."
                                    />
                                    <BlockInfo
                                        title="🔄 Cognitive Flexibility"
                                        description="Trouble adapting to changes, rigid thinking, resistance to new experiences."
                                    />
                                    <BlockInfo
                                        title="📚 School or Work Problems"
                                        description="Challenges in educational or professional settings, such as managing tasks or relationships with colleagues."
                                    />
                                </div>
                            </div>

                            <!-- <div
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
                                        class="rounded-full bg-red-500 px-4 py-2 text-sm text-white"
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
                                        class="rounded-full bg-blue-400 px-4 py-2 text-sm text-white"
                                    >
                                        {{ condition }}
                                    </div>
                                </div>
                            </div> -->

                            <div
                                v-if="identity.allergies"
                                class="flex w-full flex-col"
                            >
                                <div class="font-semibold">
                                    Allergies:
                                </div>
                                <div class="mt-2 flex flex-col gap-3">
                                    <!-- <div
                                        v-for="allergy in identity.allergies.split(
                                            ',',
                                        )"
                                        class="rounded-full bg-orange-500 px-4 py-2 text-sm text-white"
                                    >
                                        {{ allergy }}
                                    </div> -->
                                    <BlockInfo
                                        title="🍎 Food Allergies"
                                        description="Allergic reactions to specific foods or food ingredients."
                                        example="Peanuts, shellfish, milk, eggs."
                                    />
                                    <BlockInfo
                                        title="💊 Medication Allergies"
                                        description="Adverse reactions to specific medications or drug classes."
                                        example="Penicillin, aspirin, sulfa drugs."
                                    />
                                    <BlockInfo
                                        title="🌿 Environmental Allergies"
                                        description="Sensitivity to environmental factors, such as pollen, dust, or pet dander."
                                        example="Pollen, dust mites, pet dander."
                                    />
                                    <BlockInfo
                                        title="🐝 Insect Allergies"
                                        description="Allergic reactions to insect bites or stings."
                                        example="Bees, wasps, fire ants."
                                    />
                                </div>
                            </div>

                            <div class="flex w-full flex-col gap-4">
                                <div class="font-semibold">
                                    Socials:
                                </div>
                                <div class="flex gap-2">
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
                            </div>

                            <Divider />

                            <CustomButton
                                label="Get in touch"
                                class="w-full"
                                icon="fa-solid fa-envelope"
                                rounded
                                severity="success"
                            />

                            <!-- <CaregiverInfo :identity /> -->
                        </div>
                    </div>
                    <div
                        class="flex gap-2 bg-surface-50 p-3 text-sm text-surface-300 sm:p-4"
                    >
                        <div class="flex flex-col gap-3">
                            <Logo width="125px" black />

                            A social platform for sharing, connecting,
                            and celebrating the creativity and
                            insights of diverse thinkers.

                            <div class="text-xs">
                                <span class="font-medium">
                                    Copyright © 2024 NeonByte Ltd
                                </span>
                                All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WideWrapper>
    </div>
</template>
