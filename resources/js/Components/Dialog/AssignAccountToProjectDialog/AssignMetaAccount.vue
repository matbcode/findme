<script setup>
import { ref, computed, watch } from 'vue'

import Checkbox from 'primevue/checkbox'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import AccountImage from '@/Components/Custom/AccountImage.vue'

const emit = defineEmits(['select', 'deselect'])

const props = defineProps({
    account: Object,
})

const selectedAccounts = ref([])

const instagramAccounts = computed(() => {
    return props.account.instagram_accounts?.map((account) => ({
        ...account,
        platform: 'instagram',
    }))
})

const facebookPages = computed(() => {
    return props.account.facebook_pages?.map((page) => ({
        ...page,
        platform: 'facebook',
    }))
})

const pageClass = (page) => {
    return {
        'border-1 flex h-24 w-full cursor-pointer items-center rounded-lg border border-surface-800 bg-surface-900 p-6 shadow-lg transition-colors hover:bg-surface-800 gap-4': true,
        'outline outline-2 outline-primary-500':
            selectedAccounts.value.includes(page),
        'opacity-50 cursor-not-allowed pointer-events-none': false,
    }
}

const selectAccount = (account) => {
    if (selectedAccounts.value.includes(account)) {
        selectedAccounts.value = selectedAccounts.value.filter(
            (a) => a.id !== account.id,
        )
        emit('deselect', account)
    } else {
        selectedAccounts.value.push(account)
        emit('select', account)
    }
}

const onSelectAll = (collection) => {
    selectedAccounts.value = [
        ...props.account.facebook_pages,
        ...props.account.instagram_accounts,
    ]
    selectedAccounts.value.forEach((account) => {
        emit('select', account)
    })
}

const wrapperClass = computed(() => {
    return {
        'border-1 flex flex-col gap-4 rounded-xl border bg-surface-900 p-4 dark:border-surface-800': true,
        'outline outline-1 outline-primary-700 outline-dashed':
            selectedAccounts.value.length,
    }
})
</script>

<template>
    <div :class="wrapperClass">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
                <AccountImage :image="account.image" />

                <div class="text-lg font-semibold">
                    {{ account.name }}
                </div>
            </div>

            <font-awesome-icon icon="fa-brands fa-meta" />
        </div>
        <div v-if="facebookPages?.length" class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
                <h2 class="text-sm">Facebook Pages</h2>
                <CustomButton
                    label="Select all"
                    icon="facebook"
                    text
                    @click="onSelectAll"
                />
            </div>
            <div
                v-for="page in facebookPages"
                :key="page.id"
                :class="pageClass(page)"
                @click="selectAccount(page)"
            >
                <Checkbox
                    :modelValue="selectedAccounts.includes(page)"
                    binary
                    @click.stop="selectAccount(page)"
                />
                <AccountImage :image="page.image" />

                <h2>{{ page.name }}</h2>
            </div>
        </div>
        <div
            v-if="instagramAccounts?.length"
            class="mt-4 flex flex-col gap-4"
        >
            <div class="flex items-center justify-between">
                <h2 class="text-sm">Instagram accounts</h2>
            </div>
            <div
                v-for="page in instagramAccounts"
                :key="page.id"
                :class="pageClass(page)"
                @click="selectAccount(page)"
            >
                <Checkbox
                    :modelValue="selectedAccounts.includes(page)"
                    binary
                    @click.stop="selectAccount(page)"
                />
                <AccountImage :image="page.image" />

                <h2>{{ page.username }}</h2>
            </div>
        </div>
    </div>
</template>
