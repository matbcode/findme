<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Link } from '@inertiajs/vue3'
import Skeleton from 'primevue/skeleton'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import NavItem from '@/Components/Website/NavItem.vue'

// Reactive variable to track the scroll position
const scrollPosition = ref(0)

// Function to update scroll position
const handleScroll = () => {
    scrollPosition.value = window.scrollY
}

// Add scroll event listener on mount and remove on unmount
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const headerClasses = computed(() => ({
    'bg-opacity-0': scrollPosition.value === 0,
    'bg-opacity-100': scrollPosition.value !== 0,
    'text-surface-700': scrollPosition.value !== 0,
    'shadow-lg': scrollPosition.value !== 0,
    'text-surface-50': scrollPosition.value === 0,
}))

const logoClasses = computed(() => ({
    'fill-surface-50': scrollPosition.value === 0,
    'fill-indigo-600': scrollPosition.value !== 0,
    'text-indigo-600': scrollPosition.value !== 0,
    'text-surface-50': scrollPosition.value === 0,
}))
</script>

<template>
    <header
        :class="[
            'dark fixed left-0 right-0 top-0 z-50 h-20 bg-surface-50 duration-500 ease-in-out',
            headerClasses,
        ]"
    >
        <nav
            class="container mx-auto flex h-full max-w-6xl items-center justify-between"
        >
            <div class="flex items-center gap-9">
                <Link
                    :href="route('static.welcome')"
                    class="flex flex-row items-center gap-2"
                >
                    <span
                        :class="[
                            '-translate-y-[2px] text-2xl font-bold tracking-tighter transition-all duration-500 ease-in-out',
                            logoClasses,
                        ]"
                        >imlost</span
                    >
                </Link>
            </div>
            <div>
                <Link
                    v-if="$attrs.auth.user === null"
                    :href="route('dashboard')"
                >
                    <CustomButton
                        label="Sign in"
                        class="!bg-indigo-600"
                    />
                </Link>
                <Link v-else :href="route('dashboard')">
                    <CustomButton
                        label="Dashboard"
                        class="!bg-indigo-600"
                    />
                </Link>
            </div>
        </nav>
    </header>
    <main class="dark">
        <slot />
    </main>
</template>
