<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Link } from '@inertiajs/vue3'

import Button from 'primevue/button'

import Logo from '@/Components/Navbar/Logo.vue'
import WorkspacesButton from '@/Components/Navbar/WorkspacesButton.vue'
import NotificationsButton from '@/Components/Navbar/NotificationsButton.vue'
import AvatarButton from '@/Components/Navbar/AvatarButton.vue'
// import Clipboard from "@/Components/Navbar/Clipboard.vue";

const props = defineProps({
    visible: {
        type: Boolean,
        default: true,
    },
    isLoggedIn: {
        type: Boolean,
        required: true,
    },
})

const nav = ref(null)

const onScroll = () => {
    if (window.pageYOffset > 0) {
        nav.value.classList.add(
            'shadow-sm',
            'bg-white/30',
            'dark:bg-surface-900/20',
            'backdrop-blur-md',
        )
    } else {
        nav.value.classList.remove(
            'shadow-sm',
            'bg-white/30',
            'dark:bg-surface-900/20',
            'backdrop-blur-md',
        )
    }
}

onMounted(() => {
    window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})
</script>

<template>
    <nav
        v-if="visible"
        ref="nav"
        class="min-w-screen sticky top-0 z-50 py-1 transition duration-300"
    >
        <div
            class="mx-auto max-w-screen-4xl px-4 py-1 sm:px-6 lg:px-8"
        >
            <div class="flex h-12 items-center justify-between">
                <div class="flex items-center gap-12">
                    <Logo />
                </div>
                <div class="flex items-center gap-4">
                    <Link
                        v-if="$page.props.auth.user"
                        :href="route('dashboard')"
                        class="font-semibold hover:text-surface-900 focus:rounded-2xl focus:outline focus:outline-2 focus:outline-red-500 dark:hover:text-white"
                        >Dashboard
                    </Link>
                    <template v-else>
                        <Link
                            :href="route('register')"
                            class="ms-4 font-semibold hover:text-surface-900 focus:rounded-2xl focus:outline focus:outline-2 focus:outline-red-500 dark:hover:text-white"
                            >Register
                        </Link>
                        <Link
                            :href="route('login')"
                            class="font-semibold hover:text-surface-900 focus:rounded-2xl focus:outline focus:outline-2 focus:outline-red-500 dark:hover:text-white"
                        >
                            <Button label="Log in" rounded outlined />
                        </Link>
                    </template>
                </div>
            </div>
        </div>
    </nav>
</template>
