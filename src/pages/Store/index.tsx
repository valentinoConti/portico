import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ItemImage } from "./ItemImage";
import { Header } from "src/components";
import { allItems, TCategory } from "src/assets/PARAFERNALIA";
import "./styles.scss";

const Store: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TCategory>("COMBOS");

  const navigate = useNavigate();

  const filteredItems = allItems.filter(
    (item) => item.category === selectedCategory
  );
  const categories = [...new Set(allItems.map((item) => item.category))];

  return (
    <div className="store">
      <Header />

      <div className="content">
        <div className="content-filters">
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

        <div className="content-items">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="content-items-item"
              onClick={() => {
                console.log("HOLAAA");
                navigate(`/product/${item.id}`);
              }}
            >
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <ItemImage item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
