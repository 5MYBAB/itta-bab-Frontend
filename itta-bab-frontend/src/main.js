import {createApp} from 'vue';
import App from './App.vue';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faArrowRightFromBracket, faBell, faFlag} from '@fortawesome/free-solid-svg-icons'; // solid로 대체
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import {faReceipt} from "@fortawesome/free-solid-svg-icons/faReceipt";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {faSmile} from "@fortawesome/free-regular-svg-icons/faSmile";
import {faMap} from "@fortawesome/free-regular-svg-icons/faMap";
import {faMobileScreen} from "@fortawesome/free-solid-svg-icons/faMobileScreen";
import {faUserGroup} from "@fortawesome/free-solid-svg-icons/faUserGroup";
// 아이콘들을 라이브러리에 추가
library.add(faBell, faUser, faArrowRightFromBracket, faUserPlus, faSmile ,faMap, faMobileScreen,faUserGroup);

// SNS 아이콘
library.add(faInstagram, faYoutube);

// 임광택
library.add(faClock, faReceipt, faFlag);

const app = createApp(App);

// FontAwesomeIcon 컴포넌트를 전역으로 등록
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
