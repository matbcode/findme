<script setup>
import { ref, onMounted } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import TextInput from '@/Components/Inputs/TextInput.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import Grid from '@/ComponentsNew/Grid/Grid.vue'
import CommentBody from '@/Components/Sections/Comments/CommentBody.vue'
import axios from 'axios'

const store = useGlobalStore()

const props = defineProps({
    project: {
        type: Object,
        required: true,
    },
    campaign: {
        type: Object,
    },
    activities: {
        type: Array,
    },
})

const newComment = ref('')

const comments = ref({
    data: [],
    current_page: 1,
    loading: true,
    fetching: false,
    error: null,
})

const fetchComments = async () => {
    store.api.fetchComments({
        project: props.project,
        campaign: props.campaign || null,
        callback: (response) => {
            comments.value = { ...response }
            comments.value.loading = false
            comments.value.data = [
                ...comments.value.data,
                ...props.activities,
            ]
        },
    })
}

const onFetchMoreComments = () => {
    comments.value.fetching = true
    axios
        .get(comments.value.next_page_url)
        .then((response) => {
            comments.value.data = [
                ...comments.value.data,
                ...response.data.data,
                ...props.activities,
            ]
            comments.value.current_page = response.data.current_page
            comments.value.next_page_url = response.data.next_page_url
            comments.value.fetching = false
        })
        .catch((error) => {
            comments.value.error = error
            comments.value.fetching = false
        })
}

const onAddComment = () => {
    const form = useForm({
        body: newComment.value,
    })

    form.post(
        route(
            props.campaign ? 'campaign.comment' : 'project.comment',
            {
                slug: store.workspaces.current.slug,
                project: props.project.id,
                campaign: props.campaign?.id || null,
            },
        ),
        {
            preserveScroll: true,
            onSuccess: () => {},
            onError: () => {},
        },
    )

    newComment.value = ''
    comments.value.loading = true
}

store.eventBus.echoEvent.listen(
    store.eventBus.ECHO_EVENTS.COMMENT_CREATED,
    fetchComments,
)

store.eventBus.echoEvent.listen(
    store.eventBus.ECHO_EVENTS.COMMENT_DELETED,
    fetchComments,
)

store.eventBus.echoEvent.listen(
    store.eventBus.ECHO_EVENTS.COMMENT_UPDATED,
    fetchComments,
)

onMounted(fetchComments)
</script>

<template>
    <div class="flex flex-col gap-8">
        <Grid
            id="comments"
            :value="comments.data"
            :listComponent="CommentBody"
            itemPropsName="comment"
            layout="list"
            sortOrder="1"
            :maxRows="5"
            :loading="comments.loading"
            showMoreLabel="Load previous comments"
            :firstElement="comments.data.length - 5"
            :headerProps="{ title: 'Comments / Activities' }"
            showLoadMoreBefore
            hidePaginator
        >
            <template #header>
                <div
                    v-if="
                        comments.current_page !== comments.last_page
                    "
                >
                    <div
                        class="p-2 text-center text-sm text-surface-900 dark:text-surface-200"
                    >
                        showing {{ comments.data.length }} of
                        {{ comments.total }}
                    </div>
                    <CustomButton
                        class="my-1 w-full"
                        label="Load previous comments"
                        size="small"
                        :loading="comments.fetching"
                        text
                        @click="onFetchMoreComments"
                    />
                </div>
            </template>
            <template #empty>
                <div
                    class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl p-8"
                >
                    <div
                        class="text-lg font-semibold text-surface-800 dark:text-surface-200"
                    >
                        No comments yet
                    </div>
                    <div
                        class="text-sm font-light text-surface-600 dark:text-surface-300"
                    >
                        Be the first to comment
                    </div>
                </div>
            </template>
            <template #loading>
                <div
                    class="flex min-h-[100px] flex-col items-center justify-center gap-4 rounded-xl p-8"
                >
                    loading comments...
                </div>
            </template>
            <template #footer>
                <div
                    class="flex flex-col gap-8 overflow-clip rounded-2xl"
                >
                    <TextInput type="textarea" v-model="newComment" />
                    <div class="flex w-full justify-end">
                        <CustomButton
                            label="Add Comment"
                            class="w-full"
                            icon="fa-regular fa-comment"
                            @click="onAddComment"
                        />
                    </div>
                </div>
            </template>
        </Grid>
    </div>
</template>
