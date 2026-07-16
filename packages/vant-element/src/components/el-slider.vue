<script>
import { Slider } from 'vant'

export default {
  extends: Slider,
  name: 'ElSlider',
  props: {
    showInput: Boolean,
    showTooltip: { type: Boolean, default: true },
    tooltipClass: String,
    formatTooltip: Function,
    debounce: { type: Number, default: 300 },
    marks: Object
  }
}
</script>
