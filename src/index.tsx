import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error('Root container missing in index.html');
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);