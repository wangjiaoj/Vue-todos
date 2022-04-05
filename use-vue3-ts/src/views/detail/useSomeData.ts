// useSomeData.ts
import { reactive, onMounted,toRefs } from 'vue'
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

    get_userData().then((result:any) => {

      const { userInfo, projectList } = result;
      console.log('userInfo',userInfo);
      console.log('projectList',projectList)
      data.userInfo = userInfo

      data.projectList = projectList
    })

  })

  // 使用toRefs
   return toRefs(data)
 
   

}