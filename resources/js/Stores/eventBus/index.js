import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useEventBus } from '@vueuse/core'

export const useEventBusStore = defineStore('eventBus', () => {
    const listenerHandler = (event, data, eventType, listener) => {
        if (event === eventType) {
            listener(data)
        }
    }

    /**
     * Workspace events
     *
     * types of events and data:
     * @currentWorkspaceChanged { workspace }
     */
    const WORKSPACE_EVENTS = ref({
        CURRENT_WORKSPACE_CHANGED: 'currentWorkspaceChanged',
    })

    const onWorkspaceEvent = useEventBus('workspace-event-bus')

    const workspaceEvent = {
        listen: (eventType, listener) =>
            onWorkspaceEvent.on((event, data) =>
                listenerHandler(event, data, eventType, listener),
            ),
        emit: (eventType, data) =>
            onWorkspaceEvent.emit(eventType, data),
    }

    const workspaceReferences = {
        WORKSPACE_EVENTS,
        onWorkspaceEvent,
        workspaceEvent,
    }

    /**
     * SidePanel events
     *
     * types of events and data:
     * @open { component, panelProps, childProps }
     * @close
     */
    const SIDEPANEL_EVENTS = ref({
        OPEN: 'open',
        CLOSE: 'close',
    })

    const onSidePanelEvent = useEventBus('sidepanel-event-bus')

    const sidePanelEvent = {
        listen: (eventType, listener) =>
            onSidePanelEvent.on((event, data) =>
                listenerHandler(event, data, eventType, listener),
            ),
        emit: (eventType, data) =>
            onSidePanelEvent.emit(eventType, data),
    }

    const sidePanelReferences = {
        SIDEPANEL_EVENTS,
        onSidePanelEvent,
        sidePanelEvent,
    }

    /**
     * Dialog events
     *
     * types of events and data:
     * @close
     * @open { component, dialogProps, childProps }
     */
    const DIALOG_EVENTS = ref({
        CLOSE: 'close',
        OPEN: 'open',
    })

    const onDialogEvent = useEventBus('dialog-event-bus')

    const dialogEvent = {
        listen: (eventType, listener) =>
            onDialogEvent.on((event, data) =>
                listenerHandler(event, data, eventType, listener),
            ),
        emit: (eventType, data) =>
            onDialogEvent.emit(eventType, data),
    }

    const dialogReferences = {
        DIALOG_EVENTS,
        onDialogEvent,
        dialogEvent,
    }

    /**
     * URL events
     *
     * types of events and data:
     * @paramChanged { key, value }
     */
    const URL_EVENTS = ref({
        PARAMS_CHANGED: 'paramChanged',
        CHANGE: 'change',
    })

    const onUrlEvent = useEventBus('url-event-bus')

    const urlEvent = {
        listen: (eventType, listener) =>
            onUrlEvent.on((event, data) =>
                listenerHandler(event, data, eventType, listener),
            ),
        emit: (eventType, data) => onUrlEvent.emit(eventType, data),
    }

    const urlReferences = {
        URL_EVENTS,
        onUrlEvent,
        urlEvent,
    }

    /**
     * Drag events
     *
     * types of events and data:
     * @dragStart { event, data }
     * @dragOver { event, data }
     * @drop { event, data }
     */
    const DRAG_EVENTS = ref({
        DRAG_START: 'dragStart',
        DRAG_END: 'dragEnd',
        DRAG_ENTER: 'dragEnter',
        DRAG_OVER: 'dragOver',
        DRAG_LEAVE: 'dragLeave',
        DROP: 'drop',
    })
    const onDragEvent = useEventBus('drag-event-bus')
    const dragEvent = {
        listen: (eventType, listener) =>
            onDragEvent.on((event, data) =>
                listenerHandler(event, data, eventType, listener),
            ),
        emit: (eventType, data) => onDragEvent.emit(eventType, data),
    }
    const dragReferences = {
        DRAG_EVENTS,
        onDragEvent,
        dragEvent,
    }

    /**
     * Echo events
     *
     * types of events and data:
     * @commentCreated { comment }
     */
    const ECHO_EVENTS = ref({
        COMMENT_CREATED: 'commentCreated',
        COMMENT_DELETED: 'commentDeleted',
        COMMENT_UPDATED: 'commentUpdated',
        FILE_CREATED: 'fileCreated',
        CAMPAIGN_UPDATED: 'campaignUpdated',
    })
    const onEchoEvent = useEventBus('echo-event-bus')
    const echoEvent = {
        listen: (eventType, listener) =>
            onEchoEvent.on((event, data) =>
                listenerHandler(event, data, eventType, listener),
            ),
        emit: (eventType, data) => onEchoEvent.emit(eventType, data),
    }
    const echoReferences = {
        ECHO_EVENTS,
        onEchoEvent,
        echoEvent,
    }

    /**
     * Notification events
     *
     * types of events and data:
     * @show { message, type }
     * @hide
     */
    const NOTIFICATION_EVENTS = ref({
        RECEIVE: 'receive',
    })
    const onNotificationEvent = useEventBus('notification-event-bus')
    const notificationEvent = {
        listen: (eventType, listener) =>
            onNotificationEvent.on((event, data) =>
                listenerHandler(event, data, eventType, listener),
            ),
        emit: (eventType, data) =>
            onNotificationEvent.emit(eventType, data),
    }
    const notificationReferences = {
        NOTIFICATION_EVENTS,
        onNotificationEvent,
        notificationEvent,
    }

    return {
        ...workspaceReferences,
        ...sidePanelReferences,
        ...dialogReferences,
        ...urlReferences,
        ...dragReferences,
        ...echoReferences,
        ...notificationReferences,
    }
})
