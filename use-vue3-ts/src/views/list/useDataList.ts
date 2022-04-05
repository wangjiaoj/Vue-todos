// useSomeData.ts
import { reactive, onMounted,toRefs,toRef } from 'vue'
import {get_userData} from '@/api/list/index';
export default function useSomeData() {

  const data = reactive({

    userInfo: {

      name: 'default_user',

      role: 'default_role'

    },

    fileName: 'default_fileName'

  })



  onMounted(() => {

    // 异步获取数据

    get_userData().then((result:any) => {

      
       
   
      data.userInfo = {

        name: 'user',
  
        role: 'hhhh_role'
  
      }
      data.fileName = 'hhhhhh_fileName'
      
    })

  })

  // 使用toRefs
  //  return toRefs({
 
  //   userInfo:data.userInfo,
  //    fileName:toRef(data,'fileName') 
  //  })
  return toRefs(data)
 
   

}