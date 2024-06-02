import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import { Cart, FormData, Order as OrderType } from '../../types/types';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

export async function action({ request }) {
  // this function will be called when form on route /order/new will be submited
  const formDate = await request.formData();
  const data: FormData = Object.fromEntries(formDate); // make from formdata object
  const cart: Cart = JSON.parse(data.cart);
  const order = {
    ...data, // take current order
    cart, // cart from hidden input passing to get object
    priority: data.priority === 'on', // check if order has prioriry
  };
  console.log('🚀  ~ action ~ order:', order);

  const errors: { [key: string]: string } = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please give as your correct phone number';
  if (Object.keys(errors).length > 0) return errors;

  const newOrder: OrderType = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* <Form method='POST' action=""> */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input className="input" type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input className="input" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400  focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <button
            disabled={isSubmitting}
            className="inline-block rounded-full bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wider
            transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:hover:bg-yellow-400"
          >
            {isSubmitting ? 'Submitting..' : 'Order now'}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
