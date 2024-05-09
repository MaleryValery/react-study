import { useQuizContext } from '../context/QuizContext';

function NextButton() {
  const { answer, dispatch, currentQuestion, numQuestions } = useQuizContext();
  if (answer === null) return null;

  const handleClickNext = () => {
    dispatch({ type: 'nextQuestion' });
  };
  const handleClickFinish = () => {
    dispatch({ type: 'finish' });
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
