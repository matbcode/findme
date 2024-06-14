export default {
    root: ({ props, state }) => ({
        class: [
            // Display and Position
            'inline-flex',
            'relative',

            // Shape
            'w-full',
            'rounded-2xl',
            'border border-1',

            // Color and Background
            {
                'bg-transparent': props.outlined,
                'bg-white dark:bg-surface-900': !props.outlined,
            },

            // State
            {
                'dark:border-surface-800 border-surface-100':
                    !props.error,
                'border-red-500': props.error,
            },

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
    input: ({ props }) => ({
        class: [
            //Font
            'font-sans',
            'leading-none',
            'text-sm',

            // Display
            'block',
            'flex-auto',

            // Color and Background
            'bg-transparent',
            'border-0',
            {
                'text-slate-800 dark:text-surface-50':
                    props.modelValue,
                'text-slate-400 dark:text-surface-500':
                    !props.modelValue,
            },
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',

            // Sizing and Spacing
            'w-[1%]',
            'p-5',
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
            // 'border',
            'rounded-2xl',
            'shadow-2xl',

            // Color
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-800 dark:text-surface-50',
            'dark:border-surface-800/70 ',
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
        class: 'list-none m-0',
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
            'rounded-2xl',

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
            'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring focus-visible:ring-inset focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50',

            // Transitions
            'transition-shadow',
            'duration-200',

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

            // Spacing
            'm-0',
            'py-3 px-5',

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

            // Spacing
            'py-3 px-5',

            // Color
            'text-slate-800 dark:text-surface-50',
            'bg-transparent',
        ],
    },
    header: {
        class: [
            // Spacing
            'py-3 px-5',
            'm-0',

            //Shape
            'border-b-0',
            'rounded-tl-2xl',
            'rounded-tr-2xl',

            // Color
            'text-slate-700 dark:text-surface-50',
            'bg-slate-100 dark:bg-surface-900',
            'border-surface-500/40 ',
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

            // Sizing
            'pr-7 py-3 px-4',
            '-mr-7',
            'w-full',

            //Color
            'text-slate-700 dark:text-surface-50',
            'bg-slate-50 dark:bg-surface-900',
            'border-surface-500/40 ',

            // Shape
            'border-0',
            'rounded-full',
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
    transition: {
        enterFromClass: 'opacity-0 scale-y-[0.8]',
        enterActiveClass:
            'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass:
            'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0',
    },
}
