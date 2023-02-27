# 💜 Detto

![logo_main](https://user-images.githubusercontent.com/82587107/221075053-5e92bfbb-dc04-4187-a10e-01cc5ff60f68.gif)

- 프로젝트 기간 : 2023.02.06 ~ 2023.03.13

🔗 [배포링크](https://detto.vercel.app/)

🔗 [시연영상 유튜브](https://www.youtube.com/watch?v=LcIOjxE0Wxs&t=2s)

<br/>

### 소개

Develop Together, Grow Together, **Detto**

- 디토는 개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼 입니다.
- 프로젝트 모집글에 지원하고 초대받는 과정을 통해 더 좋은 시너지를 낼 수 있는 팀원을 만날 수 있습니다.

<br/>
<br/>

## 📝 회고 및 관련 기록

🎉 [프로젝트 S.A](https://sunohvoiin.notion.site/Detto-S-A-cc26bd8ec18f4d969cd06cfc412652fe)

<br/>
<br/>

## 🙌 팀원 소개

|           **FE 성효진**            |                **FE 배성완**                 |            **FE 이상원**             |
| :--------------------------------: | :------------------------------------------: | :----------------------------------: |
| [@su-no](https://github.com/su-no) | [@baesee0806](https://github.com/baesee0806) | [@vpvm96](https://github.com/vpvm96) |

|             **FE 이유정**              |             **FE 이정은**              |              **DE 위하연**               |
| :------------------------------------: | :------------------------------------: | :--------------------------------------: |
| [@yujleee](https://github.com/yujleee) | [@jeLee94](https://github.com/jeLee94) | [💌 hayeon](mailto:coolhayoen@gmail.com) |

<br/>
<br/>

## 🖥 기술 스택

| 구분                 | 사용 기술          |
| -------------------- | ------------------ |
| 언어                 | TypeScript         |
| UI                   | React              |
| 라우팅               | React Router Dom   |
| SEO                  | React Helmet Async |
| 스타일링             | Emotion            |
| 아이콘               | react-icons        |
| DB                   | Firebase Firestore |
| 서버 상태 관리       | React Query        |
| 클라이언트 상태 관리 | Recoil             |
| 번들러               | Webpack            |
| 패키지 관리 매니저   | Yarn Berry         |
| 에디터               | Toast UI Editor    |
| 캘린더               | React Calendar     |
| 슬라이더             | swiper             |

<br/>
<br/>

## 🗂 디렉토리 구조

```
📦src
 ┣ 📂apis
 ┣ 📂assets
 ┃ ┣ 📂images
 ┃ ┗ 📂styles
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂mobile
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┣ 📂myProjectList
 ┃ ┃ ┗  📂mobile
 ┃ ┣ 📂editpage
 ┃ ┃ ┗ 📂mobile
 ┃ ┣ 📂 findproject
 ┃ ┃ ┗ 📂 mobile
 ┃ ┣ 📂 login
 ┃ ┃ ┗ 📂 mobile
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂 Calendar
 ┃ ┃ ┣ 📂 banner
 ┃ ┃ ┣ 📂 findUsers
 ┃ ┃ ┗ 📂 recommendation
 ┃ ┣ 📂 mypage
 ┃ ┃ ┗ 📂 mobile
 ┃ ┣ 📂popup
 ┃ ┃ ┗ 📂mobile
 ┃ ┣ 📂projectDetail
 ┃ ┃ ┣ 📂ApplyModal
 ┃ ┃ ┣ 📂InviteModals
 ┃ ┃ ┣ 📂 mobile
 ┃ ┃ ┃ ┗ 📂 MobileModal
 ┃ ┣ 📂 publicProfile
 ┃ ┃ ┗ 📂 mobile
 ┃ ┣ 📂writepage
 ┃ ┣ 📜 ContentCard.tsx
 ┃ ┃ ...
 ┃ ┗ 📜index.ts
 ┣ 📂 hooks
 ┣ 📂 pages
 ┃ ┣ 📜 ErrorPage.tsx
 ┃ ┣ 📜 FindProjectPage.tsx
 ┃ ┣ 📜 LoadingPage.tsx
 ┃ ┣ 📜 MainPage.tsx
 ┃ ┣ 📜 MyPage.tsx
 ┃ ┣ 📜 ProjectDetailPage.tsx
 ┃ ┣ 📜 ProjectEditPage.tsx
 ┃ ┣ 📜 ProjectWritePage.tsx
 ┃ ┣ 📜 PublicProfilePage.tsx
 ┃ ┗ 📜 Root.tsx
 ┣ 📂 recoil
 ┣ 📂 routes
 ┣ 📂 types
 ┃ ┣ 📂 position
 ┃ ┣ 📂 write
 ┃ ┗ 📜 containerType.ts
 ┣ 📂 utils
 ┣ 📜 App.tsx
 ┣ 📜 index.tsx
 ┣ 📜 react-app-env.d.ts
 ┗ 📜 reportWebVitals.ts
```

- apis: api 호출 관련 파일들
- assets: 로고 및 이미지 파일들, 스타일 설정
- components: 각 페이지 컴포넌트들
- hooks: 커스텀 훅 컴포넌트들
- pages: 각 페이지 컴포넌트들
- recoil: 리코일 관련 파일
- routes: 라우터 설정 파일
- types: 타입 관련 파일들
- utils: 기타 공용적으로 사용하는 파일들

<br/>
<br/>

## 💡 구현 기능

- **로그인/회원가입**
  - 소셜 로그인 (구글, 페이스북, 깃허브)
  - 로그인/회원가입 완료 후 프로필, 기술 스택, 포지션 설정
  - 유효성 검사
- **메인**
  - 캘린더로 모집중인 프로젝트 조회
  - 진행중 프로젝트 조회
  - 이런 팀원 어때요? -> 랜덤 팀원 추천 
- **공개 프로필**
  - 닉네임, 사진, 이메일, 기술스택, 포지션 조회
  - 쪽지 보내기
  - 경력 1년 미만일 경우 새싹 배지
  - 모집 중/참여한 프로젝트 리스트 조회
- **마이페이지**
  - 닉네임, 사진, 기술스택, 포지션, 경력 수정
  - 유효성 검사
  - 회원탈퇴
  - 관심/지원한/작성한/참여중인 프로젝트 리스트 
- **헤더**
  - 로그인 / 비 로그인 시 네비게이션 다르게 노출
  - 페이지 이동 시 해당 메뉴 활성화
- **쪽지**
  - 쪽지 보내기/받기
  - 유효성 검사
  - 보낸 쪽지함/받은 쪽지함
- **알림**
  - 게시글 작성자 -> 지원자 있을 때 알림
  - 지원자 -> 매칭 되었을 때, 신청한 프로젝트가 마감 되었을 때 알림
- **프로젝트 구인 게시글 상세**
  - 모집 구분
  - 작성한 글 조회
  - 관심 기능
  - 공유 기능
  - 작성자 -> 수정, 삭제, 지원한 인원 프로필 열람 가능, 모집 마감
  - 지원자 -> 지원 / 지원 취소 기능
- **구인 게시글 작성**
  - 수정, 삭제 기능
  - 썸네일 이미지 추가 가능
  - 모집 포지션 인원, 기술 스택, 시작/종료/마감 기간 설정
  - Toast UI 에디터로 마크다운으로도 작성 가능
  - 유효성 검사

추후 추가 작성 예정
<br/>
<br/>
