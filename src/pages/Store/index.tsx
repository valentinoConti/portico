import React, { useState } from "react";
import porticoImg from "src/favicon.png";
import "./styles.scss";

interface Item {
  id: number;
  name: string;
  price: number;
  category: string;
}

const items: Item[] = [
  { id: 1, name: "T-Shirt", price: 19.99, category: "Clothing" },
  { id: 2, name: "Jeans", price: 49.99, category: "Clothing" },
  { id: 3, name: "Sneakers", price: 79.99, category: "Shoes" },
  { id: 4, name: "Backpack", price: 39.99, category: "Accessories" },
  { id: 5, name: "Watch", price: 99.99, category: "Accessories" },
];

const categories = ["All", ...new Set(items.map((item) => item.category))];

const Store: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="store">
      <header className="header">
        <img src={porticoImg} alt="Logo de Portico" width={55} height={55} />
        <span className="header-name">PORTICO</span>
      </header>

      <div className="content">
        <div className="filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="items">
          {filteredItems.map((item) => (
            <div key={item.id} className="item">
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <p>${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
