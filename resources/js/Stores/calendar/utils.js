export const mapFilterItems = (
    filter,
    { projects, statuses, channels, events, showCreateCampaignModal },
) => {
    let items = []
    switch (filter.id) {
        case 'projects':
            items = projects.collection.map((project, index) => ({
                key: `0_1_${index}`,
                id: project.id,
                label: project.name,
                checked: true,
                color: project.color,
                // items: [
                //     {
                //         label: "Manage",
                //         type: "button",
                //         buttonProps: {
                //             icon: "edit",
                //         },
                //         command: () => projects.gotoEditProject({
                //             id: project.id,
                //         }),
                //     },
                //     {
                //         label: "Create event",
                //         type: "button",
                //         buttonProps: {
                //             icon: "add",
                //         },
                //         command: () => showCreateCampaignModal({
                //             project,
                //         }),
                //     },
                //     {
                //         key: `0_${index}_0`,
                //         label: "Not scheduled",
                //         //! TODO: Events are not yet added to store. Implement logic when events can be created without scheduled date
                //         items: events?.collection?.filter((event) => {
                //             return event.project_id === project.id && !event.start;
                //         }),
                //         visible: () => false,
                //     }
                // ],
            }))
            break
        case 'statuses':
            items = statuses.collection.map((status, index) => ({
                key: `0_1_${index}`,
                id: status.id,
                label: status.title,
                checked: true,
            }))
            break
        case 'channels':
            items = channels.platforms.map((channel, index) => ({
                key: `0_2_${index}`,
                id: channel.id,
                label: channel.label,
                checked: true,
                // items: [
                //     {
                //         label: "Manage channel",
                //     },
                //     {
                //         label: "Create new event",
                //     },
                // ],
            }))
            break
    }
    return {
        items,
    }
}
