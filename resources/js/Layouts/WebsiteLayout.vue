<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Link } from '@inertiajs/vue3'
import Skeleton from 'primevue/skeleton'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import NavItem from '@/Components/Website/NavItem.vue'

// Reactive variable to track the scroll position
const scrollPosition = ref(0)

// Function to update scroll position
const handleScroll = () => {
    scrollPosition.value = window.scrollY
}

// Add scroll event listener on mount and remove on unmount
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const headerClasses = computed(() => ({
    'bg-opacity-0': scrollPosition.value === 0,
    'bg-opacity-100': scrollPosition.value !== 0,
    'text-surface-700': scrollPosition.value !== 0,
    'shadow-lg': scrollPosition.value !== 0,
    'text-surface-50': scrollPosition.value === 0,
}))

const logoClasses = computed(() => ({
    'fill-surface-50': scrollPosition.value === 0,
    'fill-indigo-600': scrollPosition.value !== 0,
    'text-indigo-600': scrollPosition.value !== 0,
    'text-surface-50': scrollPosition.value === 0,
}))
</script>

<template>
    <header
        :class="[
            'dark fixed left-0 right-0 top-0 z-50 h-20 bg-surface-50 duration-500 ease-in-out',
            headerClasses,
        ]"
    >
        <nav
            class="container mx-auto flex h-full max-w-6xl items-center justify-between"
        >
            <div class="flex items-center gap-9">
                <Link
                    :href="route('static.welcome')"
                    class="flex flex-row items-center gap-2"
                >
                    <svg
                        class="h-12"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 358.92 365.55"
                    >
                        <g>
                            <g>
                                <path
                                    :class="[
                                        'transition-all duration-500 ease-in-out',
                                        logoClasses,
                                    ]"
                                    d="M45.04,152.14c33.23,4.77,55.28,17.49,74.74,28.72,15.81,9.12,30.74,17.74,50.42,21.75,45.71,9.31,98.93-10.49,158.82-58.92l-20.98-21.28c-17.14,12.12-33.78,21.93-49.85,29.36-35.96,16.63-70.07,21.84-101.36,15.46-22.81-4.64-39.84-14.47-56.31-23.98-13.22-7.63-26.77-15.44-43.91-20.88l-28.55,28.14c5.69.28,11.35.82,16.98,1.63Z"
                                />
                                <path
                                    :class="[
                                        'transition-all duration-500 ease-in-out',
                                        logoClasses,
                                    ]"
                                    d="M54.49,206.76c33.23,4.77,55.28,17.49,74.74,28.72,15.81,9.12,30.74,17.74,50.42,21.75,50.18,10.22,109.4-14.63,176.57-73.94,3.44-3.04,3.61-8.35.39-11.61l-13.76-13.96c-26.2,21.35-51.33,37.63-75.21,48.67-35.96,16.63-70.06,21.83-101.36,15.46-22.8-4.65-39.84-14.47-56.31-23.98-18.79-10.85-38.23-22.06-67.71-26.29-11.22-1.61-22.64-2.04-34.24-1.3l-5.64,5.56c-3.15,3.1-3.18,8.17-.08,11.31l17.69,17.94c11.64-.51,23.14.04,34.5,1.67Z"
                                />
                                <path
                                    :class="[
                                        'transition-all duration-500 ease-in-out',
                                        logoClasses,
                                    ]"
                                    d="M151.3,93.38c31.76,6.47,67.14-1.11,105.86-22.58l-24.82-25.17c-33.41,14.17-65.14,18.34-94.41,12.38-4.45-.91-8.67-2.01-12.71-3.27l-19.79,19.52c14.18,8.12,28.09,15.51,45.88,19.13Z"
                                />
                                <path
                                    :class="[
                                        'transition-all duration-500 ease-in-out',
                                        logoClasses,
                                    ]"
                                    d="M110.33,126.25c15.81,9.12,30.74,17.74,50.42,21.75,39.12,7.97,83.73-5.38,133.33-39.75l-22.63-22.95c-7.69,4.46-15.26,8.42-22.7,11.87-35.96,16.63-70.07,21.84-101.36,15.46-22.81-4.64-39.84-14.47-56.31-23.98-.05-.03-.1-.06-.15-.09l-18.76,18.49c14.71,5.68,26.88,12.69,38.17,19.21Z"
                                />
                                <path
                                    :class="[
                                        'transition-all duration-500 ease-in-out',
                                        logoClasses,
                                    ]"
                                    d="M185.18,331.07c-22.81-4.64-39.84-14.47-56.31-23.98-5.95-3.44-11.97-6.91-18.36-10.18l65.32,66.26c3.1,3.15,8.17,3.18,11.31.08l30.08-29.66c-10.97.43-21.66-.4-32.05-2.52Z"
                                />
                                <path
                                    :class="[
                                        'transition-all duration-500 ease-in-out',
                                        logoClasses,
                                    ]"
                                    d="M189.1,311.84c16.15,3.29,33.24,2.94,51.23-1.02l67.36-66.41c-10.41,6.44-20.61,11.97-30.6,16.59-35.96,16.63-70.07,21.84-101.36,15.46-22.81-4.64-39.84-14.47-56.31-23.98-18.79-10.85-38.23-22.06-67.71-26.29-4.03-.58-8.09-1-12.17-1.28l38.54,39.09c25.61,5.9,44.05,16.53,60.61,26.08,15.81,9.12,30.74,17.74,50.42,21.75Z"
                                />
                                <path
                                    :class="[
                                        'transition-all duration-500 ease-in-out',
                                        logoClasses,
                                    ]"
                                    d="M141.5,38.69c23.36,4.84,48.69,2.06,75.86-8.27l-27.65-28.04c-3.1-3.15-8.17-3.18-11.31-.08l-36.91,36.38h0Z"
                                />
                            </g>
                        </g>
                    </svg>
                    <svg class="hidden h-12" viewBox="0 0 396 408">
                        <g>
                            <path
                                :class="[
                                    'transition-all duration-500 ease-in-out',
                                    logoClasses,
                                ]"
                                d="M195.87,403.03c-2.46,0-4.75-.97-6.46-2.73L2.56,207.78c-3.41-3.52-3.41-9.02,0-12.54L189.41,2.73c1.71-1.76,4-2.73,6.46-2.73s4.75.97,6.46,2.73l186.85,192.51c3.41,3.51,3.41,9.02,0,12.54l-186.85,192.51c-1.71,1.76-4,2.73-6.46,2.73ZM195.87,370.64l33.09-34.09h-.48c-9.39,0-18.4-.37-27.1-.72l-.75-.03c-8.64-.36-16.8-.69-25.27-.69-4.83,0-9.31.11-13.64.34l34.16,35.2ZM138.9,311.95c11.58-1.7,23.2-2.49,36.54-2.49,9.05,0,17.87.36,26.39.71,8.62.36,17.5.73,26.76.73s17.61-.37,25.73-1.14c.24-.02.47-.04.7-.07l47-48.42c-21.15,7.31-42.58,12.02-63.76,14.03-8.91.84-18.04,1.25-27.92,1.25s-18.91-.38-27.82-.75c-8.73-.36-16.97-.7-25.54-.7-18.02,0-33.16,1.62-48.79,5.22l30.71,31.64ZM87.76,259.26c.44-.13.89-.27,1.33-.4,28.42-8.35,51.25-9.42,67.96-9.42,9.06,0,17.89.37,26.43.72,8.64.36,17.52.73,26.77.73s17.61-.37,25.73-1.14c38.68-3.66,77.8-17.2,116.28-40.24l7.76-8-23.42-24.13c-38.44,21.47-77.69,34.22-116.67,37.9-8.92.84-18.07,1.25-27.96,1.25s-18.88-.38-27.78-.75c-8.73-.36-16.98-.7-25.55-.7-15.04,0-35.56.96-61.03,8.44-6.21,1.83-12.4,3.94-18.45,6.28l28.6,29.47ZM40.03,210.08c10.02-4.4,20.35-8.18,30.73-11.22,28.42-8.35,51.24-9.42,67.95-9.42,9.1,0,17.94.37,26.48.72h.16c8.58.36,17.44.72,26.6.72s17.59-.37,25.69-1.14c33.39-3.15,67.2-13.7,100.52-31.36l-26.7-27.51c-29.7,13.36-59.94,21.57-89.87,24.4-8.9.84-18.04,1.25-27.92,1.25s-18.78-.38-27.66-.74h-.15c-8.75-.37-16.99-.71-25.54-.71-17.97,0-32.95,1.59-48.51,5.16l-40.07,41.29,8.31,8.56ZM120.43,129.42c9.09,0,17.9.37,26.42.72,8.6.36,17.5.73,26.77.73s17.58-.37,25.68-1.13c24.24-2.29,48.84-8.51,73.12-18.48l-28.2-29.06c-20.19,6.75-40.7,11.15-60.97,13.07-8.89.84-18.02,1.25-27.91,1.25-7.54,0-14.65-.23-21.23-.48l-33.03,34.03c6.14-.43,12.5-.64,19.36-.64ZM158.55,70.83c7.9-.07,15.25-.44,22.4-1.12,14.32-1.35,28.86-4.09,43.24-8.14l-28.33-29.19-37.32,38.45Z"
                            />
                        </g>
                    </svg>
                    <span
                        :class="[
                            '-translate-y-[2px] text-2xl font-bold tracking-tighter transition-all duration-500 ease-in-out',
                            logoClasses,
                        ]"
                        >raichi.io</span
                    >
                </Link>
                <ol class="flex gap-6 text-lg font-semibold">
                    <NavItem :route="route('static.how-it-works')"
                        >How it works
                    </NavItem>
                    <NavItem :route="route('static.features')"
                        >Features
                    </NavItem>
                    <NavItem :route="route('static.integrations')"
                        >Integrations
                    </NavItem>
                    <NavItem :route="route('static.pricing')"
                        >Pricing
                    </NavItem>
                </ol>
            </div>
            <div>
                <Link
                    v-if="$attrs.auth.user === null"
                    :href="route('dashboard')"
                >
                    <CustomButton
                        icon="fa-solid fa-right-to-bracket"
                        label="Sign in"
                        class="!bg-indigo-600"
                    />
                </Link>
                <Link v-else :href="route('dashboard')">
                    <CustomButton
                        icon="fa-chart-simple"
                        label="Dashboard"
                        class="!bg-indigo-600"
                    />
                </Link>
            </div>
        </nav>
    </header>
    <main class="dark">
        <slot />
    </main>
    <footer class="block bg-surface-950">
        <div class="container mx-auto max-w-6xl py-12">
            <div class="flex items-start justify-between">
                <div class="flex gap-10">
                    <ol class="flex flex-col gap-1 text-white">
                        <li>How it works</li>
                        <li>Integrations</li>
                        <li>About</li>
                        <li>Pricing</li>
                        <li>Help & Support</li>
                        <li>Contact</li>
                    </ol>
                    <ol class="flex flex-col gap-1 text-white">
                        <li>
                            <Link
                                :href="route('static.privacy-policy')"
                                >Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                :href="
                                    route(
                                        'static.terms-and-conditions',
                                    )
                                "
                                >Terms & Conditions
                            </Link>
                        </li>
                        <li>
                            <Link
                                :href="route('static.cookie-policy')"
                                >Cookie Policy
                            </Link>
                        </li>
                    </ol>
                </div>
                <div class="flex flex-col items-end gap-6">
                    <Link
                        :href="route('static.welcome')"
                        class="flex flex-row items-center gap-3"
                    >
                        <img
                            class="w-16"
                            src="/assets/images/svg/raichi-v4-logo-white.svg"
                            alt="Logo"
                        />
                        <span
                            class="-translate-y-[3px] text-4xl font-bold tracking-tighter text-white"
                            >raichi.io</span
                        >
                    </Link>
                    <span class="text-sm text-white"
                        >© 2024 NeonByte Ltd</span
                    >
                </div>
            </div>
            <span></span>
        </div>
    </footer>
</template>
