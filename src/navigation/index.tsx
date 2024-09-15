import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Loader } from "src/components";

const Home = lazy(() => import("../pages/Home"));
const Store = lazy(() => import("../pages/Store"));
const Product = lazy(() => import("../pages/Product"));
const Cart = lazy(() => import("../pages/Cart"));

const Navigation = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:category" element={<Store />} />
          <Route path="/product/*" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export { Navigation };
