<script>
import { Col } from 'vant'

export default {
  extends: Col,
  name: 'ElCol',
  props: {
    push: Number,
    pull: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  }
}
</script>
