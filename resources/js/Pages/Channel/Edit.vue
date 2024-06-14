<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import PlatformInfo from '@/Components/Platforms/PlatformInfo.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'
import FormWrapper from '@/Components/PageWrappers/FormWrapper.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const store = useGlobalStore()
const { showDeleteChannelModal } = store.channels

const props = defineProps({
    channel: Object,
})

const user = ref(props.channel.details)

const actions = ref([
    // {
    //     label: "Delete channel",
    //     icon: "delete",
    //     severity: "danger",
    //     rounded: true,
    //     text: true,
    //     command: () =>
    //         showDeleteChannelModal({
    //             project_id: props.channel.project_id,
    //             channel: props.channel,
    //         }),
    // },
])

const links = ref([
    {
        label: 'Back',
        icon: 'arrow_back_ios_new',
        href: route('project.edit', {
            slug: store.workspaces.current.slug,
            project: props.channel.project_id,
        }),
    },
    // {
    //     label: "Header",
    //     href: "#header",
    //     icon: "title",
    // },
    // {
    //     label: "Description",
    //     href: "#description",
    //     icon: "description",
    // },
])

const onDeleteChannel = () => {
    showDeleteChannelModal({
        project_id: props.channel.project_id,
        channel: props.channel,
    })
}
</script>

<template>
    <WideWrapper title="Manage Channel" :actions :links>
        <PlatformInfo :platform="channel.platform" />
        <div class="text-xl">Connected account:</div>
        <div v-if="user" class="flex items-center gap-4 text-xl">
            <img
                :src="user.image"
                alt="Channel image"
                class="h-12 w-12 rounded-full"
            />
            <div>@{{ user.username }}</div>

            <div>
                <h1>{{ user.name }}</h1>
            </div>
        </div>
        <div v-else class="font-semibold">No account connected</div>
        <FormWrapper
            id="manage"
            title="Manage channel"
            subtitle="Edit and manage this channel"
            icon="delete"
        >
            <div class="mt-8 flex w-full justify-end gap-4">
                <!-- <CustomButton
                        label="Archive project"
                        severity="success"
                        icon="archive"
                        class="sm:w-max w-full"
                        size="small"
                        text
                    /> -->
                <CustomButton
                    label="Delete channel"
                    severity="danger"
                    icon="delete"
                    class="w-full sm:w-max"
                    size="small"
                    @click="onDeleteChannel"
                />
            </div>
        </FormWrapper>
    </WideWrapper>
</template>
