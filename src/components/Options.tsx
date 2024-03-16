import { ACTION } from '../conts';
import { QuestionComponentType } from '../types';

function Options({ question, onAnswer, answer }: QuestionComponentType) {
  const isAnswer = answer !== null;

  const checkAnswer = (answerIndex: number): string => {
    return answerIndex === question.correctOption ? 'correct' : 'wrong';
  };
  const handlerClickAnswer = (index: number) => {
    onAnswer({ type: ACTION.answerReceived, payload: index });
  };
  return (
    <>
      {question.options.map((option, i) => (
        <button
          disabled={isAnswer}
          type="button"
          className={`btn btn-option ${i === answer ? 'answer' : ''} 
          ${!isAnswer ? '' : checkAnswer(i)}`}
          key={option}
          onClick={() => handlerClickAnswer(i)}
        >
          {option}
        </button>
      ))}
    </>
  );
}

export default Options;
