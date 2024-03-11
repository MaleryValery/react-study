import { Status } from './conts';

export type StateType = {
  questions: QuestionType[];
  status: Status;
};

export type ActionType = {
  type: string;
  payload?: StateType | string | number;
};

export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};
