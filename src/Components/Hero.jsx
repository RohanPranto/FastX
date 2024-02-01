import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Header from "./Header";
import "../assets/Hero.css"
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="butn"  onClick={() => loginWithRedirect()}>
      Get Started
    </button>
  );
};

function Hero() {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <Header />
      <div className="container hero d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1> <span>Send</span>, <span>Receive</span> or <span>Store</span> Just like a <span>Magic</span></h1>
          <p style={{color:"#bbb7b7"}}>A file sharing app, developed by RohanBiswas</p>
          <div className="mt-4">
            {isAuthenticated ? (
              <button
                className="btn mx-2" style={{color:"#bbb7b7"}}
                onClick={() => (window.location.href = "/upload")}
              >
                Get Started
              </button>
            ) : (
              <LoginButton />
            )}
            <button style={{color:"#bbb7b7"}} className="btn mx-2">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
