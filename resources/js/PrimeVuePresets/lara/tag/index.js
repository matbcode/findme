export default {
    root: ({ props }) => ({
        class: [
            //Font
            'text-xs',

            //Alignments
            'inline-flex items-center justify-center',

            //Spacing
            'px-3 py-2',

            //Shape
            {
                'rounded-2xl': !props.rounded,
                'rounded-full': props.rounded,
            },

            //Colors
            'text-white',
            {
                'bg-primary-500 dark:bg-primary-400':
                    props.severity == null ||
                    props.severity == 'primary',
                'bg-green-500 dark:bg-green-400':
                    props.severity == 'success',
                'bg-blue-500 dark:bg-blue-400':
                    props.severity == 'info',
                'bg-orange-500 dark:bg-orange-400':
                    props.severity == 'warning',
                'bg-red-500 dark:bg-red-400':
                    props.severity == 'danger',
            },
        ],
    }),
    value: {
        class: 'leading-normal',
    },
    icon: {
        class: 'mr-1 text-sm',
    },
}
