<script setup>
import { ref, computed } from 'vue'

import OverlayPanel from 'primevue/overlaypanel'
import Sidebar from 'primevue/sidebar'

const isOpen = ref(false)
const panel = ref(null)
const assistantButton = ref(null)

const classes = computed(() => {
    return {
        'absolute ease-in-out rounded-full pointer-events-none': true,
        'inset-0 w-[24px] h-[24px] z-0': !isOpen.value,
        'left-[-114px] top-[-114px]  h-[256px] w-[256px] drop-shadow-extreme z-50':
            isOpen.value,
    }
})

const handleClick = (event) => {
    // if (isOpen.value === true) {
    //     return;
    // }

    isOpen.value = !isOpen.value
    panel.value.toggle(event)
}

const handleHide = () => {
    isOpen.value = false
}
</script>

<template>
    <div
        ref="assistantButton"
        class="relative h-[24px] min-w-[24px] rounded-full pl-7"
        @click="handleClick"
    >
        <iframe
            src="https://my.spline.design/untitled-b0ff7eb92ead72a54e4852365a2ffde2/"
            frameborder="0"
            :class="classes"
        ></iframe>
        <!-- <Sidebar
            :modal="false"
            :dismissable="false"
            v-model:visible="isOpen"
            header="Sidebar"
            position="right"
        >
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
        </Sidebar> -->
        <OverlayPanel ref="panel" @hide="handleHide">
            <div class="h-[300px] w-[500px] p-4">test</div>
        </OverlayPanel>
    </div>
</template>
