export default {
    root: ({ props, context, parent }) => ({
        class: [
            // Font
            'font-sans text-base leading-none',
            'border shadow-inner',

            // Spacing
            'm-0',
            {
                'px-4 py-4': props.size == 'large',
                'text-xl': props.size == 'large',
                'px-2 py-2': props.size == 'small',
                'p-4': props.size == null,
            },

            // Shape
            { 'rounded-2xl': parent.instance.$name !== 'InputGroup' },
            {
                'first:rounded-l-full rounded-none last:rounded-r-full':
                    parent.instance.$name == 'InputGroup',
            },
            // {
            //     'border-0 border-y border-l last:border-r':
            //         parent.instance.$name == 'InputGroup',
            // },
            {
                'first:ml-0 ml-[-1px]':
                    parent.instance.$name == 'InputGroup' &&
                    !props.showButtons,
            },

            // Colors
            'text-slate-600 dark:text-surface-50',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'bg-white dark:bg-surface-900',
            {
                'dark:border-surface-800 border-surface-100':
                    !context.error,
                'border-red-500': context.error,
            },

            // States
            {
                'hover:border-primary-500 dark:hover:border-primary-400':
                    !context.disabled,
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50':
                    !context.disabled,
                'opacity-50 select-none pointer-events-none cursor-not-allowed':
                    context.disabled,
            },

            // Misc
            'appearance-none',
            'transition-colors duration-200',
        ],
    }),
}
