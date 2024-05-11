import { useQuizContext } from '../context/QuizContext';

function FinishScreen() {
  const { points, totalScore, dispatch, highscore } = useQuizContext();
  const percentage = (points / totalScore) * 100;

  let emoji = '';
  if (percentage === 100) emoji = '🥇';
  if (percentage < 100 && percentage >= 80) emoji = '🚀';
  if (percentage < 80 && percentage >= 50) emoji = '🎉';
  if (percentage < 50) emoji = '👀';

  const handleRestart = () => {
    dispatch({ type: 'restart' });
  };

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        {` you scored ${points} out of ${totalScore} 
       (${Math.ceil(percentage)}%)`}
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button className="btn btn-ui" onClick={handleRestart} type="button">
        restart
      </button>
    </>
  );
}

export default FinishScreen;
