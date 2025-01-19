import "../styles.css";
import { useSelector } from "react-redux";
import Cartitem from "./CartItem";
import { Link } from "react-router-dom";

function Cart() {
  const cartItem = useSelector((state) => state.cart);

  // variable to count data related to cart item pricing 
  const totalQuantity = cartItem.reduce((acc, item) => acc + item.quantity, 0);
  const totalDiscount = cartItem.reduce(
    (acc, item) =>
      acc + (item.price * item.quantity * item.discountPercentage) / 100,
    0
  );
  const totalmrp = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  let totalamount = totalmrp - totalDiscount;

  return (
    <div className="cart">
      {cartItem.length > 0 ? (
        <>
          <div className="cartitem-container">
            {cartItem.map((p) => (
              <Cartitem key={p.id} data={p} />
            ))}
            <div className="cartitem-bottom">
              <Link to="/checkout">
                <button className="mt20 proceedbutton">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
          <div className="pricedetails-container">
            <h3 className="mb20">PRICE DETAILS</h3>
            <p>
              MRP({totalQuantity} items)
              <span className="leftmargin50">${totalmrp.toFixed(2)}</span>
            </p>
            <p>
              Product Discount{" "}
              <span className="green leftmargin50">
                -${totalDiscount.toFixed(2)}
              </span>
            </p>
            <p>
              Delivery Fee<span className="leftmargin100">$0</span>
            </p>
            <h4 className="mt20">
              Total Amount
              <span className="leftmargin50">${totalamount.toFixed(2)}</span>
            </h4>
            <p id="saveamount">
              You will save ${totalDiscount.toFixed(2)} on this order
            </p>
          </div>
        </>
      ) : (
        // If cart is empty, show the message
        <div className="empty-cart-message">
          <h2>Your cart is empty ! Please add some item to checkout</h2>
        </div>
      )}
    </div>
  );
}

export default Cart;
