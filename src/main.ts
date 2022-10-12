import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import WText from '@/components/common/WText.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
import '@/css/reset.less'

const app = createApp(App).use(store).use(router).use(Antd)
app.component('w-text', WText)
app.mount('#app')
