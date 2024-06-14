export default {
    root: {
        class: [
            //Shape
            'rounded-2xl',
            'shadow-sm',

            //Color
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-700 dark:text-surface-50/80',
        ],
    },
    header: {
        class: ['border-b border-surface-500/40 '],
    },
    body: {
        class: 'py-5',
    },
    title: {
        class: 'text-lg font-medium mb-2 px-5 md:px-6',
    },
    subtitle: {
        class: [
            //Spacing
            'mb-1 px-5 md:px-6',

            //Color
            'text-slate-600 dark:text-surface-50/60',
        ],
    },
    content: {
        class: 'py-6 px-5 md:px-6',
    },
    footer: {
        class: [
            'px-5 md:px-6 pt-5 pb-0',
            'border-t border-surface-500/40 ',
        ],
    },
}
