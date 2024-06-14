export default {
    root: ({ props, context }) => ({
        class: [
            // Alignments
            'items-center inline-flex text-center align-bottom justify-center',

            // Sizes & Spacing
            'px-4 py-3 leading-none',

            // Shapes
            'rounded-2xl border',

            // Colors
            {
                'bg-slate-50 dark:bg-surface-900 ': !props.modelValue,
                'border-surface-500/40  ': !props.modelValue,
                'text-slate-700 dark:text-surface-50':
                    !props.modelValue,
                'bg-primary-500 dark:bg-primary-400 border-primary-500 dark:border-primary-400 text-white dark:text-surface-900':
                    props.modelValue,
            },

            // States
            {
                'hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-surface-500/40 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-white/80':
                    !props.modelValue,
                'hover:bg-primary-600 hover:border-primary-600 dark:hover:bg-primary-300 dark:hover:border-primary-300':
                    props.modelValue,
                'outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50':
                    context.focused && !props.disabled,
            },

            // Transitions
            'transition-all duration-200',

            // Misc
            {
                'cursor-pointer': !props.disabled,
                'opacity-60 select-none pointer-events-none cursor-default':
                    props.disabled,
            },
        ],
    }),
    label: {
        class: 'text-center w-full',
    },
    icon: ({ props }) => ({
        class: [
            ' mr-2',
            {
                'text-slate-600 dark:text-surface-50':
                    !props.modelValue,
                'text-white dark:text-surface-900': props.modelValue,
            },
        ],
    }),
}
