<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import Calendar from '@/Components/Calendar/Calendar.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const props = defineProps({ currentWorkspace: Object })
</script>

<template>
    <Calendar :currentWorkspace />
</template>
