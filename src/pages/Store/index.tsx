import React, { useMemo, useState } from "react";
import porticoImg from "src/favicon.png";
import { PRODUCTS } from "src/assets/PARAFERNALIA";
import "./styles.scss";
import { toTitleCase } from "src/utils/string";

type TCategory =
  | "ADAPTADOR"
  | "TAPA63"
  | "TAPA70"
  | "TUBO"
  | "FILTRO_BONG"
  | "PORTACIGARRO"
  | "COMBO"
  | "CAZUELA";

interface Item {
  id: string;
  name: string;
  price: number;
  category: TCategory;
  src: any;
}

// const items: Item[] = [
//   { src: "", id: "1", name: "T-Shirt", price: 19.99, category: "ADAPTADOR" },
//   { src: "", id: "2", name: "Jeans", price: 49.99, category: "TAPA63" },
//   { src: "", id: "3", name: "Sneakers", price: 79.99, category: "TAPA70" },
//   { src: "", id: "4", name: "Backpack", price: 39.99, category: "TUBO" },
//   { src: "", id: "5", name: "Watch", price: 99.99, category: "FILTRO_BONG" },
// ];

// const categories = ["All", ...new Set(items.map((item) => item.category))];

const Store: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const items = useMemo(() => {
    const allItems: Item[] = [];
    const PRODUCTS_ENTRIES = Object.entries(PRODUCTS);
    PRODUCTS_ENTRIES.forEach(([category, item]) => {
      Object.entries(item).forEach(([name, src]) => {
        allItems.push({
          id: `${category}-${name}`,
          name: toTitleCase(name),
          price: 13000,
          category: category as TCategory,
          src,
        });
      });
    });

    return allItems;
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const categories = ["All", ...new Set(items.map((item) => item.category))];

  console.log({ items });

  return (
    <div className="store">
      <header className="header">
        <img src={porticoImg} alt="Logo de Portico" width={55} height={55} />
        <span className="header-name">PORTICO</span>
      </header>

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
            <div key={item.id} className="content-items-item">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <div className="content-items-item-img">
                <img src={item.src} alt={item.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
