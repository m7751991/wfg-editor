<template>
  <a-layout class="fd-editor-main" id="fd-editor-main">
    <a-layout-sider class="fd-editor-element" width="300">
      <EditorElementList />
    </a-layout-sider>
    <a-layout-content class="fd-editor-content">
      <div class="fd-preview-list" id="canvas-area">
        <div class="fd-editor-content-showbody">
          <div v-for="component in components" :key="component.id">
            <EditorWapper
              :props="component.props"
              @active="setActive"
              :id="component.id"
              :active="currentId === component.id"
              @updata-position="updataPosition"
            >
              <component :is="component.name" :props="component.props"></component>
            </EditorWapper>
          </div>
        </div>
      </div>
    </a-layout-content>
    <a-layout-sider class="fd-editor-group" width="300">
      <EditorGroup :props="currentElement && currentElement.props" />
    </a-layout-sider>
  </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from '@vue/runtime-core'
import EditorGroup from '@/components/EditorGroup.vue'
import EditorWapper from '@/components/EditorWapper.vue'
import EditorElementList from '@/components/EditorElementList.vue'
import { useStore } from 'vuex'
import { mapValues, pick, pickBy } from 'lodash'
export default defineComponent({
  components: { EditorGroup, EditorWapper, EditorElementList },
  setup(_, context) {
    const store = useStore()
    const components = computed(() => store.state.components)
    const currentElement = computed(() => {
      return store.getters.getCurrentElement
    })
    const currentId = computed(() => {
      return store.state.currentElement
    })
    const updataPosition = (params) => {
      const newPair = mapValues(
        pickBy(params, (_, k) => k !== 'id'),
        (value) => value + 'px',
      )
      const keys = Object.keys(newPair)
      const values = pickBy(params, (_, k) => k !== 'id')
      store.commit('updateComponent', { key: keys, value: values, id: params.id, isProps: true })
    }
    const setActive = (data) => {
      console.log(data)
      store.commit('setActive', data)
    }
    return { components, currentElement, setActive, currentId, updataPosition }
  },
})
</script>
<style lang="less" scoped>
#fd-editor-main {
  height: 100%;
  background: #fff;
  .fd-editor-content {
    display: flex;
    justify-content: center;
    background: rgb(245, 245, 245);
    height: 100vh;
  }
  .fd-editor-element {
    background: #fff;
  }
  .fd-editor-group {
    background: #fff;
  }
  .fd-editor-content-showbody {
    min-height: 500px;
    background: #fff;
  }
}

.fd-preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>
