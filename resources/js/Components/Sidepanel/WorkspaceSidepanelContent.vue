<script setup>
import { ref } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import FormWrapper from '@/Components/PageWrappers/FormWrapper.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import SidepanelProjects from '@/Components/Grids/SidepanelProjects.vue'

const store = useGlobalStore()

const props = defineProps({
    workspace: Object,
})
</script>

<template>
    <FormWrapper
        id="manage"
        title="Manage Workspace"
        subtitle="Change the owner of the workspace or delete the workspace"
        icon="workspaces"
    >
        <div class="flex w-full gap-4">
            <Link
                :href="route('role.index', { slug: workspace.slug })"
            >
                <CustomButton
                    v-bind="store.workspaces.actions.manageUserRoles"
                    class="w-full flex-1 flex-shrink-0"
                />
            </Link>
            <CustomButton
                v-bind="store.workspaces.actions.deleteWorkspace"
                @click="
                    store.workspaces.actions.deleteWorkspace.command;
                "
                class="w-full flex-1 flex-shrink-0"
            />
        </div>
    </FormWrapper>
    <SidepanelProjects />
</template>
