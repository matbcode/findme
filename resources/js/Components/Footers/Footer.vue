<script setup>
import { Link, usePage } from '@inertiajs/vue3'
</script>
<template>
    <footer
        class="mx-auto h-full w-full border-t border-surface-100 text-xs font-light text-surface-300 dark:border-surface-800 dark:text-surface-300"
    >
        <div
            class="mx-auto flex w-full items-center justify-between px-4 py-3"
        >
            <div class="">
                <span class="font-medium">
                    Copyright © 2024 NeonByte Ltd
                </span>
                All rights reserved.
            </div>
            <div class="">
                <Link
                    href="/privacy-policy"
                    class="hover:text-surface-500 hover:underline"
                    >Privacy Policy</Link
                >
                |
                <Link
                    href="/terms-and-conditions"
                    class="hover:text-surface-500 hover:underline"
                    >Terms and conditions</Link
                >
                |
                <Link
                    href="/cookie-policy"
                    class="hover:text-surface-500 hover:underline"
                    >Cookie Policy</Link
                >
            </div>
        </div>
    </footer>
</template>
