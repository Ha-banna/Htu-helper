import { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';

export function Forgot() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [error, setError] = useState(true);

  useEffect(() => {
    if (!error) {
      navigate('/email_sent');
      //sendInfo();
    }
  }, [error, navigate/*, sendInfo*/]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false);
    checkID(id);
  };

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const checkID = (id) => {
    if (id.length !== 8) {
      setError(true);
      document.getElementById('1').innerText = 'ID must be 8 characters long';
    } else {
      for (let i = 0; i < id.length; i++) {
        if (id.charAt(i) < '0' || id.charAt(i) > '9') {
          setError(true);
          document.getElementById('1').innerText = 'ID must be a number';
          break;
        }
      }
    }
  };

  //API
  /*const sendInfo = async () => {      
    const data = {
      email: `${id}@htu.edu.jo`
    };
  
      const response = await fetch("test.json", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
      });
  
      const finalResult = await response.json();
      console.log(finalResult);
  };*/
  //API
  return (
    <>
    <Header></Header>
    <div className='cont'>
        <div className='login extra-margin2'>
            <h1 className='slim center'>Enter id number to receive verification email</h1>
            <form onSubmit={handleSubmit}>
            <input
                type='text'
                className='rest'
                placeholder='ID number'
                id='id'
                required
                value={id}
                onChange={handleChange}
                autoComplete='off'
            />
            <p className='error' id='1'></p>

            <input type='submit' className='submit' value='Send Email' />
            </form>
        </div>
      </div>
    </>
  );
}
