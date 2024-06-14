<script setup>
import { computed, defineModel, watch } from 'vue'
import { useGlobalStore } from '@/Stores'

const store = useGlobalStore()

const sidePanelInfo = defineModel('sidePanel')
const sidepanelWidth = 500

/**
 * Styles for the side panel. Adds soft transition when drag is released.
 * Adds 'spring' effect when dragging to maximum width
 */
const styles = computed(() => {
    let width
    if (sidePanelInfo.value.isDragging) {
        width =
            sidePanelInfo.value.width > sidepanelWidth
                ? Math.max(
                      400,
                      800 *
                          (1 -
                              Math.exp(
                                  -0.0025 * sidePanelInfo.value.width,
                              )),
                  )
                : sidePanelInfo.value.width
    } else {
        width = sidePanelInfo.value.isVisible ? sidepanelWidth : 0
    }

    return {
        width: `${width}px`,
        transition: sidePanelInfo.value.isDragging
            ? null
            : 'width 0.3s ease-out',
    }
})

/**
 * Watch for dragging state and update the width of the side panel and its visibility
 */
watch(
    () => sidePanelInfo.value.isDragging,
    (dragged) => {
        if (!dragged && sidePanelInfo.value.width < 200) {
            sidePanelInfo.value.width = 0
            sidePanelInfo.value.isVisible = false
        } else if (!dragged && sidePanelInfo.value.width > 200) {
            sidePanelInfo.value.width = sidepanelWidth
            sidePanelInfo.value.isVisible = true
        }
    },
    { deep: true },
)
</script>
<template>
    <div class="h-full min-h-screen w-[100vw-4x] sm:flex">
        <div class="flex-shrink-0" :style="styles">
            <div class="bottom-0 top-0 sm:fixed">
                <slot name="sidePanel" />
            </div>
        </div>
        <div
            class="z-10 flex min-h-[100vh] w-full flex-col justify-between overflow-clip bg-surface-50 shadow-2xl outline outline-1 outline-surface-100 dark:bg-gradient-to-b dark:from-surface-950 dark:to-surface-950 dark:outline-surface-800"
        >
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
