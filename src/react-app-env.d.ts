/// <reference types="react-scripts" />

interface UserInfo {
  displayName: string;
  email: string | null;
  photoURL: string;
  isJunior: boolean;
  positions: string[];
  plannerStack: string[];
  designerStack: string[];
  developerStack: string[];
  isActive?: boolean;
}

interface Note {
  id: string;
  senderUid: string;
  receiverUid: string;
  date: number;
  title: string;
  content: string;
  isRead: boolean;
}

interface SendNote {
  title: string;
  content: string;
}

interface Notification {
  id: string;
  content: string;
  date: number;
  displayName: string;
  isRead: boolean;
  noteId: string;
  photoURL: string;
  title: string;
  uid: string;
  link?: { type: 'project' | 'profile'; id: string };
}

interface MypageInfoProps {
  user: User;
}
