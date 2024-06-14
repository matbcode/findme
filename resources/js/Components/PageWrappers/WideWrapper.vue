<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Link } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import FormWrapper from '@/Components/PageWrappers/FormWrapper.vue'

const store = useGlobalStore()

const props = defineProps({
    title: {
        type: String,
        default: null,
    },
    actions: {
        type: Array,
    },
    color: {
        type: String,
        default: null,
    },
    tags: {
        type: Array,
        default: () => [],
    },
    links: {
        type: Array,
        default: () => [],
    },
    formBody: {
        type: Object,
        default: null,
    },
    expanded: {
        type: Boolean,
        default: false,
    },
    expandable: {
        type: Boolean,
        default: true,
    },
    showExpandButton: {
        type: Boolean,
        default: true,
    },
    showHeader: {
        type: Boolean,
        default: false,
    },
})

const isExpanded = ref(
    props.expandable
        ? props.expanded || store.user.isWideWrapperExpanded
        : false,
)

const classes = computed(() => {
    return {
        'relative w-full flex flex-col gap-8': true,
        'max-w-[2560px]': isExpanded.value,
        'max-w-6xl': !isExpanded.value,
    }
})

const icon = computed(() => {
    return !isExpanded.value
        ? 'fa-solid fa-up-right-and-down-left-from-center'
        : 'fa-solid fa-down-left-and-up-right-to-center'
})

const onToggleExpanded = () => {
    if (!props.expandable) {
        return
    }

    isExpanded.value = !isExpanded.value
    store.user.isWideWrapperExpanded = isExpanded.value

    store.url.setNavbarAppendAction(
        {
            icon: icon.value,
            text: true,
            size: 'small',
        },
        {
            click: onToggleExpanded,
        },
    )
}

onMounted(() => {
    if (props.links && props.links.length > 0) {
        store.url.setNavbarPrependAction({
            icon: 'fa-solid fa-chevron-left',
            label: props.links[0].label,
            href: props.links[0].href,
            text: true,
        })
    }

    // if (props.showExpandButton) {
    //     store.url.setNavbarAppendAction(
    //         {
    //             icon: icon.value,
    //             size: "small",
    //             plain: true,
    //         },
    //         {
    //             click: onToggleExpanded,
    //         },
    //     );
    // }
})

onBeforeUnmount(() => {
    store.url.setNavbarPrependAction(null)
})
</script>
<template>
    <div
        id="wrapper-content"
        class="flex h-full w-full justify-center pb-8"
    >
        <div :class="classes">
            <FormWrapper v-bind="props" />
            <div class="flex flex-col gap-8">
                <slot />
            </div>
        </div>
    </div>
</template>
