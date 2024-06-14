<script setup>
import { Head } from '@inertiajs/vue3'
import Skeleton from 'primevue/skeleton'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import GradientCanvas from '@/Pages/Website/Components/GradientCanvas.vue'
import SocialCard from '@/Pages/Website/Components/SocialCard.vue'

import WebsiteLayout from '@/Layouts/WebsiteLayout.vue'

defineOptions({ layout: WebsiteLayout })
</script>

<template>
    <Head>
        <title>How it works</title>
    </Head>
    <section
        class="relative flex h-[460px] w-full items-center justify-around bg-gradient-to-r from-primary-700 to-indigo-700"
    >
        <div
            class="absolute bottom-0 left-0 right-0 z-10 aspect-[8/1] w-full bg-surface-50"
            style="clip-path: polygon(0 100%, 100% 0, 100% 100%)"
        />
        <div ref="centralProposition" class="container max-w-6xl">
            <div class="flex items-center justify-between">
                <div class="w-1/2 text-white">
                    <h1 class="font-bold leading-relaxed block text-5xl text-white">Features</h1>
                    <p class="text-lg">
                        Our app is designed to revolutionise your social media management, offering a streamlined and efficient workflow for individuals, companies, and agencies.
                    </p>
                    <div class="mt-5 flex gap-4">
                        <CustomButton
                            icon="fa-right-to-bracket"
                            class="!bg-indigo-600"
                            label="Start a free trial"
                        />
                        <CustomButton
                            icon="fa-angles-right"
                            label="Learn more"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="relative w-full bg-surface-50">
        <div
            class="container mx-auto max-w-6xl py-12"
        >

        </div>
    </section>
</template>
