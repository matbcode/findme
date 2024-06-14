<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import MarkDownDescription from '@/Components/PageWrappers/MarkDownDescription.vue'

import TitleFieldPresentation from '@/Components/PageWrappers/FieldPresentation/TitleFieldPresentation.vue'
import DateFieldPresentation from '@/Components/PageWrappers/FieldPresentation/DateFieldPresentation.vue'
import StatusFieldPresentation from '@/Components/PageWrappers/FieldPresentation/StatusFieldPresentation.vue'
import ColorFieldPresentation from '@/Components/PageWrappers/FieldPresentation/ColorFieldPresentation.vue'

const { t } = useI18n({})

const props = defineProps({
    formBody: {
        type: Object,
        required: true,
    },
    form: {
        type: Object,
        required: true,
    },
    field: {
        type: Object,
        required: true,
    },
    formKey: {
        type: String,
        required: true,
    },
})

const convertKeyToLabel = (key) => {
    return key
        .replace(/_/g, ' ')
        .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
}

const getLabel = (key) => {
    return props.formBody.i18nKeyPrefix
        ? t(props.formBody.i18nKeyPrefix + key)
        : convertKeyToLabel(key)
}

const presentationComponent = computed(() => {
    if (props.field.presentationType) {
        switch (props.field.presentationType) {
            case 'custom':
                return props.field.presentationComponent
            case 'title':
                return TitleFieldPresentation
            case 'status':
                return StatusFieldPresentation
            default:
                return 'div'
        }
    }

    switch (props.field.type) {
        case 'date':
            return DateFieldPresentation
        case 'textarea':
            return MarkDownDescription
        case 'color':
            return ColorFieldPresentation
        default:
            return 'div'
    }
})
</script>

<template>
    <div
        :class="
            field.editable
                ? 'group relative h-full min-h-[46px] cursor-pointer rounded-2xl p-2'
                : 'group relative h-full min-h-[46px] rounded-2xl p-2'
        "
        @click="field.editable ? (field.presentation = false) : null"
    >
        <!-- <label
            :for="formKey"
            class="text-sm font-medium text-primary-500 dark:text-surface-500"
            >{{ field.label || getLabel(formKey) }}</label
        > -->
        <MarkDownDescription
            v-if="field.type === 'textarea'"
            :description="form[formKey]"
        />
        <component
            v-else
            :is="presentationComponent"
            :id="formKey"
            :class="field.classes"
            :value="form[formKey]"
        >
            {{ form[formKey] }}
        </component>
    </div>
</template>
