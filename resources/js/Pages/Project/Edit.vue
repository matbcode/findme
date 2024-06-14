<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGlobalStore } from '@/Stores'

import InlineMessage from 'primevue/inlinemessage'

import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import ProjectUsers from '@/Components/Grids/ProjectUsers.vue'
import ProjectCampaigns from '@/Components/Grids/ProjectCampaigns.vue'
import ProjectChannels from '@/Components/Grids/ProjectChannels.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const store = useGlobalStore()

const props = defineProps({
    currentWorkspace: Object,
    project: Object,
    workspaceUsers: Array,
    campaigns: {
        type: [Array, Object],
    },
    accounts: {
        type: [Array, Object],
    },
})

const actions = ref(
    store.projects.getActions({
        project: props.project,
        workspaceUsers: props.workspaceUsers,
        platforms: props.platforms,
    }),
)

const isDifferentTimezone = computed(() => {
    return props.project.timezone !== store.user.timezone
})

const links = ref([
    {
        label: props.currentWorkspace.name,
        icon: 'arrow_back_ios_new',
        href: route('workspace.edit', {
            slug: props.currentWorkspace.slug,
        }),
    },
])

const formBody = ref({
    ...store.api.project.update(props.project),
})

const channels = computed(() => {
    const allAccounts = []

    if (props.project.facebook_pages?.length) {
        allAccounts.push(
            ...props.project.facebook_pages.map((page) => ({
                ...page,
                platform: 'facebook',
                project: props.project,
            })),
        )
    }

    if (props.project.instagram_accounts?.length) {
        allAccounts.push(
            ...props.project.instagram_accounts.map((account) => ({
                ...account,
                platform: 'instagram',
                project: props.project,
            })),
        )
    }

    if (props.project.x_accounts?.length) {
        allAccounts.push(
            ...props.project.x_accounts.map((account) => ({
                ...account,
                platform: 'x-twitter',
                project: props.project,
            })),
        )
    }

    return allAccounts
})

onMounted(() => {
    store.files.fetch()
})
</script>

<template>
    <WideWrapper title="Manage Project" :links :formBody>
        <div v-if="isDifferentTimezone">
            <InlineMessage severity="warn">
                The project's timezone is different from your current
                timezone. This may affect the time of events and tasks
                in this project.
            </InlineMessage>
        </div>
        <ProjectCampaigns :currentWorkspace :project :campaigns />
        <ProjectChannels :project :channels :accounts />
        <ProjectUsers :currentWorkspace :project :workspaceUsers />
    </WideWrapper>
</template>
