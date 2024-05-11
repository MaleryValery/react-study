import { useEffect } from 'react';
import { useQuizContext } from '../context/QuizContext';

function Timer() {
  const { dispatch, secLeft } = useQuizContext();
  const formatTime = (timer: number) => {
    if (!timer) return null;
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'time' });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);
  return <div className="timer">{formatTime(secLeft || 0)}</div>;
}

export default Timer;
