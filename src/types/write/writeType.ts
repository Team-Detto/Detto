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
