<script setup>
import { onMounted, reactive, ref } from 'vue'

const card = ref(null)

const details = reactive({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null,
})

const stats = reactive({
    comments: 0,
    retweets: 0,
    likes: 0,
    bookmarks: 0,
})

const targetStats = {
    comments: 34682,
    retweets: 642,
    likes: 1246767,
    bookmarks: 324,
}

const texts = [
    'Centralise Your Social Media – Efficiently manage all your accounts and streamline your efforts with our all-in-one platform.',
    'Schedule with Ease – Plan, create, and schedule your posts across all platforms with our intuitive calendar. #calendar #planning',
    'Boost Engagement – Track engagement and performance metrics with our detailed analytics and reporting tools. #analytics #reports',
    'Seamless Collaboration – Invite team members and clients to collaborate without sharing credentials, ensuring secure account management.',
    'AI-Powered Efficiency – Use AI to generate content and streamline tasks, saving you time and boosting productivity. #ai #assistant',
    'Organise Your Content – Manage and organise all your media assets in one place with our user-friendly content library.',
]

const currentText = ref('')
let textIndex = 0
let charIndex = 0
let typing = true
let typingDelay = 30
let erasingDelay = 20
let newTextDelay = 2000

function typeText() {
    if (typing) {
        if (charIndex < texts[textIndex].length) {
            currentText.value += texts[textIndex].charAt(charIndex)
            charIndex++
            setTimeout(typeText, Math.floor(Math.random() * 150))
        } else {
            typing = false
            setTimeout(typeText, newTextDelay)
        }
    } else {
        if (charIndex > 0) {
            currentText.value = currentText.value.slice(0, charIndex - 1)
            charIndex--
            setTimeout(typeText, erasingDelay)
        } else {
            typing = true
            textIndex = (textIndex + 1) % texts.length
            setTimeout(typeText, typingDelay)
        }
    }
}

function handleMouseMove(e) {
    details.mouseX =
        e.pageX - card.value.offsetLeft - details.width / 2
    details.mouseY =
        e.pageY - card.value.offsetTop - details.height / 2
}

function handleMouseEnter() {
    clearTimeout(details.mouseLeaveDelay)
}

function handleMouseLeave() {
    details.mouseLeaveDelay = setTimeout(() => {
        details.mouseX = 0
        details.mouseY = 0
    }, 1000)
}

const mousePX = () => {
    return details.mouseX / details.width
}

const mousePY = () => {
    return details.mouseY / details.height
}

const cardStyle = () => {
    const rX = mousePX() * 5
    const rY = mousePY() * -5
    return `transform: rotateY(${rX}deg) rotateX(${rY}deg);`
}

const cardBgTransform = () => {
    const tX = mousePX() * -20
    const tY = mousePY() * -20
    return `transform: translate3d(${tX}px, ${tY}px, 0) scale(120%);`
}

const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num
}

const animateStats = (key, target) => {
    let interval = setInterval(() => {
        stats[key] += Math.ceil(target / 100)
        if (stats[key] >= target) {
            stats[key] = target
            clearInterval(interval)
        }
    }, 20)
}

onMounted(() => {
    details.width = card.value.offsetWidth
    details.height = card.value.offsetHeight

    animateStats('comments', targetStats.comments)
    animateStats('retweets', targetStats.retweets)
    animateStats('likes', targetStats.likes)
    animateStats('bookmarks', targetStats.bookmarks)

    setTimeout(typeText, newTextDelay) // Start typing animation
})
</script>

<template>
    <div
        ref="card"
        style="
            transform: perspective(800px);
            transform-style: preserve-3d;
        "
        @mousemove="handleMouseMove"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
    >
        <div
            class="flex flex-col gap-4 rounded-2xl bg-black p-6 shadow-md"
            :style="
                cardStyle() +
                `transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1); transform-origin: center;`
            "
        >
            <div class="flex flex-row items-center gap-3">
                <div
                    class="flex h-12 w-12 items-center justify-around rounded-full bg-gradient-to-b from-primary-600 to-indigo-800 text-2xl text-white"
                >
                    <img class="w-8" src="/assets/images/svg/raichi-v3-logo-white.svg" alt="Logo">
                    <img class="w-8 hidden" src="/assets/images/svg/raichi-v4-logo-white.svg" alt="Logo">
                </div>
                <div class="leading-tight text-white">
                    <p class="font-bold">raichi.io</p>
                    <p class="text-gray-500">@raichi.io</p>
                </div>
            </div>
            <div class="flex flex-col gap-3 text-white h-20">
                <p>{{ currentText }}</p>
            </div>
            <div class="relative h-56 overflow-hidden rounded-2xl">
                <video
                    autoplay
                    loop
                    muted
                    playsinline
                    class="pointer-events-none absolute box-content h-full w-full scale-125"
                    :style="
                        `transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1); transform-origin: center;` +
                        cardBgTransform()
                    "
                >
                    <source
                        src="/assets/videos/website1.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
            <div class="flex justify-between text-gray-500">
                <span
                    ><font-awesome-icon
                        class="translate-y-0.5 text-lg"
                        :icon="['far', 'comment']"
                    />
                    {{ formatNumber(stats.comments) }}</span
                >
                <span
                    ><font-awesome-icon
                        class="translate-y-0.5 text-lg"
                        :icon="['fas', 'retweet']"
                    />
                    {{ formatNumber(stats.retweets) }}</span
                >
                <span
                    ><font-awesome-icon
                        class="translate-y-0.5 text-lg text-red-600"
                        :icon="['fas', 'heart']"
                    />
                    {{ formatNumber(stats.likes) }}</span
                >
                <span
                    ><font-awesome-icon
                        class="translate-y-0.5 text-lg"
                        :icon="['far', 'bookmark']"
                    />
                    {{ formatNumber(stats.bookmarks) }}</span
                >
            </div>
        </div>
    </div>
</template>
