<script setup>
import { useGlobalStore } from '@/Stores'

import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import BlockUI from 'primevue/blockui'

import Grid from '@/ComponentsNew/Grid/Grid.vue'
import TestGridElements from '@/ComponentsNew/Grid/SlotComponents/TestGridElements.vue'
import SectionHeader from '@/Components/PageWrappers/SectionHeader.vue'
import Spinner from '@/Components/Custom/Spinner.vue'

const store = useGlobalStore()

const filteredFiles = (files) => {
    const allowedMimeTypes = ['image', 'video']
    return files.filter((file) => {
        return allowedMimeTypes.some((mimeType) => {
            return file.mimeType.includes(mimeType)
        })
    })
}
</script>

<template>
    <BlockUI :blocked="store.files.isFetching" class="h-full">
        <Spinner v-if="store.files.isFetching" />
        <SectionHeader title="Connected media" />
        <div class="rounded-2xl bg-white dark:bg-surface-900">
            <Accordion v-if="store.files.connectedDrives?.length > 0">
                <AccordionTab
                    v-for="drive in store.files.connectedDrives"
                    :key="drive.id"
                >
                    <template #header>
                        <div class="flex items-center gap-4">
                            <font-awesome-icon
                                icon="fa-brands fa-google-drive"
                                size="lg"
                            />
                            <div>
                                {{ drive.google_account.name }}
                                <div class="text-xs font-light">
                                    {{ drive.google_account.email }}
                                </div>
                            </div>
                        </div>
                    </template>
                    <Grid
                        :value="filteredFiles(drive.files.files)"
                        itemPropsName="file"
                        :gridComponent="TestGridElements"
                        :columns="3"
                        :minColumns="1"
                        :maxColumns="4"
                        :showToolbar="true"
                    />
                </AccordionTab>
            </Accordion>
            <div v-else-if="store.files.isFetching">
                <div
                    class="flex h-[100px] w-full items-center justify-center"
                >
                    loading drives...
                </div>
            </div>
            <div v-else>
                <div
                    class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl p-8"
                >
                    <div
                        class="text-lg font-semibold text-surface-800 dark:text-surface-200"
                    >
                        No connected drives
                    </div>
                    <div
                        class="text-sm font-light text-surface-600 dark:text-surface-300"
                    >
                        Connect Google Drive to your account to view
                        files. Go to profile settings to connect.
                    </div>
                </div>
            </div>
        </div>
    </BlockUI>
</template>
