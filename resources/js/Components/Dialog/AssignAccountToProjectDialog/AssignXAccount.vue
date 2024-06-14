<script setup>
import { ref, computed } from 'vue'

import Checkbox from 'primevue/checkbox'

import AccountImage from '@/Components/Custom/AccountImage.vue'

const emit = defineEmits(['select', 'deselect'])

const props = defineProps({
    account: Object,
})

const selectedAccount = ref(false)

const pageClass = computed(() => {
    return {
        'border-1 flex h-24 w-full cursor-pointer items-center rounded-lg border border-surface-100 hover:bg-primary-100 dark:border-surface-800 dark:bg-surface-900 bg-white p-6 shadow-lg transition-colors dark:hover:bg-surface-800 gap-8': true,
        'outline outline-2 outline-primary-500':
            selectedAccount.value,
        'opacity-50 cursor-not-allowed pointer-events-none': false,
    }
})

const selectAccount = () => {
    if (selectedAccount.value) {
        selectedAccount.value = false
        emit('deselect', { ...props.account, platform: 'x-twitter' })
    } else {
        selectedAccount.value = true
        emit('select', { ...props.account, platform: 'x-twitter' })
    }
}
</script>

<template>
    <div :class="pageClass" @click="selectAccount">
        <div class="flex w-full items-center justify-between">
            <div class="flex items-center gap-4">
                <Checkbox
                    :modelValue="selectedAccount"
                    binary
                    @click.stop="selectAccount"
                />
                <AccountImage :image="account.image" />
                <div class="text-lg font-semibold">
                    {{ account.name }}
                </div>
            </div>

            <font-awesome-icon
                icon="fa-brands fa-x-twitter"
                size="2x"
            />
        </div>
    </div>
</template>
