import React from "react";
import rocket from '../assets/rocket.png'
import { Link } from "react-router-dom";

function Header2() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
      <a className="navbar-brand" style={{marginRight:5,color:"#e1f240"}} href="/">
              <img src={rocket} width={25} height={25} style={{marginRight:5}} alt="" />
              FastX</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
          <li className='navbar-item' >
                  <Link to="/history" style={{color:"#BBB7B7", fontWeight:500}} className="nav-link">files</Link>
                </li>

                <li className='navbar-item' >
                  <Link to="/upload" style={{color:"#BBB7B7", fontWeight:500}} className="nav-link">upload</Link>
                </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header2;
