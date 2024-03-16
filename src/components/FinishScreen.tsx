import { Dispatch } from 'react';
import { ActionType } from '../types';
import { ACTION } from '../conts';

function FinishScreen({
  points,
  maxPoints,
  onDispatch,
  highscore,
}: {
  points: number;
  maxPoints: number;
  highscore: number;
  onDispatch: Dispatch<ActionType>;
}) {
  const percentage = (points / maxPoints) * 100;

  let emoji = '';
  if (percentage === 100) emoji = '🥇';
  if (percentage < 100 && percentage >= 80) emoji = '🚀';
  if (percentage < 80 && percentage >= 50) emoji = '🎉';
  if (percentage < 50) emoji = '👀';

  const handleRestart = () => {
    onDispatch({ type: ACTION.restart });
  };

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        {` you scored ${points} out of ${maxPoints} 
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
