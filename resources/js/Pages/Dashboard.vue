<script setup>
import { useForm, router } from '@inertiajs/vue3'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import CustomCard from '@/Components/Custom/CustomCard.vue'
import Logo from '@/Components/Navbar/Logo.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'

defineOptions({ layout: MainLayout })

const props = defineProps({
    identities: {
        type: Array,
    },
})

const onCreateIdentity = () => {
    const form = useForm({})

    form.post(route('identity.store'))
}

const onEditIdentity = (identity) => {
    router.visit(route('identity.edit', { identity }))
}

const onShowIdentity = (identity) => {
    router.visit(route('identity.show', { identity }))
}
</script>
<template>
    <WideWrapper class="p-3 sm:p-4">
        <div class="flex justify-between">
            <Logo />
            <div class="flex gap-2">
                <CustomButton
                    icon="fa-solid fa-user-plus"
                    severity="success"
                    @click="onCreateIdentity"
                />
                <!-- <CustomButton
                        label="Add item"
                        icon="fa-solid fa-circle-plus"
                        @click="onCreateIdentity"
                    /> -->
            </div>
        </div>
        <div class="flex h-full flex-col gap-8">
            <div
                v-for="identity in identities"
                :key="identity.id"
                class="flex items-center items-center justify-between gap-2"
            >
                <div class="flex gap-1">
                    <p>{{ identity.first_name }}</p>
                    <p>{{ identity.middle_name }}</p>
                    <p>{{ identity.last_name }}</p>
                </div>
                <div class="flex gap-2">
                    <CustomButton
                        icon="fa-solid fa-eye"
                        @click="onShowIdentity(identity)"
                    />
                    <CustomButton
                        icon="fa-solid fa-user-pen"
                        severity="success"
                        @click="onEditIdentity(identity)"
                    />
                </div>
            </div>
        </div>
    </WideWrapper>
</template>
