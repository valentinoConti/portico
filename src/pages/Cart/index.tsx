import useLocalStorage from "src/utils/useLocalStorage";
import { Item } from "src/assets/PARAFERNALIA";
import { Footer, Header } from "src/components";
import "./styles.scss";

const Cart = () => {
  const [cartItems] = useLocalStorage<Item[]>("cartItems", []);

  return (
    <div className="cart">
      <Header showBackButton />

      <div className="cart-content">
        <h1>Mi Carrito</h1>

        <div>
          {cartItems.map((item) => {
            return <div key={item.id}>{item.name}</div>;
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
