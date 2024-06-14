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
                    <h1 class="font-bold leading-relaxed block text-5xl text-white">How it works</h1>
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
            class="container mx-auto max-w-6xl grid grid-cols-12 gap-14 py-12"
        >
            <div class="col-span-3 h-full">
                <ul class="text-surface-800 flex flex-col gap-4 sticky top-28">
                    <li class="font-semibold text-primary-500">Account Creation</li>
                    <li>Workspaces</li>
                    <li>Integrations</li>
                    <li>Projects and Campaigns</li>
                    <li>Analytics and Reporting</li>
                    <li>Collaborator and Client Management</li>
                    <li>Collaborator and Client Management</li>
                    <li>Notifications and Communication</li>
                    <li>Content Library</li>
                </ul>
            </div>
            <div class="col-span-9 flex flex-col gap-8">
                <div>
                    <h2 class="text-2xl font-semibold text-primary-500">Account Creation</h2>
                    <ul class="mt-3 flex flex-col gap-3 text-surface-800">
                        <li><strong>Registering an Account:</strong> Signing up is free and easy. Just provide your email, create a password, and you’re ready to start.</li>
                        <li><strong>Joining a Workspace:</strong> Even if you don't create a workspace, you can still join an existing one by invitation.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="text-2xl font-semibold text-primary-500">Workspaces</h2>
                    <ul class="mt-3 flex flex-col gap-3 text-surface-800">
                        <li><strong>Creating a Workspace:</strong> Set up your dedicated workspace to manage all your social media activities. Workspaces are a paid feature, but you can try it out with a free trial.</li>
                        <li><strong>Roles and Permissions:</strong> Assign different roles to team members and control their permissions. Admins can change roles and permissions as needed.</li>
                        <li><strong>AI Add-on:</strong> Enhance your workspace with our AI add-on, which helps in generating posts and other tasks.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="text-2xl font-semibold text-primary-500">Integrations</h2>
                    <ul class="mt-3 flex flex-col gap-3 text-surface-800">
                        <li><strong>Social Media Integration:</strong> Connect your social media accounts such as Facebook, Snapchat, Instagram, Twitter/X, and more.</li>
                        <li><strong>Third-Party Integrations:</strong> Integrate with Google Drive, Canva, Unsplash, Teams, Slack, Discord, and others for a comprehensive workflow.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="text-2xl font-semibold text-primary-500">Projects and Campaigns</h2>
                    <ul class="mt-3 flex flex-col gap-3 text-surface-800">
                        <li><strong>Project Management:</strong> Within your workspace, you can create multiple projects and assign different social media accounts to each project.</li>
                        <li><strong>Campaign Creation:</strong> Organise your posts into campaigns, which can be scheduled, approved by clients, or released instantly.</li>
                        <li><strong>Post Creation and Scheduling:</strong> Build and preview posts within the app, ensuring they look perfect before going live. Schedule posts across multiple platforms effortlessly.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="text-2xl font-semibold text-primary-500">Analytics and Reporting</h2>
                    <ul class="mt-3 flex flex-col gap-3 text-surface-800">
                        <li><strong>Comprehensive Stats:</strong> Track engagement, stats, and comments with detailed analytics within the app.</li>
                        <li><strong>Report Generation:</strong> Generate and export reports in PDF format. Automate the delivery of these reports to clients on a weekly or monthly basis.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="text-2xl font-semibold text-primary-500">Collaborator and Client Management</h2>
                    <ul class="mt-3 flex flex-col gap-3 text-surface-800">
                        <li><strong>Team Collaboration:</strong> Invite team members and clients to collaborate securely without sharing credentials.</li>
                        <li><strong>Client Approval Workflow:</strong> Use our integrated approval process to ensure quality and compliance before posts go live.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="text-2xl font-semibold text-primary-500">Notifications and Communication</h2>
                    <ul class="mt-3 flex flex-col gap-3 text-surface-800">
                        <li><strong>Real-time Notifications:</strong> Stay updated with real-time notifications via Slack and in-app alerts.</li>
                        <li><strong>Built-in Chat:</strong> Communicate seamlessly with team members through our built-in chat feature.</li>
                    </ul>
                </div>

                <div>
                    <h2 class="text-2xl font-semibold text-primary-500">Content Library</h2>
                    <ul class="mt-3 flex flex-col gap-3 text-surface-800">
                        <li><strong>Media Management:</strong> Upload, manage, and organise media assets with ease. Create posts using a simple drag-and-drop interface.</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>
