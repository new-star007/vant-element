<template>
  <div>
    <template v-if="loading">
      <slot name="template" v-if="$slots.template" />
      <van-skeleton
        v-else
        :row="rows"
        :row-width="rowWidth"
        :title="title"
        :avatar="avatar"
        :avatar-size="avatarSize"
        :avatar-shape="avatarShape"
        :loading="true"
        :round="round"
        :animate="animated"
      />
    </template>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script>
import { Skeleton } from 'vant'

export default {
  components: { [Skeleton.name]: Skeleton },
  name: 'ElSkeleton',
  props: {
    animated: { type: Boolean, default: true },
    loading: { type: Boolean, default: true },
    rows: { type: [Number, String], default: 3 },
    rowWidth: { type: [Number, String, Array], default: '100%' },
    title: Boolean,
    avatar: Boolean,
    avatarSize: { type: [String, Number], default: '32px' },
    avatarShape: { type: String, default: 'square' },
    round: Boolean,
    count: Number,
    throttle: Number
  }
}
</script>
