export default {
    root: {
        class: [
            'block',

            // Spacing
            'px-4 pt-2 py-3',
            'inline-size-min',

            // Shape
            'rounded-2xl',
            // Color
            'border border-surface-500/40 ',
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-700 dark:text-surface-50/80',
        ],
    },
    legend: ({ props }) => ({
        class: [
            // Font
            'font-bold',
            'leading-none',

            //Spacing
            { 'p-0': props.toggleable, 'p-5': !props.toggleable },

            // Shape
            'rounded-2xl',

            // Color
            'text-slate-700 dark:text-surface-50/80',
            'border border-surface-500/40 ',
            'bg-slate-50 dark:bg-surface-900',

            // Transition
            'transition-none',

            // States
            {
                'hover:bg-slate-100 hover:border-surface-500/40 hover:text-slate-900 dark:hover:text-slate-50/80 dark:hover:bg-slate-800/80':
                    props.toggleable,
            },
        ],
    }),
    toggler: ({ props }) => ({
        class: [
            // Alignments
            'flex items-center justify-center',
            'relative',

            //Spacing
            { 'p-5': props.toggleable },

            // Shape
            { 'rounded-2xl': props.toggleable },

            // Color
            {
                'text-slate-700 dark:text-surface-50 hover:text-slate-900 hover:text-slate-900':
                    props.toggleable,
            },

            // States
            {
                'hover:text-slate-900 dark:hover:text-slate-100':
                    props.toggleable,
            },
            {
                'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50':
                    props.toggleable,
            },

            // Misc
            {
                'transition-none cursor-pointer overflow-hidden select-none':
                    props.toggleable,
            },
        ],
    }),
    togglerIcon: {
        class: 'mr-2 inline-block',
    },
    legendTitle: {
        class: 'flex items-center justify-center leading-none',
    },
    content: {
        class: 'p-5',
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
