<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import FormWrapper from '@/Components/PageWrappers/FormWrapper.vue'

const props = defineProps({
    title: {
        type: String,
        default: null,
    },
    actions: {
        type: Array,
    },
    color: {
        type: String,
        default: null,
    },
    tags: {
        type: Array,
        default: () => [],
    },
    links: {
        type: Array,
        default: () => [],
    },
    formBody: {
        type: Object,
        default: null,
    },
    expanded: {
        type: Boolean,
        default: false,
    },
    expandable: {
        type: Boolean,
        default: true,
    },
    showExpandButton: {
        type: Boolean,
        default: true,
    },
    showHeader: {
        type: Boolean,
        default: false,
    },
})

const classes = computed(() => {
    return {
        'w-full flex flex-col gap-8': true,
        // 'max-w-[2560px]': isExpanded.value,
        'max-w-screen-xl': true,
    }
})

const icon = computed(() => {
    return 'fa-solid fa-up-right-and-down-left-from-center'
})
</script>
<template>
    <!-- <div
        id="wrapper-content"
        class="flex h-full w-full justify-center pb-8"
    >
        <div :class="classes">
            <div class="flex flex-col gap-8">
                <slot />
            </div>
        </div>
    </div> -->
    <div class="flex h-full w-full justify-center">
        <div
            class="flex h-full w-full max-w-screen-xl flex-col gap-8"
        >
            <slot />
        </div>
    </div>
</template>
