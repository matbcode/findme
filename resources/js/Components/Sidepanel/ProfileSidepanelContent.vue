<script setup>
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm.vue'
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm.vue'
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm.vue'
</script>

<template>
    <UpdateProfileInformationForm
        id="profile-info"
        formClass="grid grid-cols-1 gap-4 lg:grid-cols-2"
    />
    <UpdatePasswordForm id="password-update" />
    <DeleteUserForm id="delete-account" />
</template>
