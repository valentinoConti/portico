import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Footer, Header, ItemImage } from "src/components";
import { allItems, TCategory } from "src/assets/PARAFERNALIA";
import "./styles.scss";
import { toTitleCase } from "src/utils/string";

const Store: React.FC = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<TCategory>(
    (category as TCategory) || "COMBOS"
  );

  useEffect(() => {
    navigate(`/store/${selectedCategory}`, { replace: true });
  }, [selectedCategory, navigate]);

  const handleCategoryChange = (newCategory: TCategory) => {
    setSelectedCategory(newCategory);
  };

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
              onClick={() => handleCategoryChange(category)}
            >
              {toTitleCase(category)}
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

      <Footer />
    </div>
  );
};

export default Store;
