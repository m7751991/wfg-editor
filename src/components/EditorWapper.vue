<template>
  <div
    class="edit-wrapper"
    @click="setActive"
    ref="editWrapper"
    :class="{ active: active }"
    :style="styleProps"
    :data-component-id="id"
  >
    <div class="move-wrapper" ref="moveWrapper" @mousedown="startMove">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, nextTick } from '@vue/runtime-core'
import { pick } from 'lodash'

export default defineComponent({
  props: {
    props: {
      type: Object,
    },
    id: {
      type: String,
    },
    active: {
      type: Boolean,
    },
  },
  emits: ['active', 'updata-position'],
  setup(props, context) {
    const editWrapper = ref()
    const setActive = () => {
      context.emit('active', props.id)
    }
    const gap = {}
    const caculateMovePosition = (e) => {
      let container = document.getElementById('canvas-area')
      let left = e.clientX - container.offsetLeft - gap.x
      let top = e.clientY - container.offsetTop - gap.y + container.scrollTop
      return { top, left }
    }
    const styleProps = computed(() => {
      return pick(props.props || {}, ['position', 'top', 'left', 'width', 'height'])
    })
    const startMove = (e) => {
      const currentElement = editWrapper.value
      const { clientX, clientY } = e
      const { left, top } = currentElement.getBoundingClientRect()
      gap.x = clientX - left
      gap.y = clientY - top
      let handlerMove = (event) => {
        const { left, top } = caculateMovePosition(event)
        editWrapper.value.style.top = top + 'px'
        editWrapper.value.style.left = left + 'px'
      }
      let handlerUp = (event) => {
        // 鼠标抬起之后确定了移动的目标位置
        const { left, top } = caculateMovePosition(event)
        // todo 通知右侧组件信息更新
        context.emit('updata-position', { left, top, id: props.id })
        window.removeEventListener('mousemove', handlerMove)
        nextTick(() => {
          window.removeEventListener('mouseup', handlerUp)
        })
      }
      window.addEventListener('mousemove', handlerMove)
      window.addEventListener('mouseup', handlerUp)
    }

    return { setActive, styleProps, startMove, editWrapper }
  },
})
</script>

<style>
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
.edit-wrapper .w-text-component,
.edit-wrapper .w-image-component,
.edit-wrapper .w-shape-component {
  position: static !important;
}
.edit-wrapper.active .resizers .resizer {
  width: 10px;
  height: 10px;
  border-radius: 50%; /*magic to turn square into circle*/
  background: white;
  border: 3px solid #1890ff;
  position: absolute;
  display: block;
}
.edit-wrapper .resizers .resizer.top-left {
  left: -5px;
  top: -5px;
  cursor: nwse-resize; /*resizer cursor*/
}
.edit-wrapper .resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
}
.edit-wrapper .resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
}
.edit-wrapper .resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
}
</style>
