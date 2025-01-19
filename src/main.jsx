import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import App from "./App.jsx";
import Home from "./Components/Home.jsx";

// Lazy loading all components that are not immediately required

const Productlist = lazy(() => import("./Components/ProductList.jsx"));
const Categories = lazy(() => import("./Components/Categories.jsx"));
const Searched = lazy(() => import("./Components/Searched.jsx"));
const Productdetail = lazy(() => import("./Components/ProductDetail.jsx"));
const Cart = lazy(() => import("./Components/Cart.jsx"));
const Checkout = lazy(() => import("./Components/Checkout.jsx"));
const Error = lazy(() => import("./Components/Error.jsx"));

// creating routing according to path using createBrowserRouter

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: (
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <Productlist />
          </Suspense>
        ),
      },
      {
        path: "/categories",
        element: (
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <Categories />
          </Suspense>
        ),
      },
      {
        path: "/product/:category",
        element: (
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <Productlist key={location.pathname} />
          </Suspense>
        ),
      },
      {
        path: "/sale/:offer",
        element: (
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <Productlist key={location.pathname} />
          </Suspense>
        ),
      },
      {
        path: "/searchedproducts/:text",
        element: (
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <Searched />
          </Suspense>
        ),
      },
      {
        path: "/productdetail/:id",
        element: (
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <Productdetail />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense
            fallback={
              <div>
                <h1>Please wait while we are Lazy Loading this...</h1>
              </div>
            }
          >
            <Error />
          </Suspense>
        ),
      },
    ],
    errorElement: <Suspense
    fallback={
      <div>
        <h1>Please wait while we are Lazy Loading this...</h1>
      </div>
    }
  >
    <Error />
  </Suspense>
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={appRoute} />
  </>
);
