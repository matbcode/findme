<script setup>
import { useGlobalStore } from '@/Stores'

import Avatar from '@/Components/Custom/Avatar.vue'

const store = useGlobalStore()
const { getFormattedDate } = store.user

const props = defineProps({
    activity: Object,
})
</script>

<template>
    <div
        class="flex items-center rounded-2xl bg-surface-100 p-2 dark:bg-surface-900"
    >
        <Avatar
            :user="activity.user"
            size="42px"
            class="flex-shrink-0"
        />
        <div class="ml-4 w-full">
            <div class="flex w-full items-center justify-between">
                <div class="font-bold">
                    {{
                        activity.user.first_name &&
                        activity.user.last_name
                            ? activity.user.first_name +
                              ' ' +
                              activity.user.last_name
                            : activity.user.username
                    }}
                </div>
                <div class="text-xs font-light">
                    {{ getFormattedDate(activity.created_at) }}
                </div>
            </div>
            <div>
                {{ activity.body }}
            </div>
        </div>
    </div>
</template>
