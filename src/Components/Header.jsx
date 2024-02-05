import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import '../assets/Header.css'
import rocket from '../assets/rocket.png'
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button  onClick={() => loginWithRedirect()}>Get Started</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className='butn' onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="nav-item">
        <li className="nav-link" style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: '8px' , marginBottom:0,color:"#bbb7b7", fontWeight:500 }}>{user.email}</p>
          <img style={{ height: 30, borderRadius: '50%' , paddingRight:8 }} src={user.picture} alt={user.name} />
        </li>
      </div>
    )
  );
};
function Header() {
  const { isAuthenticated } = useAuth0();
    return (
        <nav className="navbar navbar-expand-lg" >
          <div className="container">
            <a className="navbar-brand" style={{marginRight:5,color:"#e1f240"}} href="#">
              <img src={rocket} width={25} height={25}  alt="" />
              FastX</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className='navbar-item' >
                  <Link to="/history" style={{color:"#BBB7B7", fontWeight:500}} className="nav-link">files</Link>
                </li>
              </ul>
              {isAuthenticated ? (
            <>
              <Profile />
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
            </div>
          </div>
        </nav>
      );
}

export default Header;
