import "../styles.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="errorpage">
      <img src="../src/assets/error.png" alt="" width="600px" height="400px" />
      <h2 className="msg404 red">
        Sorry the page you are looking for is not available !
      </h2>
      <Link to="/">
        <button className="backtohome">BACK TO HOME</button>{" "}
      </Link>
    </div>
  );
}

export default Error;
