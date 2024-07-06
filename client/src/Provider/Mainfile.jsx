import creation from "./createContext.js";
import { useState } from "react";

const Mainfile = ({children}) => {

//For login

const [login,setLogin] = useState({
    email:"",
    password:""
})

function Login(value,type){
    setLogin(elements =>{
        return{
            ...elements,
            [type]:value
        }
    })
}


const submitLogin = async(e) =>{
    e.preventDefault();
    try{
const response = await fetch('http://localhost:8000/api/login',{
    method:'post',
    body:JSON.stringify(login),
    headers:{
      'Content-Type':'application/json'
    }
});
 const data = await response.json();

 if(data.message === "Dont Exist"){
  return  alert("Credentials invalid")
 }


const local = localStorage.setItem("people",data.token)



 return alert("Welcome")
 
    }catch(error){
console.log(error)
    }
}

//register
const [register,setRegister] = useState({
    email:"",
    password:"",
    confirm:""
});

function Register(value,type){
    setRegister(elements =>{
        return{
            ...elements,
            [type]:value
        }
    })
}

//register


const submitRegister = async(e) =>{
    e.preventDefault();
    try{
const response = await fetch('http://localhost:8000/api/register',{
    method:'post',
    body:JSON.stringify(register),
    headers:{
      'Content-Type':'application/json'
    }
});
 const data = await response.json();

 console.log(data)
 
    }catch(error){
console.log(error)
    }
}



  return (
    <creation.Provider value={{
        Login,
        Register,
        submitLogin,
        submitRegister
        }}>
{children}
    </creation.Provider>
  )
}

export default Mainfile