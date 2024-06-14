export default {
    root: ({ props }) => ({
        class: [
            // Display and Position
            'inline-flex',
            'relative',

            // Shape
            'w-full md:w-56',
            'rounded-2xl',
            'shadow-sm',

            // Color and Background
            'bg-slate-50 dark:bg-surface-900',
            'ring-1 ring-inset ring-surface-300 dark:ring-surface-700',

            //TODO: Focus needs context/props. normally gets p-focus
            // States
            'focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-500',

            // Misc
            'cursor-default',
            'select-none',
            {
                'opacity-60': props.disabled,
                'pointer-events-none': props.disabled,
            },
        ],
    }),
    input: ({ props }) => ({
        class: [
            //Font
            'font-sans',
            'leading-6',
            'sm:text-sm',

            // Display
            'block',
            'flex-auto',

            // Color and Background
            'bg-transparent',
            'border-0',
            'text-slate-800 dark:text-surface-50',

            // Sizing and Spacing
            'w-[1%]',
            'py-1.5 px-3',
            { 'pr-7': props.showClear },

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
    }),
    trigger: {
        class: [
            //Font
            'sm:text-sm',

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
            'mt-2',

            // Shape
            'border-0',
            'rounded-2xl',
            'shadow-sm',

            // Color
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-800 dark:text-surface-50',
            'ring-1 ring-inset ring-surface-300 dark:ring-surface-700',
        ],
    },
    wrapper: {
        class: [
            // Sizing
            'max-h-[15rem]',

            // Misc
            'overflow-auto',
        ],
    },
    list: {
        class: 'py-1 list-none m-0',
    },
    item: ({ context }) => ({
        class: [
            // Font
            'sm:text-sm',
            'leading-none',
            {
                'font-normal': !context.selected,
                'font-bold': context.selected,
            },

            // Position
            'relative',

            // Shape
            'border-0',
            'rounded-none',

            // Spacing
            'm-0',
            'py-2 px-4',

            // Color
            {
                'text-slate-700 dark:text-surface-50':
                    !context.focused && !context.selected,
            },
            {
                'bg-primary-500 dark:bg-primary-400 text-white dark:text-surface-700':
                    context.focused && context.selected,
            },
            {
                'bg-transparent text-slate-700 dark:text-surface-50':
                    !context.focused && context.selected,
            },

            //States
            'hover:bg-primary-500 dark:hover:bg-primary-400 hover:text-white dark:hover:text-slate-700',

            // Misc
            'cursor-pointer',
            'overflow-hidden',
            'whitespace-nowrap',
        ],
    }),
    itemgroup: {
        class: [
            //Font
            'font-bold',
            'sm:text-sm',

            // Spacing
            'm-0',
            'py-2 px-4',

            // Color
            'text-slate-800 dark:text-surface-50',
            'bg-slate-50 dark:bg-surface-800/80',

            // Misc
            'cursor-auto',
        ],
    },
    emptymessage: {
        class: [
            // Font
            'leading-none',
            'sm:text-sm',

            // Spacing
            'py-2 px-4',

            // Color
            'text-slate-800 dark:text-surface-50',
            'bg-transparent',
        ],
    },
    header: {
        class: [
            // Spacing
            'p-0',
            'm-0',

            //Shape
            'rounded-tl-2xl',
            'rounded-tr-2xl',

            // Color
            'text-slate-700 dark:text-surface-50',
            'bg-slate-100 dark:bg-surface-900',
        ],
    },
    filtercontainer: {
        class: 'relative',
    },
    filterinput: {
        class: [
            // Font
            'font-sans',
            'leading-none',
            'sm:text-sm',

            // Sizing
            'py-1.5 px-3',
            'pr-7',
            '-mr-7',
            'w-full',

            //Color
            'text-slate-700 dark:text-surface-50',
            'bg-slate-50 dark:bg-surface-900',
            'placeholder:text-slate-400',
            'ring-1 ring-inset ring-surface-300 dark:ring-surface-700',

            // Shape
            'border-0',
            'rounded-tl-2xl',
            'rounded-tr-2xl',
            'appearance-none',

            // States
            'focus:ring-2 focus:ring-inset focus:outline-none focus:outline-offset-0',
            'focus:ring-primary-600 dark:focus:ring-primary-500',

            // Misc
            'appearance-none',
        ],
    },
    filtericon: {
        class: ['absolute', 'top-1/2', '-mt-2'],
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
    transition: {
        enterFromClass: 'opacity-0 scale-y-[0.8]',
        enterActiveClass:
            'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass:
            'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0',
    },
}
