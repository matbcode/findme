<script setup>
import { ref, defineModel } from 'vue'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Menu from 'primevue/menu'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import SectionHeader from '@/Components/PageWrappers/SectionHeader.vue'
import Pagination from '@/ComponentsNew/Global/Pagination/Pagination.vue'

const props = defineProps({
    value: {
        type: [Array, Object],
        required: true,
    },
    headerProps: {
        type: Object,
        default: () => ({}),
    },
    emptyMessage: {
        type: String,
        default: 'No records found',
    },
    multiselect: {
        type: Boolean,
        default: false,
    },
})

const selected = defineModel('selected')
selected.value = []

const filters = ref({})
const metaKey = ref(true)
const actionMenu = ref(null)

const toggleMenu = (event) => {
    actionMenu.value.toggle(event)
}
</script>
<template>
    <DataTable
        :value="value.data || value"
        v-model:selection="selected"
        v-model:filters="filters"
        :metaKeySelection="metaKey"
        size="small"
        sortMode="multiple"
        selectionMode="multiple"
        columnResizeMode="fit"
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink "
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
    >
        <template #header>
            <SectionHeader
                v-bind="headerProps"
                :details="
                    selected.length > 1
                        ? `Selected ${selected.length} of ${value.length}`
                        : ''
                "
            >
                <template #actions>
                    <CustomButton
                        v-if="
                            headerProps.massActions?.length === 1 &&
                            selected.length > 1
                        "
                        icon="more_horiz"
                        rounded
                        text
                        class="ml-3"
                        v-bind="headerProps.massActions[0]"
                        @click="headerProps.massActions[0].command"
                    />
                    <CustomButton
                        v-else-if="
                            headerProps.massActions?.length > 1 &&
                            selected.length > 1
                        "
                        icon="more_horiz"
                        rounded
                        text
                        class="ml-3"
                        @click="toggleMenu"
                    />
                    <Menu
                        ref="actionMenu"
                        :model="headerProps.massActions"
                        :popup="true"
                    />
                </template>
            </SectionHeader>
            <slot name="header" />
        </template>
        <template>
            <Column
                v-if="multiselect"
                selectionMode="multiple"
                selectAll
                headerStyle="width: 1rem"
            ></Column>
            <slot />
        </template>
        <template #empty> {{ emptyMessage }} </template>
        <template #footer>
            <slot name="footer" />
        </template>
    </DataTable>
    <Pagination :links="value.links" />
</template>
