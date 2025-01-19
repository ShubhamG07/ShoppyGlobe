import "../styles.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Checkout() {
  const cartItem = useSelector((state) => state.cart);
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
  const navigate = useNavigate();
  const [cardPayment, setCardPayment] = useState(false);
  const [upiPayment, setUpiPayment] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState('');

//   function to show desired input method according to selected payment method 

  function handlePayment(paymentoption) {
    const option = paymentoption;
    if (option == "CreditCard" || option == "DebitCard") {
      setUpiPayment(false);
      setCardPayment(true);
    } else if (option == "upi") {
      setCardPayment(false);
      setUpiPayment(true);
    } else {
      setCardPayment(false);
      setUpiPayment(false);
    }
  }

//   function for order placing 

  function orderPlaced(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    setSuccessMsg("Order Placed successfully! Redirecting to Home page...");
    setTimeout(() => {
      setSuccessMsg("");
      navigate("/");
    }, 3000);
  }

//   function to validate upi pattern  for payment 

  function validateUpiId(e) {
    const value = e.target.value;

    const upiPattern = /^[a-zA-Z0-9]+@(upi|ybl|paytm|gpay|apl)$/;

    if (!upiPattern.test(value)) {
      e.target.setCustomValidity(
        "Please enter a valid UPI ID (e.g. name@upi, name@ybl, name@paytm)"
      );
    } else {
      e.target.setCustomValidity("");
    }
  }

  return (
    <>
      <div>{successMsg && <p className="success">{successMsg}</p>}</div>

      <div className="checkout">
        <div className="checkout-container">

            {/* form to fill checkout details  */}
          <h2>Checkout</h2>
          <form onSubmit={orderPlaced}>
            <label htmlFor="name">Full Name :</label>
            <input
              id="name"
              pattern="[A-Za-z\s]+"
              type="text"
              name="name"
              required
              onInput={(e) => {
                const value = e.target.value;
                if (/[^A-Za-z\s]/.test(value)) {
                  e.target.setCustomValidity(
                    "Please enter only letters and spaces"
                  );
                } else {
                  e.target.setCustomValidity("");
                }
              }}
              placeholder="Enter your name"
            />
            <label htmlFor="mobile">Mobile No. :</label>
            <input
              id="mobile"
              type="number"
              name="mobile"
              pattern="^\d{10}$"
              required
              onInput={(e) => {
                const value = e.target.value;
                if (!/^\d{10}$/.test(value)) {
                  e.target.setCustomValidity(
                    "Please enter a valid 10-digit phone number"
                  );
                } else {
                  e.target.setCustomValidity("");
                }
              }}
              placeholder="Enter your 10-digit phone number"
            />
            <label htmlFor="address">Address :</label>
            <textarea name="address" id="address" rows="2"></textarea>
            <label htmlFor="payment">Payment Method :</label>
            <select
              name="payment"
              id="payment"
              onChange={(e) => handlePayment(e.target.value)}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="CreditCard">Credit Card</option>
              <option value="DebitCard">Debit Card</option>
              <option value="NetBanking">Net Banking</option>
              <option value="upi">UPI</option>
              <option value="onlinewallet">
                Online Wallet (Paytm/Mobikwik/Phonepe)
              </option>
            </select>

            {/* if card payment selected  */}

            {cardPayment ? (
              <div className="cardpayment">
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  pattern="^\d{16}$"
                  title="Card number should be 16 digits"
                  placeholder="Enter 16-digit card number"
                  required
                  maxLength="16"
                  minLength="16"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />

                <label htmlFor="expiryMonth">Expiry Date:</label>
                <select
                  id="expiryMonth"
                  name="expiryMonth"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  required
                >
                  <option value="">Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>

                <select
                  id="expiryYear"
                  name="expiryYear"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  required
                >
                  <option value="">Year</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                  <option value="2031">2031</option>
                  <option value="2032">2032</option>
                </select>

                <label className="ml20" htmlFor="cvv">
                  CVV:{" "}
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  pattern="^\d{3,4}$"
                  placeholder="CVV"
                  title="CVV should be 3 or 4 digits"
                  required
                  maxLength="4"
                  minLength="3"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
                <br />
                <button type="submit" className="placeorder">
                  Place Order
                </button>
              </div>
            ) : /* if upi payment method selected  */
            upiPayment ? (
              <div className="upi">
                <label htmlFor="upiId">UPI ID:</label>
                <input
                  type="text"
                  id="upiId"
                  name="upiId"
                  pattern="^[a-zA-Z0-9]+@(upi|ybl|paytm|gpay|apl)$"
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                  onInput={(e) => validateUpiId(e)}
                />
                <button type="submit" className="placeorder">
                  Place Order
                </button>
              </div>
            ) : (
              ""
            )}

            <h3 className="m30">Amount to Pay :</h3>

            <h3 className="m30">${totalamount.toFixed(2)}</h3>

            <button type="submit" className="placeorder">
              Place Order
            </button>
            <Link to="/cart">
              <button className="backtocart">Back to Cart</button>{" "}
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;
