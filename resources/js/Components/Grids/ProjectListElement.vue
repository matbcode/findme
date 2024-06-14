<script setup>
import Tag from 'primevue/tag'

const props = defineProps({
    item: Object,
})
</script>
<template>
    <div
        class="relative h-full w-full rounded-2xl p-4"
        :style="{
            backgroundImage: item.image_path,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: item.color,
        }"
    >
        {{ item }}
        <div class="absolute right-0 top-0 p-2">
            <Tag :value="item.timezone" rounded />
        </div>
    </div>
</template>
