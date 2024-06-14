<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'
import { storeToRefs } from 'pinia'

import Dialog from 'primevue/dialog'
import InlineMessage from 'primevue/inlinemessage'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import TextInput from '@/Components/Inputs/TextInput.vue'

const store = useGlobalStore()

const { confirmModalInfo } = storeToRefs(store.modals)

const confirmText = ref('')
</script>

<template>
    <Dialog
        :visible="store.modals.isConfirmOpen"
        closable
        :style="{ width: '40rem', maxWidth: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        modal
        :draggable="false"
        dismissableMask
        blockScroll
        @update:visible="confirmModalInfo.onUpdateVisibility"
    >
        <template #header>
            <span class="text-xl">{{ confirmModalInfo.title }}</span>
        </template>
        <slot>
            <div class="flex flex-col gap-8 p-8">
                <div v-if="confirmModalInfo.message">
                    {{ confirmModalInfo.message }}
                </div>
                <InlineMessage
                    v-if="confirmModalInfo.inlineMessage"
                    v-bind="confirmModalInfo.inlineMessage.props"
                >
                    {{ confirmModalInfo.inlineMessage.text }}
                </InlineMessage>
                <TextInput
                    v-if="confirmModalInfo.confirmText"
                    v-model="confirmText"
                    :label="`Please type '${confirmModalInfo.confirmText}' to confirm`"
                    class="w-full"
                />
            </div>
        </slot>
        <template #footer>
            <div class="flex w-full justify-end gap-6">
                <CustomButton
                    v-bind="confirmModalInfo.cancelButtonProps"
                    class="w-full sm:w-auto"
                    text
                    plain
                    @click="confirmModalInfo.onCancel"
                />
                <CustomButton
                    v-bind="confirmModalInfo.confirmButtonProps"
                    :disabled="
                        confirmModalInfo.confirmText &&
                        confirmText !== confirmModalInfo.confirmText
                    "
                    class="w-full sm:w-auto"
                    icon="pi pi-check"
                    autofocus
                    @click="confirmModalInfo.onConfirm"
                />
            </div>
        </template>
    </Dialog>
</template>
