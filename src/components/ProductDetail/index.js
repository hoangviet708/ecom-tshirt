import "./ProductDetail.css";
import { RadioCustom } from "../../components";
import { PlusIcon } from "../../assets/img/PlusIcon";
import { MinusIcon } from "../../assets/img/MinusIcon";
import { productLists } from "../../common/sampleData";

import Select from "react-select";
import { useState, useContext } from "react";
import { StateContext } from "../../context";

const color1 = "#2ecc71";
const color2 = "#3498db";
const PRODUCT_INFO = "PRODUCT_INFO";
const RETURN_POLICY = "RETURN_POLICY";
const SHIPPING_INFO = "SHIPPING_INFO";
const NONE_INFO = "NONE";

const options = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];

export const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState(options[0]);
  const [quantity, setQuantity] = useState("1");
  const [color, setColor] = useState("");
  const [showInfo, setShowInfo] = useState(PRODUCT_INFO);
  const { state, dispatchState } = useContext(StateContext);

  const handleShowInfo = (key) => () => {
    if (showInfo === key) {
      setShowInfo(NONE_INFO);
    } else {
      setShowInfo(key);
    }
  };

  function makeRandomKeyId(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const productId = window.location.pathname.split("/")[2];
  const currentProduct = productLists.find(
    (product) => product.id === productId
  );
  const productDetailAdd = {
    keyId: makeRandomKeyId(5),
    id: productId,
    url: currentProduct.imageFront,
    name: currentProduct.productName,
    price: currentProduct.cost,
    size: selectedSize.value,
    quantity: quantity,
    color: color,
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    let isItemAvailable = false;
    const arr = state.cart;
    for (let item of arr) {
      if (
        item.id === productDetailAdd.id &&
        item.size === productDetailAdd.size &&
        item.color === productDetailAdd.color
      ) {
        isItemAvailable = true;
        break;
      } else {
        isItemAvailable = false;
      }
    }

    if (!isItemAvailable) {
      dispatchState({
        type: "ADD_TO_CART",
        payload: productDetailAdd,
      });
    }
  };

  const getColorSelected = (colorSelected) => {
    if (colorSelected === "color1") {
      setColor("green");
    } else {
      setColor("blue");
    }
  };

  return (
    <>
      <div className="productDetail">
        <div className="productDetail-image">
          <img src={currentProduct.imageFront} className="big-img" alt="" />
          <div className="small-img-group">
            <img
              src={currentProduct.imageFront}
              className="small-img-col"
              alt=""
            />

            <img
              src={currentProduct.imageBack}
              className="small-img-col"
              alt=""
            />
            <img
              src={currentProduct.imageFront}
              className="small-img-col"
              alt=""
            />
            <img
              src={currentProduct.imageBack}
              className="small-img-col"
              alt=""
            />
          </div>
          <p className="image-desp">
            I'm a product description. I'm a great place to add more details
            about your product such as sizing, material, care instructions and
            cleaning instructions.
          </p>
        </div>

        <div className="productDetail-description">
          <h2 className="description-title">Pink Classic T-Shirt</h2>
          <p className="description-id">SKU: 0014</p>
          <div className="description-cost">$25.00</div>
          <p className="description-size">Size</p>
          <Select
            defaultValue={selectedSize}
            onChange={setSelectedSize}
            options={options}
          />
          <p className="description-color">Color</p>
          <RadioCustom
            getColorSelected={getColorSelected}
            color1={color1}
            color2={color2}
          />
          <p className="description-quantity">Quantity</p>
          <input
            className="quantityInput"
            type="number"
            max="99999"
            min="1"
            value={quantity}
            onChange={handleChangeQuantity}
          />
          <div className="addToCart">
            <button onClick={handleAddToCart} className="addToCartBtn">
              Add To Cart
            </button>
            <i className="iconHeart">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="30"
                height="30"
                className="iconHeartSvg"
                data-hook="wishlist-button-icon"
              >
                <path
                  d="M8.1816,5.0039 C7.9276,5.0039 7.6696,5.0279 7.4106,5.0759 C5.7326,5.3909 4.3566,6.8479 4.0646,8.6189 C3.9346,9.4039 4.0036,10.2029 4.2616,10.9319 C4.2636,10.9379 4.2656,10.9439 4.2676,10.9499 C5.1716,13.8579 10.2066,17.4019 11.7286,18.4189 C11.8966,18.5329 12.1076,18.5309 12.2746,18.4189 C13.7956,17.4019 18.8266,13.8589 19.7326,10.9499 C19.9966,10.2029 20.0646,9.4039 19.9356,8.6189 C19.6426,6.8479 18.2666,5.3909 16.5896,5.0759 C14.9596,4.7749 13.3646,5.4459 12.4126,6.8369 C12.2256,7.1099 11.7736,7.1099 11.5876,6.8369 C10.7866,5.6669 9.5276,5.0039 8.1816,5.0039 M12.0016,19.5029 C11.7136,19.5029 11.4246,19.4189 11.1726,19.2509 C9.1366,17.8899 4.2966,14.3869 3.3156,11.2559 C3.0036,10.3719 2.9216,9.4039 3.0776,8.4569 C3.4436,6.2429 5.1106,4.4889 7.2266,4.0939 C9.0226,3.7539 10.8006,4.3809 11.9996,5.7409 C13.1996,4.3829 14.9766,3.7569 16.7736,4.0939 C18.8896,4.4899 20.5566,6.2429 20.9216,8.4569 C21.0786,9.4069 20.9956,10.3789 20.6816,11.2659 C19.7116,14.3819 14.8676,17.8889 12.8306,19.2509 C12.5786,19.4189 12.2896,19.5029 12.0016,19.5029"
                  fillRule="evenodd"
                ></path>
              </svg>
            </i>
          </div>
          <button className="buyNowBtn">Buy Now</button>

          <ul className="info-container">
            <li className="product-info">
              <button
                className="btn-info-item"
                onClick={handleShowInfo(PRODUCT_INFO)}
              >
                <h2>PRODUCT INFO</h2>
                {showInfo === PRODUCT_INFO ? <MinusIcon /> : <PlusIcon />}
              </button>
              <p
                className="info-paragraph"
                style={{
                  display: showInfo === PRODUCT_INFO ? "block" : "none",
                }}
              >
                I'm a product detail. I'm a great place to add more information
                about your product such as sizing, material, care and cleaning
                instructions. This is also a great space to write what makes
                this product special and how your customers can benefit from
                this item.
              </p>
            </li>
            <li className="product-info">
              <button
                className="btn-info-item"
                onClick={handleShowInfo(RETURN_POLICY)}
              >
                <h2>RETURN & REFUND POLICY</h2>
                {showInfo === RETURN_POLICY ? <MinusIcon /> : <PlusIcon />}
              </button>
              <p
                className="info-paragraph"
                style={{
                  display: showInfo === RETURN_POLICY ? "block" : "none",
                }}
              >
                I’m a Return and Refund policy. I’m a great place to let your
                customers know what to do in case they are dissatisfied with
                their purchase. Having a straightforward refund or exchange
                policy is a great way to build trust and reassure your customers
                that they can buy with confidence.
              </p>
            </li>
            <li className="product-info">
              <button
                className="btn-info-item"
                onClick={handleShowInfo(SHIPPING_INFO)}
              >
                <h2>SHIPPING INFO</h2>
                {showInfo === SHIPPING_INFO ? <MinusIcon /> : <PlusIcon />}
              </button>
              <p
                className="info-paragraph"
                style={{
                  display: showInfo === SHIPPING_INFO ? "block" : "none",
                }}
              >
                I'm a shipping policy. I'm a great place to add more information
                about your shipping methods, packaging and cost. Providing
                straightforward information about your shipping policy is a
                great way to build trust and reassure your customers that they
                can buy from you with confidence.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="slideshow-container"></div>
    </>
  );
};
