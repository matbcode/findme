export default {
    panel: {
        class: 'mb-1 shadow-2xl rounded-2xl',
    },
    header: {
        class: [
            'rounded-2xl',
            'outline-none',
            'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',
        ],
    },
    headercontent: ({ context, instance }) => ({
        class: [
            // Shape
            'rounded-t-2xl',
            {
                'rounded-br-2xl rounded-bl-2xl':
                    !context.active ||
                    instance.activeItem?.items === undefined,
                'rounded-br-0 rounded-bl-0':
                    context.active &&
                    instance.activeItem?.items !== undefined,
            },

            // Color
            'border border-surface-500/40 ',
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-600 dark:text-surface-50',
            { 'text-slate-900': context.active },

            // States
            'hover:bg-slate-100 dark:hover:bg-slate-700/80',
            'hover:text-slate-900',

            // Transition
            'transition duration-200 ease-in-out',
            'transition-shadow duration-200',
        ],
    }),
    headeraction: {
        class: [
            'relative',

            // Font
            'font-medium',
            'leading-none',

            // Flex & Alignments
            'flex items-center',

            // Spacing
            'p-5',

            // Misc
            'select-none cursor-pointer no-underline',
        ],
    },
    headerlabel: {
        class: 'leading-none',
    },
    headerIcon: {
        class: 'mr-2',
    },
    submenuicon: {
        class: 'mr-2',
    },
    menucontent: {
        class: [
            // Spacing
            'py-2',

            // Shape
            'border border-t-0',
            'rounded-t-none rounded-br-2xl rounded-bl-2xl',

            // Color
            'text-slate-700 dark:text-surface-50',
            // 'bg-slate-50 dark:bg-surface-900/20',
            'border-surface-500/40 ',
        ],
    },
    menu: {
        class: ['outline-none', 'm-0 p-0 list-none'],
    },
    content: {
        class: [
            // Shape
            'border-none rounded-none',

            // Color
            'text-slate-700 dark:text-surface-50',

            // Transition
            'transition-shadow duration-200',
        ],
    },
    action: ({ context }) => ({
        class: [
            'relative',

            // Font
            'leading-none',

            // Flex & Alignments
            'flex items-center',

            // Spacing
            'py-3 px-5',

            // Color
            'text-slate-700 dark:text-surface-50',

            // States
            'hover:bg-slate-100 dark:hover:bg-slate-700/80 hover:text-slate-700 dark:hover:text-white/80',
            {
                'bg-slate-200 text-slate-700 dark:text-surface-50 dark:bg-surface-800/90':
                    context.focused,
            },

            // Misc
            'cursor-pointer no-underline',
            'select-none overflow-hidden',
        ],
    }),
    icon: {
        class: 'mr-2',
    },
    submenu: {
        class: 'p-0 pl-4 m-0 list-none',
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
