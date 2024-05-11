import { useQuizContext } from '../context/QuizContext';
import { DIFFICULTY_ARR } from '../conts';

function Difficulty() {
  const { dispatch, level } = useQuizContext();
  const handleChooseLevel = (levelBtn: string) => {
    dispatch({ type: 'level', payload: levelBtn });
    dispatch({ type: 'restart' });
  };
  return (
    <div className="difficulty">
      {Object.values(DIFFICULTY_ARR).map((btn) => {
        return (
          <button
            key={btn}
            type="button"
            className={`btn btn-ui ${level === btn ? 'btn-active' : ''}`}
            onClick={() => handleChooseLevel(btn)}
          >
            {btn}
          </button>
        );
      })}
    </div>
  );
}

export default Difficulty;
