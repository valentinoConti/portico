import { useParams } from "react-router-dom";
import { allItems } from "src/assets/PARAFERNALIA";
import { toCurrency } from "src/utils/string";
import { Footer, Header, ItemImage } from "src/components";
import "./styles.scss";
import { useEffect } from "react";

const Product = () => {
  const params = useParams();
  const id = params?.["*"];

  const item = allItems.find((item) => {
    return item.id === id;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="product">
      <Header />

      {item && (
        <div className="product-content">
          <div className="product-content-container">
            <ItemImage item={item} />

            <div className="product-info">
              <div className="product-info-header">
                <h1>{item?.name}</h1>
                <h2>{toCurrency(item?.price)}</h2>
              </div>

              <div className="product-info-description">
                <p>{item?.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Product;
