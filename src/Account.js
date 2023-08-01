import { useNavigate } from 'react-router-dom';
import './App.css';
import { Header2 } from './Header2';
import { Main } from './main';
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';

export function Account(){
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
    check()
    return(
        <>
        <Header2></Header2>
        <h1 className='slim center'>Account Settings</h1>
        </>
    );
}