<script setup>
import ActivityLogItem from '@/Components/Grids/ActivityLogItem.vue'
import SectionHeader from '@/Components/PageWrappers/SectionHeader.vue'

const props = defineProps({
    activities: {
        type: Array,
        required: true,
    },
})
</script>

<template>
    <SectionHeader title="Activities" />
    <ActivityLogItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
    />
</template>
