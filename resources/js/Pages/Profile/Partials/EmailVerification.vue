<script setup>
import { Link } from "@inertiajs/vue3";
import Message from "primevue/message";

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});
</script>
<template>
    <Message v-if="mustVerifyEmail" :closable="false">
        Your email address is unverified.
        <Link
            :href="route('verification.send')"
            method="post"
            as="button"
            class="underline :outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Click here to re-send the verification email.
        </Link>

        <div
            v-show="status === 'verification-link-sent'"
            class="mt-2 font-medium text-sm text-green-600"
        >
            A new verification link has been sent to your email address.
        </div>
    </Message>
</template>
