<script setup>
import { ref, computed, defineModel } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useMountEventListener } from '@/Composables/eventListener'
import { useGlobalStore } from '@/Stores'

import Logo from '@/Components/Navbar/Logo.vue'
import WorkspacesButton from '@/Components/Navbar/WorkspacesButton.vue'
import AvatarButton from '@/Components/Navbar/AvatarButton.vue'
import NotificationsButton from '@/Components/Navbar/NotificationsButton.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import GlobalSidebar from '@/ComponentsNew/Navigation/GlobalSidebar.vue'

const store = useGlobalStore()

const nav = ref(null)
const model = defineModel('sidepanel')

const navbarDisabledPages = [
    'Welcome',
    'Login',
    'Register',
    'ForgotPassword',
]
const isVisible = computed(
    () => !navbarDisabledPages.includes(store.url.page),
)

let blurValue = 0
let shadowPixels = 0
let shadowOpacity = 0

const navStyle = ref({})

const onScroll = () => {
    blurValue = Math.round(Math.min(window.scrollY / 5, 20), 0)
    shadowPixels = Math.round(Math.min(window.scrollY / 5, 30), 0)
    shadowOpacity = Math.min(window.scrollY / 500, 0.25)

    if (window.scrollY > 3) {
        navStyle.value = {
            boxShadow: `0 25px 32px -12px rgb(0 0 0 / ${shadowOpacity})`,
            backdropFilter: `blur(${blurValue}px)`,
        }
        nav.value.classList.add(
            'border-b',
            'bg-white/40',
            'dark:bg-surface-800/20',
        )
    } else {
        navStyle.value = {}
        nav.value.classList.remove(
            'border-b',
            'bg-white/40',
            'dark:bg-surface-800/20',
        )
    }
}

const toggleSidebar = () => {
    model.value = !model.value
}

useMountEventListener(window, 'scroll', onScroll)
</script>

<template>
    <nav
        v-if="isVisible"
        ref="nav"
        class="min-w-screen sticky top-0 z-50 grid grid-cols-3 justify-between border-surface-200/20 px-4 py-2 dark:border-surface-800/20"
        :style="navStyle"
    >
        <div class="flex items-center gap-4">
            <CustomButton
                class="flex-shrink-0"
                icon="fa-solid fa-bars"
                @click="toggleSidebar"
                text
                severity="secondary"
                rounded
            />
            <Logo />
            <Link
                v-if="store.url.navbarPrependAction"
                :href="store.url.navbarPrependAction.href"
                class="flex-shrink-0"
            >
                <CustomButton
                    v-bind="store.url.navbarPrependAction"
                    rounded
                    severity="secondary"
                />
            </Link>
        </div>
        <div
            class="flex w-full items-center gap-6 justify-self-end"
        ></div>
        <div class="flex items-center gap-4 justify-self-end">
            <WorkspacesButton class="flex-shrink-0" />
            <CustomButton
                v-if="store.url.navbarAppendAction"
                v-bind="store.url.navbarAppendAction.props"
                v-on="store.url.navbarAppendAction.events"
                rounded
            />
            <NotificationsButton />
            <AvatarButton />
        </div>
        <!-- <GlobalSidebar v-model:visible="isSidebarVisible" /> -->
    </nav>
</template>
x
