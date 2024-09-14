import { createRoot } from "react-dom/client";

import "./index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App";

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
