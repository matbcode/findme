import { ref } from "vue";

const useCreateWorkspaceForm = () => ref({
    method: 'post',
    route: route('workspace.store'),
    fields: {
        name: {
            value: '',
            type: 'text',
        }
    },
});

const useUpdateWorkspaceForm = ({ workspace }) => ref({
    method: "post",
    route: route("workspace.update", { slug: workspace.slug }),
    fields: {
        name: {
            label: "Name",
            type: "text",
            value: workspace.name,
            props: {
                placeholder: "Workspace name",
                required: true,
            },
        },
        description: {
            label: "Description",
            type: "textarea",
            props: {
                value: workspace.description,
                placeholder: "Workspace description",
                required: true,
            },
        },
    },
});

const useDeleteWorkspaceForm = ({ workspace }) => ref({
    method: "delete",
    route: route("workspace.destroy", { slug: workspace.slug }),
    fields: {
        slug: {
            value: workspace.slug,
            type: "hidden",
        },
    },
});

const form = {
    useCreateWorkspaceForm,
    useUpdateWorkspaceForm,
    useDeleteWorkspaceForm,
};

export { form }