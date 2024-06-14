// import { watch } from 'vue'
// import { useGlobalStore } from '@/Stores'

/**
 * Watch for changes in the user's theme and update the HTML class
 */
export function useTheme() {
    // const store = useGlobalStore()
    // function getTheme() {
    //     if (
    //         window.matchMedia &&
    //         window.matchMedia('(prefers-color-scheme:dark)').matches
    //     ) {
    //         return 'dark'
    //     } else {
    //         return 'light'
    //     }
    // }
    // watch(
    //     () => store.user.theme,
    //     (theme) => {
    //         const htmlClass =
    //             theme === 'dark' ||
    //             (theme !== 'light' && getTheme() === 'dark')
    //                 ? 'dark bg-gradient-to-b from-surface-950 to-surface-950 text-surface-50'
    //                 : 'bg-gradient-to-b from-surface-50 to-surface-50 text-surface-900'
    //         document.documentElement.setAttribute('class', htmlClass)
    //     },
    //     {
    //         immediate: true,
    //     },
    // )
}
