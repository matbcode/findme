import { ref, markRaw } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { useDialog } from 'primevue/usedialog'
import { useEventBusStore } from '@/Stores/eventBus'

import DynamicDialogWrapper from '@/Components/Dialog/DynamicDialogWrapper.vue'

export const useModalsStore = defineStore('modals', () => {
    const eventBusStore = useEventBusStore()

    /*
     * Toast
     */
    const toast = useToast()

    function showToast(props) {
        toast.add({
            position: 'bottom-right',
            life: 5000,
            group: 'toast',
            ...props,
        })
    }

    function showNotification(message) {
        toast.add({
            position: 'top-right',
            life: 7000,
            group: 'notification',
            severity: 'message',
            detail: message,
        })
    }

    const toastStoreData = {
        toast,
        showToast,
        showNotification,
    }

    /*
     * Dynamics Dialog
     */
    const dialog = useDialog()
    // const dialogEventBus = useEventBus('dialog-event-bus');

    function showDialog(component, dialogProps, childProps) {
        dialog.open(DynamicDialogWrapper, {
            props: { ...dialogProps },
            data: {
                component,
                props: {
                    dialogEventBus: eventBusStore.onDialogEvent,
                    ...childProps.data,
                },
                events: {
                    ...childProps.events,
                },
            },
            templates: {
                //TODO: Find way to make header conditional
                // header: markRaw(Test),
            },
        })
        eventBusStore.dialogEvent.emit(
            eventBusStore.DIALOG_EVENTS.OPEN,
            { component, dialogProps, childProps },
        )
    }

    function closeDialog() {
        eventBusStore.dialogEvent.emit(
            eventBusStore.DIALOG_EVENTS.CLOSE,
        )
    }

    const dialogStoreData = {
        dialog,
        showDialog,
        closeDialog,
    }

    /*
     * Confirm Modal
     */
    const isConfirmOpen = ref(false)
    const confirmModalInfo = ref({})

    function showConfirm(options) {
        isConfirmOpen.value = true
        confirmModalInfo.value = {
            cancelButtonProps: {
                label: 'Cancel',
                icon: 'pi pi-times',
                severity: 'secondary',
            },
            confirmButtonProps: {
                label: 'Confirm',
                icon: 'pi pi-check',
            },
            onUpdateVisibility: (value) =>
                (isConfirmOpen.value = value),
            ...options,
            onCancel: (arg) => {
                isConfirmOpen.value = false
                if (options.onCancel) {
                    options.onCancel(arg)
                }
            },
            onConfirm: (arg) => {
                isConfirmOpen.value = false
                if (options.onConfirm) {
                    options.onConfirm(arg)
                }
            },
        }
    }

    function onUpdateConfirmVisibility(value) {
        isConfirmOpen.value = value
    }

    const confirmModalStoreData = {
        isConfirmOpen,
        confirmModalInfo,
        showConfirm,
        onUpdateConfirmVisibility,
    }

    /*
     * Form Modal
     */
    const isFormOpen = ref(false)
    const formModalInfo = ref({})

    function showFormModal(options) {
        isFormOpen.value = true
        formModalInfo.value = {
            cancelButtonProps: {
                label: 'Cancel',
                icon: 'pi pi-times',
                severity: 'secondary',
            },
            confirmButtonProps: {
                label: 'Save',
                icon: 'pi pi-check',
            },
            onCancel: () => (isFormOpen.value = false),
            ...options,
            onUpdateVisibility: (value) => (isFormOpen.value = value),
            onConfirm: (arg) => {
                if (options.onConfirm) {
                    options.onConfirm(arg)
                }
            },
            formBody: {
                ...options.formBody,
                options: {
                    ...options.formBody.options,
                    onSuccess: (arg) => {
                        isFormOpen.value = false
                        if (
                            options.formBody &&
                            options.formBody.options.onSuccess
                        ) {
                            options.formBody.options.onSuccess(arg)
                        }
                    },
                },
            },
        }
    }

    function hideFormModal() {
        isFormOpen.value = false
    }

    function onUpdateFormModalVisibility(value) {
        isConfirmOpen.value = value
    }

    const formModalStoreData = {
        isFormOpen,
        formModalInfo,
        showFormModal,
        hideFormModal,
        onUpdateFormModalVisibility,
    }

    /*
     * Context Menu
     */
    const contextMenuReference = ref(null)
    const currentContextMenuItems = ref([])
    const currentContextMenuOptions = ref({})
    const currentContextMenuEvents = ref({})

    function registerContextMenu(reference) {
        contextMenuReference.value = reference.value
    }

    function showContextMenu({
        event,
        items = [],
        options = {},
        events = {},
    }) {
        if (contextMenuReference.value) {
            currentContextMenuItems.value = items
            currentContextMenuOptions.value = options
            currentContextMenuEvents.value = events
            contextMenuReference.value.show(event)
        }
    }

    function closeContextMenu() {
        if (contextMenuReference.value) {
            contextMenuReference.value.hide()
        }
    }

    const contextMenuStoreData = {
        contextMenuReference,
        currentContextMenuItems,
        currentContextMenuOptions,
        currentContextMenuEvents,
        registerContextMenu,
        showContextMenu,
        closeContextMenu,
    }

    /*
     * Return all store data
     */
    return {
        ...toastStoreData,
        ...dialogStoreData,
        ...confirmModalStoreData,
        ...formModalStoreData,
        ...contextMenuStoreData,
    }
})
