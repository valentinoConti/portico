import React, { useMemo, useState } from "react";
import porticoImg from "src/favicon.png";
import { PRODUCTOS } from "src/assets/PARAFERNALIA";
import { toTitleCase } from "src/utils/string";
import "./styles.scss";

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
  srcs: any[];
}

const Store: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const items = useMemo(() => {
    const allItems: Item[] = [];
    const PRODUCTS_ENTRIES = Object.entries(PRODUCTOS);

    PRODUCTS_ENTRIES.forEach(([category, item]) => {
      Object.entries(item).forEach(([name, srcsArray]) => {
        allItems.push({
          id: `${category}-${name}`,
          name: toTitleCase(name),
          price: 13000,
          category: category as TCategory,
          srcs: srcsArray,
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
                {item.srcs.map((src, idx) => (
                  <img src={src} alt={item.name} key={`${item.name}-${idx}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
