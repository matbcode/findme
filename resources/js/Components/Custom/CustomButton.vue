<script setup>
import Button from "primevue/button";
import { debounce } from "lodash";

const emit = defineEmits(["click"]);

const props = defineProps({
    label: String,
    icon: String,
    class: String,
    useDebounce: {
        type: Boolean,
        default: false,
    },
});

const handleClick = (e) => {
    if (props.useDebounce) {
        debounce(() => emit("click", e), 200);
    } else {
        emit("click", e);
    }
};
</script>
<template>
    <Button
        v-if="!$props.icon || $props.icon?.startsWith('pi')"
        v-bind="$props"
        @click="handleClick"
    />
    <Button
        v-else-if="$props.icon?.startsWith('fa')"
        v-bind="$props"
        @click="handleClick"
    >
        <template #icon>
            <font-awesome-icon
                :icon="$props.icon"
                :size="$props.size || 'lg'"
                :class="{ 'mr-2': label }"
            />
        </template>
    </Button>
    <Button v-else v-bind="$props" @click="handleClick">
        <template #icon>
            <span
                v-if="$props.icon"
                :class="{ 'material-icons-outlined': true, 'mr-2': label }"
            >
                {{ $props.icon }}
            </span>
        </template>
    </Button>
</template>
