import Dashboard from "../components/dashboard";
import Sidebar from "./sidedash";

// export default function Logout (){
//     return(
//       <>
//       <div>
    

//         <h1>logout page</h1>
//       </div>
//       </> 
//     );

// src/pages/Logout.jsx
import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../components/config/firebase';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await signOut(auth);
        alert(' Logged out successfully');
        navigate('/login'); // Redirect to login page
      } catch (error) {
        console.error('Logout error:', error);
        alert(' Failed to logout');
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Logging you out...</h1>
    </div>
  );
}
