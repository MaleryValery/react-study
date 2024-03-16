import { Dispatch } from 'react';
import { Status } from './conts';

export type StateType = {
  questions: QuestionType[];
  status: Status;
  currentQuestion: number;
  answer: number | null;
  points: number;
  progress: number;
  highscore: number;
  secLeft: number | null;
};

export type ActionType = {
  type: string;
  payload?: QuestionType[] | Status | string | number;
};

export type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type QuestionComponentType = {
  question: QuestionType;
  onAnswer: Dispatch<ActionType>;
  answer: number | null;
};
