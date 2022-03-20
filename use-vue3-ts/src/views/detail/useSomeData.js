// useSomeData.js
import { reactive, onMounted,toRefs } from '@vue/runtime-dom'
import {get_userData} from '@/api/list/index';
export default function useSomeData() {

  const data = reactive({

    userInfo: {

      name: 'default_user',

      role: 'default_role'

    },

    projectList: []

  })



  onMounted(() => {

    // 异步获取数据

    get_userData().then(result => {

      const { userInfo, projectList } = result;
      console.log(userInfo)
      data.userInfo = userInfo

      data.projectList = projectList
    })

  })

  // 使用toRefs
  return toRefs(data)
  // return toRefs({

  //   projectList: data.projectList,

  //   userInfo: toRefs(data.userInfo)

  // })
   

}