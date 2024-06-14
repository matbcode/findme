<script setup>
import { ref } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'

import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'

import TextInput from '@/Components/Inputs/TextInput.vue'
import Logo from '@/Components/Navbar/Logo.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import CustomCard from '@/Components/Custom/CustomCard.vue'
import CenteredLayout from '@/Layouts/CenteredLayout.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const form = useForm({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    locale: 'en-GB',
    password: '',
    password_confirmation: '',
})

const isAccepted = ref(false)

const submit = () => {
    form.post(route('register'), {
        onFinish: () =>
            form.reset('password', 'password_confirmation'),
    })
}

const onGoogleLogin = () => {
    const googleOathForm = useForm({})

    googleOathForm.submit('post', route('sign-in.google.init'))
}

// const onAppleLogin = () => {
//     const appleOathForm = useForm({})

//     appleOathForm.submit('post', route('sign-in.apple.init'))
// }

const onMicrosoftLogin = () => {
    const microsoftOathForm = useForm({})

    microsoftOathForm.submit('post', route('sign-in.microsoft.init'))
}
</script>

<template>
    <Head title="Register" />

    <CenteredLayout>
        <CustomCard>
            <div class="flex flex-col gap-4">
                <div class="flex justify-between">
                    <Logo />
                </div>
                <span>
                    Sign in using Google or register new account
                </span>
            </div>

            <div class="flex gap-2">
                <CustomButton
                    type="submit"
                    label="Sign in with Google"
                    icon="fa-brands fa-google"
                    class="w-full"
                    plain
                    raised
                    @click="onGoogleLogin"
                />
                <!-- <CustomButton
                    type="submit"
                    icon="fa-brands fa-apple"
                    plain
                    raised
                    class="h-[45px] w-[58px]"
                    @click="onAppleLogin"
                /> -->
                <CustomButton
                    type="submit"
                    icon="fa-brands fa-microsoft"
                    plain
                    raised
                    class="h-[45px] w-[50px]"
                    @click="onMicrosoftLogin"
                />
            </div>

            <div class="mt-2 flex items-center gap-4">
                <div class="h-[1px] w-full bg-surface-800"></div>
                <span class="text-surface-800">Or</span>
                <div class="h-[1px] w-full bg-surface-800"></div>
            </div>

            <form
                @submit.prevent="submit"
                class="flex flex-col gap-4"
            >
                <TextInput
                    name="username"
                    type="text"
                    label="Username"
                    class="mt-1 block w-full"
                    v-model="form.username"
                    :error="form.errors.username"
                    required
                    autofocus
                    autocomplete="username"
                />

                <TextInput
                    name="email"
                    type="email"
                    label="Email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    :error="form.errors.email"
                    required
                    autocomplete="username"
                />

                <!-- <TextInput
                            name="timezone"
                            type="dropdown"
                            label="Timezone"
                            optionLabel="label"
                            optionValue="id"
                            class="mt-1 block w-full"
                            v-model="form.timezone"
                            :options="user.timezones"
                            :error="form.errors.timezone"
                            required
                            autocomplete="timezone"
                        /> -->

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
            </form>

            <div>
                <Checkbox
                    inputId="remember"
                    name="remember"
                    binary
                    v-model="isAccepted"
                />
                <label for="remember" class="ml-2 text-sm"
                    >I agree to the
                    <Link
                        href="/terms-and-conditions"
                        class="underline"
                        >terms and conditions</Link
                    >
                    ,
                    <Link href="/privacy-policy" class="underline"
                        >privacy policy</Link
                    >
                    and
                    <Link href="/cookie-policy" class="underline"
                        >cookie policy</Link
                    >
                </label>
            </div>

            <div class="flex flex-col gap-12">
                <div class="flex flex-col gap-12">
                    <CustomButton
                        type="submit"
                        label="Register"
                        :disabled="!isAccepted"
                    />
                </div>
            </div>

            <div
                class="flex items-center justify-between gap-4 text-surface-300"
            >
                <Link
                    :href="route('login')"
                    class="rounded-2xl text-sm underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Already registered?
                </Link>
            </div>
        </CustomCard>

        <div
            class="absolute bottom-4 flex items-center justify-center gap-4 text-xs text-surface-300/70"
        >
            <Link
                href="/terms-and-conditions"
                class="rounded-md text-sm underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Terms and conditions
            </Link>
            <Link
                href="/privacy-policy"
                class="rounded-md text-sm underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Privacy policy
            </Link>
        </div>
    </CenteredLayout>
</template>
