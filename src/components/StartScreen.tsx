import { Dispatch } from 'react';
import { ACTION } from '../conts';
import { ActionType } from '../types';

type StartScreenType = {
  numberQuestions: number;
  dispatch: Dispatch<ActionType>;
};

function StartScreen({ numberQuestions, dispatch }: StartScreenType) {
  return (
    <div>
      <h2>Welcome to The React Quiz</h2>
      <h3>{numberQuestions} questions to check your mastery</h3>
      <button
        className="btn"
        type="button"
        onClick={() => dispatch({ type: ACTION.start })}
      >
        start
      </button>
    </div>
  );
}

export default StartScreen;
