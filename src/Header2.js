import { useState, useEffect } from "react";
import './App.css'
import { Link } from "react-router-dom";

// Import the image directly
import img from './account.png';

export function Header2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 750);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 750);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      <>
        <Link to={"/home"} className="rem-line"><h2 className="logo">HTU Helper</h2></Link>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={isMenuOpen ? 'icon open' : 'icon'}>
            <i className="fa-solid fa-bars menu-icon"></i>
          </div>
        </div>
 
        <nav className={isMenuOpen ? 'menu-items open' : 'menu-items'}>
          <Link to="/home">
            <button className='header-button'>Recommend Courses</button>
          </Link>
          <Link to="/gpa">
            <button className='header-button'>GPA Calculator</button>
          </Link>
          <Link to="/account">
            <button className="account-button">
              {/* Show the image on screens wider than 750px */}
              {isWideScreen ? (
                <img className="account-img" src={img} alt="Account" />
              ) : (
                <button className='header-button2'>Account</button>
              )}
            </button>
          </Link>
        </nav>
      </>
    </header>
  );
}
