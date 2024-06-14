<script setup>
import AcocuntImage from '@/Components/Custom/AccountImage.vue'

const props = defineProps({
    account: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <div
        class="flex rounded-xl p-4 outline-primary-500 dark:bg-surface-900 dark:shadow-lg"
    >
        <div class="flex items-center gap-4">
            <AccountImage :image="account.image" />

            <div class="flex flex-col justify-center">
                <div class="text-2xl font-semibold">
                    {{ account.name }}
                </div>
                <div
                    v-if="account.username"
                    class="text-xs text-surface-200"
                >
                    @{{ account.username }}
                </div>
            </div>
        </div>
    </div>
</template>
