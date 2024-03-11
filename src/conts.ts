export enum Status {
  loading,
  error,
  ready,
  active,
  finishs,
}

export const ACTION = {
  dataReceived: 'dataReceived',
  dataFailed: 'dataFailed',
  start: 'start'
};
