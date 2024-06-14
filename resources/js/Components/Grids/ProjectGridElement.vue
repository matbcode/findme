<script setup>
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import Tag from 'primevue/tag'

import TileWrapper from '@/Components/TileWrapper.vue'

const store = useGlobalStore()

const emit = defineEmits(['click'])

const props = defineProps({
    item: Object,
})

const style = computed(() =>
    props.item.image
        ? {
              backgroundImage: `url(/storage/${props.item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
          }
        : {
              backgroundColor: props.item.color,
          },
)
</script>
<template>
    <Link
        :href="
            route('project.edit', {
                slug: store.workspaces.current.slug,
                project: item.id,
            })
        "
    >
        <TileWrapper>
            <div class="h-full w-full" :style></div>
            <template #actions>
                <div class="p-1">
                    <Tag
                        :value="item.timezone"
                        rounded
                        class="shadow-sm"
                    />
                </div>
            </template>
            <template #details>
                <div class="p-2">
                    <font-awesome-icon
                        icon="fa-regular fa-folder-open"
                    />
                </div>
            </template>
            <template #footer>
                <div class="w-full text-center text-lg font-semibold">
                    {{ item.name }}
                </div>
            </template>
        </TileWrapper>
    </Link>
</template>
