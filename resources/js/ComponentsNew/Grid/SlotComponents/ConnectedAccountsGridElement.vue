<script setup>
import { computed } from 'vue'
import { useGlobalStore } from '@/Stores'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import AccountImage from '@/Components/Custom/AccountImage.vue'
import TileWrapper from '@/Components/TileWrapper.vue'

const store = useGlobalStore()

const props = defineProps({
    account: Object,
})
const pages = computed(() => {
    const allPages = []

    if (props.account.platform === 'meta') {
        if (props.account.facebook_pages) {
            allPages.push(
                ...props.account.facebook_pages.map((page) => ({
                    ...page,
                    platform: 'facebook',
                })),
            )
        }

        if (props.account.instagram_accounts) {
            allPages.push(
                ...props.account.instagram_accounts.map((page) => ({
                    ...page,
                    platform: 'instagram',
                })),
            )
        }
    }

    return allPages
})
</script>

<template>
    <TileWrapper :selectable="false">
        <div
            class="flex h-full w-full items-center justify-between p-8"
        >
            <div class="flex w-full flex-col items-center gap-4">
                <AccountImage :image="account.image" />
                <div class="text-xl font-semibold">
                    {{ account.name || account.username }}
                </div>
                <!-- <div class="text-xs text-surface-400">
                    Connected:
                    {{
                        store.user.getFormattedDate(
                            account.created_at,
                        )
                    }}
                </div> -->
                <div
                    v-if="pages.length"
                    class="text-sm text-surface-200"
                >
                    Connected accounts:
                </div>
                <div
                    v-if="account.platform === 'meta'"
                    class="flex flex-wrap items-center justify-center gap-2"
                >
                    <div
                        v-for="page in pages"
                        :key="page.id"
                        class="flex items-center gap-2 rounded-lg bg-surface-800 px-2 py-1"
                    >
                        <font-awesome-icon
                            :icon="`fa-brands fa-${page.platform}`"
                        />
                        {{ page.name || page.username }}
                    </div>
                </div>
            </div>
            <div class="absolute inset-2 items-center gap-4">
                <font-awesome-icon
                    :icon="`fa-brands fa-${account.platform}`"
                    size="lg"
                />
            </div>
            <!-- <div class="absolute right-4 top-4">
                <CustomButton icon="fa-solid fa-ellipsis" text />
            </div> -->
        </div>
    </TileWrapper>
</template>
