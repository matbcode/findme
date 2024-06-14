export default {
    root: {
        class: 'shadow-sm rounded-2xl',
    },
    header: ({ props }) => ({
        class: [
            // Alignments
            'flex items-center justify-between',

            // Colors
            'text-slate-700 dark:text-surface-50/80',
            'bg-slate-50 dark:bg-surface-900',
            'border-b border-surface-500/40 ',

            //Shape
            'rounded-tl-2xl rounded-tr-2xl',

            // Conditional Spacing
            {
                'px-5 md:px-6 py-5': !props.toggleable,
                'py-3 px-5 md:px-6': props.toggleable,
            },
        ],
    }),
    title: {
        class: 'leading-none font-medium',
    },
    toggler: {
        class: [
            // Alignments
            'inline-flex items-center justify-center',

            // Sized
            'w-8 h-8',

            //Shape
            'border-0 rounded-full',

            //Color
            'bg-transparent',
            'text-slate-600 dark:text-surface-50/80',

            // States
            'hover:text-slate-900 dark:hover:text-slate-50/80',
            'hover:bg-slate-50 dark:hover:bg-slate-800/50',
            'focus:outline-none focus:outline-offset-0 focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-inset dark:focus-visible:ring-primary-500',

            // Transitions
            'transition duration-200 ease-in-out',

            // Misc
            'overflow-hidden relative no-underline',
        ],
    },
    togglerIcon: {
        class: 'inline-block',
    },
    content: {
        class: [
            // Spacing
            'py-6 px-5 md:px-6',

            // Shape
            'last:rounded-br-2xl last:rounded-bl-2xl',

            //Color
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-700 dark:text-surface-50/80',
        ],
    },
    footer: {
        class: [
            // Spacing
            'py-6 px-5 md:px-6',

            //Shape
            'rounded-bl-2xl rounded-br-2xl',

            // Color
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-600 dark:text-surface-50/70',
            'border-t border-surface-500/40 ',
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
}
