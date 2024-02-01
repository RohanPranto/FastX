import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';


const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
  domain="dev-jg6ojosw0gzydbuu.us.auth0.com"
  clientId="cAzfMlonWxz0twcdoA0XVitBtvthHUTj"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
  >
    <App />
  </Auth0Provider>
);
