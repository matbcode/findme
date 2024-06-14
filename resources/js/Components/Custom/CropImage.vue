<script setup>
import { ref, computed } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { useGlobalStore } from '@/Stores'
import axios from 'axios'

import FileUpload from 'primevue/fileupload'
import SelectButton from 'primevue/selectbutton'

import CustomButton from '@/Components/Custom/CustomButton.vue'

const store = useGlobalStore()
const { closeDialog } = store.modals

const emit = defineEmits(['imageCreated'])

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
})

const image = ref(props.data.image || null)
const cropper = ref(null)
const imgInfo = ref(null)

const aspectRatios = ref([
    { label: 'Free', value: null },
    { label: '1:1', value: 1 / 1 },
    { label: '2:1', value: 2 / 1 },
    { label: '3:4', value: 3 / 4 },
    { label: '5:4', value: 5 / 4 },
    { label: '16:9', value: 16 / 9 },
])

const onSelectImage = (e) => {
    const src = e.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(src)

    reader.onload = (e) => {
        image.value = e.target.result
    }
}

const resetImage = () => {
    image.value = null
    imgInfo.value = null
}

const uploadImage = () => {
    const { canvas } = cropper.value.getResult()

    if (canvas) {
        if (props.data.axiosForm) {
            canvas.toBlob((blob) => {
                let file = new File([blob], 'avatar.jpg', {
                    type: 'image/jpeg',
                })

                axios
                    .post(
                        props.data.route || route('profile.image'),
                        {
                            ...props.data.axiosForm,
                            file,
                        },
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        },
                    )
                    .then((response) => {
                        console.log('Success', response.data)
                        emit('imageCreated', response.data)

                        closeDialog()
                    })
                    .catch((error) => {
                        console.log('Error', error.response.data)
                    })
            }, 'image/jpeg')
        } else {
            const form = useForm(props.data.form || { image: null })

            canvas.toBlob((blob) => {
                let file = new File([blob], 'avatar.jpg', {
                    type: 'image/jpeg',
                })

                form[props.data.formKey || 'image'] = file
                form.post(
                    props.data.route || route('profile.image'),
                    {
                        preserveScroll: false,
                        preserveState: false,
                        onSuccess: () => {
                            console.log('Success')
                        },
                        onError: () => {
                            console.log('Error')
                        },
                    },
                )
                emit('imageCreated', canvas.toDataURL('image/jpeg'))
                closeDialog()
            }, 'image/jpeg')
        }
    }
}

const onChange = ({ coordinates, image }) => {
    console.log(coordinates, image)
    imgInfo.value = coordinates
}

const onSetAspectRatio = (aspectRatio) => {
    console.log(aspectRatio, aspectRatio)
    if (!props.data['stencil-props']) {
        props.data['stencil-props'] = {}
    }

    props.data['stencil-props'].aspectRatio = aspectRatio.value
    // localData.value["stencil-props"].aspectRatio = aspectRatio;
    cropper.value.refresh()
}
</script>
<template>
    <div
        class="flex w-[512px] flex-col items-center justify-center p-8"
    >
        <FileUpload
            v-if="!image"
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            @select="onSelectImage"
        />

        <div v-if="image" class="my-4 flex flex-col gap-2">
            <div class="flex">
                <SelectButton
                    :options="aspectRatios"
                    optionValue="value"
                    optionLabel="label"
                    @change="onSetAspectRatio"
                />
            </div>
        </div>

        <Cropper
            v-if="image"
            ref="cropper"
            :src="image"
            v-bind="data"
            @change="onChange"
        />

        <div v-if="image" class="mt-4 flex gap-2">
            <div class="text-center">
                {{ imgInfo?.width }} x {{ imgInfo?.height }}
            </div>
            <CustomButton
                label="Remove"
                text
                icon="cancel"
                rounded
                @click="resetImage"
            />
            <CustomButton
                label="Upload"
                text
                icon="check"
                rounded
                @click="uploadImage"
            />
        </div>
    </div>
</template>
