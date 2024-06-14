<script setup>
import { Link } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import XTwitterPostPreview from '@/Components/PostPreviews/XTwitterPostPreview.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'

const store = useGlobalStore()
const { showDeletePostModal } = store.posts

const props = defineProps({
    post: {
        type: Object,
        required: true,
    },
})

const xTwitterModel = 'App\\Models\\Accounts\\XAccount'
</script>

<template>
    <!-- {{ post }} -->
    <div
        class="group relative flex h-full w-full items-center justify-center rounded-2xl bg-white p-8 dark:bg-surface-900"
    >
        <div class="absolute left-4 top-4">
            <font-awesome-icon
                icon="fa-brands fa-x-twitter"
                size="2x"
            />
        </div>
        <XTwitterPostPreview
            v-if="post.postable_type === xTwitterModel"
            :user="post.postable"
            v-model:text="post.payload.text"
        />
        <div v-else>
            {{ post }}
        </div>

        <div
            class="absolute right-4 top-4 opacity-0 group-hover:opacity-100"
        >
            <CustomButton
                icon="fa-regular fa-copy"
                size="small"
                rounded
                text
            />
            <Link
                :href="
                    route('post.edit', {
                        slug: store.workspaces.current.slug,
                        project: post.project_id,
                        campaign: post.campaign_id,
                        post,
                    })
                "
            >
                <CustomButton
                    icon="fa-regular fa-pen-to-square"
                    size="small"
                    rounded
                    text
                />
            </Link>
            <CustomButton
                icon="fa-solid fa-trash-can"
                size="small"
                severity="danger"
                rounded
                text
                @click="
                    showDeletePostModal({
                        project_id: post.project_id,
                        campaign_id: post.campaign_id,
                        post,
                    })
                "
            />
        </div>
    </div>
</template>
