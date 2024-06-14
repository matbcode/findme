<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import WorkspaceUsers from '@/Components/Grids/WorkspaceUsers.vue'
import WorkspaceProjects from '@/Components/Grids/WorkspaceProjects.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const store = useGlobalStore()

const props = defineProps({
    workspace: Object,
    users: Object,
})

const formBody = ref(store.workspaces.getUpdateWorkspaceForm())
</script>

<template>
    <WideWrapper title="Manage Workspace" :formBody>
        <WorkspaceProjects :workspace :users />
        <WorkspaceUsers :workspace :users />
    </WideWrapper>
</template>
