export default {
    accordiontab: {
        root: {
            class: 'mb-1',
        },
        header: ({ props }) => ({
            class: [
                // State
                {
                    'select-none pointer-events-none cursor-default opacity-60':
                        props?.disabled,
                },
            ],
        }),
        headerAction: ({ context }) => ({
            class: [
                //Font
                'font-bold',
                'leading-none',

                // Alignments
                'flex items-center',
                'relative',

                // Sizing
                'p-2',

                // Shape
                'rounded-t-2xl',
                {
                    'rounded-br-2xl rounded-bl-2xl': !context.active,
                    'rounded-br-0 rounded-bl-0': context.active,
                },

                // Color
                'border-surface-500/40 ',
                'bg-white dark:bg-surface-900 shadow-sm',
                'text-slate-600 dark:text-surface-50/80',
                { 'text-slate-900': context.active },

                // Transition
                'transition-all duration-300 ease-in-out',

                // States
                'hover:bg-primary-100 dark:hover:bg-surface-800',
                'hover:text-slate-900',
                'focus:outline-none focus:outline-offset-0 focus-visible:ring focus-visible:ring-primary-400/50 ring-inset dark:focus-visible:ring-primary-300/50', // Focus

                // Misc
                'cursor-pointer no-underline select-none',
            ],
        }),
        headerIcon: {
            class: 'inline-block mr-2',
        },
        headerTitle: {
            class: 'leading-none',
        },
        content: {
            class: [
                // Spacing
                'p-2',

                //Shape
                'rounded-tl-none rounded-tr-none rounded-br-2xl rounded-bl-2xl',
                'border-t-0',

                // Color
                'bg-white dark:bg-surface-900',
                'border-surface-500/40 ',
                'text-slate-700 dark:text-surface-50/80',
            ],
        },
        transition: {
            enterFromClass: 'max-h-0',
            enterActiveClass:
                'overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]',
            enterToClass: 'max-h-[1000px]',
            leaveFromClass: 'max-h-[1000px]',
            leaveActiveClass:
                'overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]',
            leaveToClass: 'max-h-0',
        },
    },
}
