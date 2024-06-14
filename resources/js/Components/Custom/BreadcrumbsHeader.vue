<script setup>
import { Link } from "@inertiajs/vue3";
import Breadcrumb from "primevue/breadcrumb";

const props = defineProps({
    breadcrumbs: {
        type: Array,
        required: true,
    },
});
</script>
<template>
    <div class="flex items-center text-blue-400 gap-4">
        <Breadcrumb :model="breadcrumbs">
            <template #item="{ item }">
                <Link :href="item.route" custom>
                    <div class="flex flex-row items-center">
                        <span>{{ item.label }}</span>
                    </div>
                </Link>
            </template>
        </Breadcrumb>
    </div>
</template>
