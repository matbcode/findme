export default {
    root: ({ props }) => ({
        class: [
            // Display
            'inline-flex',

            {
                'flex-col':
                    props.showButtons &&
                    props.buttonLayout == 'vertical',
            },

            //Sizing
            {
                '!w-16':
                    props.showButtons &&
                    props.buttonLayout == 'vertical',
            },

            'ring-1 ring-surface-300 dark:ring-surface-700 ring-offset-0',
            'shadow-sm',
            'rounded-2xl',
        ],
    }),
    input: {
        root: ({ parent }) => ({
            class: [
                //Text
                'sm:text-sm',
                {
                    'text-center':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'vertical',
                },

                // Spacing
                'm-0',
                'py-1.5 px-3',

                // Shape
                'rounded-2xl',
                {
                    'rounded-tr-none rounded-br-none':
                        parent.props.showButtons,
                },
                {
                    'rounded-tl-none rounded-bl-none':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'horizontal',
                },
                {
                    'rounded-none':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'vertical',
                },

                // Colors
                'text-slate-900 dark:text-surface-50',
                'placeholder:text-slate-400 dark:placeholder:text-slate-500',
                'bg-slate-50 dark:bg-surface-900',
                {
                    'border-r border-surface-500/40 ':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'stacked',
                },
                {
                    'border-x border-surface-500/40 ':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'horizontal',
                },
                {
                    'border-y border-surface-500/40 ':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'vertical',
                },

                // States
                'outline-none focus:ring-primary-600 dark:focus:ring-primary-500',
                'focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-500',

                //Position
                {
                    'order-2':
                        parent.props.buttonLayout == 'horizontal' ||
                        parent.props.buttonLayout == 'vertical',
                },
            ],
        }),
    },

    buttongroup: {
        class: ['flex', 'flex-col'],
    },

    incrementbutton: {
        root: ({ parent }) => ({
            class: [
                // Display
                'flex flex-auto',

                // Alignment
                'items-center',
                'justify-center',
                'text-center align-bottom',

                //Position
                'relative',
                {
                    'order-3':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'horizontal',
                },
                {
                    'order-1':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'vertical',
                },

                //Color
                'text-slate-600 dark:text-surface-400',
                'bg-slate-50 dark:bg-surface-900',

                // Sizing
                'w-[3rem]',
                {
                    'px-2.5 py-1.5':
                        parent.props.showButtons &&
                        parent.props.buttonLayout !== 'stacked',
                },
                {
                    'p-0':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'stacked',
                },
                {
                    'w-full':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'vertical',
                },

                // Shape
                'rounded-2xl',
                {
                    'rounded-tl-none rounded-br-none rounded-bl-none':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'stacked',
                },
                {
                    'rounded-bl-none rounded-tl-none':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'horizontal',
                },
                {
                    'rounded-bl-none rounded-br-none':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'vertical',
                },

                //States
                'focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600 focus:dark:ring-primary-500',
                'hover:bg-slate-50 dark:hover:bg-slate-700',

                //Misc
                'cursor-pointer overflow-hidden select-none',
            ],
        }),
        label: {
            class: 'h-0 w-0',
        },
    },
    decrementbutton: {
        root: ({ parent }) => ({
            class: [
                // Display
                'flex flex-auto',

                // Alignment
                'items-center',
                'justify-center',
                'text-center align-bottom',

                //Position
                'relative',
                {
                    'order-1':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'horizontal',
                },
                {
                    'order-3':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'vertical',
                },

                //Color
                'text-slate-600 dark:text-surface-400',
                'bg-slate-50 dark:bg-surface-900',

                // Sizing
                'w-[3rem]',
                {
                    'px-2.5 py-1.5':
                        parent.props.showButtons &&
                        parent.props.buttonLayout !== 'stacked',
                },
                {
                    'p-0':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'stacked',
                },
                {
                    'w-full':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'vertical',
                },

                // Shape
                'rounded-2xl',
                {
                    'rounded-tr-none rounded-tl-none rounded-bl-none':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'stacked',
                },
                {
                    'rounded-tr-none rounded-br-none ':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'horizontal',
                },
                {
                    'rounded-tr-none rounded-tl-none ':
                        parent.props.showButtons &&
                        parent.props.buttonLayout == 'vertical',
                },

                //States
                'focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600 focus:dark:ring-primary-500',
                'hover:bg-slate-50 dark:hover:bg-slate-700',

                //Misc
                'cursor-pointer overflow-hidden select-none',
            ],
        }),
        label: {
            class: 'h-0 w-0',
        },
    },
}
