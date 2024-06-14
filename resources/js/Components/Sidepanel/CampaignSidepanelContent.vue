<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import ActivityLog from '@/Components/Grids/ActivityLog.vue'
import CommentsSection from '@/Components/Sections/Comments/CommentsSection.vue'
import FormWrapper from '@/Components/PageWrappers/FormWrapper.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import GoogleDriveFilesGrid from '@/Components/Grids/GoogleDriveFilesGrid.vue'
import ProjectFilesGrid from '@/Components/Grids/ProjectFilesGrid.vue'
import SidepanelProjects from '@/Components/Grids/SidepanelProjects.vue'

const store = useGlobalStore()

const props = defineProps({
    campaign: Object,
})

const actions = ref(
    store.campaigns.getActions({
        campaign: props.campaign,
        project: props.campaign.project,
        channels: props.campaign.project.channels,
    }),
)

const formBody = ref(
    store.campaigns.getUpdateCampaignForm({
        campaign: props.campaign,
        project: props.campaign.project,
    }),
)
</script>

<template>
    <FormWrapper
        id="manage"
        title="Manage campaign"
        subtitle="Edit and manage this campaign"
        icon="delete"
    >
        <div class="flex w-full justify-end gap-4">
            <CustomButton
                v-bind="actions.deleteCampaign"
                class="w-full"
                @click="actions.deleteCampaign.command"
            />
            <CustomButton
                v-bind="actions.releaseCampaign"
                class="w-full"
                @click="actions.releaseCampaign.command"
            />
        </div>
    </FormWrapper>
    <FormWrapper id="edit" title="Edit campaign" :formBody />
    <SidepanelProjects />
    <ProjectFilesGrid :project="campaign.project" :columns="3" />
    <GoogleDriveFilesGrid />

    <CommentsSection
        :project="campaign.project"
        :campaign
        :activities="campaign.activities"
    />
</template>
