<script>
import { SwipeItem } from 'vant'

export default {
  extends: SwipeItem,
  name: 'ElCarouselItem',
  props: {
    name: [String, Number],
    label: [String, Number]
  }
}
</script>
