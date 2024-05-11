import { useQuizContext } from '../context/QuizContext';

function Options() {
  const { questions, currentQuestion, dispatch, answer } = useQuizContext();
  const question = questions[currentQuestion];
  const isAnswer = answer !== null;

  const checkAnswer = (answerIndex: number): string => {
    return answerIndex === question.correctOption ? 'correct' : 'wrong';
  };
  const handlerClickAnswer = (index: number) => {
    dispatch({ type: 'answerReceived', payload: index });
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
