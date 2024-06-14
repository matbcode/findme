<script setup>
import { onMounted } from 'vue'

import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import DataView from 'primevue/dataview'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import KeyShortcut from '../Global/UI/KeyShortcut.vue'

const products = [
    {
        type: 'command',
        label: 'Create New Project',
    },
    {
        type: 'command',
        label: 'Create New Project',
    },
    {
        type: 'command',
        label: 'Create New Project',
    },
    {
        type: 'command',
        label: 'Create New Project',
    },
]
</script>

<template>
    <div class="flex w-[700px] flex-col gap-8 rounded-[29px] p-0">
        <div class="flex flex-col items-center gap-4">
            <InputGroup class="rounded-full border">
                <InputGroupAddon>
                    <div
                        class="absolute left-0 top-[-32px] text-xs text-surface-300"
                    >
                        Press
                        <KeyShortcut shortcut="⌃ + ⌥" />
                        to switch to Assistant Chat
                    </div>

                    <font-awesome-icon
                        icon="fa-solid fa-magnifying-glass"
                        class="px-4"
                        size="xl"
                    />
                </InputGroupAddon>
                <InputText class="w-full border-0" size="large" />
            </InputGroup>
            <div class="text-sm text-surface-300">
                Start with '@'to only search for users, 'post:' to
                search for posts and 'project:'' to search for
                projects
            </div>
            <!-- 
            <CustomButton
                class="rounded-full"
                icon="fa-solid fa-microphone"
                rounded
                size="large"
                text
            /> -->
        </div>

        <DataView :value="products" class="rounded-2xl" autofocus>
            <template #list="slotProps">
                <div class="flex flex-wrap">
                    <div
                        v-for="(item, index) in slotProps.items"
                        :key="index"
                        class="w-full p-1"
                    >
                        <div
                            :tabindex="index"
                            class="border-1 flex items-center gap-4 rounded-2xl border border-surface-500/40 bg-surface-100 p-4 dark:bg-surface-900 dark:focus:bg-primary-600"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-terminal"
                            />
                            {{ item.label }}
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
</template>
