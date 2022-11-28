import "./ProductItem.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductItem = ({ product, isShowAddToCart }) => {
  const [quickView, setQuickView] = useState("quickViewButton");
  const ref = useRef();
  const navigate = useNavigate();

  const onClickQuickView = (product) => () => {
    navigate(`/product/${product.id}`);
  };

  const onMouseEnter = () => {
    setQuickView("quickViewButton open");
    ref.current.src = product.imageBack;
  };

  const onMouseLeave = () => {
    setQuickView("quickViewButton");
    ref.current.src = product.imageFront;
  };

  return (
    <div
      onClick={onClickQuickView(product)}
      className="productItem"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ width: isShowAddToCart ? "33.33%" : "25%" }}
    >
      <div className="viewProductImage">
        <img
          src={product.imageFront}
          className="productImage"
          alt={product.productName}
          ref={ref}
        />
        <button className={quickView}>Quick View</button>
      </div>
      <h3>{product.productName ?? "N/A"}</h3>
      <span className="cost">
        ${product.cost ? Number(product.cost).toFixed(2) : "N/A"}
      </span>
      {isShowAddToCart && <button className="add-to-cart">Add To Cart</button>}
    </div>
  );
};
