import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import porticoImg from "src/favicon.png";
import useLocalStorage from "src/utils/useLocalStorage";
import { Item } from "src/assets/PARAFERNALIA";
import { ShoppingCartIcon } from "src/icons";
import "./styles.scss";

interface IHeaderProps {
  showBackButton?: boolean;
}

const Header = ({ showBackButton = false }: IHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems] = useLocalStorage<Item[]>("cartItems", []);

  const shouldShowCart = location.pathname !== "/cart";

  return (
    <>
      <header className="header">
        {showBackButton && (
          <div className="header-back-button" onClick={() => navigate(-1)}>
            <ArrowLeftIcon height={22} width={22} />
            <span>Volver</span>
          </div>
        )}

        <div className="header-container" onClick={() => navigate("/store")}>
          <img src={porticoImg} alt="Logo de Portico" width={55} height={55} />
          <span className="header-container-name">PORTICO</span>
        </div>

        {shouldShowCart && (
          <div className="header-cart" onClick={() => navigate("/cart")}>
            <span>{cartItems.length}</span>
            <ShoppingCartIcon size={24} />
            <span>Carrito</span>
          </div>
        )}
      </header>

      <div className="header-mobile">
        {showBackButton && (
          <div
            className="header-mobile-back-button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon height={22} width={22} />
            <span>Volver</span>
          </div>
        )}

        {shouldShowCart && (
          <div className="header-mobile-cart" onClick={() => navigate("/cart")}>
            <span>{cartItems.length}</span>
            <ShoppingCartIcon size={24} />
            <span>Carrito</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
