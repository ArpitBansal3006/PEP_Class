import React, { useState, useEffect } from 'react';
import {Route,Routes,Navigate} from "react-router-dom";
import Home from "./Home";
import LoginPage from './LoginPage';
import AppLayout from './layout/AppLayout';
import Dashboard from './pages/Dashboard';
import axios from 'axios';

// function App() {
//   return (
//     <div className="container text-center">
//       <h1>Welcome to MERN Projects</h1>
//     </div>
//   );
// }
// export default App;

function App() {
  //Track user details in app because app is the component which decides
  //where t navigate based on the current routr and it needs to know whether
  //the user is logged in or not
  const[userDetails,setUserDetails]=useState(null);
//this function takes new value of userdetails and update it using setUserCredentials function
  const updateUserDetails=(updatedData)=>{
    setUserDetails(updatedData);
  };

  const isUserLoggedIn=async()=>{
    
    try{
        const response=await axios.post('http://localhost:8001/auth/is-user-logged-in',{},{
          withCredentials:true
        });
        updateUserDetails(response.data.userDetails);

            }catch(error){
               console.log('User not logged in',error); 
            }

  };
  useEffect(()=>{
    isUserLoggedIn();
  },[]);
  

  
  return (
    <Routes>
      <Route path="/" element={userDetails ?
      <Navigate to='/dashboard'/> :
        <AppLayout>
          <Home />
          </AppLayout>
          } />
      {/*we are passing updateUserDetails function to login because thats where 
      we'll get user information are authentication */}
      <Route path="/login" element={userDetails? 
      <Navigate to='/dashboard'/>: 
      <AppLayout>
        <LoginPage updateUserDetails={updateUserDetails} />
        </AppLayout>
      } />

      <Route path="/dashboard" element={userDetails ?
        <Dashboard />:
        <Navigate to='/login'/>
        } />
    </Routes>
  );
}

export default App;