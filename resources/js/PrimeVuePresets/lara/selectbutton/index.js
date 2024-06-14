export default {
    root: ({ props }) => ({
        class: [
            {
                'opacity-60 select-none pointer-events-none cursor-default':
                    props.disabled,
            },
            'shadow-sm rounded-2xl',
            'w-max',
        ],
    }),
    button: ({ context }) => ({
        class: [
            'relative',
            // Font
            'leading-none',

            // Flex Alignment
            'inline-flex items-center align-bottom text-center',

            // Spacing
            'px-[12px] py-[10px]',
            'min-h-[42px]',

            // Shape
            'border-0 border-r-0',
            'first:rounded-l-2xl first:rounded-tr-none first:rounded-br-none',
            'last:border-r-0 last:rounded-tl-none last:rounded-bl-none last:rounded-r-2xl',

            // Color
            {
                'bg-gradient-to-b from-white to-surface-50 dark:from-surface-800 dark:to-surface-800 hover:from-surface-50 hover:to-surface-100':
                    !context.active,
                'text-slate-700 dark:text-surface-50':
                    !context.active,
                'border-surface-500/40 ': !context.active,
                'bg-gradient-to-b from-slate-200 to-slate-100 dark:from-surface-800/20 dark:to-surface-800/20  dark:bg-surface-900 dark:text-surface-50  shadow-inner':
                    context.active,
            },

            // States
            'focus:outline-none',
            {
                'hover:bg-slate-50 dark:hover:bg-slate-700 ':
                    !context.active,
                'hover:bg-slate-200 dark:hover:bg-slate-800/20':
                    context.active,
            },
            {
                'opacity-60 select-none pointer-events-none cursor-default':
                    context.disabled,
            },
            // Transition
            'transition duration-200',

            // Misc
            'cursor-pointer select-none overflow-hidden',
        ],
    }),
    label: {
        // class: "font-bold",
    },
}
