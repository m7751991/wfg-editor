<template>
  <component class="w-text-component" :is="options.tag" :style="options">
    {{ options.text }}
  </component>
</template>

<script>
import { computed, defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: {
    props: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(props) {
    const options = computed(() => props.props)
    return { options }
  },
})
</script>

<style lang="less" scoped></style>
