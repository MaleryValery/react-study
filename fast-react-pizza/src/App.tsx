import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import CreateUser from './features/user/CreateUser';
import CreateOrder, {
  action as actionCreateOrder,
} from './features/order/CreateOrder';
import Cart from './features/cart/Cart';
import Order, { loader as orderLoader } from './features/order/Order';
import Home from './ui/Home';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/user',
        element: <CreateUser />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: actionCreateOrder,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
