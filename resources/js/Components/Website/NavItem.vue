<script setup>
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    route: String,
})
</script>

<template>
    <Link :href="route">
        <li
            class="text-base hover:text-indigo-500"
        >
            <slot />
        </li>
    </Link>
</template>
