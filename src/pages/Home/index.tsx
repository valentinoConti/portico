import React, { useState } from "react";
import favicon from "../../favicon.png";
import "./styles.scss";

const HomePage: React.FC = () => {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 1800);
  };

  return (
    <div className="home">
      <h1>Bienvenido a Portico!</h1>
      <img src={favicon} alt="Logo de Portico" />
      <p>Explora nuestra colección exclusiva de productos</p>
      <button onClick={handlePress} className="shop-button">
        Ir a la Tienda
      </button>

      {pressed && (
        <div style={{ marginTop: 12 }}>Psst.. Aún no! Próximamente</div>
      )}
    </div>
  );
};

export default HomePage;
