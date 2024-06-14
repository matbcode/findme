<script setup>
import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue'
import { router } from '@inertiajs/vue3'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/Stores'

import dayGridPlugin from '@fullcalendar/daygrid'
import listGridPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import allLocales from '@fullcalendar/core/locales-all'
import BlockUI from 'primevue/blockui'

import FullCalendar from '@fullcalendar/vue3'

import { getCurrentDateOffset } from '@/Components/Calendar/Utils/utils'

import CalendarHeader from '@/Components/Calendar/CalendarHeader.vue'
import CalendarEvent from '@/Components/Calendar/CalendarEvent.vue'
import WideWrapper from '@/Components/PageWrappers/WideWrapper.vue'
import CalendarSidebar from '@/Components/Calendar/CalendarSidebar.vue'
import Spinner from '@/Components/Custom/Spinner.vue'

const props = defineProps({
    currentWorkspace: Object,
})

const fullCalendar = ref(null)

const store = useGlobalStore()
const { calendarApi, view, selectedCell, selectedEvent } =
    storeToRefs(store.calendar)
const {
    setCalendarApi,
    setSelectedCell,
    setSelectedEvent,
    getView,
    changeDate,
    setView,
} = store.calendar
const { showDialog, showContextMenu } = store.modals
const { showCreateCampaignModal } = store.campaigns

const selectCell = (arg) => {
    const selected = document.querySelector('.fc-selected')
    if (selected) {
        selected.classList.remove('fc-selected')
    }

    arg.el.classList.add('fc-selected')
}

const onCellClick = (arg) => {
    selectCell(arg)
    setSelectedCell(arg)
}

const onCellDoubleClick = () => {
    changeDate(selectedCell.value.date)
    const view = getView('timeGrid')
    setView(view)
}

const onCellRightClick = (event, arg) => {
    selectCell(arg)
    setSelectedCell(arg)
    showContextMenu({
        event,
        items: [
            {
                label: 'New event',
                icon: 'pi pi-fw pi-plus',
                items: store.projects.collection.map((project) => ({
                    label: project.name,
                    command: () =>
                        showCreateCampaignModal({
                            project,
                            date: selectedCell.value.isToday
                                ? getCurrentDateOffset(60)
                                : selectedCell.value.date,
                        }),
                })),
                visible: () => {
                    return (
                        selectedCell.value &&
                        !selectedCell.value.isPast
                    )
                },
            },
            {
                label: 'Day view',
                icon: 'pi pi-fw pi-calendar',
                shortcut: '⌘+D',
                command: () => {
                    changeDate(selectedCell.value.date)
                    const view = getView('timeGrid')
                    setView(view)
                },
            },
        ],
        events: {
            blur: onContextMenuHide,
        },
    })
}

const onEventRightClick = (event, arg) => {
    setSelectedEvent(arg.event)
    showContextMenu({
        event,
        items: [
            {
                label: 'Change Status',
                items: store.statuses.collection.map((status) => ({
                    id: status.id,
                    label: status.title,
                    icon: status.icon,
                    command: (arg) => {
                        //! TODO Update event in the database
                    },
                })),
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                command: () => {
                    router.visit(
                        route('event.edit', {
                            slug: props.currentWorkspace.slug,
                            project:
                                selectedEvent.value.extendedProps
                                    .project_id,
                            event: selectedEvent.value.id,
                        }),
                    )
                },
            },
        ],
        events: {
            blur: onContextMenuHide,
        },
    })
}

const onContextMenuHide = () => {
    const selected = document.querySelector('.fc-selected')
    if (selected) {
        selected.classList.remove('fc-selected')
    }
}

onMounted(() => {
    resizeObserver.observe(
        document.querySelector('.calendar-wrapper'),
    )
    setCalendarApi(fullCalendar.value.getApi())
})

const resizeObserver = new ResizeObserver((entries) => {
    calendarApi.value.updateSize()
})

onBeforeUnmount(() => {
    resizeObserver.disconnect()
})

const isLoading = ref(false)

const calendarConfig = {
    plugins: [
        dayGridPlugin,
        timeGridPlugin,
        listGridPlugin,
        interactionPlugin,
    ],
    events: store.feed,
    headerToolbar: null,
    editable: true,
    eventColor: 'transparent',
    nowIndicator: true,
    locales: allLocales,
    locale: store.user.locale,
    initialView: view.value,
    height: window.innerHeight - 182,
    timeZone: store.user.timezone,
    dayMaxEventRows: 2,
    nextDayThreshold: '10:00:00',
    // now: getCurrentDateInTimezone(),
    // TODO: Enable loading in the future
    loading: (val) => {
        isLoading.value = val
    },
    windowResize: (arg) => {
        calendarApi.value.setOption(
            'height',
            window.innerHeight - 138,
        )
    },
    //TODO: Add event click component
    // eventClick: (info) => {
    //     showDialog(
    //         markRaw(EventModal),
    //         {
    //             header: info.event.title,
    //             modal: true,
    //             draggable: false,
    //         },
    //         { data: info.event },
    //     )
    // },
    eventDrop: (info) => {
        //! TODO Update event in the database
    },
    dayCellDidMount: (arg) => {
        const cell = arg.el
        cell.addEventListener('contextmenu', (event) => {
            onCellRightClick(event, arg)
        })
        cell.addEventListener('click', () => {
            onCellClick(arg)
        })
        cell.addEventListener('dblclick', () => {
            onCellDoubleClick(arg)
        })
    },
    dayCellWillUnmount: (arg) => {
        const cell = arg.el
        cell.removeEventListener('contextmenu', (event) => {
            onCellRightClick(event, arg)
        })
        cell.removeEventListener('click', () => {
            onCellClick(arg)
        })
        cell.removeEventListener('dblclick', () => {
            onCellDoubleClick(arg)
        })
    },
    eventDidMount: (arg) => {
        const event = arg.el
        event.addEventListener('contextmenu', (event) => {
            onEventRightClick(event, arg)
        })
    },
    eventWillUnmount: (arg) => {
        const event = arg.el
        event.removeEventListener('contextmenu', (event) => {
            onEventRightClick(event, arg)
        })
    },
}
</script>

<template>
    <BlockUI :blocked="store.campaigns.isFetching || isLoading">
        <div class="flex flex-col gap-4">
            <CalendarHeader />
            <div
                class="calendar-wrapper relative w-full rounded-2xl shadow-sm"
            >
                <Spinner
                    v-if="store.campaigns.isFetching || isLoading"
                />

                <FullCalendar
                    class="relative w-full rounded-2xl"
                    ref="fullCalendar"
                    :options="calendarConfig"
                >
                    <template v-slot:eventContent="{ event }">
                        <CalendarEvent :event />
                    </template>
                </FullCalendar>
            </div>
        </div>
    </BlockUI>
</template>
