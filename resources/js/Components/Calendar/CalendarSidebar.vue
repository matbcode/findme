<script setup>
import { useGlobalStore } from '@/Stores'

import PanelMenu from 'primevue/panelmenu'
import Badge from 'primevue/badge'
import Checkbox from 'primevue/checkbox'
import ScrollPanel from 'primevue/scrollpanel'
import Tag from 'primevue/tag'
import Panel from 'primevue/panel'
import Avatar from 'primevue/avatar'

import CustomButton from '@/Components/Custom/CustomButton.vue'

const emit = defineEmits(['changed'])

const store = useGlobalStore()
</script>

<template>
    <!-- <ScrollPanel class="mt-[8px] w-full" style="height: calc(100vh - 75px)"> -->
    <PanelMenu
        v-model:expandedKeys="store.calendar.sidebarExpandedItems"
        :model="store.calendar.sidebarElements"
    >
        <template #item="{ item }">
            <div
                v-if="item.type === 'button'"
                class="w-full px-2 py-1"
            >
                <CustomButton
                    :label="item.label"
                    class="w-full"
                    size="small"
                    text
                    v-bind="item.buttonProps"
                />
            </div>
            <div
                v-else
                v-ripple
                class="relative flex cursor-pointer items-center px-3 py-2 hover:bg-slate-100 hover:dark:bg-surface-800"
            >
                <span
                    v-if="item.items"
                    v-ripple
                    class="pi pi-angle-down mr-2 text-slate-500 dark:text-surface-50"
                />
                <div class="flex w-full items-center">
                    <span class="material-icons">{{
                        item.icon
                    }}</span>
                    <div
                        v-if="item.color"
                        class="h-4 w-4"
                        :style="{ backgroundColor: item.color }"
                    />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge
                        v-if="item.badge"
                        class="ml-auto"
                        :value="item.badge"
                    />
                    <Tag
                        v-if="item.tag"
                        class="ml-auto"
                        rounded
                        :value="item.tag"
                        :severity="item.tagType"
                    />
                    <span
                        v-if="item.shortcut"
                        class="ml-auto rounded border border-surface-500/40 bg-slate-100 p-1 text-xs dark:bg-surface-800"
                        >{{ item.shortcut }}</span
                    >
                </div>
                <div>
                    <Checkbox
                        v-if="item.checked !== undefined"
                        class="absolute right-0"
                        :binary="true"
                        v-model="item.checked"
                        @click.stop="emit('changed')"
                    />
                </div>
            </div>
        </template>
    </PanelMenu>
    <!-- </ScrollPanel> -->
</template>
