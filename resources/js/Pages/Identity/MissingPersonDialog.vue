<script setup>
import { ref } from 'vue'

import CustomButton from '@/Components/Custom/CustomButton.vue'

const props = defineProps({
    visible: {
        type: Boolean,
        required: true,
    },
    identity: {
        type: Object,
    },
})

const isVisible = ref(props.visible)

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
</script>

<template>
    <div
        v-if="isVisible"
        class="sticky top-0 z-20 flex w-full max-w-screen-xl flex-col gap-8 rounded-3xl bg-red-600 p-4 text-white shadow-2xl"
    >
        <div class="absolute right-2 top-2">
            <CustomButton
                icon="fa-solid fa-times"
                rounded
                text
                @click="isVisible = false"
            />
        </div>
        <span class="text-center text-xl font-semibold">
            MISSING PERSON
        </span>
        <span>
            This person might me missing. Please help us find them, by
            sharing their location or calling their caregiver.
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
</template>
