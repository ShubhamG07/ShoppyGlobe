import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import useFetch from "../utils/fetchData";
import ProductItem from "./ProductItem";
import { useParams, useLocation } from "react-router-dom";
import "../styles.css";

function Searched() {
  const cat = useParams();
  // const ProductItem = lazy(() => import("./ProductItem"));
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [sortOption, setSortOption] = useState("default");
  const [searchedText, setSearchedText] = useState("");
  const { data, error, loading } = useFetch(
    "https://dummyjson.com/products?limit=120"
  );

  useEffect(() => {
    if (data && cat.text && cat.text !== searchedText) {
      // Check if the filtered products have changed before updating
      const filterProducts = data.filter(
        (p) =>
          p.title.toLowerCase().includes(cat.text.toLowerCase()) ||
          p.category.toLowerCase().includes(cat.text.toLowerCase()) ||
          (p.brand && p.brand.toLowerCase().includes(cat.text.toLowerCase()))
      );

      setFilteredProducts(filterProducts);
      setSearchedText(cat.text);
    }
  }, [data, cat.text]);

  if (error) {
    return (
      <div className="error">
        {" "}
        <h2>Error Occured.Please check your internet connection !</h2>{" "}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <h1> Please Wait while we are loading all products...</h1>
      </div>
    );
  }

  // Function to handle sorting based on selected filter
  const handleSort = (option) => {
    setSortOption(option);
    let sortedProducts;

    switch (option) {
      case "price":
        sortedProducts = [...filteredProducts].sort(
          (a, b) => a.price - b.price
        );
        break;
      case "priceDesc":
        sortedProducts = [...filteredProducts].sort(
          (a, b) => b.price - a.price
        );
        break;
      case "rating":
        sortedProducts = [...filteredProducts].sort(
          (a, b) => b.rating - a.rating
        );
        break;
      case "ratingDesc":
        sortedProducts = [...filteredProducts].sort(
          (a, b) => a.rating - b.rating
        );
        break;
      default:
        sortedProducts = [...filteredProducts].sort((a, b) => a.id - b.id);
    }

    setFilteredProducts(sortedProducts);
  };

  // function for back to top button 

  function handleBackTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <div>
      {filteredProducts ? (filteredProducts.length?
        <h1 className="productsearch mt100 tpheading">
          Products for searched term {searchedText}
        </h1> :<h1 className="productsearch mt100 tpheading">
        No Product Found for term {searchedText}
      </h1>
      ) : (
        ""
      )}
      {
        <div className="sorting">
          <label>Sort by : </label>
          <select
            onChange={(e) => handleSort(e.target.value)}
            value={sortOption}
          >
            <option value="default">Default</option>
            <option value="price">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
            <option value="rating">Rating (High to Low)</option>
            <option value="ratingDesc">Rating (Low to High)</option>
          </select>
        </div>
      }
      <div className="productlist">
        {filteredProducts ? (
          filteredProducts.map((p) => <ProductItem key={p.id} data={p} />)
        ) : (
          <h1>No Product found for {searchedText} </h1>
        )}
      </div>
      <button onClick={handleBackTop}><i className="backtoTop fa-solid fa-arrow-up fa-lg"></i></button>
    </div>
  );
}

export default Searched;
