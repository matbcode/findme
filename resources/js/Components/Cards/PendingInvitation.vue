<script setup>
import Message from 'primevue/message'
import Button from 'primevue/button'
import { Link } from '@inertiajs/vue3'

const props = defineProps({
    invitations: Array,
})
</script>
<template>
    <div v-if="invitations.length">
        <Message
            v-for="invitation in invitations"
            severity="info"
            v-bind:key="invitation.id"
        >
            <div class="flex flex-row items-center gap-4">
                <p>
                    You have been invited to
                    <span class="font-bold">{{
                        invitation.workspace.name
                    }}</span>
                </p>
                <Link
                    :href="
                        route('workspace.attach', {
                            slug: invitation.workspace.slug,
                            invitation: invitation.id,
                        })
                    "
                >
                    <Button label="Accept" size="small" />
                </Link>
            </div>
        </Message>
    </div>
</template>
