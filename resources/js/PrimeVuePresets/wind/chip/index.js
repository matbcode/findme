export default {
    root: {
        class: [
            // Flexbox
            'inline-flex items-center',

            // Spacing
            'px-2 py-0.5',

            // Shape
            'rounded-[1.14rem]',

            // Colors
            'text-slate-700 dark:text-surface-50/70',
            'bg-slate-200 dark:bg-surface-800',
        ],
    },
    label: {
        class: 'text-xs leading-6 mx-0',
    },
    icon: {
        class: 'leading-6 mr-2',
    },
    image: {
        class: ['w-6 h-6 mr-2', 'rounded-full'],
    },
    removeIcon: {
        class: [
            // Shape
            'rounded-2xl leading-6',

            // Spacing
            'ml-2',

            // Size
            'w-4 h-4',

            // Transition
            'transition duration-200 ease-in-out',

            // Misc
            'cursor-pointer',
        ],
    },
}
