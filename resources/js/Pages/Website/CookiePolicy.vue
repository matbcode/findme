<script setup>
import WebsiteLayout from '@/Layouts/WebsiteLayout.vue'

defineOptions({ layout: WebsiteLayout })
</script>

<template>
    <div
        class="mx-auto max-w-6xl rounded-lg py-32 text-surface-100 shadow-lg"
    >
        <h1 class="mb-4 text-3xl font-bold">Cookie Policy</h1>

        <p class="mb-6">
            At Raichi.io, a product by NeonByte Ltd, we only use
            strictly necessary first-party cookies to provide
            essential functionalities on our platform. This Cookie
            Policy outlines which cookies we use, why we use them, and
            your options for managing these cookies.
        </p>

        <h2 class="mb-3 text-2xl font-semibold">
            1. What are Cookies?
        </h2>
        <ol class="mb-6 list-inside list-decimal">
            <li>
                Cookies are small text files that are stored on your
                device when you visit a website. They help us
                understand how you interact with our platform and are
                essential for maintaining user sessions and security.
            </li>
        </ol>

        <h2 class="mb-3 text-2xl font-semibold">
            2. Types of Cookies We Use
        </h2>
        <ol class="mb-6 list-inside list-decimal">
            <li>
                <strong
                    >Strictly Necessary First-Party Cookies:</strong
                >
                These are cookies set directly by Raichi.io and are
                essential for the basic operation of the platform.
                These include:
                <ol class="ml-6 list-inside list-decimal">
                    <li>
                        <strong>XSRF-TOKEN:</strong> A security cookie
                        used to prevent cross-site request forgery
                        attacks.
                    </li>
                    <li>
                        <strong>user:</strong> A cookie that stores
                        your user information to keep you logged in
                        across sessions.
                    </li>
                    <li>
                        <strong>raichi_session:</strong> A session
                        management cookie to maintain your current
                        session while using Raichi.io.
                    </li>
                </ol>
            </li>
        </ol>

        <h2 class="mb-3 text-2xl font-semibold">
            3. Why We Use Cookies
        </h2>
        <ol class="mb-6 list-inside list-decimal">
            <li>
                To maintain your logged-in status across sessions.
            </li>
            <li>
                To ensure security and protect your data from
                potential threats like cross-site request forgery
                attacks.
            </li>
            <li>
                To manage your session and ensure seamless navigation
                and operation of the platform.
            </li>
        </ol>

        <h2 class="mb-3 text-2xl font-semibold">
            4. Managing Cookies
        </h2>
        <ol class="mb-6 list-inside list-decimal">
            <li>
                Since these cookies are strictly necessary for the
                operation of Raichi.io, disabling them may
                significantly affect the functionality of the
                platform.
            </li>
            <li>
                If you wish to manage these cookies, you can adjust
                your browser settings to block or delete them, but
                please note that this may result in the inability to
                use some parts of Raichi.io effectively.
            </li>
        </ol>

        <h2 class="mb-3 text-2xl font-semibold">
            5. Changes to This Policy
        </h2>
        <ol class="mb-6 list-inside list-decimal">
            <li>
                We may update this Cookie Policy periodically to
                reflect changes in our practices. We will notify you
                of any significant changes, and your continued use of
                Raichi.io after such changes constitutes acceptance of
                the new policy.
            </li>
        </ol>

        <h2 class="mb-3 text-2xl font-semibold">
            6. Contact Information
        </h2>
        <ol class="mb-6 list-inside list-decimal">
            <li>
                If you have any questions or concerns about this
                Cookie Policy or our use of cookies, please contact
                NeonByte Ltd at [your contact information].
            </li>
        </ol>

        <p class="mt-6">
            By using Raichi.io, you acknowledge that you have read and
            understood this Cookie Policy and agree to how we use
            cookies.
        </p>
    </div>
</template>
