<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue'
import TextInput from '@/Components/Inputs/TextInput.vue'
import { Head, useForm } from '@inertiajs/vue3'

import Button from 'primevue/button'
import CenteredWrapper from '@/Components/PageWrappers/CenteredWrapper.vue'
import Logo from '@/Components/Navbar/Logo.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const props = defineProps({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
})

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
})

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () =>
            form.reset('password', 'password_confirmation'),
    })
}
</script>

<template>
    <Head title="Reset Password" />

    <CenteredWrapper class="w-full">
        <Logo />

        <span> Reset your password </span>

        <form @submit.prevent="submit" class="space-y-6">
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
            <TextInput
                name="password"
                type="password"
                label="Password"
                class="mt-1 block w-full"
                v-model="form.password"
                :error="form.errors.password"
                required
                autocomplete="new-password"
            />

            <TextInput
                name="password_confirmation"
                type="password"
                label="Confirm Password"
                class="mt-1 block w-full"
                v-model="form.password_confirmation"
                :error="form.errors.password_confirmation"
                required
                autocomplete="new-password"
            />

            <div class="mt-4 flex items-center justify-end">
                <Button
                    type="submit"
                    label="Reset Password"
                    outlined
                    rounded
                />
            </div>
        </form>
    </CenteredWrapper>
</template>
