import { defineStore } from 'pinia';
import { router } from '@inertiajs/vue3';

import { useI18n } from "vue-i18n";
import { useModalsStore } from '@/Stores/modals';
import { useWorkspacesStore } from '@/Stores/workspaces';

export const useRolesStore = defineStore('roles', () => {
    const { t } = useI18n();

    const workspaces = useWorkspacesStore();
    const modals = useModalsStore();
    const { showToast, showConfirm, showFormModal } = modals;

    function createRole() {
        showFormModal({
            title: t("@Roles.modals.createRoleModal.title"),
            subtitle: t("@Roles.modals.createRoleModal.subtitle"),
            formBody: {
                method: 'post',
                route: route('role.store', { slug: workspaces.current.slug }),
                fields: {
                    name: {
                        value: '',
                        type: 'text',
                    }
                },
                options: {
                    onSuccess: () => {
                        showToast({
                            summary: t("@Roles.toast.create.successSummary"),
                            severity: "success",
                            detail: t("@Roles.toast.create.successMessage"),
                            life: 7000,
                        });
                    },
                    onError: () => {
                        showToast({
                            summary: t("@Roles.toast.create.errorSummary"),
                            severity: "error",
                            detail: t("@Roles.toast.create.errorMessage"),
                        });
                    },
                },
            },
            formExtendedProps: {
                confirmButtonProps: {
                    label: t("@Roles.modals.createRoleModal.confirm"),
                    icon: "pi pi-plus",
                    severity: "success",
                },
                cancelButtonProps: {
                    label: t("@Roles.modals.createRoleModal.cancel"),
                    icon: "pi pi-times",
                    class: "hidden",
                },
            },
        });
    }

    function updateRoleName(role) {
        showFormModal({
            title: t("@Roles.modals.updateRoleNameModal.title"),
            subtitle: t("@Roles.modals.updateRoleNameModal.subtitle"),
            formBody: {
                method: 'patch',
                route: route('role.update', { slug: workspaces.current.slug, role: role.id }),
                fields: {
                    ...Object.keys(role).reduce((fields, field) => {
                        fields[field] = {
                            value: role[field],
                            hidden: true,
                        };
                        return fields;
                    }, {}),
                    name: {
                        value: role.name,
                        type: 'text',
                    },
                },
                options: {
                    onSuccess: () => {
                        showToast({
                            summary: t("@Roles.toast.update.successSummary"),
                            severity: "success",
                            detail: t("@Roles.toast.update.successMessage"),
                        });
                    },
                    onError: () => {
                        showToast({
                            summary: t("@Roles.toast.update.errorSummary"),
                            severity: "error",
                            detail: t("@Roles.toast.update.errorMessage"),
                        });
                    },
                },
            },
            formExtendedProps: {
                confirmButtonProps: {
                    label: t("@Roles.modals.updateRoleNameModal.confirm"),
                    icon: "pi pi-pencil",
                    severity: "success",
                },
                cancelButtonProps: {
                    label: t("@Roles.modals.updateRoleNameModal.cancel"),
                    icon: "pi pi-times",
                    class: "hidden",
                },
            },
        });
    };

    function updateRole(role) {
        console.log(role);
        showConfirm({
            title: t("@Roles.modals.updateRoleModal.title"),
            message: t("@Roles.modals.updateRoleModal.subtitle", { role: role.name }),
            confirmButtonProps: {
                label: t("@Roles.modals.updateRoleModal.confirm"),
                icon: "pi pi-trash",
                severity: "success",
            },
            cancelButtonProps: {
                label: t("@Roles.modals.updateRoleModal.cancel"),
            },
            onConfirm: () => {
                router.patch(
                    route("role.update", {
                        slug: workspaces.current.slug,
                        role: role.id,
                    }),
                    {
                        ...role,
                    },
                    {
                        preserveState: false,
                        preserveScroll: true,
                        onSuccess: () => {
                            showToast({
                                summary: t("@Roles.toast.update.successSummary"),
                                severity: "success",
                                detail: t("@Roles.toast.update.successMessage"),
                            });
                        },
                        onError: () => {
                            showToast({
                                summary: t("@Roles.toast.update.errorSummary"),
                                severity: "error",
                                detail: t("@Roles.toast.update.errorMessage"),
                            });
                        },
                    },
                );
            },
        });
    }

    function deleteRole(role) {
        showConfirm({
            title: t("@Roles.modals.deleteRoleModal.title"),
            message: t("@Roles.modals.deleteRoleModal.subtitle", { role: role.name }),
            confirmButtonProps: {
                label: t("@Roles.modals.deleteRoleModal.confirm"),
                icon: "pi pi-trash",
                severity: "danger",
            },
            cancelButtonProps: {
                label: t("@Roles.modals.deleteRoleModal.cancel"),
            },
            onConfirm: () => {
                router.delete(
                    route("role.destroy", {
                        slug: workspaces.current.slug,
                        role: role.id,
                    }),
                    {
                        preserveState: false,
                        preserveScroll: true,
                        onSuccess: () => {
                            showToast({
                                summary: t("@Roles.toast.delete.successSummary"),
                                severity: "success",
                                detail: t("@Roles.toast.delete.successMessage"),
                            });
                        },
                        onError: () => {
                            showToast({
                                summary: t("@Roles.toast.delete.errorSummary"),
                                severity: "error",
                                detail: t("@Roles.toast.delete.errorMessage"),
                            });
                        },
                    },
                );
            },
        });
    }

    return {
        createRole,
        updateRole,
        updateRoleName,
        deleteRole,
    }
})