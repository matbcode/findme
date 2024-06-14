export default {
    root: {
        class: [
            // Shape
            'rounded-2xl',

            // Spacing
            // 'p-4',

            // Color
            'text-blue-600 dark:text-blue-500',
            // 'bg-slate-50 dark:bg-surface-800',
            // 'border border-surface-500/40 ',

            // Misc
            'overflow-x-auto',
            'overflow-y-hidden',
            'text-sm',
        ],
    },
    menu: {
        class: [
            // Flex & Alignment
            'flex items-center flex-nowrap',

            // Spacing
            'm-0 p-0 list-none leading-none',
        ],
    },
    action: {
        class: [
            // Flex & Alignment
            'flex items-center',

            // Shape
            'rounded-2xl',

            // Color
            'text-blue-600 dark:text-blue-500',

            // States
            'focus-visible:outline-none focus-visible:outline-offset-0',
            'focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',

            // Transitions
            'transition-shadow duration-200',

            // Misc
            'text-decoration-none',
        ],
    },
    icon: {
        class: 'text-blue-600 dark:text-blue-500',
    },
    separator: {
        class: [
            // Flex & Alignment
            'flex items-center',

            // Spacing
            ' mx-2',

            // Color
            'text-blue-600 dark:text-blue-500',
        ],
    },
}
