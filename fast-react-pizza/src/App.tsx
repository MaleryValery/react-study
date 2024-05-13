import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import CreateUser from './features/user/CreateUser';
import CreateOrder from './features/order/CreateOrder';
import Cart from './features/cart/Cart';
import Order from './features/order/Order';
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: '/user',
        element: <CreateUser />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
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
