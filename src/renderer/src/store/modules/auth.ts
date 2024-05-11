import type { IAuth } from 'store-types'

const useAuthStore = defineStore('auth', {
  state: (): IAuth => ({
    token: '',
    permissions: []
  }),
  getters: {
    isLogin: state => state.token !== ''
  },
  persist: true,
  actions: {

  }
})
export default useAuthStore
