export default {
    root: {
        class: [
            // Shape
            'rounded-2xl shadow-2xl',
            'border dark:border-surface-800/50',

            // Position
            'fixed left-0 top-0 mt-4',
            'z-40 transform origin-center',

            // Color
            'bg-white/50 dark:bg-surface-900/80 backdrop-blur-2xl',
            'text-slate-700 dark:text-surface-50/80',

            // Before: Triangle
            // 'before:absolute before:-top-2 before:ml-4',
            // 'before:w-0 before:h-0',
            // 'before:border-transparent before:border-solid',
            // 'before:border-x-[0.5rem] before:border-b-[0.5rem]',
            // 'before:border-t-0 before:border-b-surface-0 dark:before:border-b-surface-800'
        ],
    },
    content: {
        class: 'p-0 m-0 items-center flex',
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
