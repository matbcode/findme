<script setup>
import { ref, computed, toRefs } from 'vue'
import { router, useForm } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import ScrollPanel from 'primevue/scrollpanel'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import AssignMetaAccount from './AssignMetaAccount.vue'
import AssignXAccount from './AssignXAccount.vue'

const store = useGlobalStore()
const { showToast } = store.modals
const { showConnectAccountModal } = store.channels

const props = defineProps({
    data: Object,
})

const { project } = toRefs(props.data)

const accounts = ref(props.data.accounts)

const selectedFacebookPages = ref([])
const selectedInstagramAccounts = ref([])
const selectedXAccounts = ref([])
const selectedAccounts = computed(() => [
    ...selectedFacebookPages.value,
    ...selectedInstagramAccounts.value,
    ...selectedXAccounts.value,
])

const hasAnyAccount = computed(
    () =>
        accounts.value.meta.length > 0 || accounts.value.x.length > 0,
)

const onConnectNewAccount = () => {
    store.modals.closeDialog()

    // store.url.setParam('showConnectAccountModal', true)
    // router.visit(route('profile.edit'))
    store.url.setGoBackPage()

    showConnectAccountModal({
        accounts: accounts,
    })
}

const addAccount = (account) => {
    switch (account.platform) {
        case 'facebook':
            selectedFacebookPages.value.push(account)
            break
        case 'instagram':
            selectedInstagramAccounts.value.push(account)
            break
        case 'x-twitter':
            selectedXAccounts.value.push(account)
            break
        default:
            break
    }
}

const removeAccount = (account) => {
    switch (account.platform) {
        case 'facebook':
            selectedFacebookPages.value =
                selectedFacebookPages.value.filter(
                    (selectedAccount) =>
                        selectedAccount.id !== account.id,
                )
            break
        case 'instagram':
            selectedInstagramAccounts.value =
                selectedInstagramAccounts.value.filter(
                    (selectedAccount) =>
                        selectedAccount.id !== account.id,
                )
            break
        case 'x-twitter':
            selectedXAccounts.value = selectedXAccounts.value.filter(
                (selectedAccount) =>
                    selectedAccount.id !== account.id,
            )
            break
        default:
            break
    }
}

const onAssignAccounts = () => {
    const form = useForm({
        instagramAccounts: selectedInstagramAccounts.value.map(
            (account) => account.id,
        ),
        facebookPages: selectedFacebookPages.value.map(
            (account) => account.id,
        ),
        xAccounts: selectedXAccounts.value.map(
            (account) => account.id,
        ),
    })

    form.submit(
        'post',
        route('project.attach', {
            slug: store.workspaces.current.slug,
            project: project.value.id,
        }),
        {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                showToast({
                    summary: 'Success',
                    severity: 'success',
                    detail: 'Accounts assigned successfully!!!',
                })
                store.modals.closeDialog()
            },
            onError: () => {
                showToast({
                    summary: 'Error',
                    severity: 'error',
                    detail: 'Failed to assign accounts',
                })
            },
        },
    )
}
</script>

<template>
    <div class="mx-auto flex-col gap-8 p-4">
        <div class="mb-4 flex flex-col gap-4">
            <div>
                Select accounts you wish to assign to
                <span class="font-semibold text-primary-400">
                    {{ project.name }}
                </span>
                or connect a new account
            </div>
            <div class="flex w-full justify-between gap-4">
                <CustomButton
                    label="Connect new account"
                    icon="account_circle"
                    text
                    size="small"
                    @click="onConnectNewAccount"
                />
                <CustomButton
                    label="Assign accounts"
                    icon="done"
                    :badge="selectedAccounts.length"
                    size="small"
                    :disabled="selectedAccounts.length === 0"
                    @click="onAssignAccounts"
                />
            </div>
        </div>
        <ScrollPanel
            v-if="hasAnyAccount"
            style="max-height: 60vh; width: 100%"
        >
            <div class="p-4">
                <div class="flex h-full flex-col gap-4">
                    <AssignMetaAccount
                        v-for="account in accounts.meta"
                        :key="account.id"
                        :account
                        @select="addAccount"
                        @deselect="removeAccount"
                    />
                    <AssignXAccount
                        v-for="account in accounts.x"
                        :key="account.id"
                        :account
                        @select="addAccount"
                        @deselect="removeAccount"
                    />
                </div>
            </div>
        </ScrollPanel>
    </div>
</template>
