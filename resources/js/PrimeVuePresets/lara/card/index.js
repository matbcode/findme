export default {
    root: {
        class: [
            //Shape
            'rounded-2xl',
            'shadow-sm',

            //Color
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-700 dark:text-surface-50',
        ],
    },
    body: {
        class: 'p-5',
    },
    title: {
        class: 'text-2xl font-bold mb-2',
    },
    subtitle: {
        class: [
            //Font
            'font-normal',

            //Spacing
            'mb-2',

            //Color
            'text-slate-600 dark:text-surface-50/60',
        ],
    },
    content: {
        class: 'py-5', // Vertical padding.
    },
    footer: {
        class: 'pt-5', // Top padding.
    },
}
