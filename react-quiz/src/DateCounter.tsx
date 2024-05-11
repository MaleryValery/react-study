import { ChangeEvent, useReducer } from 'react';

type StateType = {
  count: number;
  step: number;
};

type ActionType = {
  type: string;
  payload?: number;
};
const initState = {
  count: 0,
  step: 1,
};

// type ReducerFuntion = (state: number, action: ActionType) => StateType;

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'setStep':
      return { ...state, step: action.payload ?? 1 };
    case 'setCount':
      return { ...state, count: action.payload ?? state.count };
    case 'reset':
      return initState;
    default:
      return state;
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initState);

  const { count, step } = state;
  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = () => {
    dispatch({ type: 'dec' });
  };

  const inc = () => {
    dispatch({ type: 'inc' });
  };

  const defineCount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setCount', payload: +e.target.value });
  };

  const defineStep = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setStep', payload: +e.target.value });
  };

  const reset = () => {
    dispatch({ type: 'reset' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button type="button" onClick={dec}>
          -
        </button>
        <input value={String(count)} onChange={defineCount} />
        <button type="button" onClick={inc}>
          +
        </button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
export default DateCounter;
