import { useAppSelector } from '../../store/hooks';

function Customer() {
  const { fullName } = useAppSelector((store) => store.customer);
  return <h2>👋 Welcome, {fullName}</h2>;
}

export default Customer;
