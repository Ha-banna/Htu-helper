import { useState,useEffect, useCallback } from 'react';
import './App.css';
import { Link , useNavigate} from 'react-router-dom';
import { Main } from './main';
import { Header } from './Header';
import jwt_decode from 'jwt-decode';

export function Login() {
  const navigate = useNavigate();
  const h = new Main();
  const url = "https://laravel-land-project.online/api/user/login"


  const [idNum, setIDNum] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(true);

  const checkPass = (pass) => {
    if (pass.length < 8)
    {
        document.getElementById("2").innerText = "Password must be at least 8 characters"
        setError(true)
    }
    else{
        let template = /^(?=.*[!@#$%^&*()<>?/+=_~])(?=.*[0-9])(?=.*[A-Z]).*$/;
        if (!template.test(pass))
        {
            document.getElementById("2").innerText = "Password must contain at least one special character, number, and a capital letter"
            setError(true)
        }
    }
  }

  const checkID = (id) => {
    if (id.length !== 8) 
    {
      document.getElementById("1").innerText = "ID must be 8 characters long";
      setError(true)
    } 

    else 
    {
      for (let i = 0; i < id.length; i++) 
      {
        if (id.charAt(i) < "0" || id.charAt(i) > "9") 
        {
          document.getElementById("1").innerText = "ID must be a number";
          setError(true)
          break;
        }
      }
    }
  }

  ////API

  let stuff;

  const sendInfo = useCallback(async () => {
    const data = {
      id_number: idNum,
      password: pass,
    };
  
    try {
      const send = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      stuff = await send.json();
    } catch (e) {
      console.log("=)")
    }
  
    if (stuff["returnCode"] == "200") {
      document.cookie = `token=${stuff["results"]["token"]}`;
      document.cookie = `name=${stuff["results"]["name"]}; Secure`;
      document.cookie = `id=${idNum}; Secure`;
      navigate("/home");
    } else {
      document.getElementById("2").innerText = stuff["message"];
    }
  },[error, idNum, pass]);

  useEffect(() => {
    if (!error) {
      sendInfo();
    }
  }, [error]);
  
  ////API END

  const handleSubmit = async event => {
    event.preventDefault();
    setError(false)
    document.getElementById("1").innerText = ""
    document.getElementById("2").innerText = ""
    checkPass(pass)
    checkID(idNum)

    if(!error){
      await sendInfo();
    }
  }

  const handleInputChange = () => {
    setIDNum(document.getElementById("id").value);
    setPass(document.getElementById("pass").value)
  };

  return (
    <>
    <Header></Header>
    <div className='cont'>
        <div className="login">
        <form onSubmit={handleSubmit}>
            <div className='input-cont'>
                <h1 className='slim center'>Log-in</h1>

                <input
                type="text"
                className='rest'
                placeholder="ID number"
                autoComplete="off"
                id="id"
                value={idNum}
                onChange={handleInputChange}
                required
                />

                <p className='error' id="1"></p>

                <input
                className='rest'
                type="password"
                placeholder="password"
                autoComplete="off"
                id="pass"
                value={pass}
                onChange={handleInputChange}
                required
                />
                <p className='error' id="2"></p>

                <input type="submit" className="submit" value="Log-in" />
            </div>
        </form>

        <p className="goto-signup">
            Don't have an account? <Link to="/signup">Sign-up</Link>
  </p>

        <p className="goto-signup">
            <Link to={"/forgot_password"}>forgot password?</Link>
        </p>
        
        </div>
    </div>
    </>
  );
}