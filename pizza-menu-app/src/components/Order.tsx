type OrderProrps = {
  closingHour: number;
  openingHour: number;
};

function Order({ closingHour, openingHour }: OrderProrps) {
  return (
    <div className="order">
      <p>
        We are open from {openingHour}:00 to {closingHour}:00. Come visit us or
        order online.
      </p>
      <button className="btn" type="button">
        Order
      </button>
    </div>
  );
}

export default Order;
