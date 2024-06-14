<script setup>
import { ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import { useI18n } from 'vue-i18n'
import { useGlobalStore } from '@/Stores'

import SplitButton from 'primevue/splitbutton'

const { t } = useI18n({})
const store = useGlobalStore()

const menuItems = ref([])

if (store.workspaces.workspaces) {
    menuItems.value = [
        ...store.workspaces.workspaces
            ?.filter(
                (workspace) =>
                    workspace?.id !==
                    store.workspaces.current?.value?.id,
            )
            .map((workspace) => {
                return {
                    label: workspace.name,
                    command: () => {
                        router.visit(
                            route(
                                'workspace.calendar',
                                workspace.slug,
                            ),
                            {
                                preserveScroll: true,
                            },
                        )
                    },
                }
            }),
    ]
}

const goToCalendar = () => {
    if (router.page.component === 'Workspace/Calendar') {
        router.visit(
            route('workspace.edit', store.workspaces.current.slug),
            {
                preserveScroll: true,
            },
        )
    } else {
        router.visit(
            route(
                'workspace.calendar',
                store.workspaces.current.slug,
            ),
            {
                preserveScroll: true,
            },
        )
    }
}

const isInWorkspace = ref(
    router.page.component === 'Workspace/Calendar',
)

const workspaceName = ref(store.workspaces.current?.value?.name)

const classes = ref(
    isInWorkspace.value
        ? 'rounded-full shadow-sm border border-1 border-surface-500/40 '
        : 'rounded-full shadow-sm border border-2 border-primary-300 dark:border-primary-800',
)

const updateButton = () => {
    isInWorkspace.value =
        router.page.component === 'Workspace/Calendar'
    classes.value = isInWorkspace.value
        ? 'rounded-full shadow-sm border border-1 border-surface-100 '
        : 'rounded-full shadow-sm border border-2 border-primary-900'

    // if (isInWorkspace.value) {
    //     workspaceName.value = `${store.workspaces.current.name}`;
    // } else {
    //     workspaceName.value = `Back to Planning - ${store.workspaces.current.name}`;
    // }
}

// store.eventBus.urlEvent.listen(store.eventBus.URL_EVENTS.CHANGE, updateButton);
</script>
<template>
    <div v-if="store.workspaces.current" :class="classes">
        <SplitButton
            :label="store.workspaces.current.name"
            size="small"
            text
            rounded
            aria-label="Workspace"
            :model="menuItems"
            @click="goToCalendar"
        >
            <template #icon>
                <span
                    class="material-icons pr-2"
                    style="font-size: 17px"
                    >workspaces</span
                >
            </template>
        </SplitButton>
    </div>
</template>
