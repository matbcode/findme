<script setup>
import { Link, router } from '@inertiajs/vue3'

defineProps({
    workspace: Object,
})

const onClick = () => {
    router.visit('get', route('workspace.calendar', workspace.slug))
}
</script>

<template>
    <div v-ripple class="h-40 rounded-2xl">
        <div v-if="workspace" @click="onClick">
            <div
                class="relative flex h-full w-full items-center justify-center gap-3 rounded-2xl border p-4 text-center"
                :label="workspace.name"
                :style="{
                    backgroundImage: `url('/storage/${workspace.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }"
            >
                <span>{{ workspace.name }}</span>

                <div class="absolute right-4 top-4">
                    <Link
                        :href="
                            route('workspace.edit', workspace.slug)
                        "
                        class="hover:text-primary-500"
                    >
                        <span class="material-icons">settings</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
