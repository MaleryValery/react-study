import pizzaData from '../data';
import Menu from './Menu';
import Footer from './Footer';
import Header from './Header';

function App() {
  return (
    <>
      <Header />
      <Menu pizzaData={pizzaData} />
      <Footer />
    </>
  );
}

export default App;
