import "./Navbar.css";
import { AutoSuggest } from "../";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { StateContext } from "../../context";
import { useNavigate } from "react-router-dom";
import useCheckMobileScreen from "../../common/hooks/useCheckMobileScreen";

export const Navbar = () => {
  const { state } = useContext(StateContext);

  var isMobile = useCheckMobileScreen();
  var isHiddenNav = false;
  if (isMobile) {
    isHiddenNav = false;
  } else {
    isHiddenNav =
      window.location.pathname.includes("/login") ||
      window.location.pathname.includes("/product") ||
      window.location.pathname.includes("/search");
  }

  const isHiddenCart = window.location.pathname.includes("login");

  const navigate = useNavigate();
  const handleViewCart = () => {
    navigate(`/cart`);
  };

  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <div className="navbar-container">
      <i onClick={showNavbar} className="fa-solid fa-bars bars-mobile"></i>
      <div className="navbar-left">
        <div className="navbar-brand">
          <Link to="/">N O U S</Link>
        </div>
      </div>
      <div ref={navRef} className="navbar-right">
        {!isHiddenNav && <AutoSuggest />}

        {!isHiddenNav && (
          <ul className="navbar-links">
            <li className="navbar-link">
              <a href="/">Shop All</a>
            </li>
            <li className="navbar-link">
              <a href="/">Women</a>
            </li>
            <li className="navbar-link">
              <a href="/">Men</a>
            </li>
            <li className="navbar-link">
              <a href="/">Sale</a>
            </li>
            <li className="navbar-link">
              <a href="/">About</a>
            </li>
            <li className="navbar-link">
              <a href="/">Contact</a>
            </li>
          </ul>
        )}
        {!isHiddenNav && (
          <div className="navbar-login">
            <i
              onClick={showNavbar}
              className="fa-solid fa-xmark xmark-mobile"
            ></i>

            <i className="fa-solid fa-circle-user" />
            {state.auth.username ? (
              <span>{state.auth.username}</span>
            ) : (
              <Link to="/login">Log In</Link>
            )}
          </div>
        )}
      </div>
      {!isHiddenCart && (
        <div onClick={handleViewCart} className="navbar-cart">
          <i className="fa-solid fa-cart-shopping"></i>
          {state.cart.length > 0 && (
            <div className="value-cart">{state.cart.length}</div>
          )}
        </div>
      )}
    </div>
  );
};
