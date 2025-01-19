import { useState, useEffect, lazy } from "react";
import "../styles.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";

function ProductItem(props) {
  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const data = props.data;

  // function to preload image 

  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };

  useEffect(() => {
    preloadImage(data.images[0]);
  }, [data.images[0]]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // function for showing star ratings according to product rating 

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

  // function to calculate price of product  after deducting discount

  function calculatePrice(price, discount) {
    return (price * ((100 - discount) / 100)).toFixed(2);
  }

  // function for add to cart button on product item 

  function handleAddtoCart() {

    const product = {
      id: data.id,
      title: data.title,
      category: data.category,
      rating: data.rating,
      price: data.price,
      discountPercentage: data.discountPercentage,
      image: data.thumbnail,
      shippingInformation: data.shippingInformation,
      returnPolicy: data.returnPolicy,
      stock: data.stock,
      quantity: 1,
    };

    dispatch(addToCart(product));
    setAddedToCart(true);
  }

  return (
    <div className="productitem">
      {addedToCart ? <p id="addedtocart">Added to cart</p> : ""}
      <div className="imagecontainer">
        <Link to={`/productdetail/${data.id}`}>
          <img
            src={data.images[0]}
            onLoad={handleImageLoad}
            alt="Product Image"
            className={`image ${isLoaded ? "loaded" : ""}`}
            height="200px"
            width="200px"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="productitemdetails">
        <p>{data.category}</p>
        <Link to={`/productdetail/${data.id}`}>
          {" "}
          <h3>{data.title}</h3>
        </Link>
        <div className="pricecart">
          <div>
            {" "}
            <p>
              {renderRating(data.rating)} {data.rating}{" "}
            </p>
            <h2 className="price">
              ${calculatePrice(data.price, data.discountPercentage)}
            </h2>
            <h3>
              <del className="mrp">{data.price} </del> &nbsp; ({" "}
              {data.discountPercentage}% )
            </h3>
          </div>
          <div className="addcart">
            <button onClick={handleAddtoCart}>
              {" "}
              <i className="fa-solid fa-2xl fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
