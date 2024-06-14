<script setup>
import { ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import XTwitterPostPreview from '../PostPreviews/XTwitterPostPreview.vue'
import CustomButton from '../Custom/CustomButton.vue'
import TextInput from '../Inputs/TextInput.vue'

const store = useGlobalStore()
const { showToast } = store.modals

const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
    campaign: {
        type: Object,
        required: true,
    },
})

const selectedAccount = ref(null)
const postText = ref('test')

const onSubmit = () => {
    console.log(selectedAccount.value.id)
    let payload

    try {
        payload = JSON.parse(postText.value)
    } catch (error) {
        showToast({
            summary: 'Error',
            severity: 'error',
            detail: 'Error parsing payload ' + error,
        })
        return
    }

    const form = useForm({
        account: {
            id: selectedAccount.value.id,
            projectable_type:
                selectedAccount.value.pivot.projectable_type,
        },
        payload,
    })

    form.post(
        route('post.store', {
            slug: store.workspaces.current.slug,
            project: props.project.id,
            campaign: props.campaign.id,
        }),
        {
            onSuccess: () => {
                console.log('success')
                selectedAccount.value = null
            },
            onError: () => {
                console.log('error')
            },
        },
    )
}
</script>

<template>
    <div class="flex h-full w-full flex-col gap-4">
        <div class="flex w-full justify-center">
            <!-- <XTwitterPostPreview
                :user="selectedAccount"
                v-model:text="postText"
                @imageUpload=""
            /> -->
            <TextInput
                type="textarea"
                v-model="postText"
                label="Payload"
                class="w-full"
            />
        </div>
        <div class="flex w-full justify-end gap-4">
            <CustomButton
                class="w-max"
                icon="close"
                label="Cancel"
                size="small"
                text
                @click="selectedAccount = null"
            />
            <CustomButton
                class="w-max"
                icon="done"
                label="Add post"
                size="small"
                @click="onSubmit"
            />
        </div>
    </div>
</template>
