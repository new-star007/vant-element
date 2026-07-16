<template>
  <el-date-picker
    :value="value"
    @input="onInput"
    @change="onChange"
    @clear="onClear"
    :type="'datetime'"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :format="pickerFormat"
    :min-date="minDate"
    :max-date="maxDate"
    :min-hour="minHour"
    :max-hour="maxHour"
    :min-minute="minMinute"
    :max-minute="maxMinute"
    v-bind="$attrs"
  />
</template>

<script>
export default {
  name: 'ElTimePicker',
  props: {
    value: [String, Number, Date],
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    isRange: Boolean,
    arrowControl: Boolean,
    format: { type: String, default: 'HH:mm:ss' },
    valueFormat: String,
    pickerOptions: Object,
    minDate: { type: Date, default: () => new Date(1900, 0, 1) },
    maxDate: { type: Date, default: () => new Date(2100, 11, 31) },
    minHour: { type: Number, default: 0 },
    maxHour: { type: Number, default: 23 },
    minMinute: { type: Number, default: 0 },
    maxMinute: { type: Number, default: 59 }
  },
  computed: {
    pickerFormat() {
      return this.valueFormat || 'yyyy-MM-dd ' + this.format
    }
  },
  methods: {
    onInput(val) {
      this.$emit('input', val)
    },
    onChange(val) {
      this.$emit('change', val)
    },
    onClear() {
      this.$emit('clear')
    }
  }
}
</script>
