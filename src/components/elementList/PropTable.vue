<template>
  <li
    :key="key"
    class="prop-item"
    :class="{ 'no-text': !item.text, 'hide-item': item.isHidden }"
    :id="`item-${item.key}`"
    v-for="(item, key) in finalProps"
  >
    <span>{{ item.text }}</span>
    <div>
      <component v-if="!item.options" :is="item.component" v-on="item.event" :[item.valueProp]="item.value"></component>
      <component v-else :is="item.component" v-on="item.event" :[item.valueProp]="item.value">
        <component
          v-for="(item, key) in item.options"
          :is="subComponent"
          :key="key"
          v-on="event"
          :[item.valueProp]="item.value"
        >
        </component>
      </component>
    </div>
  </li>
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent } from '@vue/runtime-core'
import { map } from 'lodash'
import propsMap from '@/propsMap'

export default defineComponent({
  props: {
    mutationExtraData: {
      type: Object,
      default: () => {
        return null
      },
    },
    mutationName: {
      type: String,
      default: () => {
        return 'updateComponent'
      },
    },
    props: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },

  setup(props) {
    const { commit } = useStore()
    const handleCommit = (data) => {
      const finalData = props.mutationExtraData ? { ...data, ...props.mutationExtraData } : data
      commit(props.mutationName, finalData)
    }
    let finalProps = computed(() => {
      return map(props.props, (value, key) => {
        const { component, eventName, subComponent, text, options, intialTransform, valueProp, afterTransform } =
          propsMap[key]
        return {
          value: intialTransform(value),
          key,
          component,
          subComponent,
          text,
          valueProp,
          options,
          event: {
            [eventName]: (e) => {
              handleCommit({ value: afterTransform(e), key })
            },
          },
        }
      })
    })
    return { finalProps }
  },
})
</script>

<style>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
</style>
