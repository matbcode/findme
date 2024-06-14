<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGlobalStore } from '@/Stores'

import Button from 'primevue/button'
import TieredMenu from 'primevue/tieredmenu'

const { t } = useI18n({})
const store = useGlobalStore()
const { showCreateCampaignModal } = store.campaigns

const menu = ref()
const items = ref([
    {
        label: t('@Workspace.Calendar.newEventIn'),
        items: store.projects.collection.map((project) => {
            return {
                label: project.name,
                command: () => showCreateCampaignModal({ project }),
            }
        }),
    },
])

const toggle = (event) => {
    menu.value.toggle(event)
}
</script>

<template>
    <Button class="hidden min-w-max sm:flex" raised @click="toggle">
        <template #icon>
            <span class="material-icons">edit_calendar</span>
        </template>
    </Button>
    <TieredMenu
        ref="menu"
        id="overlay_menu"
        :model="items"
        :popup="true"
    />
</template>
