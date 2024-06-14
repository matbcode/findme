<script setup>
import { ref, computed, onMounted } from 'vue'

import { useGlobalStore } from '@/Stores'
import { platforms } from '@/Defaults'

import Grid from '@/ComponentsNew/Grid/Grid.vue'
import ConnectedAccountsGridElement from '@/ComponentsNew/Grid/SlotComponents/ConnectedAccountsGridElement.vue'

const store = useGlobalStore()
const { showConnectAccountModal } = store.channels

const props = defineProps({
    accounts: [Array, Object],
})

const actions = ref([
    {
        label: 'Connect Account',
        icon: 'fa-solid fa-link',
        command: () =>
            showConnectAccountModal({
                accounts: props.accounts,
            }),
    },
])

const accountsMapped = computed(() => {
    const allAccounts = []

    for (const platform of platforms.value) {
        if (props.accounts[platform.key]) {
            allAccounts.push(
                ...props.accounts[platform.key].map((account) => ({
                    ...account,
                    platform: platform.code,
                })),
            )
        }
    }

    return allAccounts
})

onMounted(() => {
    const showModal = Boolean(
        store.url.getParam('showConnectAccountModal'),
    )
    if (showModal) {
        store.url.deleteParam('showConnectAccountModal')
        showConnectAccountModal({
            accounts: props.accounts,
        })
    }
})
</script>

<template>
    <Grid
        id="connected-accounts"
        :value="accountsMapped"
        :gridComponent="ConnectedAccountsGridElement"
        :listComponent="ConnectedAccountsGridElement"
        itemPropsName="account"
        :headerProps="{
            title: 'Connected Accounts',
            subtitle: 'Manage connected accounts',
            icon: 'account_circle',
            actions,
        }"
    >
        <template #empty>
            <div
                class="flex flex-col items-center justify-center rounded-xl"
            >
                <div class="text-lg font-semibold">
                    No connected accounts
                </div>
                <div class="text-gray-500">
                    Connect your social media accounts to use them as
                    channels in this project
                </div>
            </div>
        </template>
    </Grid>
</template>
