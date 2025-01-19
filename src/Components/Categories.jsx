import { Link } from "react-router-dom";
import "../styles.css";

function Categories() {

    // function for back to top button 

    function handleBackTop(){
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    
  return (
    <div className="categories">/

    {/* categories box, 1 div for each category  */}
    
      <div className="categorybox">
        <img
          src="../src/assets/beauty.jpg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Beauty </h2>
        <Link to="/product/beauty">
          {" "}
          <p>view products</p>
        </Link>
      </div>
      <div className="categorybox">
        <img
          src="../src/assets/fragrances.jpg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Fragrances </h2>
        <Link to="/product/fragrances">
          {" "}
          <p>view products</p>
        </Link>
      </div>
      <div className="categorybox">
        <img
          src="../src/assets/furniture.jpg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Furniture</h2>
        <Link to="/product/furniture">
          <p>view products</p>{" "}
        </Link>
      </div>
      <div className="categorybox">
        <img
          src="../src/assets/groceries.jpg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Groceries</h2>
        <Link to="/product/groceries">
          <p>view products</p>
        </Link>
      </div>
      <div className="categorybox">
        <img
          src="../src/assets/decoration.jpg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Home Decoration</h2>
        <Link to="/product/home-decoration">
          <p>view products</p>{" "}
        </Link>
      </div>
      <div className="categorybox">
        <img
          src="../src/assets/kitchen.jpeg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Kitchen Accessories</h2>
        <Link to="/product/kitchen-accessories">
          <p>view products</p>{" "}
        </Link>
      </div>
      <div className="categorybox">
        <img
          src="../src/assets/laptop.jpeg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Laptops</h2>
        <Link to="/product/laptops">
          {" "}
          <p>view products</p>
        </Link>
      </div>
      <div className="categorybox">
        <img
          src="../src/assets/shirts.jpg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Men Shirts</h2>
        <Link to="/product/mens-shirts">
          <p>view products</p>
        </Link>
      </div>
      <div className="categorybox">
        <img
          src="../src/assets/shoes.jpg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Men Shoes</h2>
        <Link to="/product/mens-shoes">
          {" "}
          <p>view products</p>
        </Link>
      </div>
      <div className="categorybox">
        <img
          src="../src/assets/watches.jpg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Men Watches</h2>
        <Link to="/product/mens-watches">
          {" "}
          <p>view products</p>
        </Link>
      </div>
      <div className="categorybox">
        <img
          src="../src/assets/mobile-accessories.jpg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Mobile Accessories</h2>
        <Link to="/product/mobile-accessories">
          {" "}
          <p>view products</p>
        </Link>
      </div>
      <div className="categorybox">
        <img
          src="../src/assets/motorcycle.jpg"
          alt=""
          width="300px"
          height="200px"
        />
        <h2>Motorcycle</h2>
        <Link to="/product/motorcycle">
          <p>view products</p>{" "}
        </Link>
      </div>
      <div className="categorybox">
        <img src="../src/assets/skin.jpg" alt="" width="300px" height="200px" />
        <h2>Skin care</h2>
        <Link to="/product/skin-care">
          {" "}
          <p>view products</p>
        </Link>
      </div>
      <button onClick={handleBackTop}><i className="backtoTop fa-solid fa-arrow-up fa-lg"></i></button>
    </div>
  );
}

export default Categories;
