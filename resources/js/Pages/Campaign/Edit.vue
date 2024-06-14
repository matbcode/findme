<script setup>
import { ref, computed } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import CampaignPosts from '@/Components/Grids/CampaignPosts.vue'
import CreatePostPanel from '@/Components/Panels/CreatePostPanel.vue'
import CampaignAccounts from '@/Components/Grids/CampaignAccounts.vue'
import RichText from '@/Components/PageWrappers/RichText.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const store = useGlobalStore()

const props = defineProps({
    campaign: Object,
    project: Object,
})

const actions = ref(
    store.campaigns.getActions({
        campaign: props.campaign,
        project: props.campaign.project,
        channels: props.campaign.project.channels,
    }),
)

const links = ref([
    {
        label: props.campaign.project.name,
        icon: 'arrow_back_ios_new',
        href: route('project.edit', {
            slug: store.workspaces.current.slug,
            project: props.campaign.project_id,
        }),
    },
])

const formBody = ref(
    store.campaigns.getUpdateCampaignForm({
        campaign: props.campaign,
        project: props.campaign.project,
    }),
)

const channels = computed(() => {
    const allAccounts = []

    if (props.campaign.project.facebook_pages?.length) {
        allAccounts.push(
            ...props.campaign.project.facebook_pages.map((page) => ({
                ...page,
                platform: 'facebook',
                project: props.campaign.project,
            })),
        )
    }

    if (props.campaign.project.instagram_accounts?.length) {
        allAccounts.push(
            ...props.campaign.project.instagram_accounts.map(
                (account) => ({
                    ...account,
                    platform: 'instagram',
                    project: props.campaign.project,
                }),
            ),
        )
    }

    if (props.campaign.project.x_accounts?.length) {
        allAccounts.push(
            ...props.campaign.project.x_accounts.map((account) => ({
                ...account,
                platform: 'x-twitter',
                project: props.campaign.project,
            })),
        )
    }

    return allAccounts
})

const statusClasses = computed(() => {
    return {
        'text-white rounded-full px-4 py-2 shadow-sm': true,
        'bg-gray-500': props.campaign.status === 'draft',
        'bg-blue-500': props.campaign.status === 'queued',
        'bg-green-500': props.campaign.status === 'released',
    }
})
</script>

<template>
    <WideWrapper title="Manage Event" :links>
        <div
            class="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm dark:bg-surface-900 dark:text-surface-200"
        >
            <div class="flex flex-col gap-4">
                <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div :class="statusClasses">
                            {{ campaign.status }}
                        </div>

                        <div class="text-2xl font-semibold">
                            {{ campaign.title }}
                        </div>
                    </div>

                    <div
                        class="flex items-center gap-4 text-lg font-semibold"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-calendar-day"
                        />
                        {{ campaign.release_at || 'Not scheduled' }}
                    </div>
                </div>
                <RichText :description="campaign.description" />
            </div>
        </div>

        <div class="h-full w-full">
            <CampaignAccounts
                :project="campaign.project"
                :channels
                :campaign
            />
        </div>

        <CampaignPosts
            :campaign
            :channels="campaign.project.channels"
            :actions
        />
    </WideWrapper>
</template>
