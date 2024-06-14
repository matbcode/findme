export default {
    root: {
        class: [
            // Shape
            'rounded-2xl',
            'shadow-2xl',

            // Size
            'min-w-[12rem]',
            'py-0',

            // Colors
            'bg-slate-50 dark:bg-surface-800',
            'border-0 border-surface-500/40 ',
            'backdrop-blur-md',
            'text-base',
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
    menuitem: {
        class: [
            // Position
            'relative',
        ],
    },
    content: ({ context }) => ({
        class: [
            //Shape
            'rounded-2xl',

            // Colors
            'text-slate-700 dark:text-surface-50',
            {
                'bg-white text-slate-700 dark:bg-surface-800 dark:text-surface-50':
                    context.focused,
            },
            // Transitions
            'transition-shadow',
            'duration-200',

            // States
            'hover:text-slate-700 dark:hover:text-white/80',
            'hover:bg-slate-100 dark:bg-surface-800 dark:hover:bg-slate-700/50',
        ],
    }),
    action: {
        class: [
            'relative',
            // Flexbox

            'flex',
            'items-center',

            // Spacing
            'py-4',
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
    submenuicon: {
        class: [
            // Position
            'ml-auto',
        ],
    },
    submenu: {
        class: [
            // Size
            'w-full sm:w-48',

            // Spacing
            'py-0',
            'm-0',
            'list-none',

            // Shape
            'shadow-sm',
            'rounded-2xl',
            'border border-surface-500/40 ',

            // Position
            'static sm:absolute',
            'z-10',

            // Color
            'bg-white dark:bg-surface-800',
        ],
    },
    separator: {
        class: 'border-t border-surface-500/40  my-1',
    },
}
