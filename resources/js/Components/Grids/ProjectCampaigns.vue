<script setup>
import { ref } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import Column from 'primevue/column'
import MeterGroup from 'primevue/metergroup'
import Tag from 'primevue/tag'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import Grid from '@/Components/Custom/Grid.vue'

const store = useGlobalStore()
const { getFormattedDate } = store.user
const { getStatus } = store.statuses

const props = defineProps({
    currentWorkspace: Object,
    project: Object,
    campaigns: [Array, Object],
})

const stats = ref([
    {
        label: 'Released',
        value: props.campaigns.data.filter(
            (e) => e.status === 'released',
        ).length,
        color: getStatus('released').color,
    },
    {
        label: 'Scheduled',
        value: props.campaigns.data.filter(
            (e) => e.status === 'scheduled',
        ).length,
        color: getStatus('scheduled').color,
    },
    {
        label: 'Draft',
        value: props.campaigns.data.filter(
            (e) => e.status === 'draft',
        ).length,
        color: getStatus('draft').color,
    },
])

const actions = [
    store.projects.getActions({
        project: props.project,
        workspaceUsers: props.workspaceUsers,
        platforms: props.platforms,
    }).createEvent,
]
</script>
<template>
    <Grid
        :value="campaigns"
        :headerProps="{
            title: 'Campaigns',
            subtitle: 'Manage campaigns created in this project',
            icon: 'event',
            actions,
        }"
        emptyMessage="No campaigns in this projects"
    >
        <Column field="title" header="Title" sortable="" />
        <Column field="posts" header="Posts" sortable="">
            <template #body="slotProps">
                {{
                    slotProps.data.posts.length
                        ? slotProps.data.posts.length
                        : 'No posts'
                }}
            </template>
        </Column>
        <Column field="release_at" header="Scheduled" sortable="">
            <template #body="slotProps">
                {{
                    slotProps.data.release_at
                        ? getFormattedDate(slotProps.data.release_at)
                        : 'Not scheduled'
                }}
            </template>
        </Column>
        <Column field="status" header="Status" sortable="">
            <template #body="slotProps">
                <Tag
                    rounded
                    :value="getStatus(slotProps.data?.status)?.title"
                    :style="{
                        background: getStatus(slotProps.data?.status)
                            ?.color,
                    }"
                />
            </template>
        </Column>
        <Column class="text-right">
            <template #body="slotProps">
                <Link
                    :href="
                        route('campaign.edit', {
                            slug: currentWorkspace.slug,
                            project: project.id,
                            campaign: slotProps.data.id,
                        })
                    "
                >
                    <CustomButton
                        icon="fa-solid fa-pencil"
                        size="small"
                        rounded
                        text
                        plain
                    />
                </Link>
            </template>
        </Column>
        <template #footer>
            <div class="p-4">
                <MeterGroup
                    v-if="campaigns.data.length"
                    :value="stats"
                    :max="campaigns.data.length"
                />
            </div>
        </template>
    </Grid>
</template>
