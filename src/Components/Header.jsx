import "../styles.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cartItem = useSelector((state) => state.cart);
  const [searchedText, setSearchedText] = useState("");
  const navigate = useNavigate();
  const totalQuantity = cartItem.reduce((acc, item) => acc + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // function for showing small screen menu modal 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // function to handle search input 

  function handleSearch() {
    if (searchedText.trim() !== "") {
      navigate(`/searchedproducts/${searchedText}`);
    }
  }

  // Trigger search when Enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="header">
      {/* small screen menu  */}

      <div className="smallmenu hideonbigforsmall">
        {/* Hamburger Icon */}
        <div className="hamburger hideonbigforsmall" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        {/* Modal Menu */}
        {isMenuOpen && (
          <div className="modal">
            <div className="modal-content">
              {/* Close Button (X) */}
              <span className="close" onClick={toggleMenu}>
                &times;
              </span>

              {/* Menu Items */}
              <ul className="menu-items">
                <li onClick={toggleMenu}>
                  <Link to="/">Home</Link>
                </li>
                <li onClick={toggleMenu}>
                  <Link to="/products">All Products</Link>
                </li>
                <li onClick={toggleMenu}>
                  <Link to="/categories">Categories</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <Link to="/">
        {" "}
        <h1>ShoppyGlobe</h1>{" "}
      </Link>
      <input
        className="searchinput hideonsmall"
        type="text"
        placeholder="search your favorite products"
        onChange={(e) => setSearchedText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="hideonsmall" onClick={handleSearch}>
        <i className="searchicon fa fa-magnifying-glass fa-2x"></i>
      </button>

      <Link to="/">
        <span className="hideonmobile">Home</span>
      </Link>
      <Link to="/products">
        {" "}
        <span className="hideonmobile">Products</span>{" "}
      </Link>
      <Link to="/categories">
        {" "}
        <span className="hideonmobile">Categories</span>
      </Link>
      <Link to="/cart">
        {" "}
        <span className="cartheader">
          <svg
            className="carticon"
            width="30"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.25 17.25H6.54545L3.93015 2.86584C3.89873 2.69303 3.80766 2.53673 3.67281 2.42419C3.53796 2.31164 3.36789 2.25 3.19225 2.25H1.5"
              stroke="#111112"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 21C8.53553 21 9.375 20.1605 9.375 19.125C9.375 18.0895 8.53553 17.25 7.5 17.25C6.46447 17.25 5.625 18.0895 5.625 19.125C5.625 20.1605 6.46447 21 7.5 21Z"
              stroke="#111112"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.25 21C18.2855 21 19.125 20.1605 19.125 19.125C19.125 18.0895 18.2855 17.25 17.25 17.25C16.2145 17.25 15.375 18.0895 15.375 19.125C15.375 20.1605 16.2145 21 17.25 21Z"
              stroke="#111112"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.86363 13.5H17.6345C17.9858 13.5 18.3259 13.3767 18.5956 13.1516C18.8653 12.9265 19.0475 12.6139 19.1103 12.2683L20.25 6H4.5"
              stroke="#111112"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Cart({totalQuantity})
        </span>
      </Link>

      <div className="hideonbig searchheadersmall">
        <input
          className="searchinput searchinputsmall"
          type="text"
          placeholder="search your favorite products"
          onChange={(e) => setSearchedText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="searchbuttonsmall" onClick={handleSearch}>
          <i className="searchicon fa fa-magnifying-glass fa-2x"></i>
        </button>
      </div>
    </div>
  );
}

export default Header;
