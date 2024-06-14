<script setup>
import { defineModel, computed } from 'vue'

import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import SelectButton from 'primevue/selectbutton'
import Listbox from 'primevue/listbox'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import Textarea from 'primevue/textarea'
import ColorPicker from 'primevue/colorpicker'
import MultiSelect from 'primevue/multiselect'
import InlineMessage from 'primevue/inlinemessage'

import Avatar from '@/Components/Custom/Avatar.vue'
import RichTextEditor from '@/Components/Custom/RichTextEditor.vue'

const model = defineModel()

const props = defineProps({
    name: {
        type: String,
    },
    label: {
        type: String,
    },
    options: {
        type: Array,
        default: () => [],
    },
    type: {
        type: String,
        default: 'text',
    },
    hint: {
        type: String,
        default: '',
    },
    mask: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    autofocus: {
        type: Boolean,
        default: false,
    },
    autocomplete: {
        type: String,
        default: 'off',
    },
    error: {
        type: String,
        default: '',
    },
    inputClass: {
        type: String,
        default: 'mt-1 block w-full',
    },
    optionLabel: {
        type: String,
        default: 'label',
    },
    optionValue: {
        type: String,
        default: 'value',
    },
    bindProps: {
        type: Object,
        default: () => ({}),
    },
    bindEvents: {
        type: Object,
        default: () => ({}),
    },
})

const componentType = computed(() => {
    switch (props.type) {
        case 'inlinemessage':
            return InlineMessage
        case 'multiselect':
            return MultiSelect
        case 'color':
            return ColorPicker
        case 'textarea':
            return Textarea
        case 'richtext':
            return RichTextEditor
        case 'date':
            return Calendar
        case 'listbox':
            return Listbox
        case 'selectbutton':
            return SelectButton
        case 'mask':
            return InputMask
        case 'dropdown':
            return Dropdown
        case 'avatar':
            return Avatar
        default:
            return InputText
    }
})

const componentProps = computed(() => {
    let result = {}

    switch (props.type) {
        case 'avatar':
            result = {
                // user: props.bindProps.user,
                // size: props.bindProps.size,
                // editable: props.bindProps.editable,
                // notifications: props.bindProps.notifications,
            }
            break
        case 'inlinemessage':
            result = {
                severity: 'warning',
            }
            break
        case 'multiselect':
            result = {
                options: props.options,
                optionLabel: props.optionLabel || 'label',
                optionValue: props.optionValue || 'value',
            }
            break
        case 'color':
            result = {
                // inline: true,
            }
            break
        case 'textarea':
            result = {
                rows: 5,
                id: props.name,
            }
            break
        case 'date':
            result = {
                dateFormat: 'yy-mm-dd',
                showButtonBar: true,
            }
            break
        case 'dropdown':
            result = {
                // options: props.options,
                optionLabel: props.optionLabel || 'label',
                optionValue: props.optionValue || 'value',
                outlined: true,
            }
            break
        case 'listbox':
            result = {
                options: props.options,
                optionLabel: props.optionLabel || 'label',
                optionValue: props.optionValue || 'value',
                multiple: true,
                listStyle: 'max-height:200px',
            }
            break
        case 'selectbutton':
            result = {
                options: props.options,
                optionLabel: props.optionLabel || 'label',
                optionValue: props.optionValue || 'value',
                optionDisabled: 'disabled',
                allowEmpty: false,
            }
            break
        case 'mask':
            result = {
                mask: props.mask,
            }
            break
        default:
            result = {
                type: props.type,
                placeholder: props.placeholder,
                required: props.required,
                autofocus: props.autofocus,
                autocomplete: props.autocomplete,
            }
    }
    return { ...result, ...props.bindProps }
})

const isLabelVisible = computed(() => {
    return props.type !== 'inlinemessage'
})

const inputClasses = computed(() => {
    return {
        [props.inputClass]: true,
        'max-w-max': props.type === 'selectbutton',
        // 'border-2 border-red-600 dark:border-red-400': !!props.error,
        'outline outline-2 outline-red-500 dark:outline-red-400 animate-pulse':
            !!props.error,
    }
})

const labelClasses = computed(() => {
    return {
        'font-medium text-sm': true,
        'text-red-600 dark:text-red-400 animate-pulse': props.error,
    }
})

const hintClasses = computed(() => {
    return {
        'mt-2 text-sm': true,
        'text-red-600 dark:text-red-400 animate-pulse': props.error,
    }
})
</script>

<template>
    <div class="relative">
        <label v-if="isLabelVisible" :for="name" :class="labelClasses"
            >{{ label }}
            <div v-if="hint" class="absolute right-0 top-0">
                <span
                    class="material-icons text-gray-400"
                    v-tooltip.top="{ value: hint }"
                    >help_outline</span
                >
            </div>
        </label>
        <component
            :is="componentType"
            :id="name"
            :class="inputClasses"
            :error="props.error"
            v-model="model"
            v-bind="componentProps"
            v-on="props.bindEvents"
            :invalid="!!props.error"
        >
            <template v-if="props.type === 'inlinemessage'">
                {{ props.bindProps.text }}
            </template>
            <template
                v-if="
                    props.type === 'selectbutton' &&
                    props.bindProps.imageKey
                "
                #option="slotProps"
            >
                <img
                    :src="slotProps.option[props.bindProps.imageKey]"
                    class="h-6 w-6"
                />
            </template>
        </component>
        <small v-if="error" :class="hintClasses">{{ error }}</small>
    </div>
</template>
