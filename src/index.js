import React from "react";
import ReactDOM from "react-dom";

import App from "./Main";
import * as serviceWorker from "./serviceWorker";
import "./scrollOffset";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
