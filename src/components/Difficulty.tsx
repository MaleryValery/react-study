import { Dispatch } from 'react';
import { ACTION, DIFFICULTY_ARR } from '../conts';
import { ActionType } from '../types';

function Difficulty({
  onDispatch,
  level,
}: {
  onDispatch: Dispatch<ActionType>;
  level: string | null;
}) {
  const handleChooseLevel = (levelBtn: string) => {
    onDispatch({ type: ACTION.level, payload: levelBtn });
    onDispatch({ type: ACTION.restart });
  };
  return (
    <div className="difficulty">
      {DIFFICULTY_ARR.map((btn) => (
        <button
          key={btn}
          type="button"
          className={`btn btn-ui ${level === btn ? 'btn-active' : ''}`}
          onClick={() => handleChooseLevel(btn)}
        >
          {btn}
        </button>
      ))}
    </div>
  );
}

export default Difficulty;
