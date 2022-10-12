import { createStore } from 'vuex'

export default createStore({
  state: {
    components: [],
    currentElement: '',
  },
  mutations: {
    addComponentToEditor(state, component) {
      component.id = new Date().getTime()
      component.layerName = '图层' + (state.components.length + 1)
      state.components.push(component)
    },
    setActive(state, data) {
      state.currentElement = data
    },
    updateComponent(state, { id, key, value, isProps }) {
      console.log(id, key, value, isProps, '--------')

      const currentElement = state.components.find((component) => component.id === (id || state.currentElement))
      if (isProps) {
        // const oldValues = Array.isArray(key)
        //   ? key.map((key: string) => currentElement.props[key])
        //   : currentElement.props[key]

        if (Array.isArray(key)) {
          key.forEach((k) => {
            currentElement.props[k] = value[k]
          })
        } else {
          currentElement.props[key] = value
        }
      }
    },
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find((component) => component.id === state.currentElement)
    },
  },
  actions: {},
  modules: {},
})
