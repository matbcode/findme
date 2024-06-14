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
    project: Object,
})

const actions = ref(
    store.projects.getActions({
        project: props.project,
        workspaceUsers: props.workspaceUsers,
        platforms: props.platforms,
    }),
)
</script>

<template>
    <FormWrapper
        title="Manage project"
        subtitle="Edit and manage this project"
        icon="delete"
    >
        <div class="flex w-full justify-end gap-4">
            <CustomButton
                v-bind="actions.deleteProject"
                class="w-full"
                @click="actions.deleteProject.command"
            />
        </div>
    </FormWrapper>
    <SidepanelProjects />

    <ProjectFilesGrid :project="project" :columns="3" />
    <GoogleDriveFilesGrid />

    <CommentsSection :project="project" />
    <ActivityLog
        v-if="project.activities"
        :activities="project.activities"
    />
</template>
