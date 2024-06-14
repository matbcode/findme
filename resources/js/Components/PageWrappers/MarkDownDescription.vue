<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt()

const props = defineProps({
    description: {
        type: String,
        default: null,
    },
})

const descriptionMarkDown = computed(() => {
    if (props.description) {
        return markdown.render(props.description)
    }
    return ''
})
</script>

<template>
    <div v-if="descriptionMarkDown" id="description">
        <div
            class="prose dark:prose-invert"
            v-sanitize.basic="descriptionMarkDown"
        ></div>
    </div>
</template>
