export default {
    root: {
        class: [
            // Shape
            'rounded-2xl',

            // Size
            'min-w-[12rem]',
            'p-1.5',

            // Colors
            'bg-slate-50 dark:bg-surface-800',
            'ring-1 ring-surface-200 dark:ring-surface-700',
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
        class: ['relative first:mt-0 mt-1'],
    },
    content: ({ context }) => ({
        class: [
            //Shape
            'rounded-2xl',

            // Colors
            {
                'text-slate-700 dark:text-surface-50':
                    !context.focused,
                'bg-slate-100 text-primary-500 dark:bg-surface-300/10 dark:text-primary-400':
                    context.focused,
            },

            // Transitions
            'transition-shadow',
            'duration-200',

            // States
            'hover:text-primary-600 dark:hover:text-primary-400 ',
            'hover:bg-slate-100 dark:hover:bg-slate-400/10',
        ],
    }),
    action: {
        class: [
            'relative',

            // Font
            'font-semibold',

            // Flexbox
            'flex',
            'items-center',

            // Spacing
            'py-2',
            'px-3',

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
            'leading-6',
            'text-sm',
        ],
    },
    label: {
        class: ['leading-none', 'text-sm'],
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
            'p-1.5',
            'm-0 mx-1.5',
            'list-none',

            // Shape
            'shadow-none sm:shadow-sm',
            'border-0',

            // Position
            'static sm:absolute',
            'z-10',

            // Color
            'bg-slate-50 dark:bg-surface-800',
        ],
    },
    separator: {
        class: 'border-t border-surface-500/40  my-1',
    },
}
