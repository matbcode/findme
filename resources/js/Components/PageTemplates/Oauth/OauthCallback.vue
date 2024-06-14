<script setup>
import { useGlobalStore } from '@/Stores'

import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import AccountDetails from '@/Components/PageTemplates/Oauth/AccountDetails.vue'
import PlatformDetails from '@/Components/PageTemplates/Oauth/PlatformDetails.vue'

const store = useGlobalStore()

const props = defineProps({
    account: {
        type: Object,
        required: true,
    },
    platform: {
        type: Object,
        required: true,
    },
    title: {
        type: String,
        default: 'Account connected',
    },
})

const onConfirm = () => store.url.goBackPage()
</script>

<template>
    <WideWrapper>
        <div class="flex h-full flex-col">
            <div class="flex flex-col gap-12 rounded-md p-8">
                <h1 class="text-2xl font-bold">
                    {{ title }}
                </h1>

                <AccountDetails :account />
                <slot />

                <PlatformDetails :platform />
                <slot name="actions">
                    <div class="mt-8 flex justify-end">
                        <CustomButton
                            label="Go back"
                            icon="fa-regular fa-check-circle"
                            @click="onConfirm"
                        />
                    </div>
                </slot>
            </div>
        </div>
    </WideWrapper>
</template>
