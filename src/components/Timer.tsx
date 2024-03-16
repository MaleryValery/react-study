import { Dispatch, useEffect } from 'react';
import { ActionType } from '../types';
import { ACTION } from '../conts';

function Timer({
  onDispatch,
  time,
}: {
  onDispatch: Dispatch<ActionType>;
  time: number | null;
}) {
  const formatTime = (timer: number) => {
    if (!timer) return null;
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      onDispatch({ type: ACTION.time });
    }, 1000);

    return () => clearInterval(timer);
  }, [onDispatch]);
  return <div className="timer">{formatTime(time || 0)}</div>;
}

export default Timer;
