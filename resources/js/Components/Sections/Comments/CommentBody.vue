<script setup>
import { ref, computed } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'

import Menu from 'primevue/menu'
import Skeleton from 'primevue/skeleton'

import MarkDownDescription from '@/Components/PageWrappers/MarkDownDescription.vue'
import RichText from '@/Components/PageWrappers/RichText.vue'
import Avatar from '@/Components/Custom/Avatar.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import TextInput from '@/Components/Inputs/TextInput.vue'

const store = useGlobalStore()
const { getFormattedDate } = store.user
const { showConfirm } = store.modals

const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
    hideDate: {
        type: Boolean,
        default: false,
    },
})

const isCreatedByUser = computed(() => {
    return props.comment.user_id === store.user.info.id
})

const commentComputed = computed(() => {
    const comment = { ...props.comment }
    comment.user = store.user.getUserById(props.comment.user_id)

    return comment
})

const isEdited = ref(false)

const actionMenu = ref(null)

const menuActions = ref([
    {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => {
            isEdited.value = true
        },
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            showConfirm({
                title: 'Delete Comment',
                message:
                    'Are you sure you want to delete this comment?',
                confirmButtonProps: {
                    label: 'Delete',
                    icon: 'delete_forever',
                    severity: 'danger',
                },
                onConfirm: () => {
                    const form = useForm({})

                    form.delete(
                        route('comment.destroy', {
                            slug: store.workspaces.current.slug,
                            comment: props.comment.id,
                        }),
                        {
                            preserveScroll: true,
                        },
                    )
                },
            })
        },
    },
])

const classes = computed(() => {
    return {
        'group relative flex gap-3 p-2': true,
        // 'bg-surface-800/50 rounded-2xl': isCreatedByUser.value,
    }
})

const toggleMenu = (event) => {
    actionMenu.value.toggle(event)
}

const onSaveChanges = () => {
    const form = useForm({
        body: props.comment.body,
    })

    form.patch(
        route('comment.update', {
            slug: store.workspaces.current.slug,
            comment: props.comment.id,
        }),
        {
            preserveScroll: true,
            onSuccess: () => {
                isEdited.value = false
            },
            onError: () => {
                console.log('error')
            },
        },
    )
}

const onCancelChanges = () => {
    isEdited.value = false
}
</script>

<template>
    <div :class="classes">
        <div class="mt-1">
            <Avatar
                v-if="commentComputed.user"
                :user="commentComputed.user"
                size="42px"
                class="flex-shrink-0"
            />
            <Skeleton
                v-else
                width="42px"
                height="42px"
                borderRadius="42px"
            />
        </div>
        <div class="flex w-full flex-col gap-0">
            <div
                v-if="commentComputed.user"
                class="flex items-center gap-2 text-sm"
            >
                <div>
                    {{
                        commentComputed.user.first_name &&
                        commentComputed.user.last_name
                            ? commentComputed.user.first_name +
                              ' ' +
                              commentComputed.user.last_name
                            : commentComputed.user.username
                    }}
                </div>
                <div v-if="!hideDate" class="text-xs font-light">
                    {{ getFormattedDate(commentComputed.created_at) }}
                </div>
                <div
                    v-if="
                        commentComputed.created_at !==
                        commentComputed.updated_at
                    "
                >
                    (edited)
                </div>
                <div
                    v-if="!isEdited && isCreatedByUser"
                    class="absolute right-0 hidden group-hover:block"
                >
                    <CustomButton
                        size="small"
                        icon="more_horiz"
                        rounded
                        text
                        @click="toggleMenu"
                    />
                    <Menu
                        ref="actionMenu"
                        :model="menuActions"
                        :popup="true"
                    />
                </div>
            </div>
            <div v-else>
                <Skeleton width="100px" height="20px" />
            </div>
            <div v-if="commentComputed.user" class="w-full">
                <div v-if="isEdited" class="w-full">
                    <TextInput
                        type="textarea"
                        class="w-full"
                        v-model="comment.body"
                    />
                    <div class="absolute bottom-4 right-4">
                        <CustomButton
                            icon="close"
                            size="small"
                            rounded
                            text
                            class="mt-4 w-max"
                            @click="onCancelChanges"
                        />
                        <CustomButton
                            icon="done"
                            size="small"
                            rounded
                            text
                            class="mt-4 w-max"
                            @click="onSaveChanges"
                        />
                    </div>
                </div>
                <RichText v-else :description="comment.body" />
            </div>
            <div v-else class="py-2">
                <Skeleton width="100%" height="20px" />
            </div>
        </div>
    </div>
</template>
