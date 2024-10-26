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

### 📗 좋아요
<details>
<summary><strong>좋아요</strong></summary>

![](/images/)
</details>

### 📗 사진
<details>
<summary><strong>사진</strong></summary>

![](/images/)
</details>

### 📗 문의
<details>
<summary><strong>문의</strong></summary>

![](/images/)
</details>

### 📗 신고
<details>
<summary><strong>신고</strong></summary>

![](/images/)
</details>

### 📗 일정
<details>
<summary><strong>일정</strong></summary>

![](/images/)
</details>

### 📕 모임
<details>
<summary><strong>모임</strong></summary>

![](/images/)
</details>

### 📘 게시판
<details>
<summary><strong>게시판</strong></summary>

![](/images/)
</details>

### 📙 가게
<details>
<summary><strong>가게</strong></summary>

![](/images/)
</details>

## 🍀 팀 회고

---

| 팀원  | 한마디                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|-----|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 김민주 ||
| 박설빈 ||
| 신민철 ||
| 이성민 ||
| 임광택 ||
| 최두혁 ||