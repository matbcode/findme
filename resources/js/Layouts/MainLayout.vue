<!-- <script setup>
import { ref, watch, onMounted } from 'vue'
import { useGlobalStore } from '@/Stores'
import { useTheme } from '@/Composables/theme'

import DynamicDialog from 'primevue/dynamicdialog'
import Dialog from 'primevue/dialog'

import GuestLayout from '@/Layouts/GuestLayout.vue'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import ConfirmModal from '@/Components/ConfirmModal.vue'
import FormModal from '@/Components/FormModal.vue'
import Navbar from '@/Components/Navbar/Navbar.vue'
import GlobalSearch from '@/ComponentsNew/Navigation/GlobalSearch.vue'

import CustomToast from '@/ComponentsNew/Global/Toast/CustomToast.vue'
import CustomContextMenu from '@/ComponentsNew/Global/ContextMenu/CustomContextMenu.vue'
import Footer from '@/Components/Footers/Footer.vue'
import SidePanel from '@/ComponentsNew/Navigation/SidePanel.vue'

const store = useGlobalStore()

const globalSearch = ref(null)
const isGlobalSearchVisible = ref(false)
const sidePanelInfo = ref({
    width: 0,
    isDragging: false,
    isVisible: true,
})
useTheme()

const toggleGlobalSearch = () => {
    isGlobalSearchVisible.value = !isGlobalSearchVisible.value
}

window.addEventListener('keyup', (event) => {
    if (
        (event.key === 'Meta' && event.altKey) ||
        (event.key === 'Alt' && event.metaKey)
    ) {
        toggleGlobalSearch()
    }

    if (event.key === 's' && event.ctrlKey) {
        sidePanelInfo.value.isVisible = !sidePanelInfo.value.isVisible
    }
})

const dragHandler = ({
    movement,
    swipe: [x, y],
    initial: [initX, initY],
    dragging,
}) => {
    // TODO: Lame solution for checking if is on desktop and disable gestures
    if (window.innerWidth >= 1024) {
        return
    }
    if (
        store.workspaces.current &&
        sidePanelInfo.value.isVisible &&
        initX < 600
    ) {
        sidePanelInfo.value.isDragging = true
        sidePanelInfo.value.width = 500 + movement[0]
    } else if (store.workspaces.current && initX < 50) {
        sidePanelInfo.value.isDragging = true
        sidePanelInfo.value.width = movement[0]
    } else if (x < 0) {
        history.back()
    } else if (x > 0) {
        history.forward()
    }

    if (!dragging) {
        sidePanelInfo.value.isDragging = false
    }

    if (y < 0) {
        isGlobalSearchVisible.value = true
    }
}

watch(
    () => sidePanelInfo.value.isVisible,
    (isVisible) => {
        if (isVisible) {
            store.eventBus.sidePanelEvent.emit(
                store.eventBus.SIDEPANEL_EVENTS.OPEN,
            )
        } else {
            store.eventBus.sidePanelEvent.emit(
                store.eventBus.SIDEPANEL_EVENTS.CLOSE,
            )
        }
    },
    { deep: true },
)

// Fetch all collections on mount
onMounted(() => {
    store.projects.fetch()
    // store.updateFeed()
})
</script> -->

<template>
    <!-- <ConfirmModal />
    <FormModal />
    <DynamicDialog />
    <CustomToast />
    <CustomContextMenu /> -->
    <!-- <AuthenticatedLayout v-drag="dragHandler"> -->
    <!-- <template #sidePanel> <SidePanel /> </template>
        <Navbar v-model:sidepanel="sidePanelInfo.isVisible" />
        <Dialog
            v-model:visible="isGlobalSearchVisible"
            dismissableMask
            blockScroll
            modal
        >
            <template #container>
                <GlobalSearch
                    ref="globalSearch"
                    class="fixed left-1/2 top-[-300px] w-[700px] -translate-x-1/2 transform drop-shadow-extreme"
                />
            </template>
        </Dialog> -->
    <div class="min-h-[calc(100vh-105px)] px-4">
        <slot />
    </div>
    <Footer />
    <!-- </AuthenticatedLayout> -->
    <!-- <GuestLayout v-else>
        <slot />
    </GuestLayout> -->
</template>
