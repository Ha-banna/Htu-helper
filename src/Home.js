import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import { Main } from './main';
import { useEffect } from 'react';
import { Header2 } from './Header2';
import jwt_decode from "jwt-decode";

export function Home() {
    const h = new Main();
    const navigate = useNavigate();
    let info;
    const check = () => {
        info = jwt_decode(h.getCookie("token"));
        useEffect(()=>{
            if(!info['email_confirmed']){
                navigate('/get_verify')
            }
        },[])
    }
    check();
    return (
        <>
        <Header2></Header2>
        <div className='home'>
            <h1 className='slim center'> {`Welcome ${h.getCookie("name")}!`}</h1>
        </div>
        </>
    );
} 