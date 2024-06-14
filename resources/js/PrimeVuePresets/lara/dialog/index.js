export default {
    root: ({ state }) => ({
        class: [
            // Shape
            'rounded-2xl',
            'drop-shadow-extreme',
            // 'animate-wobble-enter',
            'border dark:border-surface-800/70',
            'bg-white/80 dark:bg-surface-900/80 backdrop-blur-2xl',

            // Size
            'max-h-[90vh]',
            // 'w-[50vw]',
            // 'm-12',
            // 'p-2',

            // Color
            // 'border border-1',
            // 'border-surface-500/40',

            // Transitions
            'transform',
            'scale-100',

            // Maximized State
            {
                'transition-none': state.maximized,
                'transform-none': state.maximized,
                '!w-screen': state.maximized,
                '!h-screen': state.maximized,
                '!max-h-full': state.maximized,
                '!top-0': state.maximized,
                '!left-0': state.maximized,
            },
        ],
    }),
    header: {
        class: [
            // Flexbox and Alignment
            'flex items-center justify-between',
            'shrink-0',

            // Spacing
            'p-4',

            // Shape
            'border-t-0',
            'rounded-tl-2xl',
            'rounded-tr-2xl',

            // Colors
            // 'bg-slate-50 dark:bg-surface-900 backdrop-blur-md',
            'text-slate-700 dark:text-surface-50',
        ],
    },
    title: {
        class: ['font-bold text-lg'],
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
            'hover:bg-slate-100 dark:hover:bg-slate-800/20',
            'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset',
            'focus:ring-primary-400/50 dark:focus:ring-primary-300/50',

            // Misc
            'overflow-hidden',
        ],
    },
    maximizablebutton: {
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
            'hover:bg-slate-100 dark:hover:bg-slate-800/20',
            'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-inset',
            'focus:ring-primary-400/50 dark:focus:ring-primary-300/50',

            // Misc
            'overflow-hidden',
        ],
    },
    closeButtonIcon: {
        class: [
            // Display
            'inline-block',

            // Size
            'w-4',
            'h-4',
        ],
    },
    maximizableicon: {
        class: [
            // Display
            'inline-block',

            // Size
            'w-4',
            'h-4',
        ],
    },
    content: ({ state, instance }) => ({
        class: [
            // Spacing
            // 'px-6',
            // 'pb-8',
            'pt-0',
            'p-2',

            // Shape
            {
                grow: state.maximized,
                'rounded-bl-2xl': !instance.$slots.footer,
                'rounded-br-2xl': !instance.$slots.footer,
            },

            // Colors
            // 'bg-slate-50 dark:bg-surface-900/20 backdrop-blur-md',
            'text-slate-700 dark:text-surface-50/80',

            // Misc
            'overflow-y-auto overflow-x-hidden',
        ],
    }),
    footer: {
        class: [
            // Flexbox and Alignment
            'flex items-center justify-end',
            'shrink-0',
            'text-right',
            'gap-2',

            // Spacing
            'px-6',
            'pb-6',

            // Shape
            'border-t-0',
            'rounded-b-2xl',

            // Colors
            // 'bg-slate-50 dark:bg-surface-900/20 backdrop-blur-md',
            'text-slate-700 dark:text-surface-50/80',
        ],
    },
    mask: ({ props, state }) => ({
        class: [
            // Transitions
            'transition-all',
            'duration-100',
            { 'p-2': !state.maximized },

            // Background and Effects
            {
                'bg-surface-950/10 dark:bg-black/30': props.modal,
            },
        ],
    }),
    transition: ({ props }) => {
        return props.position === 'top'
            ? {
                  enterFromClass:
                      'opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0',
                  enterActiveClass:
                      'transition-transform duration-200 ease-out',
                  leaveActiveClass:
                      'transition-transform duration-200 ease-out',
                  leaveToClass:
                      'opacity-0 scale-75 translate-x-0 -translate-y-full translate-z-0',
              }
            : props.position === 'bottom'
              ? {
                    enterFromClass:
                        'opacity-0 scale-75 translate-y-full',
                    enterActiveClass:
                        'transition-transform duration-200 ease-out',
                    leaveActiveClass:
                        'transition-transform duration-200 ease-out',
                    leaveToClass:
                        'opacity-0 scale-75 translate-x-0 translate-y-full translate-z-0',
                }
              : props.position === 'left' ||
                  props.position === 'topleft' ||
                  props.position === 'bottomleft'
                ? {
                      enterFromClass:
                          'opacity-0 scale-75 -translate-x-full translate-y-0 translate-z-0',
                      enterActiveClass:
                          'transition-transform duration-200 ease-out',
                      leaveActiveClass:
                          'transition-transform duration-200 ease-out',
                      leaveToClass:
                          'opacity-0 scale-75  -translate-x-full translate-y-0 translate-z-0',
                  }
                : props.position === 'right' ||
                    props.position === 'topright' ||
                    props.position === 'bottomright'
                  ? {
                        enterFromClass:
                            'opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0',
                        enterActiveClass:
                            'transition-transform duration-200 ease-out',
                        leaveActiveClass:
                            'transition-transform duration-200 ease-out',
                        leaveToClass:
                            'opacity-0 scale-75 opacity-0 scale-75 translate-x-full translate-y-0 translate-z-0',
                    }
                  : {
                        enterFromClass: 'opacity-0 scale-75',
                        enterActiveClass:
                            'transition-transform duration-200 ease-out',
                        leaveActiveClass:
                            'transition-transform duration-200 ease-out',
                        leaveToClass: 'opacity-0 scale-75',
                    }
    },
}
