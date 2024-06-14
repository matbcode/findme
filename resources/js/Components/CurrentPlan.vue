<script setup lang="ts">
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'

import CustomButton from '@/Components/Custom/CustomButton.vue'
</script>

<template>
    <div
        class="w-full rounded-2xl border border-surface-500/40 bg-primary-50 shadow-sm dark:bg-surface-900"
    >
        <div class="flex justify-between p-6">
            <div>
                <div class="text-gray-900 dark:text-white">
                    Current Plan:
                    <span class="text-xl font-black">Free</span>
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                    Your trial is active until <b>October 23, 2024</b>
                </div>
            </div>
            <CustomButton
                label="Upgrade Plan"
                size="small"
                severity="success"
                icon="electric_bolt"
                class="flex-shrink-0"
            />
        </div>
        <!-- <div class="flex justify-between p-4">
            <ul class="mb-0">
                <li
                    class="flex items-center text-sm text-gray-700 dark:text-gray-300"
                >
                    5 projects
                </li>
                <li
                    class="flex items-center text-sm text-gray-700 dark:text-gray-300"
                >
                    6 users
                </li>
                <li
                    class="flex items-center text-sm text-gray-700 dark:text-gray-300"
                >
                    No AI features
                </li>
            </ul>
            <div class="flex justify-center"></div>
        </div> -->
    </div>
</template>
