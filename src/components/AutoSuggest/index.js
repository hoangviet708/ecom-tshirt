import React, { useEffect, useRef, useState } from "react";
import "./AutoSuggest.css";
import { productLists } from "../../common/sampleData";
import { ClearSearchIcon } from "../../assets/img/ClearSearchIcon";
import { useNavigate } from "react-router-dom";

const LIMIT_SEARCH_KEYWORD = 5;

export const AutoSuggest = () => {
  const [searchProducts, setSearchProducts] = useState([]);
  const ref = useRef();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(wrapperRef) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          ref.current.value = "";
          setSearchProducts([]);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [wrapperRef]);
  }

  const handleSearch = (event) => {
    const searchTerms = event.target.value;

    if (searchTerms) {
      const filterData = productLists.filter((product) =>
        product.productName.toLowerCase().includes(searchTerms.toLowerCase())
      );
      if (filterData && filterData.length > 0) {
        if (filterData.length > LIMIT_SEARCH_KEYWORD) {
          let filterDataLimit = filterData.slice(0, LIMIT_SEARCH_KEYWORD);
          setSearchProducts(filterDataLimit);
        } else {
          setSearchProducts(filterData);
        }
      } else {
        setSearchProducts([]);
      }
    } else {
      setSearchProducts([]);
    }
  };

  const handleClearSearch = () => {
    ref.current.value = "";
    setSearchProducts([]);
    ref.current.focus();
  };

  const onClickProductItem = (product) => () => {
    navigate(`/product/${product.id}`);
  };

  const onClickSearchAll = () => {
    navigate(`/search/${ref.current.value}`);
  };

  const SearchItem = ({ searchProducts }) => {
    return (
      <div ref={wrapperRef} className="suggestContainer">
        <p className="suggestContainerTitle">Products</p>
        <div className="suggestListItems">
          {searchProducts.map((product) => (
            <div className="suggestItem" key={product.id}>
              <div
                className="suggestItemLink"
                onClick={onClickProductItem(product)}
              >
                <img
                  src={product.imageFront}
                  className="suggestItemImg"
                  alt={product.productName}
                />

                <div className="suggestItemDetail">
                  <p className="suggestItemDetailName">{product.productName}</p>
                  <p className="suggestItemDetailDes">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="searchAllBtn" onClick={onClickSearchAll}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Search all "{ref.current.value}"</span>
        </button>
      </div>
    );
  };
  return (
    <div className="navbar-search">
      <div className="search-icon">
        <label htmlFor="search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </label>
      </div>
      <div className="search-input">
        <form onSubmit={onClickSearchAll}>
          <input
            id="search"
            ref={ref}
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
          />
        </form>
      </div>
      <div
        onClick={handleClearSearch}
        className={
          ref.current && ref.current.value ? "clear-icon active" : "clear-icon"
        }
      >
        <ClearSearchIcon />
      </div>
      {searchProducts && searchProducts.length > 0 && (
        <SearchItem searchProducts={searchProducts} />
      )}
    </div>
  );
};
