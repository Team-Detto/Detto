# 💜 Detto

![logo_main](https://user-images.githubusercontent.com/82587107/221075053-5e92bfbb-dc04-4187-a10e-01cc5ff60f68.gif)

프로젝트 기간 : 2023.02.06 ~ 2023.03.13

🔗 [배포링크](https://detto.vercel.app/)

🔗 [시연영상 유튜브](https://www.youtube.com/watch?v=LcIOjxE0Wxs&t=2s)

🎉 [프로젝트 S.A](https://sunohvoiin.notion.site/Detto-S-A-cc26bd8ec18f4d969cd06cfc412652fe)

<br/>

## 프로젝트 소개

Develop Together, Grow Together, **Detto**

- 디토는 개발자를 위한 **사이드 프로젝트 팀 매칭 플랫폼** 입니다.
- 프로젝트 모집글에 지원하고 초대받는 과정을 통해 더 좋은 시너지를 낼 수 있는 팀원을 만날 수 있습니다.

<br/>
<br/>

## 🙌 팀원 소개

| FE 성효진                                                                                                 | FE 이유정                                                                                                   | FE 배성완                                                                                                      | FE 이상원                                                                                                  | FE 이정은                                                                                                   | DE 위하연                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://avatars.githubusercontent.com/u/88768022?v=4" alt="su-no" width="100px" height="100px"> | <img src="https://avatars.githubusercontent.com/u/82587107?v=4" alt="yujleee" width="100px" height="100px"> | <img src="https://avatars.githubusercontent.com/u/62400479?v=4" alt="baesee0806" width="100px" height="100px"> | <img src="https://avatars.githubusercontent.com/u/86472864?v=4" alt="vpvm96" width="100px" height="100px"> | <img src="https://avatars.githubusercontent.com/u/88365786?v=4" alt="jeLee94" width="100px" height="100px"> | <a href="mailto:coolhayoen@gmail.com"><img src="https://user-images.githubusercontent.com/88768022/222649383-f066a250-8d6d-4ec2-9889-8c04e60f4b05.png" alt="hayeon" width="100px" height="100px"></a> |

<br/>
<br/>

## 📅 프로젝트 일정

| Sprint   | 기간                  | 내용                            |
| -------- | --------------------- | ------------------------------- |
| 1 | 2023/2/6 - 2023/2/19  | 데스크탑 UI, MVP 기능 구현      |
| 2 | 2023/2/20 - 2023/2/24 | 모바일 UI 구현                  |
| 3 | 2023/2/27 - 2023/3/3  | 성능 최적화, UI 개선, 에러 점검 |
| 4 | 2023/3/4 - 2023/3/13  | 베타 테스터 피드백, 최종 발표   |

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
 ┃ ┃ ┣ 📂icon_skills
 ┃ ┣ 📂styles
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂mobile
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┣ 📂myProjectList
 ┃ ┃ ┃ ┣ 📂mobile
 ┃ ┣ 📂editpage
 ┃ ┃ ┣ 📂mobile
 ┃ ┣ 📂findproject
 ┃ ┃ ┣ 📂mobile
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📂mobile
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂Calendar
 ┃ ┃ ┣ 📂banner
 ┃ ┃ ┣ 📂findUsers
 ┃ ┃ ┗ 📂recommendation
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂mobile
 ┃ ┣ 📂popup
 ┃ ┃ ┣ 📂mobile
 ┃ ┣ 📂projectDetail
 ┃ ┃ ┣ 📂ApplyModal
 ┃ ┃ ┣ 📂InviteModals
 ┃ ┃ ┣ 📂mobile
 ┃ ┃ ┃ ┣ 📂MobileModal
 ┃ ┣ 📂publicProfile
 ┃ ┃ ┣ 📂mobile
 ┃ ┣ 📂writepage
 ┃ ┃ ┣ 📂mobile
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📜ErrorPage.tsx
 ┃ ┣ 📜FindProjectPage.tsx
 ┃ ┣ 📜LoadingPage.tsx
 ┃ ┣ 📜MainPage.tsx
 ┃ ┣ 📜MyPage.tsx
 ┃ ┣ 📜ProjectDetailPage.tsx
 ┃ ┣ 📜ProjectEditPage.tsx
 ┃ ┣ 📜ProjectWritePage.tsx
 ┃ ┣ 📜PublicProfilePage.tsx
 ┃ ┗ 📜Root.tsx
 ┣ 📂recoil
 ┣ 📂routes
 ┣ 📂types
 ┃ ┣ 📂position
 ┃ ┣ 📂write
 ┣ 📂utils
 ┣ 📜.DS_Store
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
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

**로그인/회원가입**

- 소셜 로그인 (구글, 페이스북, 깃허브)
- 로그인/회원가입 완료 후 프로필, 기술 스택, 포지션 설정
- 유효성 검사

**헤더**

- 로그인 / 비 로그인 시 네비게이션 다르게 노출
- 페이지 이동 시 해당 메뉴 활성화

**메인**

- 캘린더로 모집중인 프로젝트 조회
- 조회순/관심순 프로젝트 조회
- 포지션 별 팀원 조회

**프로젝트 찾기**

- 포지션 별 프로젝트 조회
- 모집 중인 프로젝트 조회

**프로젝트 구인 게시글 상세**

- 모집 인원, 필요 스택, 예상 기간
- 조회수
- 관심 기능
- 공유 기능
- 작성자 ➡️ 수정, 삭제, 지원한 인원 프로필 열람 가능, 모집 마감
- 지원자 ➡️ 지원 / 지원 취소 기능

**구인 게시글 작성**

- 모집 포지션 인원, 기술 스택, 시작/종료/마감 기간 설정
- 썸네일 이미지 추가 가능
- Toast UI 에디터로 마크다운 작성 가능
- 유효성 검사

**공개 프로필**

- 닉네임, 사진, 이메일, 기술 스택, 포지션 조회
- 쪽지 보내기
- 경력 1년 미만일 경우 새싹 배지
- 참여한/작성한 프로젝트 리스트 조회

**마이페이지**

- 닉네임, 사진, 기술스택, 포지션, 경력 수정
- 유효성 검사
- 회원탈퇴
- 지원한/참여한/작성한/관심있는 프로젝트 리스트 조회

**쪽지**

- 쪽지 읽기/보내기/답장하기
- 보낸 쪽지함/받은 쪽지함
- 유효성 검사

**알림**

- 게시글 작성자 ➡️ 지원자 있을 때 알림
- 지원자 ➡️ 매칭 되었을 때, 신청한 프로젝트가 마감 되었을 때 알림
- 알림을 클릭했을 때 해당 프로젝트/프로필 링크로 이동

<br/>
<br/>
