<template>
  <div class="el-time-select" ref="picker">
    <van-field
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      readonly
      @click="openPicker"
      :left-icon="prefixIcon ? 'clock-o' : undefined"
    />
    <van-popup
      v-model="showPicker"
      position="bottom"
      :get-container="getContainer"
    >
      <van-picker
        :columns="columns"
        :default-index="defaultIndex"
        :show-toolbar="true"
        confirm-button-text="确认"
        cancel-button-text="取消"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { Field, Popup, Picker } from 'vant'

export default {
  components: {
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker
  },
  name: 'ElTimeSelect',
  props: {
    value: String,
    disabled: Boolean,
    editable: { type: Boolean, default: true },
    clearable: { type: Boolean, default: true },
    size: String,
    placeholder: { type: String, default: '请选择' },
    start: String,
    end: String,
    step: String,
    minTime: String,
    maxTime: String,
    prefixIcon: { type: String, default: '' },
    pickerOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showPicker: false
    }
  },
  computed: {
    effectiveStart() {
      return this.start || (this.pickerOptions && this.pickerOptions.start) || '09:00'
    },
    effectiveEnd() {
      return this.end || (this.pickerOptions && this.pickerOptions.end) || '18:00'
    },
    effectiveStep() {
      return this.step || (this.pickerOptions && this.pickerOptions.step) || '00:30'
    },
    effectiveMinTime() {
      return this.minTime || (this.pickerOptions && this.pickerOptions.minTime) || ''
    },
    effectiveMaxTime() {
      return this.maxTime || (this.pickerOptions && this.pickerOptions.maxTime) || ''
    },
    columns() {
      const columns = []
      const [startHour, startMinuteVal] = this.effectiveStart.split(':').map(Number)
      const [endHour, endMinuteVal] = this.effectiveEnd.split(':').map(Number)
      const [stepHour, stepMinuteVal] = this.effectiveStep.split(':').map(Number)

      let currentMinute = startHour * 60 + startMinuteVal
      const endMinute = endHour * 60 + endMinuteVal
      const step = stepHour * 60 + stepMinuteVal

      while (currentMinute <= endMinute) {
        const hour = Math.floor(currentMinute / 60)
        const minute = currentMinute % 60
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

        if (this.isTimeDisabled(time)) {
          currentMinute += step
          continue
        }

        columns.push(time)
        currentMinute += step
      }

      return columns
    },
    defaultIndex() {
      if (!this.value) return 0
      const index = this.columns.indexOf(this.value)
      return index > -1 ? index : 0
    },
    displayValue() {
      return this.value || ''
    },
    getContainer() {
      return undefined
    }
  },
  methods: {
    openPicker() {
      if (this.disabled || !this.editable) return
      this.showPicker = true
    },
    onConfirm(value) {
      this.$emit('input', value)
      this.$emit('change', value)
      this.showPicker = false
    },
    onCancel() {
      this.showPicker = false
    },
    isTimeDisabled(time) {
      const [hour, minute] = time.split(':').map(Number)
      const timeMinutes = hour * 60 + minute

      if (this.effectiveMinTime) {
        const [minHour, minMinute] = this.effectiveMinTime.split(':').map(Number)
        const minMinutes = minHour * 60 + minMinute
        if (timeMinutes < minMinutes) return true
      }

      if (this.effectiveMaxTime) {
        const [maxHour, maxMinute] = this.effectiveMaxTime.split(':').map(Number)
        const maxMinutes = maxHour * 60 + maxMinute
        if (timeMinutes > maxMinutes) return true
      }

      return false
    }
  }
}
</script>

<style>
.el-time-select {
  display: inline-block;
  width: 100%;
}
</style>
