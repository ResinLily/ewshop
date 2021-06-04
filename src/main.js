import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import {
    PullRefresh,
    List,
    Grid, GridItem,
    Popup,
    AddressList,
    AddressEdit,
    Icon,
    SubmitBar,
    Stepper,
    Checkbox,
    CheckboxGroup,
    SwipeCell,
    Field,
    Form,
    Tag,
    Button,
    Swipe,
    SwipeItem,
    Lazyload,
    Badge,
    Sidebar,
    SidebarItem,
    Collapse,
    CollapseItem,
    Tab,
    Tabs,
    Card,
    Image as VanImage
} from 'vant';
import 'vant/lib/icon/local.css';

createApp(App).use(store).use(router)
    .use(Swipe).use(SwipeItem).use(Lazyload, {loading: require('./assets/images/default.png')}).use(Badge).use(Sidebar).use(SidebarItem)
    .use(Collapse).use(CollapseItem).use(Tab).use(Tabs).use(Card).use(VanImage).use(Tag).use(Button).use(Form).use(Field).use(SwipeCell)
    .use(Checkbox).use(CheckboxGroup).use(Stepper).use(SubmitBar).use(Icon).use(AddressEdit).use(AddressList).use(Popup).use(Grid).use(GridItem)
    .use(List).use(PullRefresh)
    .mount('#app')
