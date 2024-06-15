<script setup>
import { ref, onMounted } from 'vue'
import { router } from '@inertiajs/vue3'

import CustomCard from '@/Components/Custom/CustomCard.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'

import MainLayout from '@/Layouts/MainLayout.vue'

defineOptions({ layout: MainLayout })

const props = defineProps({
    identity: {
        type: Object,
    },
})

onMounted(() => {
    console.log('Identity:', props.identity)
    navigator.geolocation.getCurrentPosition(
        () => {
            console.log('Geolocation is available')
        },
        () => {
            console.log('Geolocation is not available')
        },
    )
})
</script>
<template>
    <WideWrapper>
        <div class="flex w-full flex-col gap-12">{{ identity }}</div>
    </WideWrapper>
</template>
