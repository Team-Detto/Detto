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
