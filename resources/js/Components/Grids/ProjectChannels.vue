<script setup>
import { useGlobalStore } from '@/Stores'

import Grid from '@/ComponentsNew/Grid/Grid.vue'
import ProjectAttachedAccountGridElement from '@/ComponentsNew/Grid/SlotComponents/ProjectAttachedAccountGridElement.vue'

const store = useGlobalStore()

const props = defineProps({
    project: Object,
    channels: Array,
    accounts: {
        type: [Array, Object],
    },
})

const actions = [
    store.projects.getActions({
        project: props.project,
        workspaceUsers: props.workspaceUsers,
        accounts: props.accounts,
    }).createChannel,
]
</script>
<template>
    <Grid
        :value="channels || []"
        :gridComponent="ProjectAttachedAccountGridElement"
        :columns="5"
        useAspectSquare
        :headerProps="{
            title: 'Assigned accounts',
            subtitle:
                'Manage social media channels connected to this project',
            icon: 'public',
            actions,
        }"
        itemPropsName="account"
        emptyMessage="No accounts connected to this projects"
    >
        <template #empty>
            <div class="text-center">
                <p>No accounts connected to this project</p>
            </div>
        </template>
    </Grid>
</template>
