import { StateType, Status } from './types';

export const SEC_PER_QUES = 30;

export const DIFFICULTY_ARR = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
};

export const initState: StateType = {
  questions: [],
  status: Status.loading,
  numQuestions: 0,
  totalScore: 0,
  currentQuestion: 0,
  answer: null,
  points: 0,
  progress: 0,
  highscore: 0,
  secLeft: null,
  level: null,
};
export { Status };
