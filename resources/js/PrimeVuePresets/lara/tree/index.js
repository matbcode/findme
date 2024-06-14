export default {
    root: {
        class: [
            // Space
            'p-5',

            // Shape
            'rounded-2xl',

            // Color
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-700 dark:text-surface-50',
            'border border-solid border-surface-500/40 ',
        ],
    },
    wrapper: {
        class: ['overflow-auto'],
    },
    container: {
        class: [
            // Spacing
            'm-0 p-0',

            // Misc
            'list-none overflow-auto',
        ],
    },
    node: {
        class: [
            'p-1',
            'rounded-2xl',
            'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset focus:ring-primary-400/50 dark:focus:ring-primary-300/50',
        ],
    },
    content: ({ context, props }) => ({
        class: [
            // Flex and Alignment
            'flex items-center',

            // Shape
            'rounded-2xl',

            // Spacing
            'p-2',

            // Colors
            'text-slate-600 dark:text-surface-50',
            {
                'bg-primary-50 dark:bg-primary-400/30 text-primary-600 dark:text-surface-50':
                    context.selected,
            },

            // States
            {
                'hover:bg-slate-50 dark:hover:bg-slate-700/40':
                    (props.selectionMode == 'single' ||
                        props.selectionMode == 'multiple') &&
                    !context.selected,
            },

            // Transition
            'transition-shadow duration-200',

            {
                'cursor-pointer select-none':
                    props.selectionMode == 'single' ||
                    props.selectionMode == 'multiple',
            },
        ],
    }),
    toggler: ({ context }) => ({
        class: [
            // Flex and Alignment
            'inline-flex items-center justify-center',

            // Shape
            'border-0 rounded-full',

            // Size
            'w-8 h-8',

            // Spacing
            'mr-2',

            // Colors
            'bg-transparent',
            {
                'text-slate-500 dark:text-surface-50':
                    !context.selected,
                'text-primary-600 dark:text-surface-50':
                    context.selected,
                invisible: context.leaf,
            },

            // States
            'hover:bg-slate-200/20 dark:hover:bg-slate-500/20',
            'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50',

            // Transition
            'transition duration-200',

            // Misc
            'cursor-pointer select-none',
        ],
    }),
    checkboxcontainer: {
        class: 'mr-2',
    },
    checkbox: ({ context, props }) => ({
        class: [
            'relative',

            // Alignment
            'flex',
            'items-center',
            'justify-center',

            // Size
            'w-6',
            'h-6',

            // Shape
            'rounded-2xl',
            'border-2',

            // Colors
            'text-slate-600',
            {
                'border-surface-500/40 bg-slate-50  dark:bg-surface-900':
                    !context.checked,
                'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400':
                    context.checked,
            },

            // States
            'focus:outline-none focus:outline-offset-0',
            {
                'hover:border-primary-500 dark:hover:border-primary-400':
                    !props.disabled,
                'ring ring-primary-400/50 dark:ring-primary-300/50':
                    !props.disabled && context.focused,
                'cursor-default opacity-60': props.disabled,
            },

            // Transitions
            'transition-colors',
            'duration-200',

            // Misc
            'cursor-pointer',
        ],
    }),
    checkboxicon: {
        class: [
            // Font
            'text-base leading-none',

            // Size
            'w-4',
            'h-4',

            // Colors
            'text-white dark:text-surface-900',

            // Transitions
            'transition-all',
            'duration-200',
        ],
    },
    nodeicon: {
        class: [
            // Space
            'mr-2',

            // Color
            'text-slate-600 dark:text-surface-50',
        ],
    },
    subgroup: {
        class: ['m-0 list-none p-0 pl-2 mt-1'],
    },
    filtercontainer: {
        class: [
            'relative block',

            // Space
            'mb-2',

            // Size
            'w-full',
        ],
    },
    input: {
        class: [
            'relative',
            // Font
            'font-sans leading-none',

            // Spacing
            'm-0',
            'p-3 pr-10',

            // Size
            'w-full',

            // Shape
            'rounded-2xl',

            // Colors
            'text-slate-600 dark:text-surface-50',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'bg-slate-50 dark:bg-surface-900',
            'border border-surface-500/40 ',

            // States
            'hover:border-primary-500 dark:hover:border-primary-400',
            'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-primary-500/50 dark:focus:ring-primary-400/50',

            // Transition & Misc
            'appearance-none',
            'transition-colors duration-200',
        ],
    },
    loadingicon: {
        class: [
            'text-slate-500 dark:text-surface-50/70',
            'absolute top-[50%] right-[50%] -mt-2 -mr-2',
        ],
    },
    searchicon: {
        class: [
            // Position
            'absolute top-1/2 -mt-2 right-3',

            // Color
            'text-slate-600 dark:hover:text-white/70',
        ],
    },
}
