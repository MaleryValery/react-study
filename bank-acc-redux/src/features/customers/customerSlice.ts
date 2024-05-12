import { PayloadAction, createSlice } from '@reduxjs/toolkit';
const initStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

type State = {
  [key: string]: string;
};
const customerSlice = createSlice({
  name: 'customer',
  initialState: initStateCustomer,
  reducers: {
    createCustomer: {
      prepare(fullName: string, nationalID: string) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state: State, action: PayloadAction<State>) {
        (state.fullName = action.payload.fullName),
          (state.nationalID = action.payload.nationalID),
          (state.createdAt = action.payload.createdAt);
      },
    },
    updateCustomer(state: State, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
  },
});

export default customerSlice.reducer;
export const { createCustomer, updateCustomer } = customerSlice.actions;
