<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/Stores'

import Button from 'primevue/button'
import OverlayPanel from 'primevue/overlaypanel'
import Calendar from 'primevue/calendar'
import InputGroup from 'primevue/inputgroup'

import CalendarHeaderNewEventButton from '@/Components/Calendar/CalendarHeaderNewEventButton.vue'

const store = useGlobalStore()

const { date, popupCalendarMode } = storeToRefs(store.calendar)
const { prev, next, today, changeDate } = store.calendar

const emit = defineEmits([
    'onPrev',
    'onNext',
    'onToday',
    'onDateChanged',
])
const { t } = useI18n({})

const calendarPanel = ref(null)

const toggleCalendar = (event) => {
    calendarPanel.value.toggle(event)
}
</script>

<template>
    <div class="flex gap-4">
        <InputGroup class="max-w-min rounded-2xl shadow-sm">
            <Button
                label=""
                icon="pi pi-chevron-left"
                severity="secondary"
                text
                @click="prev"
            />
            <Button
                :label="
                    date.toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                    })
                "
                severity="secondary"
                text
                @click="toggleCalendar"
            />
            <OverlayPanel ref="calendarPanel" class="p-0">
                <Calendar
                    v-model="date"
                    :view="popupCalendarMode"
                    dateFormat="MM yy"
                    :showWeek="true"
                    inline
                    @date-select="changeDate"
                />
            </OverlayPanel>
            <Button
                label="Today"
                severity="secondary"
                text
                @click="today"
            />
            <Button
                label=""
                iconPos="right"
                icon="pi pi-chevron-right"
                text
                severity="secondary"
                @click="next"
            />
        </InputGroup>
        <!-- <CalendarHeaderNewEventButton /> -->
    </div>
</template>
