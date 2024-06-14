<script setup>
import { Link } from "@inertiajs/vue3";

const props = defineProps({
    links: {
        type: Array,
        default: () => [],
    },
    expanded: {
        type: Boolean,
        default: false,
    },
});
</script>
<template>
    <div
        v-if="links && links?.length > 0"
        class="flex flex-col gap-5 ml-2 text-surface-600 dark:text-surface-200"
    >
        <Link
            v-if="expanded"
            :href="links[0].href"
            class="flex align-items gap-2 hover:text-primary-500 hover:dark:text-primary-400"
        >
            <span class="material-icons">{{ links[0].icon }}</span>
            <span v-if="!expanded">{{ links[0].label }}</span>
        </Link>
        <Link
            v-else
            v-for="link in links"
            :key="link.label"
            :href="link.href"
            class="flex align-items gap-2 hover:text-primary-500 hover:dark:text-primary-400"
        >
            <span class="material-icons">{{ link.icon }}</span>
            <span v-if="!expanded">{{ link.label }}</span>
        </Link>
    </div>
</template>
