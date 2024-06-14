<script setup>
import CustomButton from '@/Components/Custom/CustomButton.vue'
import TileWrapper from '@/Components/TileWrapper.vue'

const props = defineProps({
    name: String,
    price: [String, Number],
    availableFeatures: Array,
    disabledFeatures: Array,
})
</script>

<template>
    <TileWrapper>
        <div class="flex flex-col gap-2 p-8">
            <div
                class="flex items-center justify-center font-semibold"
            >
                {{ name }}
            </div>
            <div
                class="flex items-center justify-center py-2 text-4xl font-bold"
            >
                £{{ price }}
            </div>
            <div class="text-center text-sm opacity-70">
                per month
            </div>
            <div>
                <CustomButton
                    label="Select"
                    class="w-full"
                    severity="success"
                />
            </div>
        </div>
    </TileWrapper>
</template>
