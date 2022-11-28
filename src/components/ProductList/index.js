import "./ProductList.css";
import { ProductItem } from "../";

export const ProductList = ({ productLists }) => {
  if (productLists.length === 0) {
    return <p>Not found any product!</p>;
  }
  const renderLists = productLists.map((product) => {
    return <ProductItem product={product} key={product.id.toString()} />;
  });

  return <div className="productList">{renderLists}</div>;
};
