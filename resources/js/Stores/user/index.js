import { ref, computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { defineStore } from 'pinia'
import { useWorkspacesStore } from '../workspaces'
import axios from 'axios'

import { defaultTimezones, defaultLocales } from './defaults'

export const timezonesList = defaultTimezones.map((tz) => ({
    id: tz.abbr,
    label: tz.text,
    offset: tz.offset,
    utc: tz.utc,
}))

const page = usePage()

export const useUserStore = defineStore('user', () => {
    const workspacesStore = useWorkspacesStore()
    const info = computed(() => page.props.auth.user)
    const isLogged = computed(() => !!info.value)

    const users = ref({
        data: [],
        loading: true,
    })

    const timezones = ref(timezonesList)
    const locales = ref(defaultLocales)
    const timezone = ref(
        page.props?.auth?.user?.timezone || getDefaultTimezone,
    )
    const locale = ref(page.props?.auth?.user?.locale || 'en-GB')
    const localTimezoneName = ref(
        Intl.DateTimeFormat().resolvedOptions().timeZone,
    )

    //TODO! temporary solution, will be replaced in the future
    const isWideWrapperExpanded = ref(false)

    const theme = computed(
        () => page.props?.auth?.user?.theme || null,
    )

    async function fetchUsers() {
        axios
            .get(
                route('workspace.retrieve-users', {
                    slug: workspacesStore.current.slug,
                }),
            )
            .then((response) => {
                users.value = {
                    data: response.data,
                    loading: false,
                }
            })
    }

    function getUserById(id) {
        if (!users.value.data.length) {
            fetchUsers()
        }

        return users.value.data.find((user) => user.id === id)
    }

    function getDefaultTimezone() {
        let response
        timezones.value.forEach((tz) => {
            if (tz.utc.includes(localTimezoneName.value)) {
                response = tz
            }
        })
        return response
    }

    function getTimezone(timezone) {
        return timezones.value.find((tz) => tz.id === timezone)
    }

    function getCurrentDateInTimezone(timeZone = timezone.value) {
        return new Date(new Date().toLocaleString('en', { timeZone }))
    }

    function getFormattedDate(
        date,
        format = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        },
    ) {
        return date
            ? new Date(date).toLocaleDateString(locale.value, format)
            : null
    }

    return {
        users,
        info,
        isLogged,
        timezones,
        locales,
        locale,
        timezone,
        theme,
        isWideWrapperExpanded,
        fetchUsers,
        getUserById,
        getDefaultTimezone,
        getTimezone,
        getCurrentDateInTimezone,
        getFormattedDate,
    }
})
