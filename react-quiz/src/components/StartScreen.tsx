import Difficulty from './Difficulty';
import { useQuizContext } from '../context/QuizContext';

function StartScreen() {
  const { numQuestions, dispatch } = useQuizContext();
  return (
    <div className="app">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} questions to check your mastery</h3>
      <Difficulty />
      <button
        className="btn"
        type="button"
        onClick={() => dispatch({ type: 'start' })}
      >
        All questions
      </button>
    </div>
  );
}

export default StartScreen;
