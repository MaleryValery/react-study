export enum Status {
  loading,
  error,
  ready,
  active,
  finish,
}

export const ACTION = {
  dataReceived: 'dataReceived',
  dataFailed: 'dataFailed',
  start: 'start',
  answerReceived: 'answerReceived',
  nextQuestion: 'nextQuestion',
  finish: 'finish',
  restart: 'restart',
  time: 'time',
};

export const SEC_PER_QUES = 30;
