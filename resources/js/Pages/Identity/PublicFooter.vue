<script setup>
import Logo from '@/Components/Navbar/Logo.vue'
</script>

<template>
    <div
        class="flex gap-2 bg-surface-100 p-3 text-sm text-surface-800 sm:rounded-b-2xl sm:p-4"
    >
        <div class="flex gap-3">
            <Logo
                width="125px"
                height="75px"
                classes="text-surface-500"
            />

            <div class="flex flex-col justify-center gap-1 text-sm">
                A social platform for sharing, connecting, and
                celebrating the creativity and insights of diverse
                thinkers.

                <div class="text-xs">
                    <span class="font-medium">
                        Copyright © 2024 NeonByte Ltd
                    </span>
                    All rights reserved.
                </div>
            </div>
        </div>
    </div>
</template>
