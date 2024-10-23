import {createApp} from 'vue';
import App from './App.vue';
import router from "@/router/index.js";
import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faArrowRightFromBracket, faBell, faFlag, faUserPlus} from '@fortawesome/free-solid-svg-icons'; // solid로 대체
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import {faReceipt} from "@fortawesome/free-solid-svg-icons/faReceipt";
// import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {faSmile} from "@fortawesome/free-regular-svg-icons/faSmile";
import {faMap} from "@fortawesome/free-regular-svg-icons/faMap";
import {faMobileScreen} from "@fortawesome/free-solid-svg-icons/faMobileScreen";
import {faUserGroup} from "@fortawesome/free-solid-svg-icons/faUserGroup";
import {faListUl} from "@fortawesome/free-solid-svg-icons/faListUl";
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons/faPenToSquare";
import {faBookmark} from "@fortawesome/free-regular-svg-icons/faBookmark";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import {faClipboard} from "@fortawesome/free-regular-svg-icons/faClipboard";
import {faComment} from "@fortawesome/free-regular-svg-icons/faComment";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import {faBan} from "@fortawesome/free-solid-svg-icons/faBan";
import {faCircleArrowRight} from "@fortawesome/free-solid-svg-icons/faCircleArrowRight";

// 아이콘들을 라이브러리에 추가
library.add(faBell, faUser, faArrowRightFromBracket, faUserPlus, faSmile ,faMap, faMobileScreen,faUserGroup,faListUl,faPenToSquare, faBookmark,faTriangleExclamation,faClipboard, faComment, faCircleArrowRight);

// SNS 아이콘
library.add(faInstagram, faYoutube);

// 임광택
library.add(faClock, faReceipt, faFlag, faList, faBan);

const app = createApp(App);
app.use(BootstrapVue3)
app.use(router);

// FontAwesomeIcon 컴포넌트를 전역으로 등록
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');

