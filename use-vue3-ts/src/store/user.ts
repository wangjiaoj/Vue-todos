//src/store/user.ts

import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      userId: '',
      userOrigin: '',
    }
  },
  actions: {
    updateUser(userId:string,userOrigin:string) {
      this.userId = userId,
      this.userOrigin = userOrigin
    }
  },
 
})

