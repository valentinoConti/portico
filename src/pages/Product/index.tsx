import { useEffect } from "react";
import {
  ArrowLeftIcon,
  CheckCircledIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

import useLocalStorage from "src/utils/useLocalStorage";
import { useParams } from "react-router-dom";
import { allItems, Item } from "src/assets/PARAFERNALIA";
import { toCurrency } from "src/utils/string";
import { Footer, Header, ItemImage } from "src/components";
import { ShoppingCartIcon } from "src/icons";
import "./styles.scss";

const Product = () => {
  const params = useParams();
  const id = params?.["*"];
  const navigate = useNavigate();

  const item = allItems.find((item) => {
    return item.key === id;
  });

  const [cartItems, setCartItems] = useLocalStorage<Item[]>("cartItems", []);
  const IS_ADDED_TO_CART = cartItems.some((item) => item.key === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContinueShopping = () => {
    navigate(-1);
  };

  if (!item) {
    return (
      <div>
        <div className="product">
          <Header showBackButton />
          <div className="product-content">
            <div className="product-content-container">
              <div
                className="product-info"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h2>Producto no encontrado</h2>

                <p>Tal vez el producto que buscas ya no está disponible.</p>
                <p>
                  <button
                    style={{
                      backgroundColor: "var(--color-primary-200)",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/store")}
                  >
                    Ir a la Tienda
                  </button>
                </p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

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
                {IS_ADDED_TO_CART ? (
                  <div className="added-text">
                    <CheckCircledIcon />
                    Agregado!
                  </div>
                ) : (
                  <button
                    className="button add"
                    onClick={() => {
                      setCartItems([...cartItems, item]);
                    }}
                  >
                    Agregar al carrito
                  </button>
                )}

                {IS_ADDED_TO_CART && (
                  <>
                    <button
                      className="button go-to-cart"
                      onClick={() => navigate("/cart")}
                    >
                      <ShoppingCartIcon size={16} />
                      Ir al carrito
                    </button>
                    <button
                      className="button remove"
                      onClick={() => {
                        setCartItems(
                          cartItems.filter((item) => item.key !== id)
                        );
                      }}
                    >
                      <TrashIcon width={18} height={18} />
                      Eliminar del carrito
                    </button>
                    <button
                      className="button continue-shopping"
                      onClick={handleContinueShopping}
                    >
                      <ArrowLeftIcon width={18} height={18} />
                      Seguir comprando
                    </button>
                  </>
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
