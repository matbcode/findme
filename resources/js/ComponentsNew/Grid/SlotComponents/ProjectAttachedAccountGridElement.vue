<script setup>
import { ref, computed } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import AccountImage from '@/Components/Custom/AccountImage.vue'
import TileWrapper from '@/Components/TileWrapper.vue'

const store = useGlobalStore()
const { showConfirm, showToast } = store.modals

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

const onDetachAccount = () => {
    showConfirm({
        title: 'Are you sure?',
        message:
            'Do you want to detach this account from this project?',
        inlineMessage: {
            text: "Deataching this account will remove it from this project. It won't be deleted from the system. Only owner can reattach it.",
            severity: 'warn',
        },
        confirmButtonProps: {
            label: 'Detach',
            icon: 'unlink',
            severity: 'danger',
        },
        onConfirm: () => {
            const form = useForm({
                instagramAccounts: [],
                facebookPages: [],
                xAccounts: [],
            })

            if (props.account.platform === 'facebook') {
                form.facebookPages.push(props.account.id)
            } else if (props.account.platform === 'instagram') {
                form.instagramAccounts.push(props.account.id)
            } else if (props.account.platform === 'x-twitter') {
                form.xAccounts.push(props.account.id)
            }

            form.submit(
                'post',
                route('project.detach', {
                    slug: store.workspaces.current.slug,
                    project: props.account.project.id,
                }),
                {
                    preserveScroll: true,
                    preserveState: false,
                    onSuccess: () => {
                        showToast({
                            summary: 'Success',
                            severity: 'success',
                            detail: 'Account was detached successfully!!!',
                        })
                        store.modals.closeDialog()
                    },
                    onError: () => {
                        showToast({
                            summary: 'Error',
                            severity: 'error',
                            detail: 'Failed to detached account',
                        })
                    },
                },
            )
        },
    })
}
</script>

<template>
    <TileWrapper>
        <div
            class="flex h-full w-full items-center justify-between p-4"
        >
            <div class="flex w-full flex-col items-center gap-2">
                <AccountImage :image="account.image" />
                <div class="text-xl font-semibold">
                    {{ account.name || account.username }}
                </div>
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
                        class="flex items-center gap-2 px-2 py-1"
                    >
                        <font-awesome-icon
                            :icon="`fa-brands fa-${page.platform}`"
                        />
                        {{ page.name || page.username }}
                    </div>
                </div>
            </div>
        </div>
        <template #actions>
            <CustomButton
                icon="fa-solid fa-unlink"
                class="opacity-0 group-hover:opacity-100"
                text
                severity="danger"
                @click="onDetachAccount"
            />
        </template>
        <template #details>
            <div class="p-2">
                <font-awesome-icon
                    :icon="`fa-brands fa-${account.platform}`"
                    size="lg"
                />
            </div>
        </template>
        <!-- <template #footer>
            Connected:
            {{ store.user.getFormattedDate(account.created_at) }}
        </template> -->
    </TileWrapper>
</template>
