import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-ncmxh7hsp8x7tc0c.us.auth0.com"
    clientId="zlKtLeATSfGX1cdlfPSNZMGQ6O7FxNa6"
    authorizationParams={{
      redirect_uri: "https://book-store-c7d27.web.app/dashboard",
    }}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>
);
