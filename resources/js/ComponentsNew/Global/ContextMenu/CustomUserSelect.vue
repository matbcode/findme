<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useGlobalStore } from '@/Stores'

import ContextMenu from 'primevue/contextmenu'

const store = useGlobalStore()
const { registerContextMenu } = store.modals

const contextMenu = ref(null)

onMounted(() => {
    registerContextMenu(contextMenu)
})
</script>

<template>
    <ContextMenu
        ref="contextMenu"
        :model="store.modals.currentContextMenuItems"
        v-on="store.modals.currentContextMenuEvents"
    >
        <template #item="{ item, props }">
            <a
                v-ripple
                class="flex items-center"
                v-bind="props.action"
            >
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
                <span
                    v-if="item.shortcut"
                    class="surface-100 ml-auto rounded border border-surface-500/40 p-1 text-xs"
                    >{{ item.shortcut }}</span
                >
                <i
                    v-if="item.items"
                    class="pi pi-angle-right text-primary ml-auto"
                ></i>
            </a>
        </template>
    </ContextMenu>
</template>
