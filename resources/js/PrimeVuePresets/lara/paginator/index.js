export default {
    root: {
        class: [
            // Flex & Alignment
            'flex items-center justify-center flex-wrap',

            // Spacing
            'px-4 py-2',

            // Shape
            'border-0',

            // Color
            // 'bg-slate-50 dark:bg-surface-900',
            'text-slate-500 dark:text-surface-50',
        ],
    },
    firstpagebutton: ({ context }) => ({
        class: [
            'relative',

            // Flex & Alignment
            'inline-flex items-center justify-center',

            // Shape
            'border-0 rounded-full dark:rounded-full',

            // Size
            'min-w-[3rem] h-12 m-[0.143rem]',
            'leading-none',

            // Color
            'text-slate-500 dark:text-surface-50',

            // State
            {
                'hover:bg-slate-50 dark:hover:bg-slate-700/70':
                    !context.disabled,
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50':
                    !context.disabled,
            },

            // Transition
            'transition duration-200',

            // Misc
            'user-none overflow-hidden',
            {
                'cursor-default pointer-events-none opacity-60':
                    context.disabled,
            },
        ],
    }),
    previouspagebutton: ({ context }) => ({
        class: [
            'relative',

            // Flex & Alignment
            'inline-flex items-center justify-center',

            // Shape
            'border-0 rounded-full dark:rounded-full',

            // Size
            'min-w-[3rem] h-12 m-[0.143rem]',
            'leading-none',

            // Color
            'text-slate-500 dark:text-surface-50',

            // State
            {
                'hover:bg-slate-50 dark:hover:bg-slate-700/70':
                    !context.disabled,
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50':
                    !context.disabled,
            },

            // Transition
            'transition duration-200',

            // Misc
            'user-none overflow-hidden',
            {
                'cursor-default pointer-events-none opacity-60':
                    context.disabled,
            },
        ],
    }),
    nextpagebutton: ({ context }) => ({
        class: [
            'relative',

            // Flex & Alignment
            'inline-flex items-center justify-center',

            // Shape
            'border-0 rounded-full dark:rounded-full',

            // Size
            'min-w-[3rem] h-12 m-[0.143rem]',
            'leading-none',

            // Color
            'text-slate-500 dark:text-surface-50',

            // State
            {
                'hover:bg-slate-50 dark:hover:bg-slate-700/70':
                    !context.disabled,
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50':
                    !context.disabled,
            },

            // Transition
            'transition duration-200',

            // Misc
            'user-none overflow-hidden',
            {
                'cursor-default pointer-events-none opacity-60':
                    context.disabled,
            },
        ],
    }),
    lastpagebutton: ({ context }) => ({
        class: [
            'relative',

            // Flex & Alignment
            'inline-flex items-center justify-center',

            // Shape
            'border-0 rounded-full dark:rounded-full',

            // Size
            'min-w-[3rem] h-12 m-[0.143rem]',
            'leading-none',

            // Color
            'text-slate-500 dark:text-surface-50',

            // State
            {
                'hover:bg-slate-50 dark:hover:bg-slate-700/70':
                    !context.disabled,
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50':
                    !context.disabled,
            },

            // Transition
            'transition duration-200',

            // Misc
            'user-none overflow-hidden',
            {
                'cursor-default pointer-events-none opacity-60':
                    context.disabled,
            },
        ],
    }),
    pagebutton: ({ context }) => ({
        class: [
            'relative',

            // Flex & Alignment
            'inline-flex items-center justify-center',

            // Shape
            'border-0 rounded-full dark:rounded-full',

            // Size
            'min-w-[3rem] h-12 m-[0.143rem]',
            'leading-none',

            // Color
            'text-slate-500 dark:text-surface-50',
            {
                'bg-primary-50 border-primary-50 dark:border-transparent text-primary-700 dark:text-surface-50 dark:bg-primary-400/30':
                    context.active,
            },

            // State
            {
                'hover:bg-slate-50 dark:hover:bg-slate-700/70':
                    !context.disabled && !context.active,
                'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50':
                    !context.disabled,
            },

            // Transition
            'transition duration-200',

            // Misc
            'user-none overflow-hidden',
            {
                'cursor-default pointer-events-none opacity-60':
                    context.disabled,
            },
        ],
    }),
    rowperpagedropdown: {
        root: ({ props, state }) => ({
            class: [
                // Display and Position
                'inline-flex',
                'relative',

                // Shape
                // 'h-12',
                'rounded-2xl',

                // Spacing
                'mx-2',

                // Color and Background
                'bg-slate-50 dark:bg-surface-900',
                'border border-surface-500/40 ',

                // Transitions
                'transition-all',
                'duration-200',

                // States
                'hover:border-primary-500 dark:hover:border-primary-300',
                {
                    'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50':
                        !state.focused,
                },

                // Misc
                'cursor-pointer',
                'select-none',
                {
                    'opacity-60': props.disabled,
                    'pointer-events-none': props.disabled,
                    'cursor-default': props.disabled,
                },
            ],
        }),
        input: {
            class: [
                //Font
                'font-sans',
                'leading-5',

                // Display
                'block',
                'flex-auto',

                // Color and Background
                'bg-transparent',
                'border-0',
                'text-slate-800 dark:text-surface-50',

                // Sizing and Spacing
                'w-[1%]',
                'p-3 pr-0',

                //Shape
                'rounded-none',

                // Transitions
                'transition',
                'duration-200',

                // States
                'focus:outline-none focus:shadow-none',

                // Misc
                'relative',
                'cursor-pointer',
                'overflow-hidden overflow-ellipsis',
                'whitespace-nowrap',
                'appearance-none',
            ],
        },
        trigger: {
            class: [
                // Flexbox
                'flex items-center justify-center',
                'shrink-0',

                // Color and Background
                'bg-transparent',
                'text-slate-500',

                // Size
                'w-12',

                // Shape
                'rounded-tr-2xl',
                'rounded-br-2xl',
            ],
        },
        panel: {
            class: [
                // Position
                'absolute top-0 left-0',

                // Shape
                'border-0 dark:border',
                'rounded-2xl',
                'shadow-sm',

                // Color
                'bg-slate-50 dark:bg-surface-900',
                'text-slate-800 dark:text-surface-50',
                '',
            ],
        },
        wrapper: {
            class: [
                // Sizing
                'max-h-[200px]',

                // Misc
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
                    'bg-slate-50 dark:bg-surface-800/60 text-slate-700 dark:text-surface-50':
                        context.focused && !context.selected,
                },
                {
                    'dark:text-surface-50':
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

                // Transitions
                'transition-shadow',
                'duration-200',

                // Misc
                'cursor-pointer',
                'overflow-hidden',
                'whitespace-nowrap',
            ],
        }),
    },
    jumptopageinput: {
        root: {
            class: 'inline-flex mx-2',
        },
        input: {
            root: {
                class: [
                    'relative',

                    //Font
                    'font-sans',
                    'leading-none',

                    // Display
                    'block',
                    'flex-auto',

                    // Colors
                    'text-slate-600 dark:text-surface-50',
                    'placeholder:text-slate-400 dark:placeholder:text-slate-500',
                    'bg-slate-50 dark:bg-surface-900',
                    'border border-surface-500/40 ',

                    // Sizing and Spacing
                    'w-[1%] max-w-[3rem]',
                    'p-3 m-0',

                    //Shape
                    'rounded-full',

                    // Transitions
                    'transition',
                    'duration-200',

                    // States
                    'hover:border-primary-500 dark:hover:border-primary-400',
                    'focus:outline-none focus:shadow-none',
                    'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50',

                    // Misc
                    'cursor-pointer',
                    'overflow-hidden overflow-ellipsis',
                    'whitespace-nowrap',
                    'appearance-none',
                ],
            },
        },
    },
    jumptopagedropdown: {
        root: ({ props, state }) => ({
            class: [
                // Display and Position
                'inline-flex',
                'relative',

                // Shape
                'h-12',
                'rounded-full',

                // Color and Background
                'bg-slate-50 dark:bg-surface-900',
                'border border-surface-500/40 ',

                // Transitions
                'transition-all',
                'duration-200',

                // States
                'hover:border-primary-500 dark:hover:border-primary-300',
                {
                    'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50':
                        !state.focused,
                },

                // Misc
                'cursor-pointer',
                'select-none',
                {
                    'opacity-60': props.disabled,
                    'pointer-events-none': props.disabled,
                    'cursor-default': props.disabled,
                },
            ],
        }),
        input: {
            class: [
                //Font
                'font-sans',
                'leading-none',

                // Display
                'block',
                'flex-auto',

                // Color and Background
                'bg-transparent',
                'border-0',
                'text-slate-800 dark:text-surface-50',

                // Sizing and Spacing
                'w-[1%]',
                'p-3',

                //Shape
                'rounded-none',

                // Transitions
                'transition',
                'duration-200',

                // States
                'focus:outline-none focus:shadow-none',

                // Misc
                'relative',
                'cursor-pointer',
                'overflow-hidden overflow-ellipsis',
                'whitespace-nowrap',
                'appearance-none',
            ],
        },
        trigger: {
            class: [
                // Flexbox
                'flex items-center justify-center',
                'shrink-0',

                // Color and Background
                'bg-transparent',
                'text-slate-500',

                // Size
                'w-12',

                // Shape
                'rounded-tr-2xl',
                'rounded-br-2xl',
            ],
        },
        panel: {
            class: [
                // Position
                'absolute top-0 left-0',

                // Shape
                'border-0 dark:border',
                'rounded-full',
                'shadow-sm',

                // Color
                'bg-slate-50 dark:bg-surface-900',
                'text-slate-800 dark:text-surface-50',
                '',
            ],
        },
        wrapper: {
            class: [
                // Sizing
                'max-h-[200px]',

                // Misc
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
                    'bg-slate-50 dark:bg-surface-800/60 text-slate-700 dark:text-surface-50':
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

                // Transitions
                'transition-shadow',
                'duration-200',

                // Misc
                'cursor-pointer',
                'overflow-hidden',
                'whitespace-nowrap',
            ],
        }),
    },
}
