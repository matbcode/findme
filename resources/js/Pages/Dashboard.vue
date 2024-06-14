<script setup>
import { useForm, router } from '@inertiajs/vue3'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import CustomCard from '@/Components/Custom/CustomCard.vue'

import CenteredLayout from '@/Layouts/CenteredLayout.vue'
import MainLayout from '@/Layouts/MainLayout.vue'

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
</script>
<template>
    <CenteredLayout>
        <CustomCard>
            <div
                class="flex flex-col items-center justify-center gap-8"
            >
                <h1 class="text-2xl font-semibold text-gray-800">
                    Dashboard
                </h1>
                <p class="text-gray-500">Welcome to your dashboard</p>
                <div
                    v-for="identity in identities"
                    :key="identity.id"
                    class="flex items-center gap-2"
                >
                    <p>{{ identity.id }}</p>
                    <p>{{ identity.title }}</p>
                    <p>{{ identity.first_name }}</p>
                    <p>{{ identity.middle_name }}</p>
                    <p>{{ identity.last_name }}</p>
                    <p>{{ identity.nickname }}</p>
                    <p>{{ identity.dob }}</p>
                    <CustomButton
                        severity="info"
                        icon="fa-solid fa-user-pen"
                        @click="onEditIdentity(identity)"
                    />
                </div>
                <CustomButton
                    label="Create new identity"
                    @click="onCreateIdentity"
                    severity="success"
                />
            </div>
        </CustomCard>
    </CenteredLayout>
</template>
