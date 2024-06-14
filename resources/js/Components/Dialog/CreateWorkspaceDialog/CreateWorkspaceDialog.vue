<script setup>
import SelectButton from 'primevue/selectbutton'

import TextInput from '@/Components/Inputs/TextInput.vue'
import PlanCard from '@/Components/Dialog/CreateWorkspaceDialog/PlanCard.vue'
</script>

<template>
    <div class="p-4">
        <div class="flex w-[900px] flex-col gap-4">
            <TextInput v-model="name" label="Name" />

            <div class="flex w-full py-4">
                <SelectButton
                    type="selectbutton"
                    class="w-[250px]"
                    size="small"
                    :options="['Billed Monthly', 'Billed Yearly']"
                >
                    <template #option="{ option }">
                        <div
                            class="flex w-full items-center justify-center gap-2 text-sm"
                        >
                            <span>{{ option }}</span>
                        </div>
                    </template>
                </SelectButton>
            </div>

            <div
                class="flex w-full items-center justify-center gap-4"
            >
                <PlanCard name="Basic" price="19" />
                <PlanCard name="Standard" price="59" />
                <PlanCard name="Advanced" price="129" />
            </div>
        </div>
    </div>
</template>
