<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import ScrollPanel from 'primevue/scrollpanel'

import KeyShortcut from '@/ComponentsNew/Global/UI/KeyShortcut.vue'
import CampaignSidepanelContent from '@/Components/Sidepanel/CampaignSidepanelContent.vue'
import ProjectSidepanelContent from '@/Components/Sidepanel/ProjectSidepanelContent.vue'
import WorkspaceSidepanelContent from '@/Components/Sidepanel/WorkspaceSidepanelContent.vue'
import ProfileSidepanelContent from '@/Components/Sidepanel/ProfileSidepanelContent.vue'
import CalendarSidepanelContent from '@/Components/Sidepanel/CalendarSidepanelContent.vue'
import PostSidepanelContent from '@/Components/Sidepanel/PostSidepanelContent.vue'

const store = useGlobalStore()

const currentContext = ref(null)
const workspace = ref(null)
const project = ref(null)
const campaign = ref(null)

store.eventBus.urlEvent.listen(
    store.eventBus.URL_EVENTS.CHANGE,
    (page) => {
        currentContext.value = page.current
        workspace.value = page.props.workspace
        project.value = page.props.project
        campaign.value = page.props.campaign
    },
)
</script>

<template>
    <ScrollPanel id="sidepanel" style="width: 500px; height: 100%">
        <div
            v-if="currentContext"
            class="flex flex-col gap-8 p-6 @container"
        >
            <template v-if="currentContext.calendar">
                <CalendarSidepanelContent />
            </template>
            <template v-else-if="currentContext.profile">
                <ProfileSidepanelContent />
            </template>
            <template v-else-if="currentContext.post">
                <PostSidepanelContent />
            </template>
            <template v-else-if="currentContext.campaign">
                <CampaignSidepanelContent :campaign />
            </template>
            <template v-else-if="currentContext.project">
                <ProjectSidepanelContent :project />
            </template>
            <template v-else-if="currentContext.workspace">
                <WorkspaceSidepanelContent :workspace />
            </template>
            <template v-else> No Workspace context </template>
            <div class="flex flex-col gap-3 text-xs opacity-50">
                <div>
                    <KeyShortcut shortcut="⌃ + S" />
                    Show or hide Side Panel
                </div>
                <div>
                    <KeyShortcut shortcut="⌥ + ⌘" />
                    Show Global Search input
                </div>
                <div>
                    <KeyShortcut shortcut="⌃ + ⌥" />
                    Show Assistant Chat
                </div>
            </div>
        </div>
    </ScrollPanel>
</template>
