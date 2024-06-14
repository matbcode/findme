export default {
    root: ({ props }) => ({
        class: [
            'flex',
            {
                'opacity-60 select-none pointer-events-none cursor-default':
                    props.disabled,
            },
        ],
    }),
    container: ({ state }) => ({
        class: [
            // Font
            'font-sans sm:text-sm leading-none',

            // Flex
            'flex items-center flex-wrap gap-1',

            // Spacing
            'm-0 py-1 px-3',

            // Size
            'w-full',

            // Shape
            'list-none',
            'rounded-2xl',

            // Color
            'text-slate-900 dark:text-surface-50',
            'bg-slate-50 dark:bg-surface-900',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'shadow-sm',

            // States
            {
                'ring-1 ring-inset ring-surface-300 dark:ring-surface-700 ring-offset-0':
                    !state.focused,
                'ring-2 ring-primary-500 dark:ring-primary-400':
                    state.focused,
            },

            // Transition
            'transition-colors duration-200',

            // Misc
            'cursor-text overflow-hidden',
            'appearance-none',
        ],
    }),

    inputtoken: {
        class: ['py-0.5 px-0', 'inline-flex flex-auto'],
    },
    input: {
        class: [
            // Font
            'font-sans sm:text-sm leading-none',

            // Size
            'w-full',

            // Spacing
            'p-0 m-0',

            // Shape
            'appearance-none rounded-none',
            'border-0 outline-none',

            // Color
            'text-slate-700 dark:text-surface-50',
            'bg-transparent',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
        ],
    },
    token: {
        class: [
            // Flexbox
            'inline-flex items-center',

            // Spacing
            'py-0.5 px-3',

            // Shape
            'rounded-[1.14rem]',

            // Colors
            'text-slate-700 dark:text-surface-50',
            'bg-slate-200 dark:bg-surface-800',
        ],
    },
    label: {
        class: 'leading-5',
    },
    removeTokenIcon: {
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
