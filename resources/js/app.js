import './bootstrap'
import '../css/app.css'

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import Lara from '@/PrimeVuePresets/lara'
import Ripple from 'primevue/ripple'
import Tooltip from 'primevue/tooltip'
import VueSanitize from 'vue-sanitize-directive'
import { CircleStencil, Cropper } from 'vue-advanced-cropper'
import { GesturePlugin } from '@vueuse/gesture'
import { dragDirective } from '@vueuse/gesture'
import 'vue-advanced-cropper/dist/style.css'

import 'primeicons/primeicons.css'
import 'material-icons/iconfont/filled.css'
import 'material-icons/iconfont/outlined.css'

// prepare fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import {
    faGoogleDrive,
    faGoogle,
    faInstagram,
    faFacebook,
    faXTwitter,
    faMeta,
    faMicrosoft,
    faApple,
    faTiktok,
    faDiscord,
    faYoutube,
    faLinkedin,
    faSlack,
    faSnapchat,
    faUnsplash,
} from '@fortawesome/free-brands-svg-icons'
library.add(
    fas,
    far,
    faGoogle,
    faGoogleDrive,
    faInstagram,
    faFacebook,
    faXTwitter,
    faMeta,
    faMicrosoft,
    faApple,
    faTiktok,
    faDiscord,
    faYoutube,
    faLinkedin,
    faSlack,
    faSnapchat,
    faUnsplash,
)

// prepare translations
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import pl from '@/locales/pl.json'

import MainLayout from '@/Layouts/MainLayout.vue'

const pinia = createPinia()

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        pl,
    },
})

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        return (
            createApp({ render: () => h(App, props) })
                .use(PrimeVue, {
                    unstyled: true,
                    pt: Lara,
                    ripple: true,
                })
                .directive('tooltip', Tooltip)
                .directive('ripple', Ripple)
                // .directive('drag', dragDirective)
                .directive('translate', {
                    beforeMount: (el, binding, vnode, prevVnode) => {
                        // el.textContent = binding.value
                    },
                })
                .use(plugin)
                .use(ZiggyVue, Ziggy)
                .use(ToastService)
                .use(DialogService)
                .use(i18n)
                .use(pinia)
                .use(GesturePlugin)
                .use(VueSanitize)
                .component('font-awesome-icon', FontAwesomeIcon)
                .component('Cropper', Cropper)
                .component('CircleStencil', CircleStencil)
                .mount(el)
        )
    },
    progress: {
        color: '#4B5563',
    },
})
