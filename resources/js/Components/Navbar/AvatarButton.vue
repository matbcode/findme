<script setup>
import { ref, computed } from "vue";
import { usePage } from "@inertiajs/vue3";

import OverlayPanel from "primevue/overlaypanel";

import ProfilePanel from "@/Components/Panels/ProfilePanel.vue";
import Avatar from "@/Components/Custom/Avatar.vue";

const panel = ref(null);

const page = usePage();
const user = computed(() => page.props.auth.user);

const toggle = (element, event) => {
    element.toggle(event);
};
</script>

<template>
    <div class="cursor-pointer" @click="toggle(panel, $event)">
        <Avatar :user />
    </div>
    <OverlayPanel ref="panel">
        <ProfilePanel />
    </OverlayPanel>
</template>
