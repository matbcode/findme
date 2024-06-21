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
    { label: 'Medications', icon: 'fa-solid fa-thumbs-down' },
    { label: 'Conditions', icon: 'fa-solid fa-thumbs-up' },
    { label: 'Allergies', icon: 'fa-solid fa-allergies' },
])
</script>

<template>
    <TabSection :tabs="tabViews">
        <template #Conditions>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <BlockInfo
                    title="🧠 Dementia"
                    description="A group of symptoms affecting memory, thinking, and social abilities, often leading to impairment in daily functioning."
                />
                <BlockInfo
                    title="🍬 Diabetes"
                    description="A metabolic disorder characterized by high blood sugar levels over a prolonged period."
                />
            </div>
        </template>
        <template #Medications>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <BlockInfo
                    title="💊 Metformin"
                    description="•  Brand Names: Glucophage, Fortamet
                    •	Dose: 500 mg
                    •	Frequency: Twice daily
                    •	Description: Used to improve blood sugar control in people with type 2 diabetes."
                    danger
                />
                <BlockInfo
                    title="💊 Lisinopril"
                    description="•	Brand Names: Prinivil, Zestril
	•	Dose: 10 mg
	•	Frequency: Once daily
	•	Description: An ACE inhibitor used to treat high blood pressure and heart failure."
                    danger
                />
                <BlockInfo
                    title="💊 Levothyroxine"
                    description="	•	Brand Names: Synthroid, Levoxyl
	•	Dose: 75 mcg
	•	Frequency: Once daily
	•	Description: Used to treat hypothyroidism by replacing thyroid hormone."
                    danger
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
            </div>
        </template>
    </TabSection>
</template>
