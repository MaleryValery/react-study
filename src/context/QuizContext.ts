import { Dispatch, createContext, useContext } from 'react';
import { initState } from '../conts';
import { ActionType, StateType } from '../types';

type DispathcFn = { dispatch: Dispatch<ActionType> };
type InitValue = StateType & DispathcFn;

const initValue: InitValue = {
  ...initState,
  dispatch: () => {},
};

export const QuizContext = createContext<InitValue>(initValue);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('QuizContext is used outside of QuizProvider');

  return context;
};
