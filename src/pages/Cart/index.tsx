import React, { useEffect, useState } from "react";
import useLocalStorage from "src/utils/useLocalStorage";
import { Item } from "src/assets/PARAFERNALIA";
import { Footer, Header, ItemImage } from "src/components";
import "./styles.scss";
import { ShoppingCartIcon } from "src/icons";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useLocalStorage<Item[]>("cartItems", []);
  const [name, setName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const [showEmptyConfirmation, setShowEmptyConfirmation] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const itemsList = cartItems
      .map((item) => `${item.name}: $${item.price.toFixed(0)}`)
      .join("\n");
    const message = `Hola, quisiera hacer un pedido:

Nombre: ${name}
Método de pago: ${paymentMethod}

Productos:
${itemsList}

Total: $${totalPrice.toFixed(0)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5493624207170?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    setName("");
    setPaymentMethod("Efectivo");
  };

  const handleEmptyCartClick = () => {
    setShowEmptyConfirmation(true);
  };

  const handleEmptyCart = () => {
    setCartItems([]);
    setShowEmptyConfirmation(false);
  };

  const handleCancelEmptyCart = () => {
    setShowEmptyConfirmation(false);
  };

  return (
    <div className="cart">
      <Header showBackButton />

      <div className="content">
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">
            <p>
              Aún no has añadido nada a tu carrito, regresa a la tienda para
              elegir tus productos
            </p>
          </div>
        ) : (
          <>
            <h2>Realizar Pedido</h2>

            <div className="cart-summary-container">
              <div className="cart-summary">
                <h2>Total: ${totalPrice.toFixed(0)}</h2>
                <form onSubmit={handleSendOrder} className="order-form">
                  <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentMethod">Método de Pago:</label>
                    <select
                      id="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    >
                      <option value="Efectivo">Efectivo</option>
                      <option value="Transferencia">Transferencia</option>
                    </select>
                  </div>
                  <button type="submit" className="send-order-btn">
                    Enviar Pedido
                  </button>
                </form>
              </div>
            </div>

            <h1>
              Mi Carrito <ShoppingCartIcon size={26} />
            </h1>

            <div className="content-items">
              {cartItems.map((item) => (
                <div key={item.id} className="content-items-item">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(0)}</p>
                  <ItemImage item={item} />
                  <button onClick={() => handleRemoveItem(item.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="empty-cart-section">
              {!showEmptyConfirmation ? (
                <button
                  className="empty-cart-btn"
                  onClick={handleEmptyCartClick}
                >
                  Vaciar Carrito
                </button>
              ) : (
                <div className="empty-cart-confirmation">
                  <p>¿Estás seguro de que quieres vaciar el Carrito?</p>
                  <div className="confirmation-buttons">
                    <button className="confirm-btn" onClick={handleEmptyCart}>
                      Vaciar Carrito
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={handleCancelEmptyCart}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
