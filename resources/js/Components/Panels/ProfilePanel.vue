<script setup>
import { computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'

import Button from 'primevue/button'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import Avatar from '@/Components/Custom/Avatar.vue'

const page = usePage()
const user = computed(() => page.props.auth.user)
const { t } = useI18n({})
</script>
<template>
    <div
        v-if="user"
        class="flex max-h-[800px] flex-col gap-5 p-4 lg:w-full"
    >
        <div class="flex w-full items-center">
            <Avatar :user="user" size="64px" showName />
        </div>
        <div
            v-for="invitation in page.props.invitations"
            :key="invitation.id"
            class="flex flex-row p-4"
        >
            <p>New invitation: {{ invitation.workspace_id }}</p>
            <div>
                <Button icon="pi pi-check" aria-label="Join" />
                <Button
                    severity="danger"
                    icon="pi pi-times"
                    aria-label="Reject"
                />
            </div>
        </div>
        <div class="mt-4 flex flex-col justify-center gap-2">
            <Link
                href="/privacy-policy"
                class="flex w-full items-center justify-center"
            >
                <CustomButton
                    label="Privacy policy"
                    icon="shield"
                    size="small"
                    text
                    severity="secondary"
                    class="w-full"
                />
            </Link>
            <Link
                href="/cookie-policy"
                class="flex w-full items-center justify-center"
            >
                <CustomButton
                    label="Cookie policy"
                    icon="cookie"
                    size="small"
                    text
                    severity="secondary"
                    class="w-full"
                />
            </Link>
            <Link
                href="/terms-and-conditions"
                class="flex w-full items-center justify-center"
            >
                <CustomButton
                    label="Terms and conditions"
                    icon="book"
                    size="small"
                    text
                    severity="secondary"
                    class="w-full"
                />
            </Link>
            <!-- <Link
                :href="route('profile.edit')"
                class="flex w-full items-center justify-center"
            >
                <CustomButton
                    label="Help & Feedback"
                    icon="help"
                    size="small"
                    text
                    severity="secondary"
                    class="w-full"
                />
            </Link> -->
        </div>
        <div class="mt-4 flex w-full justify-center gap-2">
            <Link
                :href="route('profile.edit')"
                as="button"
                class="w-full"
            >
                <Button
                    icon="pi pi-cog"
                    :label="$t('@Navbar.-.manageProfile')"
                    class="w-full"
                />
            </Link>
            <Link
                :href="route('logout')"
                method="post"
                as="button"
                class="w-full"
            >
                <Button
                    text
                    icon="pi pi-sign-in"
                    severity="danger"
                    :label="$t('@Navbar.-.logout')"
                    class="w-full"
                />
            </Link>
        </div>
    </div>
</template>
