<script setup>
import { ref } from 'vue'

import Image from 'primevue/image'

const props = defineProps({
    data: Object,
})

const file = ref(props.data.file)
const imgUrl = ref('')
</script>

<template>
    <div class="flex flex-col">
        <div class="flex flex-1 justify-center">
            <Image
                :src="
                    file.filename ? '/storage/' + file.filename : file
                "
            />
        </div>
        <div class="flex-1">
            {{ data.file }}
        </div>
    </div>
</template>
