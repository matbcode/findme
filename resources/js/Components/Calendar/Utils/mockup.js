
export const statusesTags = [
    {
        id: "draft",
        title: "Draft",
        class: "bg-surface-900",
        icon: "edit",
    },
    {
        id: "error",
        title: "Error",
        class: "bg-red-500 animate-pulse",
        icon: "error",
    },
    {
        id: "released",
        title: "Released",
        class: "bg-green-400",
        icon: "done",
    },
    {
        id: "done",
        title: "Done",
        class: "bg-slate-500",
        icon: "done",
    },
    {
        id: "awaiting_approval",
        title: "Awaiting approval",
        class: "bg-yellow-500",
        icon: "pending",
    },
    {
        id: "scheduled",
        title: "Scheduled",
        class: "bg-blue-500",
        icon: "schedule",
    },
];

export const events = [
    {
        id: "1",
        title: "Still in draft",
        start: "2023-12-21T12:30:00",
        status: "draft",
        project: "2",
        channel: "1",
        customTags: [
            {
                title: "Timezone: Europe/Berlin",
                color: "border border-1 border-red-500 bg-red-500/30",
            },
            {
                title: "tag2",
                color: "bg-blue-500",
            },
        ],
    },
    {
        id: "2",
        title: "Ok, waiting for approval",
        start: "2023-12-21T14:30:00",
        status: "awaiting_approval",
        project: "1",
        channel: "1",
        customTags: [
            {
                title: "tag1",
                color: "bg-red-500",
            },
            {
                title: "tag2",
                color: "bg-blue-500",
            },
        ],
    },
    {
        id: "3",
        title: "Now, scheduled",
        start: "2023-12-21T16:30:00",
        status: "scheduled",
        project: "1",
        channel: "1",
        customTags: [
            {
                title: "tag1",
                color: "bg-red-500",
            },
            {
                title: "tag2",
                color: "bg-blue-500",
            },
        ],
    },
    {
        id: "4",
        title: "Released event",
        start: "2023-12-21T17:30:00",
        status: "released",
        project: "1",
        channel: "1",
        customTags: [
            {
                title: "tag1",
                color: "bg-red-500",
            },
            {
                title: "tag2",
                color: "bg-blue-500",
            },
        ],
    },
    {
        id: "5",
        title: "event1 asdfasd fasd fasdf asd afsdsadfsadf as fasd fds",
        start: "2023-12-22T12:30:00",
        status: "released",
        project: "1",
        channel: "1",
        customTags: [
            {
                title: "tag1",
                color: "bg-red-500",
            },
            {
                title: "tag2",
                color: "bg-blue-500",
            },
        ],
    },
    {
        id: "6",
        title: "event2",
        start: "2023-12-23T12:35:00",
        status: "error",
        project: "1",
        channel: "1",
        customTags: [
            {
                title: "tag1",
                color: "bg-red-500",
            },
        ],
    },
    {
        id: "7",
        title: "Some old event",
        start: "2023-12-23T16:35:00",
        status: "done",
        project: "1",
        channel: "1",
        customTags: [
            {
                title: "tag1",
                color: "bg-red-500",
            },
        ],
    },
];

export const channels = [
    {
        label: "Facebook",
    },
    {
        label: "Instagram",
    },
    {
        label: "Twitter",
    },
    {
        label: "LinkedIn",
    },
    {
        label: "TikTok",
    }
]

export const timezones = [
    {
        label: "Europe/Berlin",
    },
    {
        label: "Europe/Paris",
    },
    {
        label: "Europe/London",
    },
    {
        label: "Europe/Madrid",
    },
];