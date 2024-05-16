import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  console.log(navigation);
  return (
    <div className="grid-rows-[auto_1fr_auto ] grid h-screen">
      {isLoading && <Loader />}
      <Header />
      <main className="overflow-scroll">
        <div className="mx-auto max-w-3xl bg-slate-200">
          <Outlet />
        </div>
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
