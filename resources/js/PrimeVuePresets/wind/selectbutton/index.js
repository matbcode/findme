export default {
    root: ({ props }) => ({
        class: [
            'shadow-sm',
            {
                'opacity-60 select-none pointer-events-none cursor-default':
                    props.disabled,
            },
        ],
    }),
    button: ({ context }) => ({
        class: [
            'relative',
            // Font
            'text-sm',
            'leading-none',

            // Flex Alignment
            'inline-flex items-center align-bottom text-center',

            // Spacing
            'px-2.5 py-1.5',

            // Shape
            'ring-1 ring-surface-200 dark:ring-surface-700',
            'first:rounded-l-2xl first:rounded-tr-none first:rounded-br-none',
            'last:rounded-tl-none last:rounded-bl-none last:rounded-r-2xl ',

            // Color
            {
                'bg-slate-50 dark:bg-surface-900': !context.active,
                'text-slate-700 dark:text-surface-50':
                    !context.active,
                'bg-slate-100 dark:bg-surface-800 border-primary-500 dark:border-primary-400':
                    context.active,
            },

            // States
            'focus:outline-none focus:outline-offset-0 focus:ring-primary-500 dark:focus:ring-primary-400',
            'hover:bg-slate-200 dark:hover:bg-slate-600/80',
            {
                'opacity-60 select-none pointer-events-none cursor-default':
                    context.disabled,
            },

            // Transition
            'transition duration-200',

            // Misc
            'cursor-pointer select-none overflow-hidden',
        ],
    }),
    label: {
        class: 'font-semibold',
    },
}
