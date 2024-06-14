<script setup>
import { ref } from 'vue'

import CustomButton from '@/Components/Custom/CustomButton.vue'

const emit = defineEmits(['action'])

const props = defineProps({
    title: {
        type: String,
        default: null,
    },
    subtitle: {
        type: String,
        default: null,
    },
    details: {
        type: String,
        default: null,
    },
    icon: {
        type: String,
        default: null,
    },
    colorBox: {
        type: String,
        default: null,
    },
    actions: {
        type: Array,
    },
})

const actionMenu = ref(null)

const toggle = (event) => {
    actionMenu.value.toggle(event)
}
</script>
<template>
    <header class="relative flex flex-col gap-2 pb-4">
        <div class="flex justify-between gap-4 font-medium">
            <div>
                <div class="flex items-center gap-2">
                    <div
                        v-if="details"
                        v-tooltip.top="{ value: details }"
                    >
                        <font-awesome-icon
                            icon="fa-regular fa-circle-question"
                        />
                    </div>

                    <div class="text-xl">
                        {{ title }}
                    </div>

                    <slot name="preprend" />
                </div>
                <slot name="subtitle" />
                <div v-if="subtitle" class="text-sm opacity-70">
                    {{ subtitle }}
                </div>
            </div>
            <div class="flex flex-shrink-0 items-end">
                <CustomButton
                    v-for="action in actions"
                    v-bind:key="action.label"
                    @click="action.command"
                    v-bind="action"
                />
                <slot name="append" />
                <div>
                    <slot name="actions"></slot>
                </div>
            </div>
        </div>
        <div
            v-if="$slots.details"
            class="flex items-center justify-between"
        >
            <slot name="details" />
        </div>
    </header>
</template>
