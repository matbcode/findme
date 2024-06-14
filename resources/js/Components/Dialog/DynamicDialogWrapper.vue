<script setup>
import { inject, onMounted, shallowRef } from 'vue'
import { useEventBusStore } from '@/Stores/eventBus'

const eventBus = useEventBusStore()
const dialogRef = inject('dialogRef')
let params = shallowRef(null)

onMounted(() => {
    params.value = dialogRef.value.data
    eventBus.dialogEvent.listen(
        eventBus.DIALOG_EVENTS.CLOSE,
        dialogRef.value.close,
    )
})
</script>
<template>
    <div v-if="params?.component">
        <component
            :is="{ ...params.component }"
            :data="params.props"
            v-on="params.events"
        />
    </div>
</template>
