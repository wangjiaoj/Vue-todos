// vant.forEach((item: any) => app.use(item))
import { Button, List, Loading, Search, Popup, Sticky, Swipe, SwipeItem, Empty, Toast } from 'vant';
import 'vant/lib/index.css'
export default {   
      version: '1.0.0',   
       author: 'wjj',   
       install: function(app:any) {       
          app.use(Button);      
          app.use(List);    
          app.use(Search);     
          //Toast挂载到 app.config.globalProperties.$toast    
          app.use(Toast);      
          app.use(Loading);  
          app.use(Popup);     
          app.use(Sticky);
          app.use(Swipe);      
          app.use(SwipeItem);    
          app.use(Empty);
}}