import { defineStore } from 'pinia'
import cookie from 'js-cookie'

export const useAuthStore = defineStore('auth', {
    state: () => ({ user: null, isLoggedIn: false }),
    getters: {
        getUser: (state) => state.user,
        getIsLoggedIn: (state) => state.isLoggedIn,
    },
    actions: {
        async register({ name, email, password, password_confirmation }: { name: string; email: string; password: string; password_confirmation: string }) {
            return $fetch('http://laravel.test/api/auth/register', {
                method: 'post',
                body: { name, email, password, password_confirmation },
            })
        },
        async login({ email, password }: { email: string; password: string }) {
            const response: { token: string } = await $fetch('http://laravel.test/api/auth/login', {
                method: 'post',
                body: { email, password },
            })
            cookie.set('token', `Bearer ${response.token}`)
        },
        async getMe() {
            const token = cookie.get('token')

            if (!token) return

            this.user = await $fetch('http://laravel.test/api/auth/index', {
                headers: {
                    Authorization: token,
                },
            })
        },
    },
})
