<script setup>
import { ref } from 'vue'
import { Head, Link } from '@inertiajs/vue3'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import Logo from '@/Components/Navbar/Logo.vue'
import { useMountEventListener } from '@/Composables/eventListener'

// import WebsiteLayout from '@/Layouts/WebsiteLayout.vue'

// defineOptions({ layout: WebsiteLayout })

const nav = ref(null)
const navStyle = ref({})
let blurValue = 0
let shadowPixels = 0
let shadowOpacity = 0

const onScroll = () => {
    blurValue = Math.round(Math.min(window.scrollY / 5, 20), 0)
    shadowPixels = Math.round(Math.min(window.scrollY / 5, 30), 0)
    shadowOpacity = Math.min(window.scrollY / 500, 0.25)

    if (window.scrollY > 3) {
        navStyle.value = {
            boxShadow: `0 25px 32px -12px rgb(0 0 0 / ${shadowOpacity})`,
            backdropFilter: `blur(${blurValue}px)`,
        }
        // nav.value.classList.add(
        //     // 'border-b',
        //     'bg-white/40',
        //     'dark:bg-surface-800/20',
        // )
    } else {
        navStyle.value = {}
        // nav.value.classList.remove(
        //     // 'border-b',
        //     'bg-white/40',
        //     'dark:bg-surface-800/20',
        // )
    }
}

useMountEventListener(window, 'scroll', onScroll)
</script>

<template>
    <Head>
        <title>All-in-one Social Media Management</title>
    </Head>

    <header
        ref="nav"
        class="fixed z-50 flex w-full justify-center py-2"
        :style="navStyle"
    >
        <nav
            class="flex h-full w-full max-w-screen-2xl items-center justify-between"
        >
            <div class="flex items-center gap-9">
                <Logo height="60px" />
                <!-- Letterthinkers -->
            </div>
            <div
                class="flex w-1/3 justify-between gap-4 text-lg font-semibold"
            >
                <!-- <Link>About</Link>
                <Link>Why Join Us?</Link>
                <Link>How It Works</Link> -->
            </div>
            <div>
                <Link
                    v-if="$attrs.auth.user === null"
                    :href="route('dashboard')"
                >
                    <CustomButton
                        label="Sign in"
                        severity="warning"
                    />
                </Link>
                <Link v-else :href="route('dashboard')">
                    <CustomButton
                        label="Dashboard"
                        severity="warning"
                    />
                </Link>
            </div>
        </nav>
    </header>

    <div class="flex flex-col items-center justify-center">
        <!-- <svg
            id="wave"
            style="transform: rotate(180deg); transition: 0.3s"
            viewBox="0 0 1440 490"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute left-0 top-0 h-full"
        >
            <defs>
                <linearGradient
                    id="sw-gradient-0"
                    x1="0"
                    x2="0"
                    y1="1"
                    y2="0"
                >
                    <stop
                        stop-color="rgba(243, 106, 62, 1)"
                        offset="0%"
                    ></stop>
                    <stop
                        stop-color="rgba(255, 179, 11, 1)"
                        offset="100%"
                    ></stop>
                </linearGradient>
            </defs>
            <path
                style="transform: translate(0, 0px); opacity: 1"
                fill="url(#sw-gradient-0)"
                d="M0,147L120,196C240,245,480,343,720,375.7C960,408,1200,376,1440,318.5C1680,261,1920,180,2160,163.3C2400,147,2640,196,2880,204.2C3120,212,3360,180,3600,179.7C3840,180,4080,212,4320,204.2C4560,196,4800,147,5040,147C5280,147,5520,196,5760,196C6000,196,6240,147,6480,179.7C6720,212,6960,327,7200,351.2C7440,376,7680,310,7920,269.5C8160,229,8400,212,8640,196C8880,180,9120,163,9360,171.5C9600,180,9840,212,10080,187.8C10320,163,10560,82,10800,73.5C11040,65,11280,131,11520,163.3C11760,196,12000,196,12240,220.5C12480,245,12720,294,12960,294C13200,294,13440,245,13680,245C13920,245,14160,294,14400,326.7C14640,359,14880,376,15120,383.8C15360,392,15600,392,15840,367.5C16080,343,16320,294,16560,302.2C16800,310,17040,376,17160,408.3L17280,441L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"
            ></path>
        </svg> -->
        <div>
            <!-- <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                class="absolute left-0 top-0 h-full w-full object-cover"
            /> -->
            <iframe
                src="https://my.spline.design/untitled-fc7ecaa8a1035c68a5e1190c26a69024/"
                frameborder="0"
                width="100%"
                height="100%"
                class="absolute left-0 top-0 h-full w-full"
            ></iframe>
            <div class="relative w-screen max-w-screen-2xl">
                <section class="flex h-screen w-full">
                    <div
                        class="flex h-full w-full flex-col justify-center gap-12"
                    >
                        <h1
                            class="text-6xl font-black text-orange-500"
                        >
                            Website is under construction
                        </h1>
                        <!-- <p class="mt-4 text-2xl">
                            Join our vibrant community where
                            everyone’s perspective is celebrated.
                        </p> -->
                    </div>
                    <div></div>
                </section>
            </div>
        </div>
    </div>
</template>
