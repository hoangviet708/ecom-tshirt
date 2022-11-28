import { Header, Footer, Content } from "../../components";
import { ClearSearchIcon } from "../../assets/img/ClearSearchIcon";
import "./searchPage.css";
import { ProductItem } from "../../components";
import { productLists } from "../../common/sampleData";

import { useRef, useState } from "react";
import Select from "react-select";

const MAX_PRICE = 45;
const MIN_PRICE = 24;

const options = [
  { value: "lowToHigh", label: "Price (low to high)" },
  { value: "bestMatch", label: "Best Match" },
  { value: "highToLow", label: "Price (high to low)" },
];

const SearchPage = () => {
  const [price, setPrice] = useState(MAX_PRICE);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  let initSearchTerms = undefined;
  if (window.location.pathname.includes("/search")) {
    initSearchTerms = window.location.pathname.split("/")[2];
  }
  let initSearchProducts = undefined;
  if (initSearchTerms) {
    initSearchProducts = productLists.filter((product) =>
      product.productName.toLowerCase().includes(initSearchTerms.toLowerCase())
    );
  }

  const [searchTerms, setSearchTerms] = useState(initSearchTerms);
  const [searchProducts, setSearchProducts] = useState(initSearchProducts);

  const stylesOptionsSort = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      width: 180,
      border: "none",
      outline: "none",
      cursor: "pointer",
    }),
    option: (styles) => {
      return {
        ...styles,
        border: "none",
        outline: "none",
        cursor: "pointer",
      };
    },
  };

  const handleChangeSlider = ({ target: { value: radius } }) => {
    setPrice(radius);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerms) {
      const filterData = productLists.filter((product) =>
        product.productName.toLowerCase().includes(searchTerms.toLowerCase())
      );
      if (filterData && filterData.length > 0) {
        setSearchProducts(filterData);
      } else {
        setSearchProducts([]);
      }
    } else {
      setSearchProducts([]);
    }
  };

  const handleChangeInputSearch = (e) => {
    setSearchTerms(e.target.value);
  };

  const ele_filter = useRef();
  const handleShowFilter = () => {
    ele_filter.current.classList.toggle("active");
  };

  return (
    <div>
      <Header />
      <Content
        children={
          <>
            <h1 className="title">
              SEARCH RESULTS
              <span className="line-title"></span>
            </h1>
            <div className="search-container">
              <div className="search-input">
                <form onSubmit={handleSearch}>
                  <div className="search-icon">
                    <label htmlFor="search-input">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </label>
                  </div>
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search..."
                    value={searchTerms}
                    onChange={handleChangeInputSearch}
                  />
                  <div className="icon-clear">
                    <ClearSearchIcon />
                  </div>
                </form>
              </div>
              <button onClick={handleShowFilter} className="filter-btn">
                Filter
              </button>
              <div className="search-content">
                <div ref={ele_filter} className="filter-header">
                  <div className="header_filter_mobile">
                    <p>Filer By</p>
                    <div>
                      <i
                        onClick={handleShowFilter}
                        className="fa-solid fa-xmark"
                      ></i>
                    </div>
                  </div>
                  <div className="options-product">
                    <p className="options-header">Collection</p>
                    <label className="option-item" htmlFor="option-men">
                      <input type="checkbox" id="option-men" />
                      <span className="checkmark"></span>
                      <span className="option-title">
                        Men
                        <span className="value-product-option"> (12)</span>
                      </span>
                    </label>
                    <label className="option-item" htmlFor="option-newArrivals">
                      <input type="checkbox" id="option-newArrivals" />
                      <span className="checkmark"></span>
                      <span className="option-title">
                        New Arrivals
                        <span className="value-product-option"> (12)</span>
                      </span>
                    </label>
                    <label className="option-item" htmlFor="option-women">
                      <input type="checkbox" id="option-women" />
                      <span className="checkmark"></span>
                      <span className="option-title">
                        Women
                        <span className="value-product-option"> (12)</span>
                      </span>
                    </label>
                    <label className="option-item" htmlFor="option-sale">
                      <input type="checkbox" id="option-sale" />
                      <span className="checkmark"></span>
                      <span className="option-title">
                        Sale
                        <span className="value-product-option"> (8)</span>
                      </span>
                    </label>
                  </div>
                  <div className="price-filter">
                    <span className="price-filter-title">Price</span>
                    <div className="slider-price">
                      <input
                        className="slider-price-input"
                        type="range"
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        onChange={handleChangeSlider}
                      />
                    </div>
                    <div className="price-value">
                      <span className="price-min">${MIN_PRICE}.00</span>
                      <span className="price-current">${price}.00</span>
                    </div>
                  </div>
                  <button
                    onClick={handleShowFilter}
                    className="btn_filter_mobile"
                  >
                    OK
                  </button>
                </div>

                <div className="products-search">
                  <div className="header-product-search">
                    <span>16 out of 24 items found for "p"</span>
                    <div className="sort-options">
                      <span>Sort by:</span>
                      <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        styles={stylesOptionsSort}
                      />
                    </div>
                  </div>
                  <div className="products-search-list">
                    {searchProducts.length <= 0 ? (
                      <div>No results found. Try a new search.</div>
                    ) : (
                      searchProducts.map((product) => (
                        <ProductItem
                          key={product.id}
                          isShowAddToCart={true}
                          product={product}
                        />
                      ))
                    )}
                  </div>
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

export default SearchPage;
