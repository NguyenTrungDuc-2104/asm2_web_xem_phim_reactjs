import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RequestAPIProvider } from "./store/RequestAPIProvider";
import { ShowMovieProvider } from "./store/ShowMovieProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RequestAPIProvider>
      <ShowMovieProvider>
        <App />
      </ShowMovieProvider>
    </RequestAPIProvider>
  </React.StrictMode>
);
