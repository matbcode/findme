<script setup>
import { Link } from '@inertiajs/vue3'

import CustomButton from '@/Components/Custom/CustomButton.vue'

const props = defineProps({
    links: Array,
})

const getLinkProps = (link) => {
    if (link.label.includes('Previous')) {
        return {
            disabled: link.url === null,
            plain: !link.active,
            text: true,
            icon: 'fa-solid fa-angle-left',
        }
    } else if (link.label.includes('Next')) {
        return {
            disabled: link.url === null,
            plain: !link.active,
            text: true,
            icon: 'fa-solid fa-angle-right',
        }
    }

    return {
        label: link.label,
        disabled: link.url === null,
        plain: !link.active,
        text: true,
    }
}
</script>

<template>
    <div v-if="links?.length > 3">
        <div class="flex flex-wrap justify-center gap-8">
            <template v-for="(link, key) in links" :key="key">
                <Link :href="link.url" preserve-scroll>
                    <CustomButton
                        :rounded="true"
                        v-bind="getLinkProps(link)"
                    />
                </Link>
            </template>
        </div>
    </div>
</template>
