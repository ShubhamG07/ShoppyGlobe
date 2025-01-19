import "../styles.css";
import useFetch from "../utils/fetchData";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { useEffect, useState } from "react";

function Productdetail() {
  const cartItem = useSelector((state) => state.cart);
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { data, error, loading } = useFetch(
    "https://dummyjson.com/products?limit=120"
  );
  const { id } = useParams();

  useEffect(() => {
    if (data) {
      setProduct(data.filter((p) => p.id == id));
    }
  }, [data]);

  // function to showing rating of stars according to product rating 

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i}>
          {i < rating ? (
            <i className="fa-solid fa-star starcolor"> </i>
          ) : i - rating < 0.5 ? (
            <i className="fa-solid fa-star starcolor"> </i>
          ) : (
            <i className="fa-regular fa-star starcolor"></i>
          )}
        </span>
      );
    }
    return stars;
  };

  // function to calculate price 

  function calculatePrice(price, discount) {
    return (price * ((100 - discount) / 100)).toFixed(2);
  }

  // function for showing go to cart when product added in cart 
  
  function handleAddtoCart(product) {
    const productData = {
      id: product.id,
      title: product.title,
      category: product.category,
      rating: product.rating,
      price: product.price,
      discountPercentage: product.discountPercentage,
      image: product.thumbnail,
      shippingInformation: product.shippingInformation,
      returnPolicy: product.returnPolicy,
      stock: product.stock,
      quantity: 1,
    };

    dispatch(addToCart(productData));
    setAddedToCart(true);
  }

  return (
    <div>
      {product
        ? product.map((p) => (
            <div key={p.id} className="productdetail">
              <div className="productimage">
                <img
                  src={p.images[0]}
                  alt="product image"
                  width="500px"
                  height="500px"
                />
              </div>
              <div className="productinfo">
                <p className="brand">{p.brand}</p>
                <h1>{p.title}</h1>
                <p>
                  {renderRating(p.rating)} {p.rating}
                </p>
                <h2 className="price">
                  ${calculatePrice(p.price, p.discountPercentage)}
                </h2>
                <h3>
                  <del className="mrp">{p.price} </del> &nbsp; ({" "}
                  {p.discountPercentage}% )
                </h3>
                <h2>Product details</h2>
                <p>{p.description}</p>
                {!addedToCart ? (
                  <button
                    onClick={() => handleAddtoCart(p)}
                    className="addtocartbutton"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <Link to="/cart">
                    <button className="gotocartbutton">Go to Cart</button>
                  </Link>
                )}
              </div>
              <div className="additional-info">
                <div className="card">
                  <i className="cardlogo fa-solid  fa-truck fa-lg"></i>
                  <div>
                    <h3>Free Delivery</h3>
                    <p>{p.shippingInformation}</p>
                  </div>
                </div>
                <div className="card">
                  <i className="cardlogo fa-solid fa-dollar-sign fa-lg"></i>
                  <div>
                    <h3>Easy Return</h3>
                    <p>{p.returnPolicy}</p>
                  </div>
                </div>
                <div className="card">
                  <i className="cardlogo fa-solid fa-phone fa-lg"></i>
                  <div>
                    <h3>Support 24/7</h3>
                    <p>Contact us anytime</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        : ""}

    </div>
  );
}

export default Productdetail;
