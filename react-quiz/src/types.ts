import { Dispatch } from 'react';

export type StateType = {
  questions: QuestionType[];
  status: Status;
  currentQuestion: number;
  answer: number | null;
  points: number;
  progress: number;
  highscore: number;
  secLeft: number | null;
  level: string | null;
  numQuestions: number;
  totalScore: number;
};

export type ActionType =
  | {
      type: 'dataReceived';
      payload: QuestionType[];
    }
  | {
      type: 'dataFailed';
    }
  | {
      type: 'answerReceived';
      payload: number;
    }
  | {
      type: 'nextQuestion';
    }
  | {
      type: 'time';
    }
  | {
      type: 'level';
      payload: string;
    }
  | {
      type: 'start';
    }
  | {
      type: 'restart';
    }
  | { type: 'finish' };

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

export enum Status {
  loading,
  error,
  ready,
  active,
  finish,
}
