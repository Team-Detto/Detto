import { Position } from 'types/position/positionType';

export namespace WriteType {
  export interface WriteFormType {
    title: string;
    positions: Position.Developers;
    plannerStack: string[];
    developerStack: string[];
    designerStack: string[];
    startDate: string;
    endDate: string;
    deadline: string;
  }

  export interface WriteDataType extends WriteFormType {
    view: number;
    like: number;
    createdAt: number;
    isRecruiting: boolean;
    isClosed: boolean;
  }
}

export namespace EditType {
  export interface EditFormType {
    uid: string;
    title: string;
    content: string;
    positions: Position.Developers;
    plannerStack: string[];
    developerStack: string[];
    designerStack: string[];
    startDate: number;
    endDate: number;
    deadline: number;
    createdAt: number;
    isRecruiting: boolean;
    isClosed: boolean;
    view: number;
    like: number;
    frontend: number;
    backend: number;
    planner: number;
    designer: number;
  }
}
