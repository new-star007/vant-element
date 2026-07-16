<template>
  <div class="el-date-picker" @click="onClickField">
    <span v-if="displayText" class="el-date-picker__value">{{ displayText }}</span>
    <span v-else class="el-date-picker__placeholder">{{ placeholder }}</span>

    <van-icon v-if="showClear" name="clear" class="el-date-picker__clear" @click.stop="onClear" />

    <van-popup
      v-if="!disabled"
      :value="popupVisible"
      @input="onPopupInput"
      position="bottom"
      round
      get-container="body"
    >
      <van-picker
        v-if="pickerType === 'year'"
        :columns="yearColumns"
        :default-index="yearDefaultIndex"
        :title="placeholder || title"
        :item-height="44"
        :visible-item-count="5"
        show-toolbar
        @confirm="onYearConfirm"
        @cancel="onCancel"
      />
      <van-datetime-picker
        v-else
        :value="currentDate"
        @input="onPickerInput"
        @confirm="onConfirm"
        @cancel="onCancel"
        :type="pickerType"
        :title="placeholder || title"
        :min-date="minDate"
        :max-date="maxDate"
        :min-hour="minHour"
        :max-hour="maxHour"
        :min-minute="minMinute"
        :max-minute="maxMinute"
        :filter="pickerFilter"
        :formatter="formatter"
        :item-height="44"
        :visible-item-count="5"
        :show-toolbar="true"
        :loading="loading"
      />
    </van-popup>
  </div>
</template>

<script>
import { Icon, Popup, DatetimePicker, Picker } from 'vant'

export default {
  components: { [Icon.name]: Icon, [Popup.name]: Popup, [DatetimePicker.name]: DatetimePicker, [Picker.name]: Picker },
  name: 'ElDatePicker',
  inject: {
    elFormItem: { default: null },
    elFormItemFieldState: { default: null }
  },
  props: {
    value: [String, Number, Date],
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    type: { type: String, default: 'date' },
    format: String,
    title: String,
    minDate: { type: Date, default: () => new Date(1900, 0, 1) },
    maxDate: { type: Date, default: () => new Date(2100, 11, 31) },
    minHour: { type: Number, default: 0 },
    maxHour: { type: Number, default: 23 },
    minMinute: { type: Number, default: 0 },
    maxMinute: { type: Number, default: 59 },
    pickerOptions: Object,
    defaultValue: Date,
    defaultTime: [String, Array],
    valueFormat: String,
    align: { type: String, default: 'left' },
    popperClass: String,
    pickerFilter: Function,
    formatter: Function,
    loading: Boolean,
    readonly: Boolean
  },
  data() {
    return {
      popupVisible: false,
      currentDate: new Date()
    }
  },
  computed: {
    resolvedFormat() {
      if (this.format) return this.format
      const map = {
        date: 'yyyy-MM-dd',
        month: 'yyyy-MM',
        year: 'yyyy',
        datetime: 'yyyy-MM-dd HH:mm',
        dates: 'yyyy-MM-dd',
        week: 'yyyy-MM-dd',
        daterange: 'yyyy-MM-dd',
        datetimerange: 'yyyy-MM-dd HH:mm',
        monthrange: 'yyyy-MM',
        time: 'HH:mm'
      }
      return map[this.type] || 'yyyy-MM-dd'
    },
    displayText() {
      if (!this.value) return ''
      const d = new Date(this.value)
      if (isNaN(d.getTime())) return this.value
      return this.formatDate(d, this.resolvedFormat)
    },
    showClear() {
      if (!this.clearable || this.disabled) return false
      if (!this.value && this.value !== 0) return false
      return true
    },
    pickerType() {
      const map = {
        date: 'date',
        dates: 'date',
        week: 'date',
        month: 'year-month',
        year: 'year',
        datetime: 'datetime',
        daterange: 'date',
        datetimerange: 'datetime',
        monthrange: 'year-month',
        time: 'time'
      }
      return map[this.type] || 'date'
    },
    yearColumns() {
      const min = this.minDate.getFullYear()
      const max = this.maxDate.getFullYear()
      const values = []
      for (let y = min; y <= max; y++) {
        values.push({ text: String(y), value: y })
      }
      return [{ values }]
    },
    yearDefaultIndex() {
      const current = new Date().getFullYear()
      const min = this.minDate.getFullYear()
      const max = this.maxDate.getFullYear()
      if (current < min) return 0
      if (current > max) return max - min
      return current - min
    }
  },
  watch: {
    popupVisible(val) {
      if (val && this.value) {
        const d = new Date(this.value)
        if (!isNaN(d.getTime())) {
          this.currentDate = d
        }
      }
    },
    disabled: {
      immediate: true,
      handler(val) {
        if (this.elFormItemFieldState) this.elFormItemFieldState.disabled = val
      }
    }
  },
  created() {
    if (this.elFormItemFieldState) {
      this.elFormItemFieldState.isLink = true
      this.elFormItemFieldState.readonly = true
    }
    const rangeTypes = ['daterange', 'datetimerange', 'monthrange', 'dates']
    if (rangeTypes.includes(this.type)) {
      console.warn(`[ElDatePicker] type="${this.type}" is not fully supported (Vant lacks range picker). Falling back to single date selection.`)
    }
  },
  methods: {
    formatDate(date, fmt) {
      const o = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (const k in o) {
        const reg = new RegExp('(' + k + ')')
        if (reg.test(fmt)) {
          const val = String(o[k])
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length > 1 ? val.padStart(2, '0') : val)
        }
      }
      return fmt
    },
    onClickField() {
      if (!this.disabled) {
        this.popupVisible = true
      }
    },
    onPopupInput(val) {
      this.popupVisible = val
    },
    onPickerInput(val) {
      this.currentDate = val
    },
    onConfirm(val) {
      const fmt = this.valueFormat || this.resolvedFormat
      const result = this.formatDate(val, fmt)
      this.$emit('input', result)
      this.$emit('change', result)
      this.popupVisible = false
    },
    onYearConfirm(values) {
      const value = values && values[0]
      const year = typeof value === 'object' ? value.value : parseInt(value, 10)
      const d = new Date(year, 0, 1)
      const fmt = this.valueFormat || this.resolvedFormat
      const result = this.formatDate(d, fmt)
      this.$emit('input', result)
      this.$emit('change', result)
      this.popupVisible = false
    },
    onCancel() {
      this.popupVisible = false
    },
    onClear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    }
  }
}
</script>

<style scoped>
.el-date-picker {
  display: flex;
  align-items: center;
  flex: 1;
  min-height: 24px;
  cursor: pointer;
}
.el-date-picker__value {
  color: #323233;
  font-size: inherit;
}
.el-date-picker__placeholder {
  color: #c8c9cc;
  font-size: inherit;
}
.el-date-picker__clear {
  margin-left: auto;
  color: #c8c9cc;
  font-size: 16px;
  cursor: pointer;
}
</style>
