const initStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

type CustomerActions =
  | { type: 'customer/createCustomer'; payload: typeof initStateCustomer }
  | { type: 'customer/updateCustomer'; payload: string };

export default function customerReducer(
  state = initStateCustomer,
  action: CustomerActions
) {
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

export function createCustomer(fullName: string, id: string): CustomerActions {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID: id, createdAt: new Date().toISOString() },
  };
}
export function updateCustomer(fullName: string): CustomerActions {
  return {
    type: 'customer/updateCustomer',
    payload: fullName,
  };
}
