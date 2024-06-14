<script setup>
import DataView from 'primevue/dataview'

import WorkspaceCard from '@/Components/Cards/WorkspaceCard.vue'

const props = defineProps({
    workspaces: Object,
})
</script>
<template>
    <DataView :value="workspaces" layout="grid">
        <template #grid="slotProps">
            <div class="flex flex-wrap">
                <div
                    v-for="(item, index) in slotProps.items"
                    :key="index"
                    class="w-full p-2 sm:w-4/12 xl:w-3/12"
                >
                    <WorkspaceCard
                        :workspace="item"
                        :key="item.slug"
                    />
                </div>
            </div>
        </template>
    </DataView>
</template>
