<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import InlineMessage from 'primevue/inlinemessage'

import Grid from '@/ComponentsNew/Grid/Grid.vue'
import ProjectGridElement from './ProjectGridElement.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'

const store = useGlobalStore()

const props = defineProps({ workspace: Object, users: Object })

const PROJECTS_LIMIT_MOCK = 10

const actions = ref([
    store.workspaces.actions.createProject({
        workspace: props.workspace,
        users: props.users?.data,
    }),
])
</script>
<template>
    <InlineMessage
        v-if="workspace.projects.length >= PROJECTS_LIMIT_MOCK"
        severity="info"
    >
        This workspace have reached the maximum number of projects
        allowed in plan. Please upgrade plan to create new projects.
    </InlineMessage>
    <Grid
        :value="workspace.projects"
        :grid-component="ProjectGridElement"
        :list-component="ProjectGridElement"
        :columns="5"
        use-aspect-square
        :headerProps="{
            title: 'Projects',
            subtitle:
                'Explore and engage with projects currently available in this workspace',
            icon: 'folder',
            actions,
            // massActions: [
            //     {
            //         label: 'Remove projects',
            //         icon: 'pi pi-trash',
            //         severity: 'danger',
            //         rounded: true,
            //         text: true,
            //     },
            // ],
        }"
    >
        <template #empty>
            <div
                class="flex h-full flex-col items-center justify-center"
            >
                <p class="text-center">
                    No projects created in this workspace yet. Create
                    a new project to get started.
                </p>
                <CustomButton
                    v-bind="store.workspaces.actions.createProject"
                    :text="false"
                    :rounded="false"
                    class="mt-4"
                    @click="
                        store.workspaces.actions.createProject.command
                    "
                />
            </div>
        </template>
    </Grid>
</template>
