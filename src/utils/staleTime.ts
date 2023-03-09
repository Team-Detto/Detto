export const staleTime = {
  inboxNotes: 1000 * 60 * 1, // 1분 (로그인한 사용자의 받은 쪽지)
  outboxNotes: 1000 * 60 * 1, // 1분 (로그인한 사용자의 보낸 쪽지)
  notifications: 1000 * 60 * 1, // 1분 (로그인한 사용자의 받은 알림)
  user: 1000 * 60 * 1, // 1분 (단일 유저 ['users', uid])
  users: 1000 * 60 * 3, // 3분 (전체 유저 ['users'])
  myProjects: 1000 * 60 * 1, // 1분 (공개프로필/마이페이지 프로젝트 ['myProjects'])
  mostViewedPosts: 1000 * 60 * 5, // 5분 (인기 포스트 ['posts', 'mostViewed'])
  mostLikedPosts: 1000 * 60 * 5, // 5분 (인기 포스트 ['posts', 'mostLiked'])
  filterPost: Infinity, // 무한 (필터링용 전체 포스트 ['post', 'projectIdList']) 포스트 삭제될 때만 invalidation
  likedProjects: 1000 * 60 * 3, // 3분 (좋아요한 프로젝트 ['likedProjects']),
  project: 1000 * 60 * 3, // 3분 (단일 프로젝트 ['projects', projectId])
};
