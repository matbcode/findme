import { ref } from 'vue'
import { defineStore } from 'pinia'

import { useEventBusStore } from '@/Stores/eventBus'

export const useDragStore = defineStore('drag', () => {
    const isDragging = ref(false)
    const data = ref(null)
    const type = ref(null)
    const action = ref(null)

    const eventBus = useEventBusStore()

    function dragStart(event, info) {
        isDragging.value = true
        data.value = info.data
        type.value = info.type
        action.value = info.action

        eventBus.dragEvent.emit(
            eventBus.DRAG_EVENTS.DRAG_START,
            event,
        )

        // event.dataTransfer.clearData()
        // event.dataTransfer.setData(
        //     type || 'text/plain',
        //     JSON.stringify(data),
        // )

        console.log('dragStart', event)
    }

    function dragEnd() {
        isDragging.value = false
        // data.value = null
        // type.value = null

        eventBus.dragEvent.emit(eventBus.DRAG_EVENTS.DRAG_END)
    }

    function dragEnter() {
        eventBus.dragEvent.emit(eventBus.DRAG_EVENTS.DRAG_ENTER)

        console.log('dragEnter')
    }

    function dragOver(event) {
        event.preventDefault()
        eventBus.dragEvent.emit(eventBus.DRAG_EVENTS.DRAG_OVER, event)
    }

    function dragLeave(event) {
        isDragging.value = false

        eventBus.dragEvent.emit(eventBus.DRAG_EVENTS.DRAG_LEAVE)
    }

    function drop(event) {
        eventBus.dragEvent.emit(eventBus.DRAG_EVENTS.DROP, event)

        console.log('drop', event, data.value)
    }

    return {
        isDragging,
        data,
        type,
        action,
        dragStart,
        dragEnd,
        dragEnter,
        dragOver,
        dragLeave,
        drop,
    }
})
