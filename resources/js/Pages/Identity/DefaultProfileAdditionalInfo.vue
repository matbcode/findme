<script setup>
import { ref } from 'vue'

import SelectButton from 'primevue/selectbutton'
import BlockInfo from './BlockInfo.vue'
import TabSection from './TabSection.vue'

const currentTab = ref({
    label: 'Strengths',
    icon: 'fa-solid fa-thumbs-up',
})
const tabViews = ref([
    { label: 'Strengths', icon: 'fa-solid fa-thumbs-up' },
    { label: 'Challenges', icon: 'fa-solid fa-thumbs-down' },
    { label: 'Allergies', icon: 'fa-solid fa-allergies' },
])
</script>

<template>
    <TabSection :tabs="tabViews">
        <template #Strengths>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <BlockInfo
                    title="🤝 Teamwork Skills"
                    description="Ability to work effectively with others, communicate ideas, and collaborate on projects."
                />
                <BlockInfo
                    title="📈 Problem-Solving Skills"
                    description="Capacity to identify issues, analyze data, and develop solutions to complex problems."
                />
                <BlockInfo
                    title="🎨 Creativity & Innovation"
                    description="Talent for generating new ideas, designing products, and developing original concepts."
                />
                <BlockInfo
                    title="📊 Analytical Skills"
                    description="Capability to interpret data, identify trends, and make informed decisions based on evidence."
                />
            </div>
        </template>
        <template #Challenges>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <BlockInfo
                    title="🌈 Autism Spectrum Disorder (ASD)"
                    description="Challenges with social skills, repetitive behaviors, and communication."
                />
                <BlockInfo
                    title="🎯 Focus & Attention"
                    description="Problems with maintaining attention and staying focused on tasks over time."
                />
                <BlockInfo
                    title="🔄 Cognitive Flexibility"
                    description="Trouble adapting to changes, rigid thinking, resistance to new experiences."
                />
                <BlockInfo
                    title="📚 School or Work Problems"
                    description="Challenges in educational or professional settings, such as managing tasks or relationships with colleagues."
                />
            </div>
        </template>
        <template #Allergies>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <BlockInfo
                    title="🍎 Food Allergies"
                    description="Allergic reactions to specific foods or food ingredients."
                    example="Peanuts, shellfish, milk, eggs."
                />
                <BlockInfo
                    title="💊 Medication Allergies"
                    description="Adverse reactions to specific medications or drug classes."
                    example="Penicillin, aspirin, sulfa drugs."
                />
                <BlockInfo
                    title="🌿 Environmental Allergies"
                    description="Sensitivity to environmental factors, such as pollen, dust, or pet dander."
                    example="Pollen, dust mites, pet dander."
                />
                <BlockInfo
                    title="🐝 Insect Allergies"
                    description="Allergic reactions to insect bites or stings."
                    example="Bees, wasps, fire ants."
                />
            </div>
        </template>
    </TabSection>
</template>
