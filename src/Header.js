import { Link } from 'react-router-dom';
import './App.css'

export function Header() {  
  return (
    <header>
      <>
        <Link to={"/"} className='rem-line'><h2 className="logo">HTU Helper</h2></Link>
      </>
    </header>
  );
}