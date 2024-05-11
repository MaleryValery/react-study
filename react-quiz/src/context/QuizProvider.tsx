import { ReactNode, useEffect, useMemo, useReducer } from 'react';
import { QuizContext } from './QuizContext';
import { ActionType, QuestionType, StateType, Status } from '../types';
import { SEC_PER_QUES, initState } from '../conts';

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: Status.ready,
      };
    case 'dataFailed':
      return { ...state, status: Status.error };
    case 'start':
      return {
        ...state,
        status: Status.active,
        secLeft: SEC_PER_QUES * state.questions.length,
      };
    case 'finish':
      return {
        ...state,
        status: Status.finish,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case 'restart':
      return {
        ...initState,
        questions: state.questions,
        status: Status.active,
        secLeft: SEC_PER_QUES * state.questions.length,
      };
    case 'level': {
      const filteredQuestion = state.questions.filter((q) => {
        if (action.payload === 'easy') return q.points < 20;
        if (action.payload === 'medium') return q.points < 30;
        if (action.payload === 'hard') return q.points >= 30;
        return q;
      });
      return {
        ...state,
        level: action.payload ? action.payload : null,
        questions: filteredQuestion,
      };
    }
    case 'answerReceived': {
      const question = state.questions.at(state.currentQuestion);
      return {
        ...state,
        answer: action.payload,
        progress: state.progress + 1,
        points:
          action.payload === question?.correctOption
            ? state.points + (question?.points || 0)
            : state.points,
      };
    }
    case 'nextQuestion':
      return {
        ...state,
        currentQuestion:
          state.currentQuestion !== state.questions.length - 1
            ? state.currentQuestion + 1
            : state.currentQuestion,
        answer: null,
      };
    case 'time':
      return {
        ...state,
        status: state.secLeft === 0 ? Status.finish : state.status,
        secLeft: state.secLeft ? state.secLeft - 1 : state.secLeft,
      };

    default:
      return state;
  }
}

function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);

  const numQuestions = state.questions.length;
  const totalScore = state.questions.reduce((acc, el) => {
    // eslint-disable-next-line no-param-reassign
    acc += el.points;
    return acc;
  }, 0);
  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((data) => data.json())
      .then((data: QuestionType[]) =>
        dispatch({ type: 'dataReceived', payload: data })
      )
      .catch(() => dispatch({ type: 'dataFailed' }));
  }, []);

  const contextValue = useMemo(
    () => ({
      ...state,
      numQuestions,
      totalScore,
      dispatch,
    }),
    [state, dispatch, numQuestions, totalScore]
  );
  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
}

export default QuizProvider;
