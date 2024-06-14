<script setup>
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    isLink: {
        type: Boolean,
        default: true,
    },
})
</script>
<template>
    <div class="flex shrink-0 items-center">
        <Link
            v-if="isLink"
            :href="route('dashboard')"
            class="logo relative hover:scale-95"
        >
            <span class="text-xl font-bold"> Imlost</span>
        </Link>
    </div>
</template>
