import { useState, useEffect } from 'react';
import './App.css';
import {Link, useNavigate} from "react-router-dom";
import { Main } from './main';
import { Header } from './Header';
import jwt_decode from "jwt-decode";

export function Signup(){
    const h = new Main();
    const navigate = useNavigate();

    const [idNum, setIDNum] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    const [email, setEmail] = useState('');
    const [fn, setFN] = useState('');
    const [ln, setLN] = useState('');
    const [error, setError] = useState(true);

    const url = "https://laravel-land-project.online/api/user/register"
    
    const checkPass = (pass, pass2) => {
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

        if(pass !== pass2)
        {
            document.getElementById("3").innerText = "Passwords must match"
            setError(true)
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

      const handleSubmit = async event => {
        event.preventDefault();
        setError(false)
        document.getElementById("1").innerText = ""
        document.getElementById("2").innerText = ""
        document.getElementById("3").innerText = ""
        document.getElementById("4").innerText = ""
        checkPass(pass, pass2)
        checkID(idNum)

        if(!error){
          await sendInfo();
        }
      };
    
      const handleInputChange = () => {
        setIDNum(document.getElementById("id").value);
        setPass(document.getElementById("pass").value)
        setPass2(document.getElementById("pass2").value)
        setEmail(document.getElementById("email").value)
        setFN(document.getElementById('firstname').value)
        setLN(document.getElementById('lastname').value)
      }; 

      //SEND API
      let stuff;
      const sendInfo = async () => {
        const data = {
          name: `${fn} ${ln}`,
          email: email,
          id_number: idNum,
          major: document.getElementById("major").value,
          password: pass,
          password_confirmation: pass2 // corrected property name
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
      }
        catch (error) {
          console.log("=)")
        }

        if (stuff["returnCode"] == "200") {
          document.cookie = `token=${stuff["results"]["token"]}`;
          document.cookie = `name=${fn} ${ln}; Secure `;
          document.cookie = `id=${idNum}; Secure`;
          navigate("/home");
  
        } else {
          document.getElementById("3").innerText = stuff["message"];
        }
      };
      //SEND API

      useEffect(() => {
        if (!error) {
          sendInfo();
        }
      }, [error]);      

    return(
      <>
      <Header></Header>
        <div className='cont'>
            <div className="login">
                <form onSubmit={ handleSubmit }>
                    <div className='input-cont'>
                        <h1 className='slim center'>Sign-up</h1>

                        <div className='name-cont'>
                            <input
                            type="text"
                            className='name'
                            placeholder="First Name"
                            autoComplete="off"
                            id="firstname"
                            onChange={handleInputChange}
                            value={fn}
                            required
                            />

                            <input
                            type="text"
                            className='name'
                            placeholder="Last Name"
                            autoComplete="off"
                            id="lastname"
                            onChange={handleInputChange}
                            value={ln}
                            required
                            />  
                        </div>


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
                        type='email' placeholder='Email' autoComplete='off' id='email' required
                        value={email}
                        onChange={handleInputChange}></input>
                        <p className='error' id="4"></p>

                        <select className='rest' id="major" required>
                            <option value={"na"} selected disabled='true'>Select your Major</option>
                            <option value={"cs"} id='cs'>Computer Science</option>
                            <option value={"cyber"} id='cyber'>Cybersecurity</option>
                            <option value={"ai"} id='ai'>Data Science and AI</option>
                        </select>
                        <p className='error' id="5"></p>

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

                        <input
                        className='rest'
                        type="password"
                        placeholder="re-enter password"
                        autoComplete="off"
                        id="pass2"
                        value={pass2}
                        onChange={handleInputChange}
                        required
                        />
                        <p className='error' id="3"></p>

                        <input type="submit" className="submit" value="Sign-up"></input>
                    </div>
                </form>
                <p className='goto-signup'>Already have an account? <Link to='/'>Log-in</Link></p>
            </div>
        </div>
        </>
    );
}