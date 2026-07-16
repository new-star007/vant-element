import ElButton from './components/el-button.vue'
import ElButtonGroup from './components/el-button-group.vue'
import ElInput from './components/el-input.vue'
import ElInputNumber from './components/el-input-number.vue'
import ElForm from './components/el-form.vue'
import ElFormItem from './components/el-form-item.vue'
import ElDialog from './components/el-dialog.vue'
import ElTabs from './components/el-tabs.vue'
import ElTabPane from './components/el-tab-pane.vue'
import ElSwitch from './components/el-switch.vue'
import ElCheckbox from './components/el-checkbox.vue'
import ElCheckboxGroup from './components/el-checkbox-group.vue'
import ElRadio from './components/el-radio.vue'
import ElRadioGroup from './components/el-radio-group.vue'
import ElRate from './components/el-rate.vue'
import ElSlider from './components/el-slider.vue'
import ElTag from './components/el-tag.vue'
import ElBadge from './components/el-badge.vue'
import ElIcon from './components/el-icon.vue'
import ElImage from './components/el-image.vue'
import ElCard from './components/el-card.vue'
import ElRow from './components/el-row.vue'
import ElCol from './components/el-col.vue'
import ElCollapse from './components/el-collapse.vue'
import ElCollapseItem from './components/el-collapse-item.vue'
import ElDescriptions from './components/el-descriptions.vue'
import ElDescriptionsItem from './components/el-descriptions-item.vue'
import ElDivider from './components/el-divider.vue'
import ElSteps from './components/el-steps.vue'
import ElStep from './components/el-step.vue'
import ElProgress from './components/el-progress.vue'
import ElEmpty from './components/el-empty.vue'
import ElSkeleton from './components/el-skeleton.vue'
import ElAlert from './components/el-alert.vue'
import ElPopover from './components/el-popover.vue'
import ElSelect from './components/el-select.vue'
import ElOption from './components/el-option.vue'
import ElUpload from './components/el-upload.vue'
import ElDatePicker from './components/el-date-picker.vue'
import ElTimePicker from './components/el-time-picker.vue'
import ElCarousel from './components/el-carousel.vue'
import ElCarouselItem from './components/el-carousel-item.vue'
import ElTable from './components/el-table/'
import ElTableColumn from './components/el-table-column.vue'
import ElList from './components/el-list.vue'
import ElListItem from './components/el-list-item.vue'
import ElListPage from './components/el-list-page.vue'
import ElPagination from './components/el-pagination.vue'
import ElCascader from './components/el-cascader.vue'
import ElTooltip from './components/el-tooltip.vue'
import ElPopconfirm from './components/el-popconfirm.vue'
import ElDrawer from './components/el-drawer.vue'
import ElBacktop from './components/el-backtop.vue'
import ElDropdown from './components/el-dropdown.vue'
import ElDropdownMenu from './components/el-dropdown-menu.vue'
import ElDropdownItem from './components/el-dropdown-item.vue'
import ElRadioButton from './components/el-radio-button.vue'
import ElCheckboxButton from './components/el-checkbox-button.vue'
import ElTimeSelect from './components/el-time-select.vue'
import ElCascaderPanel from './components/el-cascader-panel.vue'
import ElAutocomplete from './components/el-autocomplete.vue'
import ElCalendar from './components/el-calendar.vue'
import ElSkeletonItem from './components/el-skeleton-item.vue'
import ElSpinner from './components/el-spinner.vue'
import ElLink from './components/el-link.vue'
import InfiniteScroll from './directives/infinite-scroll'

import ElMessage from './services/el-message'
import ElNotification from './services/el-notification'
import ElLoading from './services/el-loading'
import ElMessageBox from './services/el-message-box'

const components = {
  ElButton,
  ElButtonGroup,
  ElInput,
  ElInputNumber,
  ElForm,
  ElFormItem,
  ElDialog,
  ElTabs,
  ElTabPane,
  ElSwitch,
  ElCheckbox,
  ElCheckboxGroup,
  ElRadio,
  ElRadioGroup,
  ElRate,
  ElSlider,
  ElTag,
  ElBadge,
  ElIcon,
  ElImage,
  ElCard,
  ElRow,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElDescriptions,
  ElDescriptionsItem,
  ElDivider,
  ElSteps,
  ElStep,
  ElProgress,
  ElEmpty,
  ElSkeleton,
  ElAlert,
  ElPopover,
  ElSelect,
  ElOption,
  ElUpload,
  ElDatePicker,
  ElTimePicker,
  ElCarousel,
  ElCarouselItem,
  ElTable,
  ElTableColumn,
  ElList,
  ElListItem,
  ElListPage,
  ElPagination,
  ElCascader,
  ElTooltip,
  ElPopconfirm,
  ElDrawer,
  ElBacktop,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElRadioButton,
  ElCheckboxButton,

  ElTimeSelect,
  ElCascaderPanel,
  ElAutocomplete,
  ElCalendar,
  ElSkeletonItem,
  ElSpinner,
  ElLink
}

function toKebabCase(name) {
  return name.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()).replace(/^-/, '')
}

const VantElement = {
  install(Vue, options = {}) {
    const componentWhiteList = options.components || null

    for (const [name, component] of Object.entries(components)) {
      if (componentWhiteList && componentWhiteList.indexOf(toKebabCase(name)) === -1) {
        continue
      }
      Vue.component(toKebabCase(name), component)
    }

    Vue.prototype.$message = ElMessage
    Vue.prototype.$notify = ElNotification
    Vue.prototype.$loading = ElLoading
    Vue.prototype.$alert = ElMessageBox.alert.bind(ElMessageBox)
    Vue.prototype.$confirm = ElMessageBox.confirm.bind(ElMessageBox)
    Vue.prototype.$prompt = ElMessageBox.prompt.bind(ElMessageBox)
    Vue.prototype.$msgbox = ElMessageBox

    Vue.directive('infinite-scroll', InfiniteScroll)
  }
}

export default VantElement

export {
  ElButton,
  ElButtonGroup,
  ElInput,
  ElInputNumber,
  ElForm,
  ElFormItem,
  ElDialog,
  ElTabs,
  ElTabPane,
  ElSwitch,
  ElCheckbox,
  ElCheckboxGroup,
  ElRadio,
  ElRadioGroup,
  ElRate,
  ElSlider,
  ElTag,
  ElBadge,
  ElIcon,
  ElImage,
  ElCard,
  ElRow,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElDescriptions,
  ElDescriptionsItem,
  ElDivider,
  ElSteps,
  ElStep,
  ElProgress,
  ElEmpty,
  ElSkeleton,
  ElAlert,
  ElPopover,
  ElSelect,
  ElOption,
  ElUpload,
  ElDatePicker,
  ElTimePicker,
  ElCarousel,
  ElCarouselItem,
  ElTable,
  ElTableColumn,
  ElList,
  ElListItem,
  ElListPage,
  ElPagination,
  ElCascader,
  ElTooltip,
  ElPopconfirm,
  ElDrawer,
  ElBacktop,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElRadioButton,
  ElCheckboxButton,

  ElTimeSelect,
  ElCascaderPanel,
  ElAutocomplete,
  ElCalendar,
  ElSkeletonItem,
  ElSpinner,
  ElLink,
  InfiniteScroll,
  ElMessage,
  ElNotification,
  ElLoading,
  ElMessageBox
}
