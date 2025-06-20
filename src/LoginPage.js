import React from 'react';
import { useState } from 'react';
import axios from 'axios';


function LoginPage({updateUserDetails}) {
    
    const [formData, setFormData]=useState({
        username:"",
        password:""
    });
    const [errors, setErrors]=useState({});
    // const [message,setMessage]=useState(null);

    const handleChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;

        setFormData({
            ...formData,
            [name]:value
        });
    };
    const validate=()=>{
        let newErrors={};
        let isValid=true;
        if(formData.username.length===0){
            newErrors.username="Username is Mandatory";
            isValid=false;
            
        }
        if(formData.password.length===0){
            newErrors.password="Password is Mandatory";
            isValid=false;

        }
        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(validate()){
            // if(formData.username==='admin'&&formData.password==='admin'){
            //     setMessage('Correct Credentials');
            //     //User is authenticated and allowed to navigate
            //     //assume we are calling rest endpoint and we are getting additional user details
            //     updateUserDetails({
            //         name: 'Arpit',
            //         email:'arpit@b.com'
            //     });
              
            // }
            // else{
            //     setMessage('Invalid Credentials');
            // }
            const body={
                username:formData.username,
                password:formData.password
            };
            const configuration={
                withCredentials: true
            };
            try{
            const response=await axios.post('http://localhost:8001/auth/login',body,configuration);
            updateUserDetails(response.data.userDetails);
            }catch(error){
                setErrors({message:'Something went wrong.Please try again.'});
            }
        }
    };
  return (
    <div className="container text-center">
      <h1>Welcome to Login Page</h1>
      {/* {message &&( */}
        {/* message */}
      {/* )} */}
      {errors.message&&(errors.message)}
      <form onSubmit={handleSubmit}>
        <div>
            <label>Username:</label>
            <input type="text" name="username" 
            value={formData.username}
            onChange={handleChange}
            />
            {errors.username &&(errors.username)}
        </div>
        <div>
            <label>Password:</label>
            <input type="password" name="password" 
            value={formData.password}
            onChange={handleChange}
            
            />
            {errors.password &&(errors.password)}
            
        </div>
        <div>
            <button>Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
