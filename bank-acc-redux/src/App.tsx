import CreateCustomer from './features/customers/CreateCustomer';
import Customer from './features/customers/Customer';
import AccountOperations from './features/accounts/AccountOperations';
import BalanceDisplay from './features/accounts/BalanceDisplay';
import { useAppSelector } from './store/hooks';

function App() {
  const { fullName } = useAppSelector((store) => store.customer);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName.length === 0 ? (
        <CreateCustomer />
      ) : (
        <>
          {' '}
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
