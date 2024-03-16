import { Dispatch } from 'react';
import { ActionType } from '../types';
import { ACTION } from '../conts';

function NextButton({
  answer,
  onDispatch,
  currentQuestion,
  numQuestions,
}: {
  answer: number | null;
  numQuestions: number;
  currentQuestion: number;
  onDispatch: Dispatch<ActionType>;
}) {
  if (answer === null) return null;

  const handleClickNext = () => {
    onDispatch({ type: ACTION.nextQuestion });
  };
  const handleClickFinish = () => {
    onDispatch({ type: ACTION.finish });
  };
  if (currentQuestion < numQuestions - 1)
    return (
      <button type="button" className="btn btn-ui" onClick={handleClickNext}>
        next
      </button>
    );
  if (currentQuestion === numQuestions - 1)
    return (
      <button type="button" className="btn btn-ui" onClick={handleClickFinish}>
        finish
      </button>
    );
}

export default NextButton;
