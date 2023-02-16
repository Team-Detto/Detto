/// <reference types="react-scripts" />

interface User {
  displayName: string;
  email: string;
  isJunior: boolean;
  photoURL: string;
  positions: string[];
  plannerStack?: string[];
  designerStack?: string[];
  developerStack?: string[];
}

interface UserInfo {
  displayName: string;
  email: string | null;
  photoURL: string;
  isJunior: boolean;
  positions: string[];
  plannerStack: string[];
  designerStack: string[];
  developerStack: string[];
}

interface Note {
  id: string;
  senderUid: string;
  senderDisplayName: string;
  senderPhotoURL: string;
  receiverUid: string;
  receiverDisplayName: string;
  receiverPhotoURL: string;
  date: number;
  title: string;
  content: string;
  isRead: boolean;
}

interface Notification {
  id?: string;
  content: string;
  date: number;
  displayName: string;
  isRead: boolean;
  noteId: string;
  photoURL: string;
  title: string;
  uid: string;
}
