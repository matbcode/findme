<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const store = useGlobalStore()

const props = defineProps({
    project: Object,
    event: Object,
    platforms: Array,
})

const links = ref([
    {
        label: 'Back',
        icon: 'arrow_back_ios_new',
        href: route('event.edit', {
            slug: store.workspaces.current.slug,
            project: props.project.id,
            event: props.event.id,
        }),
    },
    {
        label: 'Header',
        href: '#header',
        icon: 'title',
    },
    {
        label: 'Description',
        href: '#description',
        icon: 'description',
    },
])
</script>

<template>
    <WideWrapper title="Create Post" :links> test </WideWrapper>
</template>
