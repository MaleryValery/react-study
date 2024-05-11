import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deposit, payLoan, requestLoan, withdraw } from './accountSlice';

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [currentLoan, setCurrentLoan] = useState(0);
  const [currLoanPurpose, setCurrLoanPurpose] = useState('');
  const [currency, setCurrency] = useState('USD');

  const dispatch = useAppDispatch();
  const { loanAmount: loan, balance } = useAppSelector(
    (store) => store.account
  );
  console.log('🚀 ~ AccountOperations ~ acount:', balance);

  function handleDeposit(): void {
    if (!depositAmount) return;
    dispatch(deposit(depositAmount));
    setDepositAmount(0);
  }

  function handleWithdrawal(): void {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount(0);
  }

  function handleRequestLoan(): void {
    if (!currentLoan || !currLoanPurpose) return;
    dispatch(requestLoan(currentLoan, currLoanPurpose));

    setCurrentLoan(0);
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
            value={depositAmount}
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

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
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
            value={currentLoan}
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

        {loan > 0 && (
          <div>
            <span>Pay back ${loan}</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
