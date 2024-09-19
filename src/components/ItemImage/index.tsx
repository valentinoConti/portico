import { useEffect, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { Item } from "src/assets/PARAFERNALIA";
import { Loader } from "src/components";
import "./styles.scss";

interface ItemImageProps {
  item: Item;
}

export const ItemImage = ({ item }: ItemImageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageSrc, setImageSrc] = useState(item.imageSrcs[0]);

  useEffect(() => {
    setImageSrc(item.imageSrcs[currentIndex]);
  }, [currentIndex, item.imageSrcs]);

  return (
    <div className="item-image">
      <div className="item-image-loader">
        <Loader />
      </div>

      <img src={imageSrc} alt={item.name} draggable="false" />
      {item.imageSrcs.length > 1 && currentIndex > 0 && (
        <div
          onClick={(ev) => {
            ev.stopPropagation();
            setCurrentIndex(currentIndex - 1);
          }}
          className="item-image-arrow left"
        >
          <div className="item-image-arrow-icon">
            <CaretLeftIcon width={24} height={24} />
          </div>
        </div>
      )}
      {item.imageSrcs.length > 1 &&
        currentIndex < item.imageSrcs.length - 1 && (
          <div
            onClick={(ev) => {
              ev.stopPropagation();
              setCurrentIndex(currentIndex + 1);
            }}
            className="item-image-arrow right"
          >
            <div className="item-image-arrow-icon">
              <CaretRightIcon width={24} height={24} />
            </div>
          </div>
        )}
    </div>
  );
};

export default ItemImage;
