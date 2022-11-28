import "./cartPage.css";
import { Header, Content, Footer } from "../../components";
import { useContext } from "react";
import { StateContext } from "../../context";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { state, dispatchState } = useContext(StateContext);

  const handleChangeQuantity = (item) => (e) => {
    dispatchState({
      type: "UPDATE_CART",
      payload: {
        keyId: item.keyId,
        qty: e.target.value,
      },
    });
  };

  const handleRemoveFromCart = (item) => () => {
    dispatchState({
      type: "REMOVE_FROM_CART",
      payload: item.keyId,
    });
  };

  let totalPrice = state.cart.reduce((total, current) => {
    return total + current.price * current.quantity;
  }, 0);

  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const onClickContinute = () => {
    navigate(`/`);
  };

  return (
    <div>
      <Header />
      <Content
        children={
          <>
            <h1 className="title">
              Shopping Cart
              <span className="line-title"></span>
            </h1>
            <div className="cart-container">
              <div className="list-product">
                <table>
                  <thead>
                    <tr>
                      <td className="thead-title">PRODUCT</td>
                      <td className="thead-title">QUANTITY</td>
                      <td className="thead-title">PRICE</td>
                    </tr>
                  </thead>
                  <tbody>
                    {state.cart.length === 0 ? (
                      <tr>
                        <td>
                          <div className="cart-empty">Your cart is empty</div>
                        </td>
                      </tr>
                    ) : (
                      state.cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="product-item">
                              <img alt="" src={item.url} className="img-item" />
                              <div className="detail-item">
                                <div className="name-item">{item.name}</div>
                                <div className="size-item">
                                  Size:{item.size}, Color: {item.color}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <input
                              className="quantityInput"
                              type="number"
                              max="99999"
                              min="1"
                              value={item.quantity}
                              onChange={handleChangeQuantity(item)}
                            />
                          </td>
                          <td>
                            <div className="price-area">
                              <div className="value-price">
                                <div className="value">
                                  ${item.price * item.quantity}
                                </div>
                                <div className="value-each">
                                  ${item.price} each
                                </div>
                              </div>
                              <div className="icon">
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
                                <button
                                  onClick={handleRemoveFromCart(item)}
                                  className="btn-remove"
                                >
                                  REMOVE
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {state.cart.length === 0 ? (
                  <div className="product-mobile">
                    <div className="cart-empty">Your cart is empty</div>
                  </div>
                ) : (
                  state.cart.map((item) => (
                    <div key={item.id} className="product-mobile">
                      <img alt="" src={item.url} className="img-product" />
                      <div className="product-info">
                        <div className="product-name">{item.name}</div>
                        <div className="product-des">
                          <div className="product-price-each">
                            ${item.price}
                          </div>
                          <div className="product-size">Size: {item.size}</div>
                          <div className="product-color">
                            Color: {item.color}
                          </div>
                        </div>
                        <input
                          className="quantityInput"
                          type="number"
                          max="99999"
                          min="1"
                          value={item.quantity}
                          onChange={handleChangeQuantity(item)}
                        />
                      </div>
                      <i
                        onClick={handleRemoveFromCart(item)}
                        className="fa-solid fa-xmark btn-delete"
                      ></i>
                      <div className="product-price">
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  ))
                )}

                <div className="action">
                  <button onClick={onClickContinute} className="btn-continue">
                    <i className="fa-solid fa-angle-left icon-left"></i>
                    Continue Shopping
                  </button>
                  <button className="btn-purchase">
                    Make Purchase
                    <i className="fa-solid fa-angle-right icon-right"></i>
                  </button>
                </div>
              </div>
              <div className="cart-summary">
                <div className="coupon">
                  <p>Have coupon?</p>
                  <div className="coupon-code">
                    <input type="text" />
                    <button className="btn-apply">Apply</button>
                  </div>
                </div>
                <div className="total-price">
                  <div className="main-total-price">
                    <div className="title-price">
                      <p>Total Price: </p>
                      <p>Discount: </p>
                      <p>Total: </p>
                    </div>
                    <div className="value-price">
                      <p>${Number(totalPrice).toLocaleString()}</p>
                      <p>0</p>
                      <p>${Number(totalPrice).toLocaleString()} </p>
                    </div>
                  </div>
                  <img src={require("../../assets/img/pay.png")} alt="" />
                </div>
              </div>
            </div>
          </>
        }
      />
      <Footer />
    </div>
  );
};

export default CartPage;
