<script setup>
import { ref, defineModel, onMounted } from 'vue'

const model = defineModel()

const props = defineProps({
    id: {
        type: String,
        default: 'editor',
    },
})

const editor = ref(null)
let quill = ref(null)

onMounted(() => {
    quill.value = new Quill(`#${props.id}`, {
        theme: 'snow',
    })
    quill.value.on('text-change', (delta, oldDelta, source) => {
        console.log('text-change', delta.ops)
        model.value = quill.value.root.innerHTML
    })
})
</script>

<template>
    <div
        id="test"
        class="relative max-h-[150px] rounded-2xl bg-white dark:bg-surface-900"
    >
        <div :id ref="editor" class="overflow-y-auto">
            <div v-sanitize.basic="model"></div>
        </div>
    </div>
</template>

<style>
/* .ql-tooltip {
    @apply z-50;
}

.ql-bubble .ql-tooltip {
    @apply bg-white dark:bg-surface-900;
}

.ql-bubble .ql-stroke {
    @apply stroke-surface-900 hover:stroke-primary-500 dark:stroke-surface-100;
}

.ql-bubble .ql-fill,
.ql-bubble .ql-stroke.ql-fill {
    @apply fill-surface-900 hover:fill-primary-500 dark:fill-surface-100;
} */
.ql-toolbar.ql-snow {
    @apply sticky inset-0 z-50 w-full border-0 bg-white fill-surface-800 dark:bg-surface-900 dark:fill-surface-100;
}

.ql-toolbar.ql-snow + .ql-container.ql-snow {
    @apply max-h-[100px] overflow-y-auto border-0 pb-4;
}

.ql-picker-label {
    @apply text-surface-800 dark:text-surface-100;
}

.ql-snow .ql-stroke {
    @apply stroke-surface-800 dark:stroke-surface-100;
}
</style>
