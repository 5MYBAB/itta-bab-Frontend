// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons' // solid로 대체
import { faUser as faRegularUser } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

// 아이콘들을 라이브러리에 추가
library.add(faBell, faRegularUser, faArrowRightFromBracket)

const app = createApp(App)

// FontAwesomeIcon 컴포넌트를 전역으로 등록
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
