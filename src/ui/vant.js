import {
  Overlay,
  Button,
  Loading,
  Uploader,
  Toast,
  NavBar,
  Icon,
  Tab,
  Tabs,
  Dialog,
  Popup,
  Field,
  CellGroup,
  Pagination,
  Tabbar,
  TabbarItem,
  DropdownMenu,
  DropdownItem,
  Search,
  CountDown,
  Picker,
  ActionSheet,
  FloatingPanel,
  Checkbox,
} from "vant";
// 2. 引入组件样式
import 'vant/lib/index.css';
// import { Icon } from "vant";
const vant = {
  install: function (Vue) {
    Vue.use(Overlay);
    Vue.use(Button);
    Vue.use(Loading);
    Vue.use(Uploader);
    Vue.use(Toast);
    Vue.use(NavBar);
    Vue.use(Icon);
    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(Dialog);
    Vue.use(Popup);
    Vue.use(Field);
    Vue.use(CellGroup);
    Vue.use(Pagination);
    Vue.use(Tabbar);
    Vue.use(TabbarItem);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    Vue.use(Search);
    Vue.use(CountDown);
    Vue.use(Picker);
    Vue.use(ActionSheet);
    Vue.use(FloatingPanel);
    Vue.use(Checkbox)
  },
};

export default vant;
