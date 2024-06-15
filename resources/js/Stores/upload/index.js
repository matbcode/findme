import { markRaw } from 'vue'
import { defineStore } from 'pinia'
import { useModalsStore } from '@/Stores/modals'

import CropImage from '@/Components/Custom/CropImage.vue'

export const useUploadStore = defineStore('upload', () => {
    const modals = useModalsStore()

    const { showDialog } = modals

    function showAvatarUploadModal(id) {
        showDialog(
            markRaw(CropImage),
            {
                header: 'Upload avatar',
                modal: true,
                draggable: false,
            },
            {
                data: {
                    'stencil-component': 'circle-stencil',
                    canvas: {
                        height: 300,
                        width: 300,
                    },
                    // image,
                    id,
                },
            },
        )
    }

    return {
        showAvatarUploadModal,
    }
})
