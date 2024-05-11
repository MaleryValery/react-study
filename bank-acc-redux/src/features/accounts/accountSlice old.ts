import { Dispatch } from 'redux';
import { RootState } from '../../store/store';

const initStateAcc = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: '',
  isLoading: false,
};

type Currency = {
  amount: number;
  base: string;
  date: string;
  rates: { [key: string]: number };
};

type AccountActions =
  | { type: 'acc/loading'; payload: boolean }
  | { type: 'acc/deposit'; payload: number }
  | { type: 'acc/withdraw'; payload: number }
  | { type: 'acc/requestLoan'; payload: { loan: number; purpose: string } }
  | { type: 'acc/payLoan' };

export default function accountReducer(
  state = initStateAcc,
  action: AccountActions
) {
  switch (action.type) {
    case 'acc/loading':
      return { ...state, loading: action.payload };
    case 'acc/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case 'acc/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'acc/requestLoan':
      if (state.loanAmount > 0) return state;
      return {
        ...state,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.loan,
        loanAmount: action.payload.loan,
      };
    case 'acc/payLoan':
      return {
        ...state,
        loanAmount: 0,
        balance: state.balance - state.loanAmount,
        loanPurpose: '',
      };
    default:
      return state;
  }
}

export function deposit(amount: number, currency: string) {
  if (currency === 'USD') return { type: 'acc/deposit', payload: amount };

  return async function (
    dispatch: Dispatch<AccountActions>,
    getState: RootState
  ) {
    dispatch({ type: 'acc/loading', payload: true });
    const resp = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data: Currency = await resp.json();
    const amountUSD = data.rates.USD;
    dispatch({ type: 'acc/deposit', payload: amountUSD });
  };
}
export function withdraw(amount: number): AccountActions {
  return { type: 'acc/withdraw', payload: amount };
}
export function requestLoan(amount: number, purpose: string): AccountActions {
  return {
    type: 'acc/requestLoan',
    payload: { loan: amount, purpose },
  };
}
export function payLoan(): AccountActions {
  return { type: 'acc/payLoan' };
}
