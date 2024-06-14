<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import Grid from '@/ComponentsNew/Grid/Grid.vue'
import WorkspaceGridElement from '@/ComponentsNew/Grid/SlotComponents/WorkspaceGridElement.vue'
import PendingInvitation from '@/Components/Cards/PendingInvitation.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const store = useGlobalStore()

defineProps({
    workspaces: Object,
    invitations: Object,
})

const actions = ref([store.workspaces.actions.createWorkspace])
</script>

<template>
    <WideWrapper>
        <PendingInvitation :invitations />
        <Grid
            :value="workspaces"
            :gridComponent="WorkspaceGridElement"
            itemPropsName="workspace"
            :columns="1"
            :useAspectSquare="false"
            :headerProps="{
                title: store.workspaces.i18n('@Workspaces.-.title'),
                actions,
            }"
        >
            <!-- <template #itemsPrepend>
                <div
                    class="border-1 flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-surface-800"
                >
                    test
                </div>
            </template> -->
            <template #empty>
                <div
                    class="flex h-[70vh] flex-col items-center justify-center gap-4 p-8 text-center text-surface-300"
                >
                    <div class="text-lg font-semibold">
                        No Workspaces Available
                    </div>
                    <p>
                        You don’t have any workspaces yet. You can
                        either create a new workspace or accept an
                        invitation.
                    </p>
                    <p class="text-sm">
                        Workspace is a place where you can organize
                        your projects, tasks, and team members.
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
    </WideWrapper>
</template>
