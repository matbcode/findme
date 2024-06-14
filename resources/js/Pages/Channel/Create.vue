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
    platforms: Array,
})

const links = ref([
    {
        label: 'Back',
        icon: 'arrow_back_ios_new',
        href: route('project.edit', {
            slug: store.workspaces.current.slug,
            project: props.project.id,
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

const formBody = ref({
    ...store.api.channel.create(props.project, props.platforms),
})
</script>

<template>
    <WideWrapper title="Create channel" :links :formBody>
    </WideWrapper>
</template>
