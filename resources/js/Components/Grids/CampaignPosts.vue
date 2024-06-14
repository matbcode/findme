<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'

import Grid from '@/ComponentsNew/Grid/Grid.vue'
import CampaignPostElement from '@/ComponentsNew/Grid/SlotComponents/CampaignPostElement.vue'

const store = useGlobalStore()
const { showDeletePostModal } = store.posts

const props = defineProps({
    campaign: {
        type: Object,
        required: true,
    },
    actions: {
        type: Object,
        default: () => {},
    },
})

const postActions = ref([props.actions.createPost])
</script>

<template>
    <Grid
        id="posts"
        :value="campaign.posts"
        :gridComponent="CampaignPostElement"
        :listComponent="CampaignPostElement"
        itemPropsName="post"
        :columns="2"
        layout="list"
        :headerProps="{
            title: 'Campaign Posts',
            subtitle:
                'All posts planned to be published in the campaign',
            icon: 'fa-regular fa-id-badge',
        }"
    >
        <template #itemsPrepend>
            <slot name="itemsPrepend" />
        </template>
        <template #empty>
            <slot name="empty" />
        </template>
    </Grid>
    <!-- <Grid
        id="posts"
        :value="campaign.posts"
        :headerProps="{
            title: 'Campaign Posts',
            subtitle: 'All posts in the campaign',
            icon: 'contacts',
        }"
    >
        <Column field="payload" header="Post" sortable="">
            <template #body="slotProps">
                {{ slotProps.data }}
            </template>
        </Column>
        <Column class="text-right">
            <template #body="slotProps">
                <CustomButton
                    icon="delete"
                    size="small"
                    severity="danger"
                    rounded
                    text
                    @click="
                        showDeletePostModal({
                            project_id: props.campaign.project_id,
                            campaign_id: props.campaign.id,
                            post: slotProps.data,
                        })
                    "
                />
                <Link
                    :href="
                        route('post.edit', {
                            slug: store.workspaces.current.slug,
                            project: props.campaign.project_id,
                            campaign: props.campaign.id,
                            post: slotProps.data.id,
                        })
                    "
                >
                    <CustomButton
                        icon="edit"
                        size="small"
                        rounded
                        text
                    />
                </Link>
            </template>
        </Column>
    </Grid> -->
</template>
