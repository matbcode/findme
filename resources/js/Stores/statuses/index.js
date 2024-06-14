import { ref } from 'vue'
import { defineStore } from 'pinia'

import { defaultStatuses } from './defaults'

export const useStatusesStore = defineStore('statuses', () => {
    const collection = ref([...defaultStatuses])

    function getStatus(id) {
        return collection.value.find((status) => status.id === id)
    }

    return {
        collection,
        getStatus,
    }
})