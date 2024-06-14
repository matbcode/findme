<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'

import InlineMessage from 'primevue/inlinemessage'

import CustomButton from '../Custom/CustomButton.vue'

import { platforms } from '@/Defaults'

const selectedChannel = ref(null)

const selectChannel = (channel) => {
    selectedChannel.value = channel
}

const createChannel = () => {
    const form = useForm({
        ...selectedChannel.value.payload.data,
    })

    form.submit('post', selectedChannel.value.payload.route, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => console.log('success'),
        onError: () => console.log('error'),
    })
}

const platformClass = (platform) => {
    return {
        'border-1 flex h-24 w-full cursor-pointer items-center justify-center rounded-xl border border-surface-100 bg-white dark:border-surface-800 p-6 dark:shadow-lg shadow-sm transition-colors hover:bg-primary-100 dark:bg-surface-900 bg-surface-50 hover:dark:bg-surface-800 gap-6': true,
        'outline outline-2 outline-primary-500':
            selectedChannel.value?.id === platform.id,
        'opacity-50 cursor-not-allowed pointer-events-none':
            platform.disabled,
    }
}
</script>

<template>
    <div
        class="mx-auto flex w-full max-w-4xl flex-col gap-4 overflow-hidden p-2"
    >
        Please select a platform you would like to connect to your
        profile

        <div class="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div
                v-for="platform in platforms"
                :key="platform.id"
                :disabled="platform.disabled"
                :class="platformClass(platform)"
                @click="selectChannel(platform)"
            >
                <div
                    class="flex h-full w-[60px] items-center justify-center"
                >
                    <font-awesome-icon
                        :icon="platform.icon"
                        size="3x"
                    />
                </div>

                <div class="flex flex-1 flex-col gap-1">
                    <div class="font-semibold">
                        {{ platform.name }}
                    </div>
                    <span
                        class="text-xs text-surface-900 dark:text-surface-300"
                        >{{ platform.description }}</span
                    >
                </div>
            </div>
        </div>
        <InlineMessage severity="info"
            >You will be redirected to the selected platform to
            authorize the connection</InlineMessage
        >
    </div>

    <div class="m-4 flex justify-end gap-8">
        <CustomButton
            class="flex-shrink-0"
            label="Connect Account"
            icon="fa-solid fa-link"
            :disabled="!selectedChannel"
            @click="createChannel"
        />
    </div>
</template>
