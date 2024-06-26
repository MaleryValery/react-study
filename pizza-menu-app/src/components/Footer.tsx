import Order from './Order';

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closingHour={closeHour} openingHour={openHour} />
      ) : (
        <p>
          We are welcome you between {openHour}:00 and {closeHour}:00. Come
          visit us or order online.
        </p>
      )}
    </footer>
  );
}

export default Footer;
