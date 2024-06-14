<script setup>
import { onMounted, ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

import SectionHeader from '../PageWrappers/SectionHeader.vue'
import CustomButton from '../Custom/CustomButton.vue'
import Avatar from '../Custom/Avatar.vue'

const store = useGlobalStore()

onMounted(() => {
    store.projects.fetch()
})
</script>

<template>
    <div>
        <SectionHeader title="Projects" />

        <Accordion
            v-if="store.projects.collection.length > 0"
            class="flex flex-col gap-0"
        >
            <AccordionTab
                v-for="project in store.projects.collection"
                :key="project.id"
            >
                <template #header>
                    <div
                        class="flex w-full items-center justify-between gap-4"
                        @click="store.campaigns.fetch({ project })"
                    >
                        <div class="flex items-center gap-2 text-sm">
                            <Avatar :user="project" />

                            {{ project.name }}
                        </div>
                        <div>
                            <CustomButton
                                icon="fa-solid fa-pencil"
                                text
                                rounded
                                size="small"
                                plain
                                @click.stop="
                                    store.projects.gotoEditProject({
                                        id: project.id,
                                    })
                                "
                            />
                            <!-- <font-awesome-icon
                                icon="fa-solid fa-pencil"
                            /> -->
                        </div>
                    </div>
                </template>
                <div
                    v-if="
                        store.campaigns.collection.length === 0 &&
                        !store.campaigns.isFetching
                    "
                >
                    No campaigns found
                </div>
                <div v-for="campaign in store.campaigns.collection">
                    {{ campaign.status }}
                    {{ campaign.title }}
                    {{ campaign.release_at || 'not scheduled' }}
                </div>
            </AccordionTab>
        </Accordion>
    </div>
</template>
