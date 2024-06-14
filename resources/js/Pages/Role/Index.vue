<script setup>
import { ref } from 'vue'

import { useGlobalStore } from '@/Stores'
import { useI18n } from 'vue-i18n'

import Menu from 'primevue/menu'
import Column from 'primevue/column'
import Checkbox from 'primevue/checkbox'

import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import Grid from '@/Components/Custom/Grid.vue'
import CustomButton from '@/Components/Custom/CustomButton.vue'

import MainLayout from '@/Layouts/MainLayout.vue'
defineOptions({ layout: MainLayout })

const { t } = useI18n()

const store = useGlobalStore()

const props = defineProps({
    permissions: Array,
    roles: Array,
})

const refs = ref({})

const rolePermissions = ref(
    props.roles.map((role) => ({
        ...role,
        permissions: role.permissions.map((p) => p.id),
        actions: (slotProps) => {
            const actions = [
                {
                    label: t('@Roles.-.selectAll'),
                    icon: 'pi pi-check',
                    command: () => onEnableAll(slotProps),
                },
                {
                    label: t('@Roles.-.deselectAll'),
                    icon: 'pi pi-times',
                    command: () => onDisableAll(slotProps),
                },
            ]

            if (!role.permanent) {
                return [
                    ...actions,
                    {
                        label: t('@Roles.-.renameRole'),
                        icon: 'pi pi-pencil',
                        command: () => onChangeName(slotProps),
                    },
                    {
                        label: t('@Roles.-.deleteRole'),
                        icon: 'pi pi-trash',
                        command: () => onDeleteRole(slotProps),
                    },
                ]
            }
            return actions
        },
    })),
)

const actions = ref([
    {
        label: t('@Roles.-.createRole'),
        icon: 'pi pi-plus',
        rounded: true,
        text: true,
        command: () => store.roles.createRole(),
    },
])

const links = ref([
    {
        label: store.workspaces.current.name,
        icon: 'arrow_back_ios_new',
        href: route('workspace.edit', {
            slug: store.workspaces.current.slug,
        }),
    },
])

const toggleMenu = (e, props) => {
    refs.value[`menu_${props.id}`]?.toggle(e)
}

const onChangeName = (role) => {
    store.roles.updateRoleName(role)
}

const onUpdateRole = ({ id, event, role }) => {
    console.log(id, event, role)
    const permissions = event.srcElement.checked
        ? [...role.permissions, id]
        : role.permissions.filter((p) => p !== id)

    store.roles.updateRole({
        ...role,
        permissions,
    })
}

const onEnableAll = (role) => {
    store.roles.updateRole({
        ...role,
        permissions: props.permissions.map((p) => p.id),
    })
}

const onDisableAll = (role) => {
    store.roles.updateRole({
        ...role,
        permissions: [],
    })
}

const onDeleteRole = (role) => {
    store.roles.deleteRole(role)
}
</script>

<template>
    <WideWrapper :title="t('@Roles.-.title')" :links>
        <Grid
            :value="permissions"
            :headerProps="{
                title: t('@Roles.-.title'),
                subtitle: t('@Roles.-.subtitle'),
                icon: 'public',
                actions,
            }"
        >
            <Column field="name" :header="t('@Roles.-.permissions')">
                <template #body="slotProps">
                    <div class="flex items-center gap-2">
                        <span
                            class="material-icons text-gray-400"
                            v-tooltip.top="{
                                value: slotProps.data.description,
                            }"
                            >help_outline</span
                        >
                        {{ slotProps.data.name }}
                    </div>
                </template>
            </Column>
            <Column v-for="role in rolePermissions" :key="role.id">
                <template #header="slotProps">
                    <div
                        class="m-auto flex flex-col items-center justify-center gap-4 pt-4"
                    >
                        <span class="rotate-90 truncate">
                            {{ role.name }}
                        </span>
                        <CustomButton
                            size="small"
                            icon="fa-solid fa-ellipsis-vertical"
                            text
                            @click="(e) => toggleMenu(e, role)"
                        />
                    </div>
                    <Menu
                        :ref="
                            (el) => {
                                refs[`menu_${role.id}`] = el
                            }
                        "
                        :model="role.actions(role)"
                        :popup="true"
                    />
                </template>
                <template #body="slotProps">
                    <div
                        class="flex items-center justify-center gap-2"
                    >
                        <Checkbox
                            :binary="true"
                            :modelValue="
                                role.permissions.includes(
                                    slotProps.data.id,
                                )
                            "
                            @click.prevent="
                                (event) =>
                                    onUpdateRole({
                                        event,
                                        role,
                                        id: slotProps.data.id,
                                    })
                            "
                        />
                    </div>
                </template>
            </Column>
        </Grid>
    </WideWrapper>
</template>
