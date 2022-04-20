// vant.forEach((item: any) => app.use(item))
import { Button, Cell , ActionSheet, Checkbox, CheckboxGroup,Calendar,  Uploader,Picker, RadioGroup, Radio, Field, CellGroup, List, Loading, Search, Popup, Sticky, Swipe, SwipeItem,Steps,Step, Empty, Toast } from 'vant';
export default {
    version: '1.0.0',
    author: 'wjj',
    install: function(app:any) {
        app.use(Button);
        app.use(Cell);
        app.use(ActionSheet);
        app.use(Checkbox);
        app.use(CheckboxGroup);
        app.use(Calendar);
        app.use(Uploader);
        app.use(Picker);
        app.use(RadioGroup);
        app.use(Radio);
        app.use(Field);
        app.use(CellGroup);
        app.use(List);
        app.use(Search);
        //Toast挂载到 app.config.globalProperties.$toast
        app.use(Toast);
        app.use(Loading);
        app.use(Popup);
        app.use(Sticky);

        app.use(Swipe);
        app.use(SwipeItem);
        app.use(Steps);
        app.use(Step);
       
        app.use(Empty);

    }
}
