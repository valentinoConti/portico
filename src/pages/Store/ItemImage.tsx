import { useEffect, useState } from "react";
import { Item } from "./index";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";

interface ItemImageProps {
  item: Item;
}

export const ItemImage = ({ item }: ItemImageProps) => {
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
          onClick={(ev) => {
            ev.stopPropagation();
            setCurrentIndex(0);
          }}
          className="content-items-item-img-arrow left"
        >
          <CaretLeftIcon width={24} height={24} />
        </div>
      )}
      {item.srcs.length > 1 && currentIndex < item.srcs.length - 1 && (
        <div
          onClick={(ev) => {
            ev.stopPropagation();
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
