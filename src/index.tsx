import { createRoot } from "react-dom/client";

import "./index.scss";
import App from "./App";

// Add URL cleanup before rendering
if (window.location.href.includes("%23")) {
  const cleanUrl = window.location.href
    .replaceAll("%23", "#")
    .replaceAll("%2F", "/");

  window.location.replace(cleanUrl);
} else {
  const root = createRoot(document.getElementById("app")!);
  root.render(<App />);
}
