export default {
    root: ({ props }) => ({
        class: [
            'overflow-hidden',
            {
                'animate-pulse': props.animation !== 'none',
            },

            // Round
            {
                'rounded-full': props.shape === 'circle',
                'rounded-2xl': props.shape !== 'circle',
            },

            // Colors
            'bg-slate-200 dark:bg-surface-800',
        ],
    }),
}
