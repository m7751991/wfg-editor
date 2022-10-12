<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="文本">
        <TextElement @onItemClick="uploadComponent">123</TextElement>
      </a-tab-pane>
      <a-tab-pane key="2" tab="图片" force-render> Content of Tab Pane 2 </a-tab-pane>
      <a-tab-pane key="3" tab="形状"> Content of Tab Pane 3 </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
import { useStore } from 'vuex'
import TextElement from './elementList/TextElement.vue'

export default defineComponent({
  components: {
    TextElement,
  },
  setup() {
    const store = useStore()
    const callback = (key) => {
      console.log(key)
    }
    const uploadComponent = (item) => {
      store.commit('addComponentToEditor', item)
    }
    return {
      callback,
      uploadComponent,
    }
  },
})
</script>

<style></style>
