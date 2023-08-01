import './App.css'
import { Header } from './Header'

export function Getverified(){
    return(
        <>
        <Header></Header>
        <div className='login extra-margin'>
                <h1 className='slim center'>Please Verify your Email</h1>
            </div>
        </>
    )
}