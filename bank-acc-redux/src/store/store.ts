import { combineReducers, createStore } from 'redux';

const initStateAcc = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: '',
};
const initStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

type AccountActions =
  | { type: 'acc/deposit'; payload: number }
  | { type: 'acc/withdraw'; payload: number }
  | { type: 'acc/requestLoan'; payload: { loan: number; purpose: string } }
  | { type: 'acc/payLoan' };

type CustomerActions =
  | { type: 'customer/createCustomer'; payload: typeof initStateCustomer }
  | { type: 'customer/updateCustomer'; payload: string };

function customerReducer(state = initStateCustomer, action: CustomerActions) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateCustomer':
      return { ...state, fullName: action.payload };

    default:
      return state;
  }
}

function accountReducer(state = initStateAcc, action: AccountActions) {
  switch (action.type) {
    case 'acc/deposit':
      return { ...state, balance: state.balance + action.payload };
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
        loan: 0,
        balance: state.balance - state.loanAmount,
        loanPurpose: '',
      };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// store.dispatch({ type: 'acc/deposit', payload: 3000 });
// store.dispatch({ type: 'acc/withdraw', payload: 400 });
// store.dispatch({
//   type: 'acc/requestLoan',
//   payload: { loan: 400, purpose: 'study' },
// });
// store.dispatch({ type: 'acc/payLoan' });

// console.log('Hi redux');
console.log(store.getState());

function deposit(amount: number): AccountActions {
  return { type: 'acc/deposit', payload: amount };
}
function withdraw(amount: number): AccountActions {
  return { type: 'acc/withdraw', payload: amount };
}
function requestLoan(amount: number, purpose: string): AccountActions {
  return {
    type: 'acc/requestLoan',
    payload: { loan: amount, purpose },
  };
}
function payLoan(): AccountActions {
  return { type: 'acc/payLoan' };
}

store.dispatch(deposit(3000));
store.dispatch(withdraw(400));
store.dispatch(requestLoan(2000, 'car'));
store.dispatch(payLoan());

console.log(store.getState());

function createCustomer(fullName: string, id: string): CustomerActions {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID: id, createdAt: new Date().toISOString() },
  };
}
function updateCustomer(fullName: string): CustomerActions {
  return {
    type: 'customer/updateCustomer',
    payload: fullName,
  };
}

store.dispatch(createCustomer('lerere', 'asdsd'));
store.dispatch(updateCustomer('lerere !!!!'));

console.log(store.getState());
