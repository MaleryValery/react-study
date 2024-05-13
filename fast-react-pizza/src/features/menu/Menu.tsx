import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import { Menu as MenuType } from '../../types/types';
import MenuItem from './MenuItem';

export async function loader() {
  const menu = await getMenu();
  return menu;
}

function Menu() {
  const menu = useLoaderData() as MenuType[];
  return (
    <>
      <h1>Menu</h1>
      <ul>
        {menu.map((item) => (
          <MenuItem key={item.id} pizza={item} />
        ))}
      </ul>
    </>
  );
}

export default Menu;
