<script setup>
import { ref } from 'vue'
import { platforms } from '@/Defaults'

import MainLayout from '@/Layouts/MainLayout.vue'
import OauthCallback from '@/Components/PageTemplates/Oauth/OauthCallback.vue'

defineOptions({ layout: MainLayout })

const props = defineProps({
    account: Object,
})

const platform = ref(platforms.value.find((p) => p.key === 'google'))
</script>

<template>
    <OauthCallback
        :account="account"
        :platform="platform"
        title="Google account connected"
    >
        <p class="px-4 text-surface-200">
            This Google account was connected to your profile,
            regarding the permissions you granted, you will be able to
            use Google Drive to use files in your projects. You can
            also connect Youtube channels to your projects to collect
            data and connect it when generating reports.
        </p>
        <div
            class="flex max-w-3xl flex-col gap-2 px-4 dark:text-surface-200"
        >
            <div>
                You can revoke access to this account at any time:
            </div>
            <ul
                class="flex list-disc flex-col gap-4 px-6 py-4 text-sm dark:text-surface-300"
            >
                <li>
                    In Google: Go to your Google account settings and
                    navigate to the "Security and privacy" section.
                    Then, under "Apps and devices," you can find and
                    disconnect Raichi. For more information on
                    managing connected apps in Google, you can visit
                    the
                    <a
                        class="font-semibold text-primary-400"
                        href="https://help.google.com/en"
                        >Help Center</a
                    >
                </li>
                <li>
                    In Raichi: Within your profile settings, you
                    should find a section to manage connected
                    accounts. You can then remove your account.
                </li>
            </ul>
        </div>
    </OauthCallback>
</template>
