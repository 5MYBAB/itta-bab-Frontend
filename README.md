# itta-bab

## :rice: 팀원
<div align="center">

| <img src="https://avatars.githubusercontent.com/u/128581270?v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/106576062?v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/75729543?v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/174118592?v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/103546300?v=4" width="100" height="100"/> | <img src="https://avatars.githubusercontent.com/u/58172997?v=4" width="100" height="100"/> |
|:-------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------:|
|                      김민주<br>[@minju0224](https://github.com/minju0224)                      |                      박설빈<br>[@seolbin01](https://github.com/seolbin01)                      |                        신민철<br>[@SHINMIN7](https://github.com/SHINMIN7)                         |                      이성민<br>[@sung-mini](https://github.com/sung-mini)                      |                   임광택<br>Pangtaek<br>[@Pangtaek](https://github.com/Pangtaek)                   |                          최두혁<br>[@enking](https://github.com/enking)                           |

</div>


## ⚙ 기술스택

<p><strong>⚙ Backend <br></strong>
<br>
  <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> 
  <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
  <img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white">
</p>

<p><strong>⚙ DB <br></strong>
<br>
  <img src="https://img.shields.io/badge/mariadb-4479A1?style=for-the-badge&logo=mariadb&logoColor=white">
  <img src="https://img.shields.io/badge/redis-02303A?style=for-the-badge&logo=redis&logoColor=white">
</p>

---

### 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [화면 설계서](#%EF%B8%8F-화면-설계서)
3. [기능 명세서](#-기능-명세서)
4. [테스트 결과 보고서](#-테스트-결과-보고서)
5. [팀 회고](#-팀-회고)


<hr>

## 📢 프로젝트 소개
이 서비스는 부트캠프 교육생들의 현실적인 필요를 충족시키기 위해 만들어졌습니다.
부트캠프는 강도 높은 학습 환경 속에서 짧은 시간에 최대한 많은 지식을 습득해야 하는 과정이기 때문에, 교육생들은 때로 고립감을 느낄 수 있습니다.
또한 기수가 다른 교육생들 간의 네트워킹과 정보 공유가 어렵습니다. 현실적으로는 이러한 기회를 충분히 제공받지 못하는 경우가 많습니다.
이를 해결하고자 이 서비스를 개발하게 되었습니다.

<hr>

## 💡 프로젝트 배경 및 필요성
<details>
<summary><strong>자세히 보기</strong></summary>

- 부트캠프 교육생들의 특수한 환경

   부트캠프는 집중적인 학습과 빡빡한 일정으로 인해, 다른 사람들과 소통하거나 도움을 주고받을 시간이 제한됩니다.
  이때 동료들과 정보를 공유하고 네트워킹할 수 있는 공간이 있으면 학습 효율이 크게 향상될 수 있습니다.
  하지만 부트캠프 자체에서는 충분한 소통 기회를 제공하지 못할 수 있기 때문에, 이를 보완할 수 있는 서비스가 필요합니다.

- 시간 관리와 생활의 불편함

   바쁜 교육 일정 속에서 식사 해결이나 동료와의 정보 공유는 귀찮게 느껴질 수 있습니다.
  이 서비스는 맛집 추천이나 배달 팟 모집 기능을 통해, 학습 외의 불편함을 최소화하면서 동료와 자연스럽게 교류하고,
  함께 배달을 시켜 시간과 비용을 절감할 수 있도록 도와줍니다.

- 심리적 지원과 소통의 필요

   부트캠프는 정신적으로나 육체적으로 매우 부담이 큰 과정입니다.
  익명으로 고민을 나누고, 다른 교육생들과 쉽게 소통할 수 있는 안전한 공간이 없다면, 심리적 부담은 더욱 커질 수 있습니다.
  이를 해소할 수 있는 익명 게시판과 실시간을 제공해 소통을 활성화하고 심리적 지지를 받을 수 있도록 합니다.

- 효율적인 정보 공유

   부트캠프에서는 빠른 정보 공유가 학습의 질을 높일 수 있습니다.
  새로운 학습 자료, 유용한 사이트, 꿀팁 등이 있을 때, 동료들과 정보를 신속하게 공유하고 토론할 수 있는 공간이 필요합니다.
  이 서비스의 게시판과 기능을 통해 교육생들은 자신의 경험과 학습 방법을 쉽게 나누고, 최신 정보를 신속하게 공유할 수 있습니다.

</details>
<hr>

## 💡 ITTA-BAB의 경쟁력
<details>
<summary><strong>자세히 보기</strong></summary>

- 동료 간의 자연스러운 네트워킹을 촉진
   부트캠프의 중요한 자산은 같은 목표를 가진 동료들입니다. 하지만 동료들과의 자연스러운 소통 기회가 부족할 때
  , 이 서비스가 이를 보완하여 음식, 배달, 정보 공유 등의 활동을 통해 교육생 간의 협력과 네트워킹을 촉진하고자 했습니다.

- 효율적인 시간 관리와 생활 편의성을 제공
   식사 문제나 생활 속 소소한 고민을 해결하기 위해 시간을 쏟는 대신, 배달 팟 모집이나 맛집 추천 기능을 통해 시간을 절약하고 편리하게 생활할 수 있도록 돕습니다.
  또한, 다양한 정보 공유 기능으로 서로 도움을 주고받으며 학습 시간을 최대한 확보할 수 있습니다

- 심리적 스트레스 해소와 커뮤니티 형성
   익명 게시판을 통해 교육생들이 마음속 고민을 털어놓고, 서로의 경험을 공유하며 심리적 지지를 받을 수 있는 커뮤니티를 제공합니다.
  이는 학습 과정에서 생기는 스트레스 해소에도 중요한 역할을 할 것입니다.

- 정보 공유의 효율성
   학습 중에 발견한 유용한 자료나 성공적인 학습 방법을 빠르게 동료들과 공유하는 것이 중요합니다.
   게시판과 채팅 기능을 통해 교육생들이 서로 팁과 정보를 신속히 공유하고, 실시간으로 질문하고 답변을 주고받을 수 있습니다.
   이를 통해 협력적 학습 환경이 조성됩니다.

</details>
<hr>

## 🏷️ 화면 설계서

[![🏷️ 화면 설계서 상세보기](/images/figma.png)](https://www.figma.com/design/hLawLTl9M0Qj1gXaqXdFFg/%EC%9D%B4%EB%94%B0%EB%B0%A5?node-id=0-1&t=tSZSM4NyRxEFFHzG-1)


<hr>

## 📝 기능 명세서

[![📝 기능 명세서 상세보기](/images/list.png)](https://docs.google.com/spreadsheets/d/1LzQABzEnEMkKeeP6o334z52HFMVH8R5BJJ9wbEo9lyI/edit?gid=0#gid=0)

<hr>

## 📌 테스트 결과 보고서

### 📗 회원
<details>
<summary><strong>회원가입</strong></summary>

![](/images/user/signup.gif)
</details>

<details>
<summary><strong>로그인</strong></summary>

![](/images/user/login.gif)
</details>

<details>
<summary><strong>로그아웃</strong></summary>

![](/images/user/logout.gif)
</details>

<details>
<summary><strong>아이디 찾기</strong></summary>

![](/images/user/findid.gif)
</details>

<details>
<summary><strong>비밀번호 찾기</strong></summary>

![](/images/user/findpwd.gif)
</details>

### 📗 마이페이지
<details>
<summary><strong>내 친구 목록</strong></summary>

![](/images/mypage/myfriend.gif)
</details>

<details>
<summary><strong>내 문의 목록</strong></summary>

![](/images/mypage/myfriend.gif)
</details>

<details>
<summary><strong>내 작성글 목록</strong></summary>

![](/images/mypage/mypost.gif)
</details>

<details>
<summary><strong>내 즐겨찾기 목록</strong></summary>

![](/images/mypage/mybookmark.gif)
</details>

<details>
<summary><strong>내 신고 목록</strong></summary>

![](/images/mypage/myreport.gif)
</details>

<details>
<summary><strong>내 리뷰 목록</strong></summary>

![](/images/mypage/myreview.gif)
</details>

<details>
<summary><strong>내 작성 댓글 목록</strong></summary>

![](/images/mypage/mycomment.gif)
</details>

<details>
<summary><strong>내 알림 목록</strong></summary>

![](/images/mypage/mynotification.gif)
</details>

<details>
<summary><strong>내 알림 더보기</strong></summary>

![](/images/mypage/morenotification.gif)
</details>

<br>

<details>
<summary><strong>회원정보 수정</strong></summary>

![](/images/mypage/updateuser.gif)
</details>
<details>
<summary><strong>회원정보 삭제</strong></summary>

![](/images/mypage/deleteuser.gif)
</details>

### 📗 관리자
<details>
<summary><strong>부트캠프 등록</strong></summary>

![](/images/bootcamp/bootcampCreate.gif)
</details>
<details>
<summary><strong>부트캠프 수정</strong></summary>

![](/images/bootcamp/bootcampUpdate.gif)
</details>
<details>
<summary><strong>훈련과정 등록</strong></summary>

![](/images/bootcamp/courseCreate.gif)
</details>
<details>
<summary><strong>훈련 과정 수정</strong></summary>

![](/images/bootcamp/courseUpdate.gif)
</details>
<details>
<summary><strong>훈련 기관 목록</strong></summary>

![](/images/bootcamp/bootCamplist.gif)
</details>

### 📗 좋아요
<details>
<summary><strong>좋아요 추가 및 삭제</strong></summary>

![](/images/heart.gif)
</details>

### 📗 문의
<details>
<summary><strong>문의하기</strong></summary>

![](/images/inquiry/inquiryCreate.gif)
</details>
<details>
<summary><strong>관리자 문의 답변</strong></summary>

![](/images/inquiry/inquiryAnswerAdmin1.gif)
</details>

### 📗 신고
<details>
<summary><strong>신고하기</strong></summary>

![](/images/report/ReportOK.gif)
</details>
<details>
<summary><strong>신고하기(예외)</strong></summary>

![](/images/report/ReportSamePerson.gif)
</details>
<details>
<summary><strong>관리자 신고 처리</strong></summary>

![](/images/report/reportAdmin.gif)
</details>

### 📗 일정
<details>
<summary><strong>일정 등록</strong></summary>

![](/images/schedule/scheduleAdd.gif)
</details>

<details>
<summary><strong>일정 수정</strong></summary>

![](/images/schedule/scheduleUpdate.gif)
</details>

<details>
<summary><strong>일정 삭제</strong></summary>

![](/images/schedule/scheduleDelete.gif)
</details>

### 📗 친구
<details>
<summary><strong>친구 수락</strong></summary>

![](/images/friend/friendaccept.gif)
</details>
<details>
<summary><strong>친구 신청</strong></summary>

![](/images/friend/friendadd.gif)
</details>
<details>
<summary><strong>친구 삭제</strong></summary>

![](/images/friend/frienddelete.gif)
</details>
<details>
<summary><strong>친구 목록, 친구 요청 목록</strong></summary>

![](/images/friend/friendreject.gif)
</details>

### 📕 모임
<details>
<summary><strong>모임 카테고리 등록</strong></summary>

![](/images/group/gorup-category-register.gif)
</details>
<details>
<summary><strong>모임 카테고리 삭제</strong></summary>

![](/images/group/group-category-delete.gif)
</details>
<details>
<summary><strong>모임 삭제</strong></summary>

![](/images/group/group-detail.gif)
</details>
<details>
<summary><strong>모임 참여</strong></summary>

![](/images/group/group-join.gif)
</details>
<details>
<summary><strong>모임 목록</strong></summary>

![](/images/group/group-list.gif)
</details>
<details>
<summary><strong>모임 등록</strong></summary>

![](/images/group/group-register.gif)
</details>
<details>
<summary><strong>참여한 모임 목록</strong></summary>

![](/images/group/join-group.gif)
</details>

### 📘 게시판
<details>
<summary><strong>게시판 글 작성</strong></summary>

![](/images/board/postCreate.gif)
</details>
<details>
<summary><strong>게시판 페이징</strong></summary>

![](/images/board/page.gif)
</details><details>
<summary><strong>게시판 정렬</strong></summary>

![](/images/board/list.gif)
</details><details>
<summary><strong>게시판 댓글</strong></summary>

![](/images/board/comment.gif)
</details>
<details>
<summary><strong>게시판 대댓글</strong></summary>

![](/images/board/subComment.gif)
</details>

### 📙 가게
<details>
<summary><strong>가게 등록</strong></summary>

![](/images/store/storeCreate.gif)
</details>
<details>
<summary><strong>지도 API</strong></summary>

![](/images/store/Map.gif)
</details>
<details>
<summary><strong>검색 및 정렬</strong></summary>

![](/images/store/storeSearch.gif)
</details>
<details>
<summary><strong>가게 메뉴 추가</strong></summary>

![](/images/store/storeMenuCreate.gif)
</details>
<details>
<summary><strong>가게 메뉴 수정</strong></summary>

![](/images/store/storeMenuUpdate.gif)
</details>
<details>
<summary><strong>가게 수정</strong></summary>

![](/images/store/storeUpdate.gif)
</details>
<details>
<summary><strong>가게 즐겨찾기 추가, 삭제</strong></summary>

![](/images/store/storeFavoriteCreateDelete.gif)
</details>
<details>
<summary><strong>리뷰 등록 및 조회</strong></summary>

![](/images/store/reviewList.gif)
</details>


## 🍀 팀 회고

---

| 팀원  | 한마디                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 김민주 |백엔드와 프론트엔드 프로젝트를 진행하면서 웹 애플리케이션의 전반적인 흐름을 깊이 이해할 수 있었습니다. 화면을 구성할 때 필요한 데이터와 데이터 호출 방식에 대해 고민하며 진행했습니다. 처음으로 프론트엔드 프로젝트를 진행하며 초기 설정의 중요성을 배웠습니다. 처음 설정을 제대로 해놓지 않으면 유지 보수와 코드 확장성이 떨어질 수 있다는 점을 실감했습니다. Vue 프레임워크를 새롭게 배우며 이를 느꼈습니다. 코드가 다소 지저분해진 부분이 아쉽지만, 다음 프로젝트에서는 더 체계적이고 깔끔하게 코드를 구성할 수 있을 것 같습니다. 프론트엔드와 백엔드가 서로 어떻게 소통하고, API를 통해 데이터를 주고받아야 하는지 배울 수 있었습니다. 특히 데이터 전송이나 API 설계의 중요성을 다시 느꼈습니다. 이번 프로젝트에서 배운 점을 토대로 앞으로는 더 깔끔하고 효율적인 코드와 구조로 프로젝트를 진행하고 싶습니다.|
| 박설빈 |처음해 본 프론트 프로젝트였습니다. 이 프로젝트를 통해 오히려 백엔드에 대한 이해가 더 깊어졌습니다. 백엔드에서 어떤 데이터를 보내야 할지에 대한 감을 잡을 수 있었습니다. 단순히 필요한 데이터에 대한 요구사항을 보고 구현하는 것과 달리 몸소 어떤 데이터가 필요할지를 스스로 고민하고 경험하면서 웹 개발에 대한 이해도를 높일 수 있었습니다. 다음 백엔드 프로젝트에서는 더욱 완성도 있는 결과물을 낼 수 있을 것이라는 자신감이 생겼습니다.|
| 신민철 |이번 프론트 프로젝트를 진행하면서 폴더 구조와 모듈화의 중요성에 대해 깊이 느꼈습니다. Vue.js에 대해 이해 부족으로, 컴포넌트 간의 props와 emit으로 데이터 주고받기를 처리하기 어려워 모듈화를 하지 않은 하나의 부모 컴포넌트에서 스파게티 코드 상태로 진행하는 경우가 대부분이었는데, 좀 더 잘했으면 어땠을지 하는 아쉬움이 남습니다. 백엔드 프로젝트를 진행할때 API를 만들고 테스트하면서도 프론트에서 어떤 데이터가 필요할지 모호한 부분이 존재하였는데 그 부분을 고민해보고 경험하는 시간이 되었습니다. 최종 프로젝트 때에는 지금의 부족한 부분을 잘 보완하여 자립해 나가는 백엔드 개발자가 되고 싶습니다.|
| 이성민 |이번 프론트엔드 프로젝트는 정말 도전이 많은 경험이었습니다. 특히 웹 기반 프로젝트를 처음부터 끝까지 책임지고 작업하면서, 생각보다 쉽지 않았던 부분들이 많았습니다. 프로젝트 초반에는 전체적인 구조를 어떻게 잡을지 고민이 많았고, 그 과정에서 여러 가지 어려운 점들을 마주하게 되었습니다. 컴포넌트 간 데이터 전달, 상태 관리, 그리고 화면 디자인 같은 부분들이 예상보다 시간이 많이 걸리고 복잡했습니다. 하지만 이런 문제들을 하나씩 해결해 나가면서, 정말 많은 것을 배울 수 있었습니다.|
| 임광택 |이따밥 프로젝트를 통해 Vue.js와 웹소켓 통신에 대한 깊은 이해를 얻었습니다. Vue.js의 컴포넌트 기반 아키텍처를 활용하여 재사용성과 유지보수성을 높였고, Vuex를 통해 애플리케이션의 상태를 중앙에서 관리하여 사용자 경험을 개선했습니다. 또한, Vue Router를 사용하여 SPA 내에서 자연스러운 페이지 전환을 구현하였습니다. 웹소켓을 통해 실시간 데이터 통신을 구현하여 채팅 기능을 활성화하고, 이벤트 기반 통신 모델을 통해 사용자 인터페이스를 즉각적으로 업데이트할 수 있었습니다. 이 프로젝트는 저에게 이론적인 지식이 실제 개발에 어떻게 적용되는지를 체험하게 하였고, 문제 해결 능력과 협업의 중요성을 깨닫게 해주는 소중한 경험이었습니다.|
| 최두혁 |이번 프론트 프로젝트를 진행하면서 웹 페이지의 일련의 생성 과정을 다 알게 되었습니다. 백엔드에서 보내는 api를 가지고 와서 뷰라는 프론트 틀을 통해 원하는 결과를 보여주는 작업이 고되지만 신기했습니다.페이지 내부에서 일어나야할 스크립트 구문 로직을 구성하는 것이 역시 제일 어려웠으며, 뷰의 기본 제공인 컴포넌트 재활용이 하나의 페이지의 코드 길이를 줄여주고 가독성을 높여주는 것이 얼마나 큰 기능인지 몸소 깨닫게 되었습니다. 완벽한 웹 페이지를 위해서는 백과 프론트의 유기적인 설계가 중요하다고 느꼈습니다. 좋은 경험이었습니다. 마지막으로 고생한 팀원들에게 감사함을 전달하고 싶습니다.|