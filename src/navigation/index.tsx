import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Loader } from "src/components";

const Home = lazy(() => import("../pages/Home"));

const Navigation = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export { Navigation };
