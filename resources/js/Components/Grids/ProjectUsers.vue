<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import Column from 'primevue/column'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import Grid from '@/Components/Custom/Grid.vue'
import Avatar from '@/Components/Custom/Avatar.vue'

const store = useGlobalStore()

const props = defineProps({
    currentWorkspace: Object,
    project: Object,
    workspaceUsers: Array,
})

const selectedUsers = ref([])

const projectActions = store.projects.getActions({
    project: props.project,
    workspaceUsers: props.workspaceUsers,
    platforms: props.platforms,
})

const actions = ref([projectActions.manageUsers])
</script>
<template>
    <Grid
        :value="project.users"
        multiselect
        v-model:selected="selectedUsers"
        :headerProps="{
            title: 'Users',
            subtitle: 'Users assigned to this project',
            icon: 'people',
            actions,
        }"
        emptyMessage="No users in this projects"
    >
        <Column field="full_name" header="Name" sortable="">
            <template #body="slotProps">
                <div class="flex items-center gap-2">
                    <Avatar :user="slotProps.data" />
                    <span class="ml-2">{{
                        slotProps.data.first_name +
                        ' ' +
                        slotProps.data.last_name
                    }}</span>
                </div>
            </template>
        </Column>
        <Column field="username" header="Username" sortable="" />
        <Column field="email" header="Email" sortable="" />
        <Column class="text-right">
            <template #body="slotProps">
                <CustomButton
                    icon="fa-solid fa-user-minus"
                    size="small"
                    rounded
                    text
                    severity="danger"
                    @click="
                        store.projects.modals.removeUserFromProjectModal(
                            {
                                project,
                                userId: slotProps.data.id,
                            },
                        )
                    "
                />
            </template>
        </Column>
    </Grid>
</template>
