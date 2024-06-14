import { computed } from 'vue'
import { defineStore } from 'pinia'

import { usePage } from '@inertiajs/vue3'

export const useStorageStore = defineStore('storage', () => {
    const page = usePage()

    const collection = computed(() => {})

    function getStorage(workspaceSlug, key) {
        if (
            collection.value[workspaceSlug] &&
            collection.value[workspaceSlug][key]
        ) {
            return collection.value[workspaceSlug][key]
        }
    }

    function setStorage(workspaceSlug, key, value) {
        collection.value[workspaceSlug][key] = value
    }

    return {
        getStorage,
        setStorage,
    }
})
