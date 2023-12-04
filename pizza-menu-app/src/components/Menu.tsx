import { PizzaType } from '../types/PizzaType';
import Pizza from './Pizza';

type MenuProps = {
  pizzaData: PizzaType[];
};

function Menu({ pizzaData }: MenuProps) {
  return (
    <div className="menu">
      <h2>Our menu</h2>
      {pizzaData.length !== 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza key={pizza.name} pizzaObj={pizza} />
            ))}
          </ul>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default Menu;
