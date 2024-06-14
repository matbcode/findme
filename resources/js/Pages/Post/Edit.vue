<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import XTwitterPostPreview from '@/Components/PostPreviews/XTwitterPostPreview.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const store = useGlobalStore()
const { getChannelUser } = store.channels
const { showTwitterUploadImage } = store.upload
const { showDeletePostModal } = store.posts

const props = defineProps({
    post: Object,
    campaign: Object,
    project: Object,
})

const payload = ref(props.post.payload)

const imageMockup = ref(null)

const actions = ref([
    {
        label: 'Upload image',
        icon: 'upload',
        rounded: true,
        text: true,
        command: () =>
            showTwitterUploadImage({
                post: props.post,
                callback: (image) => (imageMockup.value = image),
            }),
    },
    {
        label: 'Delete post',
        icon: 'delete',
        severity: 'danger',
        rounded: true,
        text: true,
        command: () =>
            showDeletePostModal({
                project_id: props.project.id,
                campaign_id: props.campaign.id,
                post: props.post,
            }),
    },
])

const links = ref([
    {
        label: 'Back',
        icon: 'arrow_back_ios_new',
        href: route('campaign.edit', {
            slug: store.workspaces.current.slug,
            project: props.post.project_id,
            campaign: props.post.campaign_id,
        }),
    },
])

const formBody = {
    ...store.api.post.update({
        campaign_id: props.campaign.id,
        project_id: props.project.id,
        channels: props.project.channels,
        post: props.post,
    }),
}
</script>

<template>
    <WideWrapper title="Manage Post" :actions :links :formBody>
        <div class="flex justify-center">
            <!-- <XTwitterPostPreview
                :user="
                    getChannelUser(project.channels, post.channel_id)
                "
                :text="payload?.text"
                :image="payload?.image || imageMockup"
                :post="post"
                @input="formBody.form.payload.text = $event"
                @imageUpload="formBody.form.payload.image = $event"
            /> -->
        </div>
    </WideWrapper>
</template>
