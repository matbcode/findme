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
        <title>All-in-one Social Media Management</title>
    </Head>
    <section
        class="relative flex h-[760px] w-full items-center justify-around"
    >
        <GradientCanvas
            class="absolute -z-30 h-full w-full overflow-hidden bg-surface-900"
        />
        <div
            class="absolute bottom-0 left-0 right-0 -z-10 aspect-[13/3] w-full bg-surface-50"
            style="clip-path: polygon(0 100%, 100% 0, 100% 100%)"
        />
        <div ref="centralProposition" class="container max-w-6xl">
            <div class="flex items-center justify-between">
                <div class="w-1/2 text-white">
                    <h1 class="font-bold leading-relaxed">
                        <span
                            class="block text-7xl text-white mix-blend-overlay"
                            >All-in-one</span
                        >
                        <span class="text-4xl"
                            >Social Media Management</span
                        >
                    </h1>
                    <p class="mt-6 text-xl font-bold">
                        Simplify and supercharge your social media
                        management with our
                        <strong>all-in-one platform</strong>.
                    </p>
                    <p class="mt-6 text-lg">
                        Integrate all your accounts, schedule posts,
                        track analytics, collaborate seamlessly, and
                        harness AI power - all from one place.
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
                <div class="w-5/12">
                    <SocialCard />
                </div>
            </div>
        </div>
    </section>
    <section class="relative w-full bg-surface-50">
        <div
            class="container mx-auto flex max-w-6xl flex-col gap-44 pb-48 pt-12"
        >
            <div class="flex flex-row-reverse items-center gap-20">
                <div class="w-1/2">
                    <span class="text-lg font-bold text-primary-400"
                        >Account Integration</span
                    >
                    <h2
                        class="mt-2 text-4xl font-bold text-surface-600"
                    >
                        Effortlessly Manage All Your Social Media
                        Accounts
                    </h2>
                    <p class="mt-5 text-surface-600">
                        Seamlessly integrate and manage your Facebook,
                        Instagram, TikTok, Snapchat, Twitter, YouTube,
                        and Google Business accounts from a single
                        platform, simplifying your social media
                        management.
                    </p>
                    <CustomButton
                        icon="fa-angles-right"
                        class="mt-6 !bg-indigo-600"
                        label="Integrations"
                    />
                </div>
                <div class="w-1/2">
                    <Skeleton width="100%" height="400px"></Skeleton>
                </div>
            </div>
            <div class="flex items-center gap-20">
                <div class="w-1/2">
                    <span class="text-lg font-bold text-primary-400"
                        >Post Creation and Scheduling</span
                    >
                    <h2
                        class="mt-2 text-4xl font-bold text-surface-600"
                    >
                        Create and Schedule <br />Posts with Ease
                    </h2>
                    <p class="mt-5 text-surface-600">
                        Craft, schedule, and preview your posts across
                        multiple platforms with our intuitive
                        interface, ensuring your content is always
                        timely and engaging.
                    </p>
                    <CustomButton
                        icon="fa-angles-right"
                        class="mt-6 !bg-indigo-600"
                        label="How it works"
                    />
                </div>
                <div class="w-1/2">
                    <img
                        src="/assets/images/svg/calendar.svg"
                        alt="Calendar"
                    />
                </div>
            </div>
            <div
                class="z-20 flex flex-row-reverse items-center gap-20"
            >
                <div class="w-1/2">
                    <span class="text-lg font-bold text-primary-400"
                        >Analytics and Reports</span
                    >
                    <h2
                        class="mt-2 text-4xl font-bold text-surface-600"
                    >
                        Track Engagement <br />and Performance
                    </h2>
                    <p class="mt-5 text-surface-600">
                        Monitor your social media performance with
                        detailed analytics. Generate comprehensive
                        reports to gain insights into engagement,
                        stats, and comments, helping you make
                        data-driven decisions.
                    </p>
                    <CustomButton
                        icon="fa-angles-right"
                        class="mt-6 !bg-indigo-600"
                        label="Features"
                    />
                </div>
                <div class="w-1/2">
                    <Skeleton width="100%" height="400px"></Skeleton>
                </div>
            </div>
        </div>
    </section>
    <section class="relative w-full bg-surface-900">
        <div
            class="absolute left-0 right-0 top-0 aspect-[13/3] w-full -translate-y-[calc(100%-2px)] bg-surface-900"
            style="clip-path: polygon(-10px 0, 0 100%, 101% 100%)"
        />
        <div
            class="absolute bottom-0 left-0 right-0 aspect-[13/3] w-full translate-y-[calc(100%-2px)] bg-surface-900"
            style="clip-path: polygon(-10px 0, 100% 0, 101% 100%)"
        />
        <div class="container mx-auto max-w-4xl text-center">
            <span class="text-lg font-bold text-primary-400"
                >Artificial Intelligence</span
            >
            <h2 class="mt-2 text-4xl font-bold text-white">
                Harness the Power of AI
            </h2>
            <p class="mt-5 text-white">
                Maximise your productivity and creativity with our
                advanced AI features. Our AI assistant is designed to
                streamline your social media management by generating
                engaging posts, providing insightful recommendations,
                and automating repetitive tasks. Whether you're
                crafting content, analysing performance, or managing
                your workflow, our AI assistant is here to enhance
                your efficiency and effectiveness, allowing you to
                focus on what truly matters – growing your brand.
            </p>
            <CustomButton
                icon="fa-brands fa-youtube"
                class="mt-6 !bg-indigo-600"
                label="Watch Presentation"
            />
        </div>
    </section>
    <section
        class="w-full bg-gradient-to-r from-primary-700 to-indigo-700"
    >
        <div
            class="container z-20 mx-auto flex max-w-6xl items-center gap-20 pb-32 pt-[250px]"
        >
            <div class="w-1/2">
                <h2 class="mt-2 text-3xl font-bold text-white">
                    Start Your Free 15-Day Trial Today!
                </h2>
                <p class="mt-4 text-white">
                    Sign up today and get a free 15-day trial. No
                    credit card required. Discover how our app can
                    transform your social media strategy and
                    streamline your workflow.
                </p>
                <div class="flex gap-4">
                    <CustomButton
                        icon="fa-angles-right"
                        class="mt-6 !bg-indigo-600"
                        label="Start Trial"
                    />
                    <CustomButton
                        icon="fa-solid fa-tags"
                        class="mt-6 !bg-surface-50 text-surface-700"
                        label="Full Pricing"
                    />
                </div>
            </div>
            <div class="w-1/2">
                <Skeleton width="100%" height="300px"></Skeleton>
            </div>
        </div>
    </section>
</template>
