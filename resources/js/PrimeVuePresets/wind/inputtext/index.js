export default {
    root: ({ props, context }) => ({
        class: [
            // Font
            'font-sans leading-6',

            // Spacing
            'm-0',
            {
                'py-3 px-4 text-lg sm:text-md': props.size == 'large',
                'py-1 px-2 sm:text-sm': props.size == 'small',
                'py-1.5 px-3 sm:text-sm': props.size == null,
            },

            // Colors
            'text-slate-900 dark:text-surface-50',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'bg-slate-50 dark:bg-surface-900',
            'ring-1 ring-inset ring-surface-300 dark:ring-surface-700 ring-offset-0',
            'shadow-sm',

            // Shape
            'rounded-2xl',
            'appearance-none',

            // Interactions
            {
                'outline-none focus:ring-primary-500 dark:focus:ring-primary-400':
                    !context.disabled,
                'opacity-60 select-none pointer-events-none cursor-default':
                    context.disabled,
            },
        ],
    }),
}
