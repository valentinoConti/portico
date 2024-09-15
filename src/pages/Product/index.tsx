import { useParams } from "react-router-dom";
import { allItems } from "src/assets/PARAFERNALIA";
import { toCurrency } from "src/utils/string";
import { Header } from "src/components";
import "./styles.scss";

const Product = () => {
  const params = useParams();
  const id = params?.["*"];

  const item = allItems.find((item) => {
    return item.id === id;
  });

  return (
    <div className="product">
      <Header />

      {item && (
        <div className="product-content">
          <div className="product-content-container">
            <img id="product-image" src={item?.srcs[0]} alt={item?.name} />
            <div id="product-info">
              <h1>{item?.name}</h1>
              <h2>{toCurrency(item?.price)}</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
