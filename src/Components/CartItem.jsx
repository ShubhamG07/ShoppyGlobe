import "../styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";

function Cartitem(props) {
  const data = props.data;
  const dispatch = useDispatch();
  const [quantityLimit, setQuantityLimit] = useState(false);
  const[itemQuantity,setItemQuantity]=useState(data.quantity);

  // variable to count data related to cart item pricing
  let discountamount =
    ((data.price * data.discountPercentage) / 100) * data.quantity;
  let totalamount = data.price * data.quantity;

  function calculatePrice(price, discount) {
    let discountedprice = price * ((100 - discount) / 100) * data.quantity;
    return discountedprice.toFixed(2);
  }


//   function to handle increase quantity 
  function handleIncrease() {
    let increaseqty = data.quantity + 1;
    if (increaseqty > data.stock) {
      setQuantityLimit(true);
      setTimeout(() => {
        setQuantityLimit(false);
      }, 2000);
    } else {
      dispatch(updateQuantity({ id: data.id, quantity: increaseqty }));
    }
  }
  
//   function to handle decrease quantity 

  function handleDecrease() {
    let decreasedqty = data.quantity - 1;
    if (decreasedqty <= 0) {
      dispatch(removeFromCart(data.id));
    } else {
      dispatch(updateQuantity({ id: data.id, quantity: decreasedqty }));
    }
  }

//   function to remove item from cart 

  function removeItem() {
    dispatch(removeFromCart(data.id));
  }

  return (
    <div className="cartitem">
      <Link to={`/productdetail/${data.id}`}>
        <img
          src={data.image}
          alt="product image"
          height="150px"
          width="150px"
        />
      </Link>
      <div className="cartitemdata">
        <p>{data.title}</p>
        <small className="grey">{data.shippingInformation}</small>
        <h3 className="mt25">
          ${calculatePrice(data.price, data.discountPercentage)}
          &nbsp; <del className="mrp">{totalamount.toFixed(2)}</del> &nbsp;{" "}
          <span className="green">${discountamount.toFixed(2)} off</span>
        </h3>
      </div>
      <div className="cartitembutton">
        <button onClick={removeItem} className="removeitembutton">
          Remove Item
        </button>
        <div className="qty">
          <button onClick={handleDecrease}>
            <i className="fa-solid fa-minus"></i>{" "}
          </button>
          <input type="text" pattern="\d*" value={data.quantity} onChange={(e)=>setItemQuantity(e.target.value)} />
          <button onClick={handleIncrease}>
            {" "}
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        {quantityLimit ? (
          <small className="stocklimit">No more stock available !</small>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Cartitem;
