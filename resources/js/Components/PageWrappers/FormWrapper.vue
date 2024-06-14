<script setup>
import { ref, computed, onMounted } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'
import { useI18n } from 'vue-i18n'

import TextInput from '@/Components/Inputs/TextInput.vue'
import SectionHeader from '@/Components/PageWrappers/SectionHeader.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import FormWrapperPresentationField from '@/Components/PageWrappers/FormWrapperPresentationField.vue'

const emit = defineEmits(['submit', 'reset', 'success', 'error'])
const { t } = useI18n({})

const store = useGlobalStore()
const { showToast } = store.modals

const props = defineProps({
    showHeader: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: null,
    },
    subtitle: {
        type: String,
        default: null,
    },
    formBody: {
        type: Object,
        default: null,
    },
    icon: {
        type: String,
        default: null,
    },
    colorBox: {
        type: String,
        default: null,
    },
    showButtons: {
        type: String,
        validator: (value) =>
            ['always', 'dirty', 'none'].includes(value),
        default: 'dirty',
    },
    confirmButtonProps: {
        type: Object,
        default: () => ({
            label: 'Save changes',
            icon: 'done',
        }),
    },
    cancelButtonProps: {
        type: Object,
        default: () => ({
            label: 'Restore defaults',
            icon: 'fa-solid fa-xmark',
        }),
    },
    formClass: {
        type: String,
        default: 'flex flex-col gap-4 h-full',
    },
    editable: {
        type: Boolean,
        default: true,
    },
})

const buttonsVisible = computed(() => {
    switch (props.showButtons) {
        case 'always':
            return true
        case 'dirty':
            return form?.isDirty
        case 'none':
            return false
    }
})

const isButtonDisabled = computed(() => {
    return !form?.isDirty || form?.isSubmitting
})

let form = ref({})

if (props.formBody) {
    form = useForm(
        Object.keys(props.formBody.fields).reduce((acc, key) => {
            //Note: check if the key is included and if it's not, skip it and continue with the next one
            if (props.formBody?.fields[key].included === false) {
                return acc
            }

            acc[key] = props.formBody?.fields[key].value
            return acc
        }, {}),
    )
}

onMounted(() => {
    if (!props.formBody) {
        return
    }

    props.formBody.form = form
})

//! TODO: submit method is already defined in api store. This is a between solution.
// FormWrapper should be refactored in the future to use the submit method from the api store
const onSubmit = () => {
    console.log('submitting form')
    if (form) {
        console.log('form is valid', form)
        form.submit(props.formBody.method, props.formBody.route, {
            preserveScroll: true,
            preserveState: false,
            onSuccess: () => {
                props.formBody.options?.onSuccess?.(form) ||
                    showToast({
                        summary: 'Success',
                        severity: 'success',
                        detail: 'Changes saved successfully!!!',
                    })
            },
            onError: () => {
                props.formBody.options?.onError?.(form) ||
                    showToast({
                        summary: 'Error',
                        severity: 'error',
                        detail: 'An error occurred while saving changes!!!',
                    })
            },
            ...props.formBody.options,
        })
    }
    emit('submit')
}

const onReset = () => {
    if (form) {
        form.clearErrors()
        form.reset()
    }
    emit('reset')
}

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

/**
 * When user passes onUpdateModel function in the formBody.fields, it will be called instead of the default behavior
 */
const onUpdateModel = ({ field, key, value }) => {
    if (field.onUpdateModel) {
        field.onUpdateModel({
            form,
            field,
            key,
            value,
            fields: props.formBody.fields,
        })
    } else {
        form[key] = value
    }
}

/**
 * When user passes onMount function in the formBody.fields, it will be called to setup conditional values or props
 */
for (const field in props.formBody?.fields) {
    if (props.formBody.fields[field].onMount) {
        props.formBody.fields[field].onMount({
            form,
            field: props.formBody.fields[field],
            key: field,
            value: form[field],
            fields: props.formBody.fields,
        })
    }
}
const formClass = computed(() => {
    return {
        'grid grid-cols-12 items-stretch place-items-stretch': true,
        [props.formClass]: true,
    }
})

const presentationFieldClasses = (field) => {
    return [
        {
            'col-span-12': !field.classes,
        },
        field.classes,
    ]
}

const editedFieldClasses = (field) => {
    return [
        {
            'relative mb-1': true,
        },
        {
            'col-span-12': !field.classes,
        },
        field.classes,
    ]
}
</script>
<template>
    <section>
        <SectionHeader
            v-if="showHeader"
            :title="title"
            :subtitle="subtitle"
            :icon="icon"
            :colorBox="colorBox"
        />
        <slot>
            <form
                v-if="formBody"
                :class="formClass"
                @submit.prevent="onSubmit"
            >
                <template
                    v-for="(field, formKey) in formBody.fields"
                    v-bind:key="formKey"
                >
                    <div
                        v-if="!field.presentation && !field.hidden"
                        :class="editedFieldClasses(field)"
                    >
                        <div
                            v-if="field.presentation === false"
                            class="absolute right-[-16px] top-[-16px] z-10"
                        >
                            <CustomButton
                                text
                                icon="cancel"
                                size="small"
                                rounded
                                @click="field.presentation = true"
                            />
                        </div>
                        <TextInput
                            v-if="
                                !field.presentation && !field.hidden
                            "
                            v-bind:key="formKey"
                            :name="formKey"
                            :label="field.label || getLabel(formKey)"
                            :type="field.type"
                            :hint="field.hint"
                            :bindProps="field.props"
                            :bindEvents="field.events"
                            :error="form?.errors[formKey]"
                            :modelValue="form[formKey]"
                            @update:modelValue="
                                onUpdateModel({
                                    field,
                                    key: formKey,
                                    value: $event,
                                })
                            "
                        />
                    </div>
                    <FormWrapperPresentationField
                        v-else-if="
                            field.presentation && !field.hidden
                        "
                        :formBody="props.formBody"
                        :form
                        :field
                        :formKey
                        :class="presentationFieldClasses(field)"
                    />
                </template>
                <slot name="append" :form="form" />
            </form>
            <div
                v-if="buttonsVisible"
                class="mt-8 flex h-full w-full items-end justify-end gap-4 @container"
            >
                <CustomButton
                    v-bind="cancelButtonProps"
                    :disabled="isButtonDisabled || form?.isSubmitting"
                    text
                    plain
                    class="w-full @md:w-max"
                    @click="onReset"
                />
                <CustomButton
                    v-bind="confirmButtonProps"
                    :disabled="isButtonDisabled || form?.isSubmitting"
                    raised
                    autofocus
                    type="submit"
                    class="w-full @md:w-max"
                    severity="success"
                    @click="onSubmit"
                />
            </div>
        </slot>
    </section>
</template>
