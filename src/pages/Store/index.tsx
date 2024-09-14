import React, { useEffect, useMemo, useState } from "react";
import porticoImg from "src/favicon.png";
import { PRODUCTOS } from "src/assets/PARAFERNALIA";
import { toTitleCase } from "src/utils/string";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
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
              <ItemImage item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ItemImageProps {
  item: Item;
}

const ItemImage = ({ item }: ItemImageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState(item.srcs[0]);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setImageSrc(item.srcs[currentIndex]);
  }, [currentIndex, item.srcs]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    handleDrag(currentX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    handleDrag(currentX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrag = (currentX: number) => {
    const diff = startX - currentX;
    if (diff > 50 && currentIndex < item.srcs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsDragging(false);
    } else if (diff < -50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsDragging(false);
    }
  };

  return (
    <div
      className="content-items-item-img"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <img src={imageSrc} alt={item.name} draggable="false" />
      {item.srcs.length > 1 && currentIndex > 0 && (
        <div
          onClick={() => {
            setCurrentIndex(0);
          }}
          className="content-items-item-img-arrow left"
        >
          <CaretLeftIcon width={24} height={24} />
        </div>
      )}
      {item.srcs.length > 1 && currentIndex < item.srcs.length - 1 && (
        <div
          onClick={() => {
            setCurrentIndex(1);
          }}
          className="content-items-item-img-arrow right"
        >
          <CaretRightIcon width={24} height={24} />
        </div>
      )}
    </div>
  );
};

export default Store;
