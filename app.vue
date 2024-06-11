<script setup lang="ts">
import { useAuthStore } from '~/store/useAuthStore'

const { register, login, getMe } = useAuthStore()
await useAsyncData('users', () => getMe())

const user = useUser()

const handleRegister = async () => {
    try {
        await register({ name: 'Tige', email: 'tige@teste.com', password: 'password', password_confirmation: 'password' })
    } catch (err) {
        console.log('err', err)
    }
}

const handleLogin = async () => {
    try {
        await login({ email: 'cpdrenato@gmail.com', password: 'password' })
        await getMe()
    } catch (err) {
        console.log('err', err)
    }
}
</script>

<template>
    <div>
        <button @click="handleRegister">Register</button>
        <button @click="handleLogin">Login</button>
        <span>{{ user && user.email }}</span>
    </div>
</template>
