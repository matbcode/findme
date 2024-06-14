import { ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { defineStore } from 'pinia'

import { useEventBusStore } from '@/Stores/eventBus'
import { useCookiesStore } from '@/Stores/cookies'
import { use } from 'i18next'

export const useUrlStore = defineStore('url', () => {
    const eventBus = useEventBusStore()
    const cookies = useCookiesStore()

    /**
     * Get current URL parameters
     */
    const params = ref(new URLSearchParams(window.location.search))
    const page = ref(router.page.component)
    const currentContext = ref(null)
    const goBackPageInfo = ref(null)

    const navbarPrependAction = ref(null)
    const navbarAppendAction = ref(null)

    function setNavbarPrependAction(action) {
        navbarPrependAction.value = action
    }

    function setNavbarAppendAction(props, events) {
        navbarAppendAction.value = {
            props,
            events,
        }
    }

    function setGoBackPage() {
        goBackPageInfo.value = usePage().props.ziggy.location
        cookies.setUserCookie('goBackPage', goBackPageInfo.value)
    }

    function goBackPage() {
        if (!goBackPageInfo.value) {
            goBackPageInfo.value = cookies.getUserCookie('goBackPage')
        }
        console.log('goBack', goBackPageInfo.value)
        if (goBackPageInfo.value) {
            router.visit(goBackPageInfo.value)
        } else {
            router.visit(route('dashboard'))
        }
        cookies.setUserCookie('goBackPage', null)
    }

    /**
     * Get a single parameter from the URL
     *
     * @param {string} key
     * @returns {string}
     */
    function getParam(key) {
        return params.value.get(key)
    }

    /**
     * Set a single parameter in the URL
     *
     * @param {string} key
     * @param {string} value
     * @returns {void}
     */
    function setParam(key, value) {
        params.value.set(key, value)
    }

    /**
     * Set multiple parameters in the URL
     *
     * @param {Array} params
     * @returns {void}
     * @example
     */
    function setParams(params) {
        for (const [key, value] of params) {
            setParam(key, value)
        }
    }

    /**
     * Delete a single parameter from the URL
     *
     * @param {string} key
     * @returns {void}
     */
    function deleteParam(key) {
        params.value.delete(key)
    }

    /**
     * Update the params value
     *
     * @returns {void}
     */
    function updateParams() {
        params.value = new URLSearchParams(window.location.search)
    }

    /**
     * Navigate to the current URL with the updated parameters
     *
     * @returns {void}
     */
    function navigate() {
        const currentLocation = router.page.props.ziggy.location
        const query = params.value.toString()
        const url = currentLocation + '?' + query

        router.visit(url)
    }

    /**
     * Listen for URL changes and emit url event
     */
    router.on('navigate', () => {
        updateParams()
        page.value = router.page.component

        const decodeUrl = () => {
            const url = router.page.url.split('/')
            const current = {}
            for (let i = 1; i < url.length; i += 2) {
                current[url[i].split('?')[0]] = url[i + 1] || true
            }
            currentContext.value = current

            return {
                ...router.page,
                props: usePage().props,
                splitUrl: url,
                current,
            }
        }

        eventBus.urlEvent.emit(
            eventBus.URL_EVENTS.PARAMS_CHANGED,
            params.value,
        )
        eventBus.urlEvent.emit(
            eventBus.URL_EVENTS.CHANGE,
            decodeUrl(),
        )
    })

    /**
     * Listen for popstate event and reload the page
     * It caused by changes not being detected by the router
     */
    window.addEventListener('popstate', () => {
        router.reload()
    })

    return {
        page,
        currentContext,
        params,
        navbarPrependAction,
        navbarAppendAction,
        goBackPageInfo,
        setGoBackPage,
        goBackPage,
        setNavbarPrependAction,
        setNavbarAppendAction,
        getParam,
        setParam,
        setParams,
        deleteParam,
        updateParams,
        navigate,
    }
})
