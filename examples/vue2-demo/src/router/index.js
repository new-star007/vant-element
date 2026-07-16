import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  { path: '/home', name: 'Home', component: () => import('../views/HomePage.vue') },

  // 基础组件
  { path: '/button', name: 'Button', component: () => import('../views/ButtonPage.vue') },
  { path: '/icon', name: 'Icon', component: () => import('../views/IconPage.vue') },
  { path: '/image', name: 'Image', component: () => import('../views/ImagePage.vue') },
  { path: '/layout', name: 'Layout', component: () => import('../views/LayoutPage.vue') },
  { path: '/card', name: 'Card', component: () => import('../views/CardPage.vue') },
  { path: '/spinner', name: 'Spinner', component: () => import('../views/SpinnerPage.vue') },
  { path: '/link', name: 'Link', component: () => import('../views/LinkPage.vue') },

  // 表单组件
  { path: '/checkbox', name: 'Checkbox', component: () => import('../views/CheckboxPage.vue') },
  { path: '/date-picker', name: 'DatePicker', component: () => import('../views/DatePickerPage.vue') },
  { path: '/form', name: 'Form', component: () => import('../views/FormPage.vue') },
  { path: '/input', name: 'Input', component: () => import('../views/InputPage.vue') },
  { path: '/input-number', name: 'InputNumber', component: () => import('../views/InputNumberPage.vue') },
  { path: '/radio', name: 'Radio', component: () => import('../views/RadioPage.vue') },
  { path: '/rate', name: 'Rate', component: () => import('../views/RatePage.vue') },
  { path: '/select', name: 'Select', component: () => import('../views/SelectPage.vue') },
  { path: '/slider', name: 'Slider', component: () => import('../views/SliderPage.vue') },
  { path: '/switch', name: 'Switch', component: () => import('../views/SwitchPage.vue') },
  { path: '/time-picker', name: 'TimePicker', component: () => import('../views/TimePickerPage.vue') },
  { path: '/upload', name: 'Upload', component: () => import('../views/UploadPage.vue') },
  { path: '/cascader', name: 'Cascader', component: () => import('../views/CascaderPage.vue') },

  { path: '/time-select', name: 'TimeSelect', component: () => import('../views/TimeSelectPage.vue') },
  { path: '/autocomplete', name: 'Autocomplete', component: () => import('../views/AutocompletePage.vue') },

  // 反馈组件
  { path: '/alert', name: 'Alert', component: () => import('../views/AlertPage.vue') },
  { path: '/dialog', name: 'Dialog', component: () => import('../views/DialogPage.vue') },
  { path: '/loading', name: 'Loading', component: () => import('../views/LoadingPage.vue') },
  { path: '/message', name: 'Message', component: () => import('../views/MessagePage.vue') },
  { path: '/message-box', name: 'MessageBox', component: () => import('../views/MessageBoxPage.vue') },
  { path: '/notification', name: 'Notification', component: () => import('../views/NotificationPage.vue') },
  { path: '/popover', name: 'Popover', component: () => import('../views/PopoverPage.vue') },
  { path: '/progress', name: 'Progress', component: () => import('../views/ProgressPage.vue') },
  { path: '/tooltip', name: 'Tooltip', component: () => import('../views/TooltipPage.vue') },
  { path: '/popconfirm', name: 'Popconfirm', component: () => import('../views/PopconfirmPage.vue') },
  { path: '/drawer', name: 'Drawer', component: () => import('../views/DrawerPage.vue') },

  // 展示组件
  { path: '/badge', name: 'Badge', component: () => import('../views/BadgePage.vue') },
  { path: '/carousel', name: 'Carousel', component: () => import('../views/CarouselPage.vue') },
  { path: '/collapse', name: 'Collapse', component: () => import('../views/CollapsePage.vue') },
  { path: '/descriptions', name: 'Descriptions', component: () => import('../views/DescriptionsPage.vue') },
  { path: '/divider', name: 'Divider', component: () => import('../views/DividerPage.vue') },
  { path: '/empty', name: 'Empty', component: () => import('../views/EmptyPage.vue') },
  { path: '/list-demo', name: 'ListDemo', component: () => import('../views/ListDemoPage.vue') },
  { path: '/pagination', name: 'Pagination', component: () => import('../views/PaginationPage.vue') },
  { path: '/skeleton', name: 'Skeleton', component: () => import('../views/SkeletonPage.vue') },
  { path: '/tag', name: 'Tag', component: () => import('../views/TagPage.vue') },
  { path: '/table', name: 'Table', component: () => import('../views/TablePage.vue') },
  { path: '/user-table', name: 'UserTable', component: () => import('../views/UserTable.vue') },
  { path: '/calendar', name: 'Calendar', component: () => import('../views/CalendarPage.vue') },

  // 导航组件
  { path: '/steps', name: 'Steps', component: () => import('../views/StepsPage.vue') },
  { path: '/tabs', name: 'Tabs', component: () => import('../views/TabsPage.vue') },
  { path: '/backtop', name: 'Backtop', component: () => import('../views/BacktopPage.vue') },
  { path: '/dropdown', name: 'Dropdown', component: () => import('../views/DropdownPage.vue') },

  // 业务组件
  { path: '/button-group', name: 'ButtonGroup', component: () => import('../views/ButtonGroupPage.vue') },
  { path: '/list-page', name: 'ListPageBiz', component: () => import('../views/ListPagePage.vue') },
  { path: '/infinite-scroll', name: 'InfiniteScroll', component: () => import('../views/InfiniteScrollPage.vue') },

  // 示例页面
  { path: '/list', name: 'UserList', component: () => import('../views/UserList.vue') }
]

export default new VueRouter({
  routes
})
