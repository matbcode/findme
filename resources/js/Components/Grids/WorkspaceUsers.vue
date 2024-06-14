<script setup>
import { ref } from 'vue'
import { useGlobalStore } from '@/Stores'
import { useI18n } from 'vue-i18n'

import Column from 'primevue/column'
import Menu from 'primevue/menu'
import InlineMessage from 'primevue/inlinemessage'

import CustomButton from '@/Components/Custom/CustomButton.vue'
import Grid from '@/Components/Custom/Grid.vue'
import Avatar from '@/Components/Custom/Avatar.vue'

const { t } = useI18n()
const store = useGlobalStore()
const props = defineProps({ workspace: Object, users: Object })

const refs = ref({})

const USER_LIMIT_MOCK = 100

const workspaceUsers = ref({
    ...props.users,
    data: props.users.data.map((user) => ({
        ...user,
        role: user.pivot.role_id,
        full_name: `${user.first_name} ${user.last_name}`,
        action: (slotProps) => [
            {
                label: t(
                    '@Workspaces.edit.workspaceUsers.changeRole',
                ),
                icon: 'pi pi-pencil',
                command: () =>
                    store.workspaces.modals.editUserRoleModal({
                        user: slotProps.data,
                    }),
            },
            {
                label: t(
                    '@Workspaces.edit.workspaceUsers.removeUser',
                ),
                icon: 'pi pi-trash',
                command: () => {
                    store.workspaces.modals.removeUserFromWorkspaceModal(
                        {
                            user: slotProps.data,
                        },
                    )
                },
            },
        ],
    })),
})

const actions = ref([
    store.workspaces.actions.inviteUser(props.workspace),
])

const toggleMenu = (e, props) => {
    refs.value[`menu_${props.index}`].toggle(e)
}
</script>
<template>
    <InlineMessage
        v-if="props.users.total >= USER_LIMIT_MOCK"
        severity="info"
    >
        {{ t('@Workspaces.edit.workspaceUsers.usersLimitInfo') }}
    </InlineMessage>
    <Grid
        :value="workspaceUsers"
        :headerProps="{
            title: t('@Workspaces.edit.workspaceUsers.title'),
            subtitle: t('@Workspaces.edit.workspaceUsers.subtitle'),
            icon: 'people',
            actions: actions,
            // massActions: [
            //     {
            //         label: t(
            //             '@Workspaces.edit.workspaceUsers.removeUsers',
            //         ),
            //         icon: 'delete',
            //         severity: 'danger',
            //         rounded: true,
            //         text: true,
            //         command: () => {
            //             console.log('remove users')
            //         },
            //     },
            // ],
        }"
    >
        <template #header="slotProps"> </template>
        <Column
            field="full_name"
            :header="t('@Workspaces.edit.workspaceUsers.-.full_name')"
            filter
            sortable=""
        >
            <template #body="slotProps">
                <div class="flex items-center gap-2">
                    <Avatar :user="slotProps.data" />
                    <span class="ml-2">{{
                        slotProps.data.full_name
                    }}</span>
                </div>
            </template>
        </Column>
        <Column
            field="username"
            :header="t('@Workspaces.edit.workspaceUsers.-.username')"
            sortable=""
        />
        <Column
            field="email"
            :header="t('@Workspaces.edit.workspaceUsers.-.email')"
            sortable=""
        />
        <Column
            field="role"
            :header="t('@Workspaces.edit.workspaceUsers.-.role')"
            sortable=""
        />
        <Column
            class="group text-right"
            headerStyle="min-width: 2rem max-width: 2rem"
        >
            <template #body="slotProps">
                <CustomButton
                    size="small"
                    icon="more_horiz"
                    rounded
                    text
                    @click="(e) => toggleMenu(e, slotProps)"
                />
                <Menu
                    :index="slotProps.index"
                    :ref="
                        (el) => {
                            refs[`menu_${slotProps.index}`] = el
                        }
                    "
                    :model="slotProps.data.action(slotProps)"
                    :popup="true"
                />
            </template>
        </Column>
    </Grid>

    <Grid
        v-if="workspace.invitations.length"
        :value="workspace.invitations"
        :headerProps="{
            title: t(
                '@Workspaces.edit.workspaceUsers.invitations.title',
            ),
            subtitle: t(
                '@Workspaces.edit.workspaceUsers.invitations.subtitle',
            ),
            icon: 'mail',
        }"
    >
        <Column field="email" header="Email" sortable />
        <Column field="role" header="Role" sortable />
        <Column class="text-right">
            <template #body="slotProps">
                <CustomButton
                    size="small"
                    severity="danger"
                    icon="fa-solid fa-ban"
                    rounded
                    text
                    @click="
                        store.workspaces.modals.cancelInvitationModal(
                            {
                                invitationId: slotProps.data.id,
                            },
                        )
                    "
                />
            </template>
        </Column>
    </Grid>
</template>
