<script setup>
import { ref, computed, inject, onMounted } from "vue";
import { router } from "@inertiajs/vue3";
import { useGlobalStore } from "@/Stores";

const store = useGlobalStore();

const dialogRef = inject("dialogRef");

const params = ref(null);
const isNew = ref(false);

let isPinned;

onMounted(() => {
    params.value = dialogRef.value.data;
    isNew.value = params.value.props.data.isNew;
    isPinned = computed(() =>
        store.clipboard.contains(params.value.props.data),
    );
});

const onPinClicked = () => {
    store.clipboard.add(params.value.props.data);
    dialogRef.value.close();
};

const onUnpinClicked = () => {
    store.clipboard.remove(params.value.props.data);
};

const onEditClicked = () => {
    router.visit(
        route("event.edit", {
            slug: store.workspaces.current.slug,
            project: params.value.props.data.extendedProps.project_id,
            event: params.value.props.data.id,
        }),
    );
    store.modals.closeDialog();
};
</script>
<template>
    <div class="flex w-full justify-between items-center gap-4 mr-4">
        <div class="text-lg">
            {{ isNew ? "Create new event" : params?.props?.data?.title }}
        </div>
        <span
            v-if="!isNew"
            class="material-icons p-1 text-slate-500 hover:text-slate-300 rounded-full cursor-pointer"
            @click="onEditClicked"
            >edit</span
        >
        <span
            v-if="!isPinned && !isNew"
            class="material-icons p-1 text-slate-500 hover:text-slate-300 rounded-full cursor-pointer"
            @click="onPinClicked"
            >push_pin</span
        >
        <span
            v-else-if="isPinned && !isNew"
            class="p-1 text-slate-500 hover:text-slate-300 rounded-full cursor-pointer"
            @click="onUnpinClicked"
            >unpin</span
        >
    </div>
</template>
