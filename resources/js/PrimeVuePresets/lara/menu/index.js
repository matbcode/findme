export default {
    root: {
        class: [
            // Sizing and Shape
            'min-w-[12rem]',
            'rounded-2xl',
            'shadow-sm',
            // Spacing
            'py-0',
            // Colors
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-700 dark:text-surface-50',
            'border border-surface-500/40 ',
        ],
    },
    menu: {
        class: [
            // Spacings and Shape
            'list-none',
            'm-0',
            'p-0',
            'outline-none',
        ],
    },
    content: ({ context }) => ({
        class: [
            //Shape
            'rounded-2xl',
            // Colors
            'text-slate-700 dark:text-surface-50',
            {
                'bg-slate-200 text-slate-700 dark:bg-surface-300/10 dark:text-surface-50':
                    context.focused,
            },
            // Transitions
            'transition-shadow',
            'duration-200',
            // States
            'hover:text-slate-700 dark:hover:text-white/80',
            'hover:bg-slate-100 dark:bg-surface-900 dark:hover:bg-slate-400/10',
        ],
    }),
    action: {
        class: [
            'relative',
            // Flexbox

            'flex',
            'items-center',

            // Spacing
            'py-3',
            'px-5',

            // Color
            'text-slate-700 dark:text-surface-50',

            // Misc
            'no-underline',
            'overflow-hidden',
            'cursor-pointer',
            'select-none',
        ],
    },
    icon: {
        class: [
            // Spacing
            'mr-2',

            // Color
            'text-slate-600 dark:text-surface-50',
        ],
    },
    label: {
        class: ['leading-none'],
    },
    submenuheader: {
        class: [
            // Font
            'text-sm text-surface-600 dark:text-surface-500',
            // Spacing
            'm-0',
            'py-3 px-5',
            // Shape
            'rounded-tl-none',
            'rounded-tr-none',
            // Colors
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-700 dark:text-surface-50',
        ],
    },
    transition: {
        enterFromClass: 'opacity-0 scale-y-[0.8]',
        enterActiveClass:
            'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass:
            'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0',
    },
}
