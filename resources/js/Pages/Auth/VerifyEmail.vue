<script setup>
import { computed } from 'vue'
import GuestLayout from '@/Layouts/GuestLayout.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import CenteredWrapper from '@/Components/PageWrappers/CenteredWrapper.vue'
import Button from 'primevue/button'

import Logo from '@/Components/Navbar/Logo.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const props = defineProps({
    status: {
        type: String,
    },
})

const form = useForm({})

const submit = () => {
    form.post(route('verification.send'))
}

const verificationLinkSent = computed(
    () => props.status === 'verification-link-sent',
)
</script>

<template>
    <Head title="Email Verification" />

    <CenteredWrapper class="w-full">
        <Logo />

        <div class="mb-4 text-sm text-surface-600">
            Thanks for signing up! Before getting started, could you
            verify your email address by clicking on the link we just
            emailed to you? If you didn't receive the email, we will
            gladly send you another.
        </div>

        <div
            class="mb-4 text-sm font-medium text-green-600"
            v-if="verificationLinkSent"
        >
            A new verification link has been sent to the email address
            you provided during registration.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between gap-4">
                <Button
                    type="submit"
                    label="Resend Verification Email"
                    rounded
                    outlined
                />

                <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="rounded-2xl text-sm underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >Log Out</Link
                >
            </div>
        </form>
    </CenteredWrapper>
</template>
