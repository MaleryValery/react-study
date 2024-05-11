import { useQuizContext } from '../context/QuizContext';

function Progress() {
  const { currentQuestion, points, totalScore, numQuestions, progress } =
    useQuizContext();
  return (
    <header className="progress">
      <progress value={progress} max={numQuestions} />
      <p>
        Question <strong>{currentQuestion + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalScore} points
      </p>
    </header>
  );
}

export default Progress;
