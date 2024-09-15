import porticoImg from "src/favicon.png";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-container" onClick={() => navigate("/store")}>
        <img src={porticoImg} alt="Logo de Portico" width={55} height={55} />
        <span className="header-container-name">PORTICO</span>
      </div>
    </header>
  );
};

export default Header;
