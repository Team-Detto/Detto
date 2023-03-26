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

interface UserInfoWithUid extends UserInfo {
  uid: string;
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

interface Window {
  Kakao: any;
}

namespace Position {
  interface Developers {
    planner: number;
    designer: number;
    frontend: number;
    backend: number;
  }
}

namespace WriteType {
  interface WriteFormType {
    title: string;
    positions: Position.Developers;
    plannerStack: string[];
    developerStack: string[];
    designerStack: string[];
    thumbnail: any;
    startDate: string;
    endDate: string;
    deadline: string;
  }

  interface WriteDataType extends WriteFormType {
    view: number;
    like: number;
    createdAt: number;
    isRecruiting: boolean;
  }
}

namespace EditType {
  interface EditFormType {
    uid: string;
    id: string;
    title: string;
    content: string;
    thumbnail: string;
    positions: Position.Developers;
    plannerStack: string[];
    developerStack: string[];
    designerStack: string[];
    startDate: number | string;
    endDate: number | string;
    deadline: number | string;
    createdAt: number | string;
    isRecruiting: boolean;
    view: number;
    like: number;
    frontend: number;
    backend: number;
    planner: number;
    designer: number;
  }
}

interface ProjectType {
  applicants: string[];
  content: string;
  createdAt: number;
  deadline: number;
  plannerStack: string[];
  designerStack: string[];
  developerStack: string[];
  endDate: number;
  id: string;
  isRecruiting: boolean;
  like: number;
  positions: Position.Developers;
  startDate: number;
  thumbnail: string;
  title: string;
  uid: string;
  view: number;
}
