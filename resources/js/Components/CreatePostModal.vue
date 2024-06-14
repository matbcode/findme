<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import SelectButton from 'primevue/selectbutton'

import XTwitterPostPreview from '@/Components/PostPreviews/XTwitterPostPreview.vue'
import CustomButton from './Custom/CustomButton.vue'
import TextInput from './Inputs/TextInput.vue'

const store = useGlobalStore()

const emit = defineEmits(['close'])

const props = defineProps({
    data: Object,
})

const previewModeOptions = [
    {
        label: 'Mobile',
        value: 'mobile',
    },
    {
        label: 'Desktop',
        value: 'desktop',
    },
]

const selectedPreviewMode = ref('mobile')

const form = ref(
    store.api.post.store({
        campaign_id: props.data.account.campaign.id,
        project_id: props.data.account.campaign.project_id,
        account: props.data.account,
    }),
)

const onSubmit = () => {
    store.api.prepareForm(form.value)
    form.value.onSuccess = () => {
        emit('close')
    }

    form.value.submit()
}
</script>
<template>
    <div class="flex flex-col gap-8">
        <div
            class="flex flex-col gap-4 rounded-2xl bg-white p-4 dark:bg-surface-900"
        >
            <div class="flex items-center gap-2">
                <font-awesome-icon
                    icon="fa-brands fa-x-twitter"
                    size="2x"
                />
                <div>XTwitter Post</div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="relative flex flex-col gap-4">
                    <TextInput
                        v-if="!store.drag.isDragging"
                        v-model="form.fields.payload.value.text"
                        type="textarea"
                        :bindProps="{
                            rows: 20,
                            placeholder: 'Write your post here',
                        }"
                    />
                    <div
                        v-if="store.drag.isDragging"
                        class="flex h-full w-full animate-pulse flex-col items-center justify-center gap-2 rounded-2xl p-8 text-primary-400 outline-dashed outline-2 outline-primary-400"
                    >
                        <font-awesome-icon
                            icon="fa-solid fa-paperclip"
                            size="2x"
                        />
                        <div>Drop your media here to attach</div>
                    </div>
                    <div class="flex gap-4">
                        <CustomButton
                            icon="fa-solid fa-paperclip"
                            label="Attach media"
                            size="small"
                            text
                            @click="
                                store.upload.showTwitterUploadImage({
                                    callback: (media) => {
                                        form.fields.payload.value.media =
                                            media
                                    },
                                })
                            "
                        />
                        <CustomButton
                            icon="fa-solid fa-user-plus"
                            label="Tag people"
                            size="small"
                            text
                        />
                        <CustomButton
                            icon="fa-solid fa-location-dot"
                            label="Add location"
                            size="small"
                            text
                        />
                        <CustomButton
                            icon="fa-solid fa-link"
                            label="Add link"
                            size="small"
                            text
                        />
                    </div>
                </div>
                <div
                    class="flex h-full w-full flex-col justify-between gap-4 @container"
                >
                    <div>
                        <div class="text-lg font-semibold">
                            Preview
                        </div>
                        <div class="text-sm text-surface-300">
                            This is how your post will look like
                        </div>
                    </div>

                    <div
                        class="flex flex-col items-center justify-end gap-4"
                    >
                        <XTwitterPostPreview
                            :user="data.account"
                            :text="form.fields.payload.value.text"
                        />

                        <div class="p-4 text-sm text-surface-300">
                            <p>
                                Please note that the preview shown
                                here is just an example, final result
                                may look different when the post is
                                actually created.
                            </p>
                        </div>

                        <SelectButton
                            v-model="selectedPreviewMode"
                            :options="previewModeOptions"
                            optionValue="value"
                            optionLabel="label"
                        />
                    </div>

                    <div class="flex w-full justify-end gap-4">
                        <CustomButton
                            label="Cancel"
                            icon="close"
                            text
                            class="w-full @sm:w-max"
                            @click="emit('close')"
                        />
                        <CustomButton
                            label="Create post"
                            icon="add"
                            class="w-full @sm:w-max"
                            @click="onSubmit"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
