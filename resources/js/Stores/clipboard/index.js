import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const cookieName = "clipboard_config";

export const useClipboardStore = defineStore('clipboard', () => {
    const collection = ref([])
    const opened = ref([])

    function contains(element) {
        return collection.value.find((item) => item.id === element.id)
    }

    function openElement(element) {
        opened.value.push(element)
    }

    function closeElement(element) {
        opened.value = opened.value.filter((item) => item.id !== element.id)
    }

    function add(element) {
        if (contains(element)) return;

        if (collection.value.length >= 12) {
            collection.value = collection.value.slice(1)
        }

        collection.value.push(element)
    }

    function remove(element) {
        collection.value = collection.value.filter((item) => item.id !== element.id)
    }

    function removeOther(element) {
        collection.value = collection.value.filter((item) => item.id === element.id)
    }

    function clear() {
        collection.value = []
    }

    function removeAfter(element) {
        const index = collection.value.findIndex((item) => item.id === element.id)

        collection.value = collection.value.slice(0, index + 1)
    }

    function placeBefore(draggedElement, targetElement) {
        const draggedIndex = collection.value.findIndex((item) => item.id === draggedElement.id)
        const targetIndex = collection.value.findIndex((item) => item.id === targetElement.id)

        collection.value.splice(targetIndex, 0, collection.value.splice(draggedIndex, 1)[0])
    }

    return {
        collection,
        opened,
        contains,
        add,
        remove,
        removeOther,
        clear,
        removeAfter,
        placeBefore,
        openElement,
        closeElement
    }
})