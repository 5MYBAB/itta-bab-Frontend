import {createApp} from 'vue';
import App from './App.vue';
import router from "@/router/index.js";
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faArrowRightFromBracket, faBell, faFlag, faUserPlus} from '@fortawesome/free-solid-svg-icons'; // solid로 대체
import {faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {faHeart as regularHeart} from "@fortawesome/free-regular-svg-icons/faHeart";
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import {faReceipt} from "@fortawesome/free-solid-svg-icons/faReceipt";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import {faBan} from "@fortawesome/free-solid-svg-icons/faBan";

// 아이콘들을 라이브러리에 추가
library.add(faBell, faUser, faArrowRightFromBracket, faUserPlus, solidHeart, regularHeart);


// SNS 아이콘
library.add(faInstagram, faYoutube);

// 임광택
library.add(faClock, faReceipt, faFlag, faList, faBan);

const app = createApp(App);
app.use(router);

// FontAwesomeIcon 컴포넌트를 전역으로 등록
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

