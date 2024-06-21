<script setup>
import CustomButton from '@/Components/Custom/CustomButton.vue'

const props = defineProps({
    identity: {
        type: Object,
    },
})
</script>

<template>
    <!-- <span class="font-semibold"> Caregiver: </span> -->

    <div
        v-if="
            identity.caregiver_first_name ||
            identity.caregiver_last_name ||
            identity.caregiver_address ||
            identity.caregiver_email ||
            identity.caregiver_telephone
        "
        class="flex w-full flex-col gap-8 rounded-2xl p-2"
    >
        <div class="font-semibold">Caregiver:</div>
        <div
            v-if="
                identity.caregiver_first_name ||
                identity.caregiver_last_name
            "
            class="flex w-full flex-col"
        >
            <div class="text-sm font-light">Full name:</div>
            <div class="">
                {{ identity.caregiver_first_name }}
                {{ identity.caregiver_last_name }}
            </div>
        </div>

        <div
            v-if="identity.caregiver_email"
            class="flex w-full flex-col"
        >
            <div class="text-sm font-light">E-mail</div>
            <div class="">
                {{ identity.caregiver_email }}
            </div>
        </div>

        <div
            v-if="identity.caregiver_telephone"
            class="flex w-full flex-col"
        >
            <div class="text-sm font-light">Telephone</div>
            <div class="">
                {{ identity.caregiver_telephone }}
            </div>
        </div>

        <div
            v-if="identity.caregiver_address"
            class="flex w-full flex-col"
        >
            <div class="text-sm font-light">Address</div>
            <div class="">
                {{ identity.caregiver_address }}
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
            class="rounded-2xl outline outline-8 -outline-offset-4 outline-white"
        ></iframe>

        <div class="flex gap-3">
            <!-- <CustomButton
                label="Message"
                icon="fa-solid fa-envelope"
                class="w-full"
                rounded
            /> -->
            <CustomButton
                label="Call"
                icon="fa-solid fa-phone"
                class="w-full"
                severity="danger"
                rounded
            />
        </div>
    </div>
</template>
