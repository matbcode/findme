<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import Grid from '@/ComponentsNew/Grid/Grid.vue'
import ProjectAttachedAccountGridElement from '@/ComponentsNew/Grid/SlotComponents/ProjectAttachedAccountGridElement.vue'
import CampaignAccountElement from '@/ComponentsNew/Grid/SlotComponents/CampaignAccountElement.vue'
import SectionHeader from '@/Components/PageWrappers/SectionHeader.vue'
import CreatePostModal from '../CreatePostModal.vue'
import CustomButton from '../Custom/CustomButton.vue'

const store = useGlobalStore()

const props = defineProps({
    project: Object,
    campaign: Object,
    channels: Array,
    accounts: {
        type: [Array, Object],
    },
})

const isVisible = ref(false)
const isAccountSelected = ref(false)
const selectedAccount = ref(null)
</script>
<template>
    <SectionHeader title="Create post" />

    <div
        v-if="!isVisible && !isAccountSelected"
        class="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-8 shadow-sm dark:bg-surface-900"
    >
        <div>
            <div class="text-center">
                <p class="text-lg font-semibold">
                    Select an account to create a post for this
                    campaign
                </p>
            </div>
        </div>
        <CustomButton
            label="Create Post"
            icon="fa-solid fa-plus"
            class="w-max"
            @click="isVisible = true"
        />
    </div>
    <Grid
        v-else-if="!isAccountSelected"
        :value="
            channels.map((channel) => ({
                ...channel,
                project: project,
                campaign: campaign,
            }))
        "
        :gridComponent="CampaignAccountElement"
        :listComponent="CampaignAccountElement"
        :columns="5"
        useAspectSquare
        layout="grid"
        :bindEvents="{
            selected: (account) => {
                selectedAccount = account
                isAccountSelected = true
                isVisible = false
            },
        }"
        itemPropsName="account"
        emptyMessage="No accounts connected to this projects"
    >
        <template #empty>
            <div class="text-center">
                <p>No accounts connected to this project</p>
            </div>
        </template>

        <!-- <template #footer>
            <CreatePostModal
                v-if="isAccountSelected"
                :data="{ account: selectedAccount }"
                @close="isAccountSelected = false"
            />
        </template> -->
    </Grid>
    <CreatePostModal
        v-if="isAccountSelected"
        :data="{ account: selectedAccount }"
        @close="isAccountSelected = false"
    />
</template>
