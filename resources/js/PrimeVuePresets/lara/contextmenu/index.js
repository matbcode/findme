export default {
    root: {
        class: [
            // Sizing and Shape
            'min-w-[12rem]',
            'rounded-2xl',
            'shadow-2xl',

            // Spacing
            'py-0',

            // Colors
            'bg-white dark:bg-surface-800',
            'text-slate-700 dark:text-surface-50',
            'border dark:border-surface-800/70 ',
        ],
    },
    menu: {
        class: [
            // Spacings and Shape
            'list-none',
            'm-0',
            'p-0',
            'outline-none',
            'max-h-[12rem] overflow-y-auto',
        ],
    },
    menuitem: {
        class: 'relative',
    },
    content: ({ context }) => ({
        class: [
            //Shape
            'rounded-2xl',

            // Colors
            'text-slate-700 dark:text-surface-50',
            {
                'text-slate-500 dark:text-surface-50':
                    !context.focused && !context.active,
                'text-slate-500 dark:text-surface-50 bg-white dark:bg-surface-800/90':
                    context.focused && !context.active,
                'text-primary-700 dark:text-surface-50/80 bg-primary-50 dark:bg-primary-400/30':
                    context.focused && context.active,
                'text-primary-700 dark:text-surface-50/80 bg-primary-50 dark:bg-primary-400/30':
                    !context.focused && context.active,
            },

            // Transitions
            'transition-shadow',
            'duration-200',

            // States
            {
                'hover:bg-slate-100 dark:hover:bg-slate-600/80':
                    !context.active,
                'hover:bg-primary-400/30 dark:hover:bg-primary-300/30 text-primary-700 dark:text-surface-50/80':
                    context.active,
            },
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
    submenu: ({ props }) => ({
        class: [
            // Size
            'w-full sm:w-48',

            // Spacing
            'py-0',
            'm-0',
            'list-none',

            // Shape
            'shadow-2xl',
            'rounded-2xl',
            'border dark:border-surface-800/70 ',

            // Position
            'static sm:absolute',
            'z-10',
            { 'sm:absolute sm:left-full sm:top-0': props.level > 1 },

            // Color
            'bg-white dark:bg-surface-800',
        ],
    }),
    submenuicon: {
        class: ['ml-auto'],
    },
    separator: {
        class: 'border-t border-surface-500/40  my-1',
    },
    transition: {
        enterFromClass: 'opacity-0',
        enterActiveClass: 'transition-opacity duration-250',
    },
}
