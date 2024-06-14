import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useEventBusStore } from '@/Stores/eventBus'
import { useProjectsStore } from '@/Stores/projects'
import { useStatusesStore } from '@/Stores/statuses'
import { useChannelsStore } from '@/Stores/channels'
import { useGlobalStore } from '@/Stores'
import { useCampaignsStore } from '@/Stores/campaigns'
import { useUrlStore } from '@/Stores/url'

import { defaultViews, defaultFilters } from './defaults'
import { mapFilterItems } from './utils'

export const useCalendarStore = defineStore('calendar', () => {
    const store = useGlobalStore()
    const eventBus = useEventBusStore()
    const projectsStore = useProjectsStore()
    const statusesStore = useStatusesStore()
    const channelsStore = useChannelsStore()
    const campaignsStore = useCampaignsStore()
    const urlStore = useUrlStore()
    const { showCreateCampaignModal } = campaignsStore

    const calendarApi = ref(null)
    const filters = ref({})
    const sidebarElements = ref([
        {
            key: '0',
            id: 'filters',
            label: 'Calendar filters',
            icon: 'filter_list',
            items: filters,
        },
        {
            key: '3',
            id: 'events',
            label: 'Events',
            icon: 'event',
            items: [
                {
                    key: '3_0',
                    id: 'events-error',
                    label: 'Events with errors',
                    icon: 'error',
                },
                {
                    key: '3_1',
                    id: 'events-to-approve',
                    label: 'Events to approve',
                    icon: 'pending',
                },
                {
                    key: '3_1',
                    id: 'events-not-scheduled',
                    label: 'Events not scheduled',
                    icon: 'schedule',
                },
                {
                    key: '3_2',
                    id: 'events-released',
                    label: 'Events released',
                    icon: 'done',
                },
            ],
        },
        {
            key: '1',
            id: 'projects',
            label: 'Projects',
            icon: 'folder_open',
        },
        {
            key: '2',
            id: 'channels',
            label: 'Channels',
            icon: 'subscriptions',
        },
    ])
    const views = ref([...defaultViews])
    const date = ref(new Date('2023-12-23'))
    const view = ref('dayGridMonth')
    const isSidebarOpen = ref(false)
    const sidebarExpandedItems = ref([])
    const selectedCell = ref(null)
    const selectedEvent = ref(null)

    const isFiltered = computed(() => {
        return filters.value?.some((filter) => {
            return filter.items?.some((item) => {
                return item.checked && item.checked === false
            })
        })
    })

    const popupCalendarMode = computed(() => {
        if (view.value === 'dayGridMonth') {
            return 'month'
        } else if (view.value === 'listYear') {
            return 'year'
        } else {
            return 'date'
        }
    })

    function mapDefaultFilters() {
        filters.value = defaultFilters.map((filter) => {
            return {
                ...filter,
                ...mapFilterItems(filter, {
                    projects: projectsStore,
                    statuses: statusesStore,
                    channels: channelsStore,
                    events: campaignsStore,
                    showCreateCampaignModal,
                }),
            }
        })
    }

    function setCalendarApi(api) {
        calendarApi.value = api
    }

    function setSelectedCell(cell) {
        selectedCell.value = cell
    }

    function setSelectedEvent(event) {
        selectedEvent.value = event
    }

    function refresh() {
        if (!calendarApi.value) {
            return
        }

        calendarApi.value.removeAllEvents()
        calendarApi.value.addEventSource(store.feed)
    }

    function setDate(d) {
        date.value = d
        urlStore.setParam('date', d)
        urlStore.navigate()
    }

    function changeDate(d) {
        setDate(d)
    }

    function reload() {
        calendarApi.value.gotoDate(date.value)
    }

    function today() {
        calendarApi.value.today()
        setDate((date.value = calendarApi.value.getDate()))
    }

    function prev() {
        calendarApi.value.prev()
        setDate((date.value = calendarApi.value.getDate()))
    }

    function next() {
        calendarApi.value.next()
        setDate((date.value = calendarApi.value.getDate()))
    }

    function setView(viewInfo) {
        urlStore.setParam('view', viewInfo.value)
        urlStore.navigate()
    }

    function getView(id) {
        return views.value.find((view) => view.value === id)
    }

    function parseValuesFromUrl(params) {
        if (params.has('view')) {
            view.value = params.get('view')
            calendarApi.value.changeView(view.value)
        }
        if (params.has('date')) {
            date.value = new Date(params.get('date'))
            calendarApi.value.gotoDate(date.value)
        }
    }

    eventBus.urlEvent.listen(
        eventBus.URL_EVENTS.PARAMS_CHANGED,
        parseValuesFromUrl,
    )

    watch(
        filters,
        async () => {
            refresh()
        },
        { deep: true },
    )

    mapDefaultFilters()

    return {
        calendarApi,
        sidebarElements,
        filters,
        views,
        date,
        view,
        isSidebarOpen,
        sidebarExpandedItems,
        selectedCell,
        selectedEvent,
        isFiltered,
        popupCalendarMode,
        // feed,
        mapDefaultFilters,
        setCalendarApi,
        setSelectedCell,
        setSelectedEvent,
        refresh,
        changeDate,
        reload,
        today,
        prev,
        next,
        setView,
        getView,
    }
})
