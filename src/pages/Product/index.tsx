import { useEffect } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";

import useLocalStorage from "src/utils/useLocalStorage";
import { useParams } from "react-router-dom";
import { allItems, Item } from "src/assets/PARAFERNALIA";
import { toCurrency } from "src/utils/string";
import { Footer, Header, ItemImage } from "src/components";
import "./styles.scss";

const Product = () => {
  const params = useParams();
  const id = params?.["*"];

  const item = allItems.find((item) => {
    return item.id === id;
  });

  const [cartItems, setCartItems] = useLocalStorage<Item[]>("cartItems", []);
  const IS_ADDED_TO_CART = cartItems.some((item) => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="product">
      <Header showBackButton />

      {item && (
        <div className="product-content">
          <div className="product-content-container">
            <ItemImage item={item} />

            <div className="product-info">
              <div className="product-info-header">
                <h1>{item?.name}</h1>
                <h2>{toCurrency(item?.price)}</h2>
              </div>

              <div className="product-info-description">
                <p>{item?.description}</p>
              </div>

              <div className="product-info-cart-buttons">
                <button
                  className={`button ${IS_ADDED_TO_CART ? "added" : "add"}`}
                  onClick={() => {
                    if (IS_ADDED_TO_CART) return;

                    setCartItems([...cartItems, item]);
                  }}
                  style={{
                    cursor: IS_ADDED_TO_CART ? "not-allowed" : "pointer",
                  }}
                >
                  {IS_ADDED_TO_CART ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <CheckCircledIcon /> Agregado al carrito
                    </div>
                  ) : (
                    "Agregar al carrito"
                  )}
                </button>

                {IS_ADDED_TO_CART && (
                  <button
                    className="button remove"
                    onClick={() => {
                      setCartItems(cartItems.filter((item) => item.id !== id));
                    }}
                  >
                    Eliminar del carrito
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Product;
