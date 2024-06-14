import { defineStore } from 'pinia'

import { useCookies } from "vue3-cookies";

const userCookieName = "user";

export const useCookiesStore = defineStore('cookies', () => {
    const { cookies } = useCookies();

    if (!cookies.get(userCookieName)) {
        cookies.set(userCookieName, {}, {
            expires: "1y",
            secure: true,
            sameSite: "None",
        });
    }

    function getUserCookie(key) {
        const userCookie = cookies.get(userCookieName);

        if (key) {
            return userCookie[key];
        }

        return userCookie;
    }

    function setUserCookie(key, value) {
        const userCookie = getUserCookie();
        const cookieValue = {
            ...userCookie,
            [key]: value,
        }
        cookies.set(userCookieName, cookieValue);
    }

    return {
        getUserCookie,
        setUserCookie,
    }
})