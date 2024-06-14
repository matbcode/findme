<script setup>
import TextInput from '@/Components/Inputs/TextInput.vue'
import { Head, useForm, Link } from '@inertiajs/vue3'

import Logo from '@/Components/Navbar/Logo.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import CustomCard from '@/Components/Custom/CustomCard.vue'
import CenteredLayout from '@/Layouts/CenteredLayout.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

defineProps({
    status: {
        type: String,
    },
})

const form = useForm({
    email: '',
})

const submit = () => {
    form.post(route('password.email'))
}
</script>

<template>
    <Head title="Forgot Password" />

    <CenteredLayout>
        <CustomCard>
            <Logo />

            <span class="text-primary-400">
                Forgot your password?</span
            >

            <div class="mb-4 text-sm text-surface-200">
                No problem. Just let us know your email address and we
                will email you a password reset link that will allow
                you to choose a new one.
            </div>

            <div
                v-if="status"
                class="mb-4 text-sm font-medium text-green-600"
            >
                {{ status }}
            </div>

            <form @submit.prevent="submit">
                <TextInput
                    name="email"
                    type="email"
                    label="Email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    :error="form.errors.email"
                    required
                    autofocus
                    autocomplete="username"
                />
            </form>

            <div class="mt-2 flex flex-col gap-12">
                <div class="flex flex-col gap-12">
                    <CustomButton
                        type="submit"
                        label="Reset password"
                    />
                </div>
            </div>

            <div
                class="flex items-center justify-between gap-4 text-surface-300"
            >
                <Link
                    :href="route('login')"
                    class="rounded-md text-sm underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Already registered?
                </Link>
            </div>
        </CustomCard>
    </CenteredLayout>
</template>
