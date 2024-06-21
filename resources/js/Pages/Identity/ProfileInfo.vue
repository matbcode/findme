<script setup>
import CustomButton from '@/Components/Custom/CustomButton.vue'

const props = defineProps({
    identity: {
        type: Object,
    },
    alternativeMode: {
        type: Boolean,
        default: false,
    },
    hideDetails: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div class="flex flex-col gap-8">
        <div
            v-if="alternativeMode && !hideDetails"
            class="w-max self-center overflow-hidden rounded-3xl border-4 border-white shadow-xl sm:left-8 sm:translate-x-0"
        >
            <img ref="avatar" :src="`/storage/` + identity.image" />
        </div>
        <div
            v-else-if="!hideDetails"
            class="absolute -top-[140px] left-1/2 h-[240px] w-[240px] -translate-x-1/2 overflow-hidden rounded-full border-4 border-white shadow-xl sm:left-8 sm:translate-x-0"
        >
            <img ref="avatar" :src="`/storage/` + identity.image" />
        </div>
        <div class="flex flex-col gap-8 sm:flex-row">
            <div
                class="flex w-full flex-col gap-2 text-center sm:text-left"
            >
                <div class="text-xl font-semibold">
                    {{ identity.title }}
                    {{ identity.first_name }}
                    {{ identity.middle_name }}
                    {{ identity.last_name }}
                </div>

                <div v-if="!hideDetails">
                    Aspiring
                    {{ identity.profession || 'Software Engineer' }}
                </div>

                <div
                    class="flex justify-center gap-2 sm:justify-start"
                >
                    <font-awesome-icon
                        icon="fa-solid fa-location-dot"
                        size="xl"
                    />
                    <span class="font-semibold">
                        {{ identity.location || 'Birmingham, UK' }}
                    </span>
                </div>
            </div>

            <div
                v-if="!alternativeMode"
                class="border-1 flex w-full items-center justify-center gap-2 divide-x divide-surface-100 rounded-2xl border border-surface-100 bg-white text-center sm:w-max"
            >
                <div class="w-1/3 p-4">
                    <span class="text-xl font-semibold">12</span>
                    <div class="text-sm">Acknowledges</div>
                </div>
                <div class="w-1/3 p-4">
                    <span class="text-xl font-semibold">30</span>
                    <div class="text-sm">Following</div>
                </div>
                <div class="w-1/3 p-4">
                    <span class="text-xl font-semibold">122</span>
                    <div class="text-sm">Followers</div>
                </div>
            </div>
        </div>

        <div
            v-if="!alternativeMode"
            class="flex justify-center sm:justify-start lg:justify-end"
        >
            <div class="flex w-full gap-2">
                <CustomButton label="Follow" class="w-full" rounded />
                <CustomButton
                    label="Endorse"
                    icon="fa-solid fa-thumbs-up"
                    class="w-full"
                    severity="info"
                    rounded
                />
            </div>
        </div>

        <slot />

        <div
            v-if="identity.description && !hideDetails"
            class="flex w-full flex-col"
        >
            <div class="p-1.5" style="white-space: pre-line">
                {{ identity.description }}
            </div>
        </div>

        <div
            v-if="!alternativeMode"
            class="flex w-full flex-col gap-4"
        >
            <div class="flex gap-2">
                <CustomButton
                    label="Maria Kowalski"
                    icon="fa-brands fa-facebook"
                    rounded
                    size="small"
                />
                <CustomButton
                    label="maria.12"
                    icon="fa-brands fa-instagram"
                    rounded
                    size="small"
                />
            </div>
        </div>
    </div>
</template>
