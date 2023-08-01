import { useEffect, useState } from 'react';
import './App.css'
import { Header2 } from './Header2';
import { Main } from './main';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export function Calculator(){
    const [name, setName] = useState();
    const [tableRows, setTableRows] = useState([]);
    const h = new Main();
    const navigate = useNavigate();
    let info;
    let gpa = 0.0;
    let num = 0;

    const check = () => {
        try{
            info = jwt_decode(h.getCookie("token"));
            useEffect(()=>{
                if(!info['email_confirmed']){
                    navigate('/get_verify')
                }
            },[])
        }
        catch(error){
            console.log(error)
        }
    }

    const calcGPA = () => {
        for(let i = 0; i < tableRows.length; i++){
            if(tableRows[i][1] === 'D'){
                gpa += 4.0 * parseInt(tableRows[i][2])
            }
            else if(tableRows[i][1] === 'M'){
                gpa += 3.2 * parseInt(tableRows[i][2])
            }
            else if(tableRows[i][1] === 'P'){
                gpa += 2.4 * parseInt(tableRows[i][2])
            }
            else{
                gpa += 1.6 * parseInt(tableRows[i][2])
            }
            num += parseInt(tableRows[i][2])
        }
        gpa /= num
        alert(`Your gpa is: ${gpa.toFixed(2)}`)
        gpa = 0
        num = 0
    }

    const addCourse = (event) => {
        event.preventDefault()
        if(document.getElementById("grade").value == "Select Grade" || document.getElementById("hours").value == "" || name == ""){
            alert("Please enter valid information")
        }
        else{
            setTableRows([...tableRows,[name, document.getElementById("grade").value, document.getElementById("hours").value]])
        }
        setName("")
        document.getElementById("grade").value = "Select Grade"
        document.getElementById("hours").value = ""
    }

    const handleInputChange = () => {
        setName(document.getElementById("name").value);
    }

    check();
    return(
        <>
            <Header2></Header2>
            <div className='calculator'>
                <h1 className='slim center'>GPA Calculator</h1>

                <div className='add-class'>
                    <table className='course-table'>
                        <tr>
                            <th>#</th>
                            <th>Course Name</th>
                            <th>Grade</th>
                            <th># of hours</th>
                        </tr>
                        {
                            tableRows.map((f, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{f[0]}</td>
                                    <td>{f[1]}</td>
                                    <td>{f[2]}</td>
                                </tr>
                            ))
                        }
                    </table>
                    <form>
                        <div className='add-course'>
                            <input type='text' id="name bigger" onChange={handleInputChange} value={name} placeholder='Course Name' autoComplete='off' className='rest' required></input>
                            <p className='error' id="1"></p>
                            <div className='name-cont'>
                                <select required className='name bigger' id={"grade"}>
                                    <option selected disabled>Select Grade</option>
                                    <option>U</option>
                                    <option>P</option>
                                    <option>M</option>
                                    <option>D</option>
                                </select>
                                <input type='number' id="hours" placeholder='Number Of Hours' min={1} autoComplete='off' className='name bigger black' required></input>
                            </div>
                            <input type='submit' className='submit bigger margin' value={"Add Course"} onClick={addCourse}></input>
                        </div>

                        <input type='submit' className='submit bigger' onClick={calcGPA} value={"Calculate GPA"}></input>
                    </form>
                </div>

            </div>
        </>
    ); 
}