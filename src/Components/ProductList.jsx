import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import useFetch from "../utils/fetchData";
import { useParams, useLocation } from "react-router-dom";
import "../styles.css";
import { use } from "react";

function Productlist() {
  const { category, offer } = useParams();
  const ProductItem = lazy(() => import("./ProductItem"));
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [sortOption, setSortOption] = useState("default");
  const { data, error, loading } = useFetch(
    "https://dummyjson.com/products?limit=120"
  );

  useEffect(() => {
    let filterProducts;
    if (data) {
      if (category) {
        filterProducts = data.filter((p) => p.category == category);
      } else if (offer) {
        filterProducts = data.filter((p) => p.discountPercentage > 15);
      } else {
        filterProducts = data;
      }
      setFilteredProducts(filterProducts);
    }
  }, [data, category, offer]);


  const memoizedFilteredProducts = useMemo(
    () => filteredProducts,
    [filteredProducts]
  );

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
      <h1 className="mt100 tpheading">Product List</h1>
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
        <Suspense
          fallback={
            <div>
              <h2> Loading...</h2>
            </div>
          }
        >
          {memoizedFilteredProducts
            ? memoizedFilteredProducts.map((p) => (
                <ProductItem key={p.id} data={p} />
              ))
            : ""}
        </Suspense>
      </div>
      
      <button onClick={handleBackTop}><i className="backtoTop fa-solid fa-arrow-up fa-lg"></i></button>
    </div>
  );
}

export default Productlist;
