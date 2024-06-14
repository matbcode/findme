<script setup>
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

import Badge from 'primevue/badge'
const page = usePage()

const emit = defineEmits(['edit'])

const props = defineProps({
    user: {
        type: Object,
        required: true,
    },
    notifications: {
        type: Array,
        default: () => [],
    },
    size: {
        type: String,
        default: '32px',
    },
    editable: {
        type: Boolean,
        default: false,
    },
    rounded: {
        type: Boolean,
        default: true,
    },
    showName: {
        type: Boolean,
        default: false,
    },
})

const initials = computed(() => {
    if (!props.user.first_name && !props.user.last_name) {
        return props.user?.username?.charAt(0)
    }

    return (
        props.user.first_name?.charAt(0) +
        props.user.last_name?.charAt(0)
    )
})

const classes = computed(() => {
    return {
        'bg-surface-300 dark:bg-surface-800':
            !props.user.image && !props.user.color,
        'relative group shadow-sm flex justify-center items-center overflow-hidden': true,
        'cursor-pointer': props.editable,
        'rounded-full': props.rounded,
        'rounded-2xl': !props.rounded,
    }
})

const username = computed(() => {
    return props.user.first_name && props.user.last_name
        ? `${props.user.first_name} ${props.user.last_name}`
        : props.user.username
})

const email = computed(() => {
    return props.user.email
})
</script>
<template>
    <div class="flex items-center">
        <div
            :class="classes"
            :style="{
                width: size,
                height: size,
                backgroundColor: props.user.color,
            }"
            @click="editable && $emit('edit')"
        >
            <div v-if="user.image">
                <img
                    :src="'/storage/' + user.image"
                    class="object-cover"
                />
            </div>
            <div v-else>
                {{ initials }}
            </div>
            <div
                v-if="editable"
                class="absolute left-0 top-0 hidden h-full w-full cursor-pointer items-center justify-center group-hover:flex"
            >
                <div class="material-icons">edit</div>
            </div>
            <Badge
                v-if="notifications?.length"
                class="absolute -bottom-1 right-0 animate-bounce"
                :value="notifications?.length"
            ></Badge>
        </div>
        <div v-if="showName" class="ml-3">
            <div
                class="text-xl font-medium text-surface-800 dark:text-surface-50"
            >
                {{ username }}
            </div>
            <div
                class="text-sm font-medium text-surface-500 dark:text-surface-50"
            >
                {{ email }}
            </div>
        </div>
    </div>
</template>
