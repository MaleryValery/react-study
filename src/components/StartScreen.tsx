import { Dispatch } from 'react';
import { ACTION } from '../conts';
import { ActionType } from '../types';
import Difficulty from './Difficulty';

type StartScreenType = {
  numberQuestions: number;
  dispatch: Dispatch<ActionType>;
  level: string | null;
};

function StartScreen({ numberQuestions, dispatch, level }: StartScreenType) {
  return (
    <div className="app">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numberQuestions} questions to check your mastery</h3>
      <Difficulty onDispatch={dispatch} level={level} />
      <button
        className="btn"
        type="button"
        onClick={() => dispatch({ type: ACTION.start })}
      >
        All questions
      </button>
    </div>
  );
}

export default StartScreen;
