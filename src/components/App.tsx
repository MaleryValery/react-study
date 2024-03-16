import { useEffect, useReducer } from 'react';
import MainSection from './MainSection';
import Header from './Header';
import Error from './Error';
import Loader from './Loader';

import { Status, ACTION, SEC_PER_QUES } from '../conts';
import { ActionType, QuestionType, StateType } from '../types';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';
import Footer from './Footer';

const initState: StateType = {
  questions: [],
  status: Status.loading,
  currentQuestion: 0,
  answer: null,
  points: 0,
  progress: 0,
  highscore: 0,
  secLeft: null,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case ACTION.dataReceived:
      return {
        ...state,
        questions: action.payload as QuestionType[],
        status: Status.ready,
      };
    case ACTION.dataFailed:
      return { ...state, status: Status.error };
    case ACTION.start:
      return {
        ...state,
        status: Status.active,
        secLeft: SEC_PER_QUES * state.questions.length,
      };
    case ACTION.finish:
      return {
        ...state,
        status: Status.finish,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case ACTION.restart:
      return {
        ...initState,
        questions: state.questions,
        status: Status.active,
      };
    case ACTION.answerReceived: {
      const question = state.questions.at(state.currentQuestion);
      return {
        ...state,
        answer: action.payload as number,
        progress: state.progress + 1,
        points:
          action.payload === question?.correctOption
            ? state.points + (question?.points || 0)
            : state.points,
      };
    }
    case ACTION.nextQuestion:
      return {
        ...state,
        currentQuestion:
          state.currentQuestion !== state.questions.length - 1
            ? state.currentQuestion + 1
            : state.currentQuestion,
        answer: null,
      };
    case ACTION.time:
      return {
        ...state,
        status: state.secLeft === 0 ? Status.finish : state.status,
        secLeft: state.secLeft ? state.secLeft - 1 : state.secLeft,
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const {
    status,
    questions,
    currentQuestion,
    answer,
    points,
    progress,
    highscore,
    secLeft,
  } = state;

  const numQuestions = questions.length;
  const totalScore = questions.reduce((acc, el) => {
    // eslint-disable-next-line no-param-reassign
    acc += el.points;
    return acc;
  }, 0);
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
        {status === Status.active && (
          <>
            <Progress
              points={points}
              index={currentQuestion}
              numQuestions={numQuestions}
              totalScore={totalScore}
              progress={progress}
            />
            <Question
              onAnswer={dispatch}
              question={questions[currentQuestion]}
              answer={answer}
            />
            <Footer>
              <Timer onDispatch={dispatch} time={secLeft} />
              <NextButton
                currentQuestion={currentQuestion}
                numQuestions={numQuestions}
                onDispatch={dispatch}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === Status.finish && (
          <FinishScreen
            highscore={highscore}
            onDispatch={dispatch}
            points={points}
            maxPoints={totalScore}
          />
        )}
      </MainSection>
    </div>
  );
}

export default App;
