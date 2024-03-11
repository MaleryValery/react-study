import { useEffect, useReducer, Dispatch } from 'react';
import MainSection from './MainSection';
import Header from './Header';
import Error from './Error';
import Loader from './Loader';

import { Status, ACTION } from '../conts';
import { ActionType, QuestionType, StateType } from '../types';
import StartScreen from './StartScreen';
import Question from './Question';

const initState: StateType = {
  questions: [],
  status: Status.loading,
};

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case ACTION.dataReceived:
      return { ...state, questions: action.payload, status: Status.ready };
    case ACTION.dataFailed:
      return { ...state, status: Status.error };
    case ACTION.start:
      return { ...state, status: Status.active };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { status, questions } = state;

  const numQuestions = questions.length;

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((data) => data.json())
      .then((data: QuestionType[]) =>
        dispatch({ type: ACTION.dataReceived, payload: data })
      )
      .catch(() => dispatch({ type: ACTION.dataFailed }));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainSection>
        {status === Status.loading && <Loader />}
        {status === Status.error && <Error />}
        {status === Status.ready && (
          <StartScreen numberQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === Status.active && <Question question={question} />}
      </MainSection>
    </div>
  );
}

export default App;
