import { Link } from 'react-router-dom';
import './App.css';
import { Header } from './Header';

export function Sent(){
    return(
        <>
        <Header></Header>
        <div className='cont'>
            <div className='login'>
                <h1 className='slim center'>An email was sent to you university email</h1>

                <Link to={"/"}><button className='submit'>Go back to Log-in</button></Link>

            </div>
        </div>
        </>
    );
}