<script setup>
import Logo from '@/Components/Navbar/Logo.vue'
</script>

<template>
    <div
        class="flex gap-2 bg-white p-3 text-sm text-surface-400 sm:rounded-b-2xl sm:p-4"
    >
        <div class="flex flex-col gap-3">
            <Logo width="125px" black />

            <!-- A social platform for sharing, connecting, and celebrating
            the creativity and insights of diverse thinkers. -->

            <div class="text-xs">
                <span class="font-medium">
                    Copyright © 2024 NeonByte Ltd
                </span>
                All rights reserved.
            </div>
        </div>
    </div>
</template>
