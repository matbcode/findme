export default {
    root: {
        class: [
            // Sizing and Shape
            'min-w-[12rem]',
            'rounded-2xl',

            // Colors
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-700 dark:text-surface-50',
            'border border-surface-500/40 ',
        ],
    },
    wrapper: {
        class: [
            // Overflow
            'overflow-auto',
        ],
    },
    list: {
        class: 'py-3 list-none m-0',
    },
    item: ({ context }) => ({
        class: [
            // Font
            'font-normal',
            'leading-none',

            // Position
            'relative',

            // Shape
            'border-0',
            'rounded-none',

            // Spacing
            'm-0',
            'py-3 px-5',

            // Color
            {
                'text-slate-700 dark:text-surface-50':
                    !context.focused && !context.selected,
            },
            {
                'bg-slate-200 dark:bg-surface-800/60 text-slate-700 dark:text-surface-50':
                    context.focused && !context.selected,
            },
            {
                'bg-primary-100 dark:bg-primary-400/40 text-primary-700 dark:text-surface-50':
                    context.focused && context.selected,
            },
            {
                'bg-primary-50 dark:bg-primary-400/40 text-primary-700 dark:text-surface-50':
                    !context.focused && context.selected,
            },

            //States
            {
                'hover:bg-slate-100 dark:hover:bg-slate-600/80':
                    !context.focused && !context.selected,
            },
            {
                'hover:text-slate-700 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-600/80':
                    context.focused && !context.selected,
            },
            'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',

            // Transitions
            'transition-shadow',
            'duration-200',

            // Misc
            'cursor-pointer',
            'overflow-hidden',
            'whitespace-nowrap',
        ],
    }),
    itemgroup: {
        class: [
            //Font
            'font-bold',

            // Spacing
            'm-0',
            'py-3 px-5',

            // Color
            'text-slate-800 dark:text-surface-50',
            'bg-slate-50 dark:bg-surface-800/80',

            // Misc
            'cursor-auto',
        ],
    },
    header: {
        class: [
            // Spacing
            'py-3 px-5',
            'm-0',

            //Shape
            'border-b',
            'rounded-tl-2xl',
            'rounded-tr-2xl',

            // Color
            'text-slate-700 dark:text-surface-50',
            'bg-slate-100 dark:bg-surface-900',
            'border-surface-500/40 ',
        ],
    },
    filtercontainer: {
        class: 'relative',
    },
    filterinput: {
        class: [
            // Font
            'font-sans',
            'leading-none',

            // Sizing
            'pr-7 py-3 px-3',
            '-mr-7',
            'w-full',

            //Color
            'text-slate-700 dark:text-surface-50',
            'bg-slate-50 dark:bg-surface-900',
            'border-surface-500/40 ',

            // Shape
            'border',
            'rounded-2xl',
            'appearance-none',

            // Transitions
            'transition',
            'duration-200',

            // States
            'hover:border-primary-500 dark:hover:border-primary-300',
            'focus:ring focus:outline-none focus:outline-offset-0',
            'focus:ring-primary-400/50 dark:focus:ring-primary-300/50',

            // Misc
            'appearance-none',
        ],
    },
    filtericon: {
        class: ['absolute', 'top-1/2 right-3', '-mt-2'],
    },
    emptymessage: {
        class: [
            // Font
            'leading-none',

            // Spacing
            'py-3 px-5',

            // Color
            'text-slate-800 dark:text-surface-50',
            'bg-transparent',
        ],
    },
}
