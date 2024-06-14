export default {
    root: ({ props, state }) => ({
        class: [
            // Display and Position
            'inline-flex',
            'relative',

            // Shape
            'w-full',
            'rounded-2xl',

            // Color and Background
            'bg-slate-50 dark:bg-surface-900',
            // 'border border-surface-500/40 ',

            // Transitions
            'transition-all',
            'duration-200',

            // States
            'hover:border-primary-500 dark:hover:border-primary-300',
            {
                'outline-none outline-offset-0 ring ring-primary-400/50 dark:ring-primary-300/50':
                    state.focused,
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
    labelContainer: {
        class: 'overflow-hidden flex flex-auto cursor-pointer ',
    },
    label: ({ props }) => ({
        class: [
            'leading-none',
            'block ',

            // Spacing
            {
                'p-3': props.display !== 'chip',
                'py-3 px-3':
                    props.display === 'chip' &&
                    !props?.modelValue?.length,
                'py-1.5 px-3':
                    props.display === 'chip' &&
                    props?.modelValue?.length > 0,
            },

            // Color
            {
                'text-slate-800 dark:text-surface-50':
                    props.modelValue,
                'text-slate-400 dark:text-surface-500':
                    !props.modelValue,
            },
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',

            // Transitions
            'transition duration-200',

            // Misc
            'overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis',
        ],
    }),
    token: {
        class: [
            // Flex
            'inline-flex items-center',

            // Spacings
            'py-1.5 px-3 mr-2',

            // Shape
            'rounded-[1.14rem]',

            // Colors
            'bg-slate-200 dark:bg-surface-800',
            'text-slate-700 dark:text-surface-50',

            // Misc
            'cursor-default',
        ],
    },
    removeTokenIcon: {
        class: [
            // Shape
            'rounded-2xl leading-6',

            // Spacing
            'ml-2',

            // Size
            'w-4 h-4',

            // Transition
            'transition duration-200 ease-in-out',

            // Misc
            'cursor-pointer',
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
            'border-0 dark:border dark:border-surface-800',
            'rounded-2xl',
            // 'shadow-sm',

            // Color
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-800 dark:text-surface-50',
            '',
        ],
    },
    header: {
        class: [
            'flex items-center justify-between',
            // Spacing
            'py-3 px-5',
            'm-0',

            //Shape
            'border-b',
            'rounded-tl-2xl',
            'rounded-tr-2xl',

            // Color
            'text-slate-700 dark:text-surface-50',
            'bg-slate-100 dark:bg-surface-900',
            'border-surface-500/40 ',
        ],
    },
    headerCheckboxContainer: {
        class: [
            'relative',

            // Alignment
            'inline-flex',
            'align-bottom',

            // Size
            'w-6',
            'h-6',

            // Misc
            'cursor-pointer',
            'select-none',
        ],
    },
    headerCheckbox: ({ context, state }) => ({
        class: [
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
                'border-surface-500/40  bg-slate-50 dark:bg-surface-900':
                    !context?.selected,
                'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400':
                    context?.selected,
            },

            'hover:border-primary-500',
            {
                'outline-none outline-offset-0 ring-2 ring-primary-400/50 dark:ring-primary-300/50':
                    state.focused,
            },
        ],
    }),
    headercheckboxicon: {
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
    closeButton: {
        class: [
            'relative',

            // Flexbox and Alignment
            'flex items-center justify-center',

            // Size and Spacing
            'mr-2',
            'last:mr-0',
            'w-8 h-8',

            // Shape
            'border-0',
            'rounded-full',

            // Colors
            'text-slate-500',
            'bg-transparent',

            // Transitions
            'transition duration-200 ease-in-out',

            // States
            'hover:text-slate-700 dark:hover:text-white/80',
            'hover:bg-slate-100 dark:hover:bg-slate-800/80',
            'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset',
            'focus:ring-primary-400/50 dark:focus:ring-primary-300/50',

            // Misc
            'overflow-hidden',
        ],
    },
    closeButtonIcon: {
        class: 'w-4 h-4 inline-block',
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

            // Flexbox
            'flex items-center gap-2',

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
                'bg-slate-200 dark:bg-surface-800/60 text-slate-700 dark:text-surface-50':
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
    checkboxContainer: {
        class: [
            'relative',

            // Alignment
            'inline-flex',
            'align-bottom',

            // Space
            'mr-2',

            // Size
            'w-6',
            'h-6',

            // Misc
            'cursor-pointer',
            'select-none',
        ],
    },
    checkbox: ({ context }) => ({
        class: [
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
                'border-surface-500/40  bg-slate-50 dark:bg-surface-900':
                    !context?.selected,
                'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400':
                    context?.selected,
            },

            'hover:border-primary-500 focus:outline-none',
            'focus:outline-offset-0 focus:ring focus:ring-primary-400/50 dark:focus:ring-primary-300/50',
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
    itemgroup: {
        class: [
            //Font
            'font-bold',

            // Spacing
            'm-0',
            'p-3 px-5',

            // Color
            'text-slate-800 dark:text-surface-50',
            'bg-slate-50 dark:bg-surface-800/80',

            // Misc
            'cursor-auto',
        ],
    },
    filtercontainer: {
        class: 'relative w-full mx-2',
    },
    filterinput: {
        class: [
            // Font
            'font-sans',
            'leading-none',

            // Sizing
            'pr-7 py-3 px-3',
            '-mr-7',
            'w-full',

            //Color
            'text-slate-700 dark:text-surface-50',
            'bg-slate-50 dark:bg-surface-900',
            'border-surface-500/40 ',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',

            // Shape
            'border',
            'rounded-2xl',
            'appearance-none',

            // Transitions
            'transition',
            'duration-200',

            // States
            'hover:border-primary-500 dark:hover:border-primary-300',
            'focus:ring focus:outline-none focus:outline-offset-0',
            'focus:ring-primary-400/50 dark:focus:ring-primary-300/50',

            // Misc
            'appearance-none',
        ],
    },
    filtericon: {
        class: ['absolute', 'top-1/2 right-3', '-mt-2'],
    },
    clearicon: {
        class: [
            // Color
            'text-slate-500',

            // Position
            'absolute',
            'top-1/2',
            'right-12',

            // Spacing
            '-mt-2',
        ],
    },
    emptymessage: {
        class: [
            // Font
            'leading-none',

            // Spacing
            'py-3 px-5',

            // Color
            'text-slate-800 dark:text-surface-50',
            'bg-transparent',
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
