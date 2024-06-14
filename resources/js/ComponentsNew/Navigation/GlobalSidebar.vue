<script setup>
import { defineModel } from "vue";

import Sidebar from "primevue/sidebar";

import CustomButton from "@/Components/Custom/CustomButton.vue";
import Logo from "@/Components/Navbar/Logo.vue";

const visible = defineModel("visible");
</script>

<template>
    <Sidebar v-model:visible="visible" header="Sidebar">
        <template #container="{ closeCallback }">
            <div class="px-4 py-2 flex gap-4">
                <CustomButton icon="fa-solid fa-bars" text rounded />
                <Logo />
            </div>
            <div class="flex flex-col p-2"></div>
        </template>
    </Sidebar>
</template>
