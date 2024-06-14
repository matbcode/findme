<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import EmailVerification from './Partials/EmailVerification.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import DrivesGrid from '@/Components/Grids/DrivesGrid.vue'
import ConnectedAccountsGrid from '@/Components/Grids/ConnectedAccountsGrid.vue'
import Grid from '@/ComponentsNew/Grid/Grid.vue'
import WorkspaceGridElement from '@/ComponentsNew/Grid/SlotComponents/WorkspaceGridElement.vue'
import PendingInvitation from '@/Components/Cards/PendingInvitation.vue'
import WorkspacesGrid from '@/Components/Grids/WorkspacesGrid.vue'

const store = useGlobalStore()

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
    accounts: {
        type: [Array, Object],
    },
    workspaces: Object,
})

const actions = ref([store.workspaces.actions.createWorkspace])
</script>
<template>
    <WideWrapper :show-expand-button="false" :expandable="false">
        <EmailVerification
            :must-verify-email="mustVerifyEmail"
            :status="status"
        />
        <WorkspacesGrid :workspaces />

        <ConnectedAccountsGrid :accounts />
        <DrivesGrid />
    </WideWrapper>
</template>
