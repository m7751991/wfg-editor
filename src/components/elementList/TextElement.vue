<template>
  <div>
    <div class="fd-element-item" v-for="(item, index) in textList" :key="index" @click="onItemClick(item)">
      <component :is="item.name" :props="item.props" :style="generateResetCss(item.name)"></component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import elementDefaultProps from '@/defaultProps'
import { CreateComponentType } from '@/interface'
const textDefaultProps = elementDefaultProps['w-text'].props
const generateResetCss = (name: string) => {
  return {
    position: 'static',
    ...(name !== 'w-block' && { height: '' }),
  }
}
// the component name list
const textPropsList = [
  {
    text: '大标题',
    fontSize: '30px',
    fontWeight: 'bold',
    tag: 'h2',
  },
  {
    text: '楷体副标题',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: '"KaiTi","STKaiti"',
    tag: 'h2',
  },
  {
    text: '正文内容',
    tag: 'p',
  },
  {
    text: '宋体正文内容',
    tag: 'p',
    fontFamily: '"SimSun","STSong"',
  },
  {
    text: 'Arial style',
    tag: 'p',
    fontFamily: '"Arial", sans-serif',
  },
  {
    text: 'Comic Sans',
    tag: 'p',
    fontFamily: '"Comic Sans MS"',
  },
  {
    text: 'Courier New',
    tag: 'p',
    fontFamily: '"Courier New", monospace',
  },
  {
    text: 'Times New Roman',
    tag: 'p',
    fontFamily: '"Times New Roman", serif',
  },
  {
    text: '链接内容',
    color: '#1890ff',
    textDecoration: 'underline',
    tag: 'p',
  },
  {
    text: '按钮内容',
    color: '#ffffff',
    backgroundColor: '#1890ff',
    borderWidth: '1px',
    borderColor: '#1890ff',
    borderStyle: 'solid',
    borderRadius: '2px',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '5px',
    paddingBottom: '5px',
    width: '100px',
    tag: 'button',
    textAlign: 'center',
  },
]

const textList: CreateComponentType[] = textPropsList.map((prop) => {
  return {
    name: 'w-text',
    props: {
      ...textDefaultProps,
      ...(prop as any),
    },
  }
})

export default defineComponent({
  emits: ['on-item-click'],
  setup(_, context) {
    const onItemClick = (item) => {
      context.emit('on-item-click', item)
    }
    return {
      onItemClick,
      generateResetCss,
      textList,
    }
  },
})
</script>

<style lang="less" scope>
.fd-element-item {
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.tip-text {
  position: absolute;
  text-align: center;
  top: 50%;
  width: 100%;
  margin-top: -10px;
}
</style>
