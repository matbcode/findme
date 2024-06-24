<script setup>
import CaregiverInfo from './CaregiverInfo.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'

import MissingPersonDialog from './MissingPersonDialog.vue'
import DefaultProfileAdditionalInfo from './DefaultProfileAdditionalInfo.vue'
import ProfileConditions from './ProfileConditions.vue'
import PublicFooter from './PublicFooter.vue'
import ProfileInfo from './ProfileInfo.vue'
import Divider from 'primevue/divider'

import CustomButton from '@/Components/Custom/CustomButton.vue'

const props = defineProps({
    identity: {
        type: Object,
    },
})
</script>
<template>
    <img
        ref="background"
        id="thumbnail"
        src="https://images.unsplash.com/photo-1586455122341-927f2dec0691?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="background fixed w-screen bg-cover"
    />
    <!-- <img
        ref="background"
        id="thumbnail"
        src="https://images.unsplash.com/photo-1614330315526-166f2d71e544?q=80&w=2188&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="background fixed w-screen bg-cover"
    /> -->
    <!-- <iframe
        src="https://my.spline.design/untitled-15c042768578dad5afac7ab0dfb01c20/"
        frameborder="0"
        width="100%"
        height="100%"
        class="background absolute h-screen w-screen bg-cover"
    ></iframe> -->
    <div
        class="flex min-h-screen flex-col items-center justify-center gap-8 bg-black"
    >
        <WideWrapper v-if="identity.nickname === 'missing'">
            <div class="relative sm:p-4">
                <div
                    class="border-1 bg-white shadow-2xl sm:rounded-2xl"
                >
                    <div
                        class="mb-4 flex w-full flex-col items-center justify-center gap-6 p-3 sm:p-4"
                    >
                        <div class="] flex w-full flex-col gap-8">
                            <ProfileInfo :identity alternativeMode>
                                <MissingPersonDialog
                                    :identity
                                    :visible="true"
                                />
                            </ProfileInfo>

                            <div
                                class="flex gap-4 rounded-2xl bg-surface-50 p-4 font-semibold"
                            >
                                Before you proceed with help, please
                                make sure to read the following
                                information carefully.
                            </div>

                            <ProfileConditions />

                            <CaregiverInfo :identity />
                        </div>
                    </div>
                    <PublicFooter />
                </div>
            </div>
        </WideWrapper>

        <WideWrapper v-else-if="identity.nickname === 'item'">
            <div class="relative sm:p-4">
                <div
                    class="border-1 flex min-h-screen flex-col justify-between bg-white shadow-2xl sm:rounded-2xl"
                >
                    <div
                        class="mb-4 flex w-full flex-col items-center justify-center gap-8 p-3 sm:p-4"
                    >
                        <div class="flex w-full flex-col gap-8">
                            <div class="mt-12 flex justify-center">
                                <div
                                    class="max-h-[300px] max-w-[300px] overflow-hidden rounded-full shadow-2xl outline outline-4 outline-white"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1614330315526-166f2d71e544?q=80&w=2188&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        class="aspect-square object-cover"
                                    />
                                </div>
                            </div>

                            <div>
                                <div class="flex flex-col gap-2">
                                    <div
                                        class="flex flex-col gap-2 text-center text-xl font-semibold"
                                    >
                                        Brown leather wallet
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <span
                                            >This wallet contains
                                            identification cards and
                                            money.</span
                                        >
                                    </div>
                                </div>
                            </div>

                            <div class="">
                                Hi, if you found this item, please
                                contact me at the following number:
                                <a
                                    href="tel:+447123456789"
                                    class="text-blue-500"
                                    >+44 7123 456 789</a
                                >

                                I will offer a reward for finding and
                                returning this item.
                            </div>

                            <ProfileInfo
                                :identity
                                alternativeMode
                                hideDetails
                            />

                            <div
                                class="sticky flex flex-col gap-4 rounded-2xl bg-surface-100 p-3"
                            >
                                <div
                                    class="text-center text-xl font-semibold"
                                >
                                    LOST ITEM
                                </div>
                                <div>
                                    This item might be lost. Please
                                    help us find the owner, by sharing
                                    the location where you found it.
                                    Or by calling the owner.
                                </div>

                                <div
                                    class="flex items-center gap-3 p-3"
                                >
                                    <font-awesome-icon
                                        icon="fa-solid fa-trophy"
                                        size="xl"
                                    />
                                    <div>
                                        I will offer a 100 GBP reward
                                        for the person who finds and
                                        returns this item.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="flex gap-4 p-3">
                            <CustomButton
                                label="Share location"
                                icon="fa-solid fa-location-crosshairs"
                                class="w-full"
                                rounded
                            />
                            <CustomButton
                                label="Call owner"
                                icon="fa-solid fa-phone"
                                class="w-full"
                                rounded
                                severity="success"
                            />
                        </div>
                        <PublicFooter />
                    </div>
                </div>
            </div>
        </WideWrapper>

        <WideWrapper v-else>
            <div class="relative mt-[30vh] sm:mt-[10vh] sm:p-4">
                <div
                    class="border-1 bg-white shadow-2xl sm:rounded-2xl"
                >
                    <div
                        class="mb-4 flex w-full flex-col items-center justify-center gap-6 p-3 sm:p-4"
                    >
                        <div
                            class="flex w-full flex-col gap-8 pt-[110px]"
                        >
                            <ProfileInfo :identity />

                            <DefaultProfileAdditionalInfo />
                        </div>
                    </div>
                    <PublicFooter />
                </div>
            </div>
        </WideWrapper>
    </div>
</template>
