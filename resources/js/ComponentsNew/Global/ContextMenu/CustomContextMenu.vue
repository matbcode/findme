<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useGlobalStore } from '@/Stores'

import ContextMenu from 'primevue/contextmenu'
import Avatar from '@/Components/Custom/Avatar.vue'

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
        v-bind="store.modals.currentContextMenuOptions"
    >
        <template #item="{ item, props }">
            <a
                v-ripple
                class="flex max-w-[400px] items-center overflow-y-auto"
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
                <div v-if="item.user" class="h-full w-full">
                    <div class="flex gap-2">
                        <Avatar
                            :user="item.user"
                            size="32px"
                            class="rounded-full"
                            showName
                        />
                    </div>
                </div>
            </a>
        </template>
    </ContextMenu>
</template>
