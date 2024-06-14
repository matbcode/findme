<script setup>
import { ref, computed, useSlots } from 'vue'
import { debounce } from 'lodash'

import DataView from 'primevue/dataview'
import SelectButton from 'primevue/selectbutton'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import BlockUI from 'primevue/blockui'

import SectionHeader from '@/Components/PageWrappers/SectionHeader.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import Spinner from '@/Components/Custom/Spinner.vue'

const emit = defineEmits(['dragover', 'dragleave', 'drop'])

const props = defineProps({
    /**
     * Array of items to be displayed
     */
    value: {
        type: Array,
        required: true,
    },
    /**
     * Props to be passed to the SectionHeader component
     */
    headerProps: {
        type: Object,
        default: () => ({}),
    },
    /**
     * Message to be displayed when the collection is empty
     */
    emptyMessage: {
        type: String,
        default: 'No records found',
    },
    /**
     * Component to be used for the list layout
     */
    listComponent: {
        type: Object,
        default: () => ({}),
    },
    /**
     * Component to be used for the grid layout
     */
    gridComponent: {
        type: Object,
        default: () => ({}),
    },
    /**
     * Props to be passed to the list/grid component
     */
    bindProps: {
        type: Object,
        default: () => ({}),
    },
    /**
     * Events to be passed to the list/grid component
     */
    bindEvents: {
        type: Object,
        default: () => ({}),
    },
    /**
     * Name of the prop to be passed to the list/grid component
     */
    itemPropsName: {
        type: String,
        default: 'item',
    },
    /**
     * Layout to be used for the DataView
     */
    layout: {
        type: String,
        default: 'grid',
    },
    columns: {
        type: Number,
        default: 0,
    },
    minColumns: {
        type: Number,
        default: 2,
    },
    maxColumns: {
        type: Number,
        default: 5,
    },
    /**
     * The gridClasses prop defines the CSS classes for the grid component.
     *
     */
    gridClasses: {
        type: String,
        default: 'w-full',
    },
    /**
     * The listClasses prop defines the CSS classes for the list component.
     */
    listClasses: {
        type: String,
        default: 'w-full p-1',
    },
    sortOrder: {
        type: [Number, String],
        default: -1,
    },
    sortField: {
        type: String,
        default: 'id',
    },
    showToolbar: {
        type: Boolean,
        default: false,
    },
    showLayoutButtons: {
        type: Boolean,
        default: false,
    },
    showZoomButtons: {
        type: Boolean,
        default: false,
    },
    useDropzone: {
        type: Boolean,
        default: false,
    },
    maxRows: {
        type: Number,
        default: 12,
    },
    firstElement: {
        type: Number,
        default: 0,
    },
    hidePaginator: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    useAspectSquare: {
        type: Boolean,
        default: false,
    },
})

const isDragOver = ref(false)
const searchFilter = ref('')

const gap = ref(0.75 - 0.75 / Math.min(5, props.value.length))

const valueFiltered = computed(() => {
    if (!props.value?.length) {
        return []
    }

    return props.value.filter((item) => {
        return Object.values(item).some((value) => {
            return String(value)
                .toLowerCase()
                .includes(searchFilter.value.toLowerCase())
        })
    })
})

const layouts = [
    { value: 'list', icon: 'fa-solid fa-list' },
    { value: 'grid', icon: 'fa-solid fa-table-cells-large' },
]

const currentLayout = ref(
    layouts.find((l) => l.value === props.layout),
)

const columnsCount = computed(() => {
    return props.columns
        ? props.columns
        : Math.min(5, props.value.length)
})

const gridClassesComputed = computed(() => {
    const propsClass = props.gridClasses.split(' ')
    let colClass = ' '
    if (props.useAspectSquare) {
        colClass += 'aspect-square '
    }
    return [...propsClass, colClass].join(' ')
})

const onZoomIn = () => {
    if (columnsCount.value < Math.min(props.maxColumns, 5)) {
        columnsCount.value += 1
    }
}

const onZoomOut = () => {
    if (columnsCount.value > props.minColumns) {
        columnsCount.value -= 1
    }
}
const onSearch = debounce((e) => {
    searchFilter.value = e.target.value
}, 200)

const onDragOver = (e) => {
    e.preventDefault()

    if (props.useDropzone) {
        isDragOver.value = true
        emit('dragover', e)
    }
}

const onDragLeave = (e) => {
    e.preventDefault()

    if (props.useDropzone) {
        isDragOver.value = false
        emit('dragleave', e)
    }
}

const onDrop = (e) => {
    e.preventDefault()

    if (props.useDropzone) {
        isDragOver.value = false
        emit('drop', e)
    }
}
</script>

<template>
    <BlockUI :blocked="loading" class="flex flex-col gap-8">
        <Spinner v-if="loading" />
        <DataView
            :value="valueFiltered"
            :layout="currentLayout.value"
            :paginator="!hidePaginator && value.length > maxRows"
            :rows="maxRows"
            :emptyMessage
            :sortOrder
            :sortField
            :first="firstElement"
            @dragover="onDragOver"
            @dragleave="onDragLeave"
            @drop="onDrop"
        >
            <template #header>
                <SectionHeader v-bind="headerProps">
                    <template
                        v-if="showToolbar && value.length > 0"
                        #details
                    >
                        <div
                            class="flex w-full items-center justify-between gap-4"
                        >
                            <div
                                :class="[
                                    'w-full rounded-full',
                                    {
                                        'outline outline-2 outline-green-500':
                                            !!searchFilter,
                                    },
                                ]"
                            >
                                <InputGroup
                                    class="rounded-full border"
                                >
                                    <InputGroupAddon>
                                        <font-awesome-icon
                                            icon="fa-solid fa-magnifying-glass"
                                            class="px-1"
                                            size="md"
                                        />
                                    </InputGroupAddon>
                                    <InputText
                                        class="w-full border-0"
                                        size="small"
                                        @input="onSearch"
                                    />
                                </InputGroup>
                            </div>
                            <div class="flex flex-shrink-0 gap-2">
                                <CustomButton
                                    v-if="
                                        showZoomButtons &&
                                        currentLayout.value === 'grid'
                                    "
                                    icon="fa-solid fa-magnifying-glass-minus"
                                    text
                                    rounded
                                    @click="onZoomIn"
                                />
                                <CustomButton
                                    v-if="
                                        showZoomButtons &&
                                        currentLayout.value === 'grid'
                                    "
                                    icon="fa-solid fa-magnifying-glass-plus"
                                    text
                                    rounded
                                    @click="onZoomOut"
                                />
                                <SelectButton
                                    v-if="
                                        showLayoutButtons &&
                                        layouts.length > 1
                                    "
                                    v-model="currentLayout"
                                    :options="layouts"
                                    optionLabel="value"
                                    class="h-full"
                                >
                                    <template #option="slotProps">
                                        <font-awesome-icon
                                            class="p-1"
                                            :icon="
                                                slotProps.option.icon
                                            "
                                        />
                                    </template>
                                </SelectButton>
                                <slot name="toolbarAction" />
                            </div>
                        </div>
                    </template>
                </SectionHeader>
                <slot name="header" />
            </template>

            <template #list="slotProps">
                <slot v-if="isDragOver" name="dropzone" />
                <div
                    v-else
                    class="flex flex-wrap divide-y divide-surface-100 rounded-2xl bg-white dark:divide-surface-800 dark:bg-surface-900"
                >
                    <slot name="itemsPrepend" />
                    <div
                        v-for="(item, index) in slotProps.items"
                        :key="index"
                        :class="listClasses"
                    >
                        <component
                            :is="listComponent"
                            :[itemPropsName]="item"
                            v-bind="bindProps"
                            v-on="bindEvents"
                        />
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <slot v-if="isDragOver" name="dropzone" />
                <div
                    v-else
                    class="border-1 flex flex-wrap gap-3 rounded-2xl"
                >
                    <div
                        v-for="(item, index) in slotProps.items"
                        :key="index"
                        :class="gridClassesComputed"
                        :style="{
                            width: `calc(${100 / columnsCount}% - ${gap}rem)`,
                        }"
                    >
                        <component
                            :is="gridComponent"
                            :[itemPropsName]="item"
                            v-bind="bindProps"
                            v-on="bindEvents"
                        />
                    </div>
                    <div
                        v-if="$slots.itemsPrepend"
                        :class="gridClassesComputed"
                    >
                        <slot name="itemsPrepend" />
                    </div>
                </div>
            </template>

            <template #empty>
                <!-- <slot v-if="loading" name="loading">
                    <div
                        class="flex h-[200px] w-full items-center justify-center rounded-2xl bg-surface-900"
                    >
                        <Spinner v-if="loading" />
                    </div>
                </slot> -->
                <slot v-if="isDragOver" name="dropzone" />
                <div v-else>
                    <div
                        class="flex min-h-48 items-center justify-center gap-4 rounded-2xl bg-white p-4 dark:bg-surface-900"
                    >
                        <slot name="empty">
                            {{
                                searchFilter
                                    ? 'No files found'
                                    : emptyMessage
                            }}
                        </slot>
                    </div>
                </div>
            </template>
        </DataView>
        <slot name="footer" />
    </BlockUI>
</template>

<style scoped>
.grid-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}
</style>
