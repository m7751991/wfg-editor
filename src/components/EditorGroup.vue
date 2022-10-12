<template>
  <a-collapse v-model:activeKey="currentKey">
    <a-collapse-panel v-for="item in editGroups" :key="item.name" :header="item.name">
      <prop-table
        :props="item.props"
        :mutationExtraData="{ isProps: true }"
        @updata-prop-value="updataProps"
      ></prop-table>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { computed, defineComponent, ref, watch } from '@vue/runtime-core'
import { difference } from 'lodash'
import PropTable from './elementList/PropTable.vue'

const defaultGroup = [
  {
    name: '尺寸',
    items: ['height', 'width', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom'],
  },
  {
    name: '边框',
    items: ['borderStyle', 'borderColor', 'borderWidth', 'borderRadius'],
  },
  {
    name: '阴影与透明度',
    items: ['opacity', 'boxShadow'],
  },
  {
    name: '位置',
    items: ['left', 'top'],
  },
  {
    name: '事件',
    items: ['actionType', 'url'],
  },
]

export default defineComponent({
  components: {
    PropTable,
  },
  props: {
    props: {
      type: Object,
      default: () => {
        return {}
      },
    },
    groups: {
      type: Object,
      default: () => {
        return defaultGroup
      },
    },
  },
  setup(props) {
    const currentKey = ref(props.groups.length ? props.groups[0].name : '')
    const newGroups = computed(() => {
      const allProps = defaultGroup.reduce((pre, current) => {
        return [...pre, ...current.items]
      }, [])
      allProps.push('tag')
      allProps.push('right')
      allProps.push('position')
      const baseProps = difference(Object.keys(props.props), allProps)
      const baseItem = {
        name: '基本信息',
        items: baseProps,
      }
      currentKey.value = '基本信息'
      return [baseItem, ...props.groups]
    })

    const editGroups = computed(() => {
      return newGroups.value.map((group) => {
        const propsMap = {}
        group.items.forEach((element) => {
          propsMap[element] = props.props[element]
        })
        return {
          ...group,
          props: propsMap,
        }
      })
    })
    const updataProps = (params) => {
      console.log(params)
    }
    console.log(editGroups, 'editGroups')
    return {
      updataProps,
      currentKey,
      editGroups,
    }
  },
})
</script>

<style></style>
