export default {
    root: ({ props }) => ({
        class: [
            'flex align-top items-center gap-2 w-full p-2 md:p-4',
            'm-0 rounded-2xl border',
            {
                'bg-blue-100 dark:bg-blue-400/10':
                    props.severity == 'info',
                'bg-green-100 dark:bg-green-400/10':
                    props.severity == 'success',
                'bg-orange-100 dark:bg-orange-400/10':
                    props.severity == 'warn',
                'bg-red-400 dark:bg-red-400/10':
                    props.severity == 'error',
            },
            {
                'border-blue-400/60': props.severity == 'info',
                'border-green-400/60': props.severity == 'success',
                'border-orange-400/60': props.severity == 'warn',
                'border-red-400/60': props.severity == 'error',
            },
            {
                'text-blue-700 dark:text-blue-300':
                    props.severity == 'info',
                'text-green-700 dark:text-green-300':
                    props.severity == 'success',
                'text-orange-700 dark:text-orange-300':
                    props.severity == 'warn',
                'text-red-100 dark:text-red-300':
                    props.severity == 'error',
            },
            {
                'shadow-blue-400/10': props.severity == 'info',
                'shadow-green-400/10': props.severity == 'success',
                'shadow-orange-400/10': props.severity == 'warn',
                'shadow-red-400/10': props.severity == 'error',
            },
        ],
    }),
    icon: {
        class: 'text-base flex-shrink-0 h-8 w-8 mr-2',
    },
    text: {
        class: [
            // Font and Text
            'flex-shrink-1',
            // 'text-base leading-none',
        ],
    },
}
