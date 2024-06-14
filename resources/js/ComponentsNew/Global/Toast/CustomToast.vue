<script setup>
import { router } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'
import Toast from 'primevue/toast'
import Button from 'primevue/button'

import NotificationElement from '@/Components/Navbar/NotificationElement.vue'
import CommentBody from '@/Components/Sections/Comments/CommentBody.vue'

const store = useGlobalStore()

const onCommentClicked = (comment) => {
    const commentableType = comment.commentable_type
    const commentableId = comment.commentable_id

    if (commentableType === 'App\\Models\\Project') {
        router.visit(
            route('project.edit', {
                slug: store.workspaces.current.slug,
                project: commentableId,
            }),
        )
    } else {
        router.visit(
            route('campaign.edit', {
                slug: store.workspaces.current.slug,
                campaign: commentableId,
            }),
        )
    }
}
</script>

<template>
    <Toast position="bottom-right" group="toast">
        <template #message="slotProps">
            <div
                class="max-w-screen flex flex-col items-start gap-2"
                style="flex: 1"
            >
                <div class="text-lg font-bold">
                    {{ slotProps.message.summary }}
                </div>
                <div
                    class="font-medium"
                    v-sanitize.basic="slotProps.message.detail"
                />
                <div
                    v-if="slotProps.message.button"
                    class="flex w-full"
                >
                    <Button
                        size="small"
                        outlined
                        v-bind="slotProps.message.button.props"
                        @click="slotProps.message.button.onClick"
                        class="text-right"
                    >
                        <template
                            v-if="slotProps.message.button.props.icon"
                            #icon
                        >
                            <span class="material-icons mr-1">
                                {{
                                    slotProps.message.button.props
                                        .icon
                                }}
                            </span>
                        </template>
                    </Button>
                </div>
            </div>
        </template>
    </Toast>
    <Toast group="notification">
        <template #message="slotProps">
            <div
                class="max-w-screen flex flex-col items-start gap-2"
                style="flex: 1"
            >
                <NotificationElement
                    v-if="slotProps.message.detail.data.notification"
                    :notification="slotProps.message.detail"
                />
                <div
                    v-else-if="slotProps.message.detail.data.comment"
                    class="mb-2 w-full cursor-pointer text-sm"
                    @click="
                        onCommentClicked(
                            slotProps.message.detail.data.comment,
                        )
                    "
                >
                    New comment in
                    <span class="font-bold">
                        {{
                            slotProps.message.detail.data.comment
                                .commentable.name ||
                            slotProps.message.detail.data.comment
                                .commentable.title
                        }}
                    </span>
                    {{
                        slotProps.message.detail.data.comment
                            .commentable_type ===
                        'App\\Models\\Project'
                            ? 'project'
                            : 'campaign'
                    }}
                    <CommentBody
                        :comment="
                            slotProps.message.detail.data.comment
                        "
                        :hideDate="true"
                    />
                </div>
            </div>
        </template>
    </Toast>
</template>
