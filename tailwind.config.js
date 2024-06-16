import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import container from '@tailwindcss/container-queries'

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class', "[class~='dark']"],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{vue,js}',
        './node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}',
    ],

    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: '100ch', // add required value here
                    },
                },
            },
            fontSize: {
                // xs: ['1px', '1rem'],
                // sm: ['1px', '20px'],
                base: ['15px', '24px'],
                // lg: ['2px', '28px'],
                // xl: ['2px', '32px'],
                // '2xl': ['4px', '32px'],
                // '3xl': ['4px', '40px'],
                // '4xl': ['6px', '48px'],
                // '5xl': ['8px', '56px'],
                // '6xl': ['12px', '64px'],
                // '7xl': ['16px', '72px'],
            },
            borderRadius: {
                md: '8px',
            },
            boxShadow: {
                md: 'rgba(0, 0, 0, 0.06) 0px 1px 3px, rgba(0, 0, 0, 0.12) 0px 1px 2px',
                extreme: 'rgba(0,0,0,0.1) 0px 32px 55px ',
            },
            backgroundImage: {
                'gradient-radial':
                    'radial-gradient(var(--tw-gradient-stops))',
            },
            fontFamily: {
                sans: ['Kanit', ...defaultTheme.fontFamily.sans],
                // sans: ['"Exo 2"', ...defaultTheme.fontFamily.sans],
            },
            backdropBlur: {
                xs: '2px',
            },
            dropShadow: {
                extreme: '0px 64px 25px rgba(0,0,0,0.1)',
            },
            screens: {
                '3xl': '1920px',
                '4xl': '2560px',
                '5xl': '3840px',
            },
            colors: {
                surface: {
                    50: '#F6F7F8',
                    100: '#DFE1E7',
                    200: '#B0B5C4',
                    300: '#818AA2',
                    400: '#596178',
                    500: '#363B49',
                    600: '#2B2F3B',
                    700: '#21242C',
                    800: '#16181D',
                    900: '#0B0C0F',
                    950: '#050607',
                },
                primary: {
                    50: '#f6f9fb',
                    100: '#e3f0fd',
                    200: '#c5d9fa',
                    300: '#9db5f3',
                    400: '#798eea',
                    500: '#6269e3',
                    600: '#514dd6',
                    700: '#3e39b6',
                    800: '#2b2788',
                    900: '#181956',
                },
                orange: {
                    50: '#FFF5F0',
                    100: '#FFEBE0',
                    200: '#FFD6C2',
                    300: '#FFBB99',
                    400: '#FF9966',
                    500: '#FF681F',
                    600: '#F55200',
                    700: '#D64700',
                    800: '#B33B00',
                    900: '#802A00',
                    950: '#571D00',
                },
            },
            keyframes: {
                alert: {
                    '0%': {
                        transform: 'scale3d(1, 1, 1)',
                    },
                    '30%': {
                        transform: 'scale3d(1.05, 0.95, 1)',
                    },
                    '40%': {
                        transform: 'scale3d(0.95, 1.05, 1)',
                    },
                    '50%': {
                        transform: 'scale3d(1.025, 0.975, 1)',
                    },
                    '65%': {
                        transform: 'scale3d(0.975, 1.025, 1)',
                    },
                    '75%': {
                        transform: 'scale3d(1.025, 0.975, 1)',
                    },
                    '100%': {
                        transform: 'scale3d(1, 1, 1)',
                    },
                },
                pending: {
                    '0%': {
                        transform: 'translateY(0)',
                        opacity: 1,
                    },
                    '50%': {
                        transform: 'translateY(-1px)',
                        opacity: 0.8,
                    },
                    '100%': {
                        transform: 'translateY(0)',
                        opacity: 1,
                    },
                },
                enter: {
                    '0%': {
                        '-webkit-transform': 'translateY(-1000px)',
                        transform: 'translateY(-1000px)',
                        opacity: 0,
                    },
                    '100%': {
                        '-webkit-transform': 'translateY(0)',
                        transform: 'translateY(0)',
                        opacity: 1,
                    },
                },
            },
            animation: {
                'pulse-pending': 'pending 4s ease-in-out infinite',
                'pulse-alert':
                    'alert 2s ease-in-out 0s infinite normal none',
                'wobble-enter':
                    'alert 0s ease-in-out 0s 1 normal none',
                enter: 'enter 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.0s both;',
            },
        },
    },

    plugins: [forms, typography, container],
}
