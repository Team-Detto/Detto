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
  content: string;
  date: number;
  displayName: string;
  isRead: boolean;
  noteId: string;
  photoURL: string;
  title: string;
  uid: string;
}
