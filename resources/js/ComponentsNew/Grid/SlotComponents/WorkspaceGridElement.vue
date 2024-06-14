<script setup>
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'

import Tag from 'primevue/tag'

import TileWrapper from '@/Components/TileWrapper.vue'
import Avatar from '@/Components/Custom/Avatar.vue'

const props = defineProps({
    workspace: Object,
})

const style = computed(() =>
    props.workspace.image
        ? {
              backgroundImage: `url('/storage/${props.workspace.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
          }
        : {
              backgroundColor: props.workspace.color,
          },
)
</script>

<template>
    <Link :href="route('workspace.calendar', workspace.slug)">
        <TileWrapper>
            <div
                class="flex flex-col items-center justify-center gap-4 py-12"
            >
                <Avatar
                    v-if="workspace.image"
                    :user="workspace"
                    size="120px"
                    :rounded="false"
                />
                <span
                    v-else
                    class="material-icons"
                    style="font-size: 64px"
                    >workspaces</span
                >
                <div
                    class="w-full pb-2 text-center text-xl font-semibold"
                >
                    {{ workspace.name }}
                </div>
            </div>
            <template #details>
                <div class="flex gap-2 p-2">
                    <Tag
                        value="Standard Plan"
                        :style="{
                            backgroundColor: '#FFC107',
                            color: '#000',
                        }"
                    />
                </div>
            </template>
            <template #actions>
                <div class="p-2">
                    <Link
                        :href="
                            route('workspace.edit', workspace.slug)
                        "
                        class="opacity-0 hover:text-primary-500 group-hover:opacity-100"
                    >
                        <span class="material-icons">settings</span>
                    </Link>
                </div>
            </template>
            <!-- <template #footer>
                <div
                    class="w-full pb-2 text-center text-xl font-semibold"
                >
                    {{ workspace.name }}
                </div>
            </template> -->
        </TileWrapper>
    </Link>
</template>
