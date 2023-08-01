import './App.css';
import { Main } from './main';
import { useNavigate} from 'react-router-dom';
import { Header } from './Header';

export function Verify() {
  const h = new Main();
  const navigate = useNavigate();

  let u = window.location["href"].split('/');
  let url = `https://laravel-land-project.online/api/email/verify/${u[5]}/${u[6]}?expires=${u[7]}&signature=${u[8]}`;
  let stuff;

  const run = async () => {
    try {
      const send = await fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${h.getCookie("token")}`
        }
      });

      stuff = await send.json();
      if (stuff["returnCode"] == "200") {
        alert(stuff["message"]);
        navigate("/home")
      }
      else{
        alert(stuff["message"]);
        navigate("/")
      }
    } catch (e) {
      console.log("=)" + e)
    }
  }

  run();
  return (
    <>
    <Header></Header>
    <div className='cont2'>
          <h1 className='slim center'>Verifying Email...</h1>
          {/* Loading spinner or any other loading indicator can be added here */}
    </div>
    </>
  );
}