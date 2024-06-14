<script setup>
import { useGlobalStore } from "@/Stores";
import { useForm } from "@inertiajs/vue3";

import FileUpload from "primevue/fileupload";

const store = useGlobalStore();
const { closeDialog } = store.modals;

const emit = defineEmits(["imageCreated"]);

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
});

const form = useForm(props.data.form || { image: null });

const onSelectImage = (e) => {
    const file = e.files[0];

    form[props.data.formKey || "image"] = file;
    form.post(props.data.route || route("profile.image"));

    emit("imageCreated");
    closeDialog();
};
</script>
<template>
    <div class="w-[512px] p-8 flex flex-col justify-center items-center">
        <FileUpload
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            @select="onSelectImage"
        />
    </div>
</template>
