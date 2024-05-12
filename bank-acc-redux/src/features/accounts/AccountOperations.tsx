import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deposit, payLoan, requestLoan, withdraw } from './accountSlice';
// import accountReducer from './accountSlice';

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number | null>(null);
  const [currentLoan, setCurrentLoan] = useState<number | null>(null);
  const [currLoanPurpose, setCurrLoanPurpose] = useState('');
  const [currency, setCurrency] = useState('USD');

  const dispatch = useAppDispatch();
  const { loanAmount, balance, isLoading } = useAppSelector(
    (store) => store.account
  );
  console.log(
    '🚀 ~ AccountOperations ~ acount:',
    loanAmount,
    balance,
    isLoading
  );

  function handleDeposit(): void {
    if (!depositAmount) return;
    dispatch(deposit(depositAmount, currency));
    setDepositAmount(null);

    setCurrency('USD');
  }

  function handleWithdrawal(): void {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount(null);
  }

  function handleRequestLoan(): void {
    if (!currentLoan || !currLoanPurpose) return;
    dispatch(requestLoan({ loan: currentLoan, purpose: currLoanPurpose }));

    setCurrentLoan(null);
    setCurrLoanPurpose('');
  }

  function handlePayLoan(): void {
    dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount ?? ''}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button disabled={isLoading} onClick={handleDeposit}>
            {isLoading ? 'Converting..' : `Deposit ${depositAmount || ''}`}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount ?? ''}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={currentLoan ?? ''}
            onChange={(e) => setCurrentLoan(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={currLoanPurpose}
            onChange={(e) => setCurrLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {loanAmount > 0 && (
          <div>
            <span>Pay back ${loanAmount}</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
