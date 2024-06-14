<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import Grid from '@/ComponentsNew/Grid/Grid.vue'
import WorkspaceGridElement from '@/ComponentsNew/Grid/SlotComponents/WorkspaceGridElement.vue'

const store = useGlobalStore()

defineProps({
    workspaces: Object,
})

const actions = ref([store.workspaces.actions.createWorkspace])
</script>

<template>
    <Grid
        :value="workspaces"
        :gridComponent="WorkspaceGridElement"
        itemPropsName="workspace"
        :headerProps="{
            title: store.workspaces.i18n('@Workspaces.-.title'),
            actions,
        }"
    >
        <template #empty>
            <div
                class="flex h-[70vh] flex-col items-center justify-center gap-4 p-8 text-center text-surface-300"
            >
                <div class="text-lg font-semibold">
                    No Workspaces Available
                </div>
                <p>
                    You don’t have any workspaces yet. You can either
                    create a new workspace or accept an invitation.
                </p>
                <p class="text-sm">
                    Workspace is a place where you can organize your
                    projects, tasks, and team members.
                </p>
                <div class="mt-6">
                    <CustomButton
                        v-bind="actions[0]"
                        :text="false"
                        @click="actions[0].command"
                    />
                </div>
            </div>
        </template>
    </Grid>
</template>
