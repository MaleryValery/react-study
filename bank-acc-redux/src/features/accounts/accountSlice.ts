import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';

const initStateAcc = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: '',
  isLoading: false,
};

type State = {
  balance: number;
  loanAmount: number;
  loanPurpose: string;
  isLoading: boolean;
};

type Currency = {
  amount: number;
  base: string;
  date: string;
  rates: { [key: string]: number };
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initStateAcc,

  reducers: {
    deposit(state: State, action: PayloadAction<number>) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state: State, action: PayloadAction<number>) {
      state.balance -= action.payload;
    },
    requestLoan(
      state: State,
      action: PayloadAction<{ loan: number; purpose: string }>
    ) {
      if (state.loanAmount > 0) return;
      state.balance += action.payload.loan;
      state.loanAmount = action.payload.loan;
      state.loanPurpose = action.payload.purpose;
    },
    payLoan(state: State) {
      state.balance -= state.loanAmount;
      state.loanAmount = 0;
      state.loanPurpose = '';
    },
    convertingCurency(state: State) {
      state.isLoading = true;
    },
  },
});
console.log(accountSlice);

export function deposit(amount: number, currency: string) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  return async function (dispatch: Dispatch) {
    dispatch({ type: 'account/convertingCurency', payload: true });
    const resp = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data: Currency = await resp.json();
    console.log('🚀 ~ data:', data);
    const amountUSD = data.rates.USD;
    dispatch({ type: 'account/deposit', payload: amountUSD });
  };
}

export default accountSlice.reducer;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
