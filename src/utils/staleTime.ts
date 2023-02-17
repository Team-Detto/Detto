export const staleTime = {
  inboxNotes: 1000 * 60 * 1, // 1분 (로그인한 사용자의 받은 쪽지)
  outboxNotes: 1000 * 60 * 1, // 1분 (로그인한 사용자의 보낸 쪽지)
  notifications: 1000 * 60 * 1, // 1분 (로그인한 사용자의 받은 알림)
  user: 1000 * 60 * 1, // 1분 (단일 유저 ['users', uid])
  users: 1000 * 60 * 1, // 1분 (전체 유저 ['users'])
  mostViewedPosts: 1000 * 60 * 3, // 3분 (인기 포스트 ['posts', 'mostViewed'])
  mostLikedPosts: 1000 * 60 * 3, // 3분 (인기 포스트 ['posts', 'mostLiked'])
};
