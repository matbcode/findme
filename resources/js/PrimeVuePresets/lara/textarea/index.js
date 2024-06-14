export default {
    root: ({ context }) => ({
        class: [
            // Font
            'font-sans leading-none',

            // Spacing
            'm-0',
            'p-3',

            // Shape
            'rounded-2xl',
            'border border-1',

            // Colors
            'text-slate-600 dark:text-surface-50',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'bg-slate-50 dark:bg-surface-900',

            // States
            {
                'border border-surface-500/40': !context.error,
                'border-red-500': context.error,
                'hover:border-primary-500 dark:hover:border-primary-400':
                    !context.disabled,
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50':
                    !context.disabled,
                'opacity-60 select-none pointer-events-none cursor-default':
                    context.disabled,
            },

            // Misc
            'appearance-none',
            'transition-colors duration-200',
        ],
    }),
}
