
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Adminlogin from '../adminlogin';
import Dashboard from '../dashboard';
import Logout from '../../pages/logout';
import UserList from '../../pages/users';
import Product from '../../pages/products';
import Appointment from '../../pages/appointment';
import Help from "../../pages/help"


function Approuting(){
    return (
        <Routes>
            
      <Route path='/' element={<Adminlogin/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
     <Route path='/logout' element={<Logout/>}></Route>
     <Route path='/userlist' element={<UserList/>}></Route>
     <Route path='/product' element={<Product/>}></Route>
     <Route path='/appointment' element={<Appointment/>}></Route>
     <Route path='/help' element={<Help/>}></Route>
        </Routes>

    )
}

export default Approuting

