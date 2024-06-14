<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import Grid from '@/ComponentsNew/Grid/Grid.vue'
import GoogleDriveGridElement from '@/ComponentsNew/Grid/SlotComponents/GoogleDriveGridElement.vue'

const store = useGlobalStore()

store.files.fetchDrives({
    onSuccess: () => {
        // actions.value[0].disabled =
        //     store.files.connectedDrives.length >= 6
    },
})
</script>

<template>
    <Grid
        :value="store.files.connectedDrives"
        :listComponent="GoogleDriveGridElement"
        :gridComponent="GoogleDriveGridElement"
        itemPropsName="drive"
        :loading="store.files.isFetching"
        :headerProps="{
            title: store.t('@Profile.DrivesGrid.title'),
        }"
    >
        <template #empty>
            <div
                class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl p-8"
            >
                <div class="text-lg font-semibold text-surface-100">
                    No drives connected
                </div>
                <div class="text-sm font-light text-surface-300">
                    Connect your Google account to access your drives
                </div>
            </div>
        </template>
    </Grid>
</template>
