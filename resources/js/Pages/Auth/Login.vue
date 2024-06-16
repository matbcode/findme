<script setup>
import Checkbox from 'primevue/checkbox'
import TextInput from '@/Components/Inputs/TextInput.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import CustomCard from '@/Components/Custom/CustomCard.vue'
import CenteredLayout from '@/Layouts/CenteredLayout.vue'

import Logo from '@/Components/Navbar/Logo.vue'

// import MainLayout from '@/Layouts/MainLayout.vue'
// defineOptions({ layout: MainLayout })

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
})

const form = useForm({
    email: '',
    password: '',
    remember: false,
})

const submit = () => {
    form.submit('post', route('login'), {
        onFinish: () => form.reset('password'),
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
    <Head title="Log in" />

    <CenteredLayout>
        <CustomCard>
            <div class="flex flex-col gap-4">
                <div class="flex justify-between">
                    <Logo />
                </div>
                <span> Sign in to your account </span>
            </div>

            <div class="flex gap-2">
                <CustomButton
                    type="submit"
                    label="Sign in with Google"
                    icon="fa-brands fa-google"
                    class="w-full"
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
                class="flex w-full flex-col gap-4"
            >
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
                    autocomplete="current-password"
                />

                <div class="mt-6 flex flex-col gap-12">
                    <CustomButton type="submit" label="Sign in" />
                    <div>
                        <Checkbox
                            inputId="remember"
                            name="remember"
                            :binary="true"
                            v-model="form.remember"
                        />
                        <label for="remember" class="ml-2 text-sm"
                            >Keep me signed in until I sign out
                        </label>
                    </div>

                    <div
                        class="flex items-center justify-between gap-4 text-orange-700"
                    >
                        <Link
                            v-if="canResetPassword"
                            :href="route('password.request')"
                            class="rounded-md text-sm underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                        <Link
                            v-if="canResetPassword"
                            :href="route('register')"
                            class="rounded-md text-sm underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Don't have an account?
                        </Link>
                    </div>
                </div>
            </form>
        </CustomCard>

        <div
            class="absolute bottom-4 flex items-center justify-center gap-4 text-xs text-orange-700"
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
