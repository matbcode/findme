export default {
    root: ({ props }) => ({
        class: [
            // Flexbox
            'flex flex-col',

            // Position
            'relative',
            {
                '!transition-none !transform-none !w-screen !h-screen !max-h-full !top-0 !left-0':
                    props.position == 'full',
            },

            // Size
            {
                'h-full w-full max-w-[28rem]':
                    props.position == 'left' ||
                    props.position == 'right',
                'h-auto w-full':
                    props.position == 'top' ||
                    props.position == 'bottom',
            },

            // Shape
            'border-0 dark:border',
            'shadow-sm',

            // Colors
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-700 dark:text-surface-50',
            '',

            // Transitions
            'transition-transform',
            'duration-300',

            // Misc
            'pointer-events-auto',
        ],
    }),
    header: {
        class: [
            // Flexbox and Alignment
            'flex items-center justify-between',
            'shrink-0',

            // Spacing
            'px-6 pt-6',

            // Colors
            'bg-slate-50 dark:bg-surface-900',
            'text-slate-700 dark:text-surface-50/80',
        ],
    },
    title: {
        class: ['font-semibold leading-6 text-base m-0'],
    },
    icons: {
        class: ['flex items-center'],
    },
    closeButton: {
        class: [
            'relative',

            // Flexbox and Alignment
            'flex items-center justify-center',

            // Size and Spacing
            'mr-2',
            'last:mr-0',
            'w-6 h-6',

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
            'focus:outline-none focus:outline-offset-0 focus:ring-1 focus:ring-inset',
            'focus:ring-primary-500 dark:focus:ring-primary-400',

            // Misc
            'overflow-hidden',
        ],
    },
    closeicon: {
        class: [
            // Display
            'inline-block',

            // Size
            'w-3',
            'h-3',
        ],
    },
    content: {
        class: [
            // Spacing and Size
            'px-6 pb-6',
            'mt-6',
            'h-full',
            'w-full',

            // Growth and Overflow
            'grow',
            'overflow-y-auto',
        ],
    },
    mask: ({ props }) => ({
        class: [
            // Transitions
            'transition',
            'duration-200',
            { 'p-5': !props.position == 'full' },

            // Background and Effects
            {
                'bg-slate-500/70 dark:bg-surface-800/70': props.modal,
                'backdrop-blur-md': props.modal,
            },
        ],
    }),
    transition: ({ props }) => {
        return props.position === 'top'
            ? {
                  enterFromClass:
                      'translate-x-0 -translate-y-full translate-z-0',
                  leaveToClass:
                      'translate-x-0 -translate-y-full translate-z-0',
              }
            : props.position === 'bottom'
              ? {
                    enterFromClass:
                        'translate-x-0 translate-y-full translate-z-0',
                    leaveToClass:
                        'translate-x-0 translate-y-full translate-z-0',
                }
              : props.position === 'left'
                ? {
                      enterFromClass:
                          '-translate-x-full translate-y-0 translate-z-0',
                      leaveToClass:
                          '-translate-x-full translate-y-0 translate-z-0',
                  }
                : props.position === 'right'
                  ? {
                        enterFromClass:
                            'translate-x-full translate-y-0 translate-z-0',
                        leaveToClass:
                            'translate-x-full translate-y-0 translate-z-0',
                    }
                  : {
                        enterFromClass: 'opacity-0',
                        enterActiveClass:
                            'transition-opacity duration-400 ease-in',
                        leaveActiveClass:
                            'transition-opacity duration-400 ease-in',
                        leaveToClass: 'opacity-0',
                    }
    },
}
