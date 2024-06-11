import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/store/useAuthStore'

export const useUser = () => {
    const { user } = storeToRefs(useAuthStore())
    return user
}
