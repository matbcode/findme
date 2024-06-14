<script setup>
import { computed } from 'vue'

const props = defineProps({
    selectable: { type: Boolean, default: true },
    selected: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
})

const wrapperClass = computed(() => {
    return {
        'group relative h-full w-full rounded-2xl bg-white dark:bg-surface-800': true,
        'cursor-pointer shadow-sm':
            !props.disabled && props.selectable,
        'cursor-not-allowed  pointer-events-none': props.disabled,
        'outline outline-2 -outline-offset-2 outline-surface-800':
            props.selected,
    }
})

const maskClass = computed(() => {
    return {
        'absolute inset-0 h-full w-full bg-black opacity-0': true,
        'group-hover:opacity-20': props.selectable && !props.disabled,
    }
})
</script>

<template>
    <div v-ripple :class="wrapperClass">
        <div :class="maskClass" />
        <div class="absolute right-1 top-1 z-40">
            <slot name="actions" />
        </div>
        <div class="absolute left-1 top-1 z-40">
            <slot name="details" />
        </div>
        <slot />

        <div class="absolute bottom-1 left-1 right-1 truncate">
            <slot name="footer" />
        </div>
    </div>
</template>
