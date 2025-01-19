import "../styles.css";
import useFetch from "../utils/fetchData";
import { useState, useMemo, lazy, Suspense } from "react";
import { Link } from "react-router-dom";

function Home() {
  const ProductItem = lazy(() => import("./ProductItem"));
  const { data, error, loading } = useFetch(
    "https://dummyjson.com/products?limit=120"
  );
  const [topProduct, setTopProduct] = useState(null);
  const [sellingFast, setSellingFast] = useState(null);

  useMemo(() => {
    if (data) {
      const best = data.filter((p) => p.rating >= 4.85);
      setTopProduct(best);
      const fast = data.filter((p) => p.stock < 8);
      setSellingFast(fast);
    }
  }, [data]);

//   function for back to top button 

  function handleBackTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }


  return (
    <div className="home">
      <img
        className="republicbanner"
        src="../src/assets/sale-banner.jpg"
        alt="republic day sale"
      />
      <div className="halfbanner">
        <h2>Don't miss this sale !</h2>
        <h4>Many deals to grab</h4>
        <Link to="/sale/discount">
          <button>Grab Now</button>{" "}
        </Link>
      </div>
      <h2 className="tpheading">Top Products</h2>
      <div className="topproduct">
        <Suspense fallback={<div>Loading..</div>}>
          {topProduct
            ? topProduct.map((p) => <ProductItem key={p.id} data={p} />)
            : ""}
        </Suspense>
      </div>

      <div className="banner">
        <div>
          <h4>Starting as low as $999</h4>
          <h1>Best Selling Laptops Collection</h1>
          <h3>Grab now, offer valid for limited time only !</h3>
          <Link to="/product/laptops">
            {" "}
            <button>Buy Now</button>
          </Link>
        </div>
        <div>
          <img className="bannerimage" src="../src/assets/laptop.png" alt="" />
        </div>
      </div>

      <h2 className="tpheading">Selling Fast</h2>
      <div className="topproduct">
        <Suspense fallback={<div>Loading..</div>}>
          {sellingFast
            ? sellingFast.map((p) => <ProductItem key={p.id} data={p} />)
            : ""}
        </Suspense>
      </div>
      <button onClick={handleBackTop}><i className="backtoTop fa-solid fa-arrow-up fa-lg"></i></button>
    </div>
  );
}

export default Home;
