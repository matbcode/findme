export default {
    root: {
        class: [
            'relative',

            // Flexbox
            'flex',
            'items-center',

            // Spacing
            'p-0',

            // Shape
            'rounded-2xl',

            // Color
            'bg-slate-50 dark:bg-surface-900',
            'border border-surface-500/40 ',
        ],
    },
    menu: ({ props }) => ({
        class: [
            // Flexbox
            'sm:flex',
            'items-center',
            'flex-wrap',
            'flex-col sm:flex-row',
            {
                hidden: !props?.mobileActive,
                flex: props?.mobileActive,
            },

            // Position
            'absolute sm:relative',
            'top-full left-0',
            'sm:top-auto sm:left-auto',

            // Size
            'w-full sm:w-auto',

            // Spacing
            'm-0',
            'py-1 sm:py-0 sm:p-0',
            'list-none',

            // Shape
            'shadow-sm sm:shadow-none',
            'border-0',

            // Color
            'bg-slate-50 dark:bg-surface-800 sm:bg-transparent',

            // Misc
            'outline-none',
        ],
    }),
    menuitem: {
        class: 'sm:relative sm:w-auto w-full static',
    },
    content: ({ props, context }) => ({
        class: [
            // Shape
            { 'rounded-2xl': props.root },

            //  Colors
            {
                'text-slate-500 dark:text-surface-50':
                    !context.focused && !context.active,
                'text-slate-500 dark:text-surface-50 bg-slate-200 dark:bg-surface-800/90':
                    context.focused && !context.active,
                'text-primary-700 dark:text-surface-50/80 bg-primary-50 dark:bg-primary-400/30':
                    context.focused && context.active,
                'text-primary-700 dark:text-surface-50/80 bg-primary-50 dark:bg-primary-400/30':
                    !context.focused && context.active,
            },

            // Hover States
            {
                'hover:bg-slate-100 dark:hover:bg-slate-600/80':
                    !context.active,
                'hover:bg-primary-500/50 dark:hover:bg-primary-300/30 text-primary-700 dark:text-surface-50/80':
                    context.active,
            },

            // Transitions
            'transition-all',
            'duration-200',
        ],
    }),
    action: ({ context }) => ({
        class: [
            'relative',

            // Flexbox
            'flex',
            'items-center',

            // Spacing
            'py-2',
            'px-2',

            // Size
            {
                'pl-9 sm:pl-5': context.level === 1,
                'pl-14 sm:pl-5': context.level === 2,
            },
            'leading-none',

            // Misc
            'select-none',
            'cursor-pointer',
            'no-underline ',
            'overflow-hidden',
        ],
    }),
    icon: {
        class: 'mr-0',
    },
    submenuicon: ({ props }) => ({
        class: [
            {
                'ml-auto sm:ml-2': props.root,
                'ml-auto': !props.root,
            },
        ],
    }),
    submenu: ({ props }) => ({
        class: [
            // Size
            'w-full sm:w-48',

            // Spacing
            'py-1',
            'm-0',
            'list-none',

            // Shape
            'shadow-none sm:shadow-sm',
            'border-0',

            // Position
            'static sm:absolute',
            'z-10',
            { 'sm:absolute sm:left-full sm:top-0': props.level > 1 },

            // Color
            'bg-slate-50 dark:bg-surface-800',
        ],
    }),
    separator: {
        class: 'h-4 border border-2 border-surface-500/40  my-1',
    },
    button: {
        class: [
            // Flexbox
            'flex sm:hidden',
            'items-center justify-center',

            // Size
            'w-8',
            'h-8',

            // Shape
            // 'rounded-full',
            // Color
            'text-slate-500 dark:text-surface-50',

            // States
            'hover:text-slate-600 dark:hover:text-white/60',
            'hover:bg-slate-100 dark:hover:bg-slate-600/80',
            'focus:outline-none focus:outline-offset-0',
            'focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50',

            // Transitions
            'transition duration-200 ease-in-out',

            // Misc
            'cursor-pointer',
            'no-underline',
        ],
    },
    end: {
        class: 'ml-auto self-center',
    },
}
