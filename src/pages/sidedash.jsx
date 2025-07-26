import { RiAdminFill } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsersLine } from "react-icons/fa6";
import { TbMessageReportFilled } from "react-icons/tb";
import { TiDocumentAdd } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
import { GiHelp } from "react-icons/gi";
import { BarChart } from '@mui/x-charts/BarChart';
import * as React from 'react';

import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();


  

  const User = () => {
    try {
      navigate('/userlist'); // or your login route
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  const handleLogout = async () => {
    try {
      navigate('/logout');
    } catch (error) {
      console.error("Logout failed", error);
    }

  };

  const handleproduct = async () => {
    try {
      navigate('/product');
    } catch (error) {
      console.error(" failed", error);
    }
  };


  const appointment = async () => {
    try {
      navigate('/appointment');
    } catch (error) {
      console.error(" failed", error);
    }
  };

    const help = async () => {
    try {
      navigate('/help');
    } catch (error) {
      console.error(" failed", error);
    }
  }

  return (
    <>
      <div className="dashboard">
        <aside className="sidebar">
          <h2> <RiAdminFill /> Admin Panel</h2>
          <ul>
            <li><a href="#"> <LuLayoutDashboard /> Dashboard</a></li>
               <li><a href="#"onClick={appointment} > <TiDocumentAdd /> Appointment</a></li>
            <li><a href="#" onClick={User}> <FaUsersLine /> Users</a></li>
            <li><a href="#" onClick={handleproduct}>  <TbMessageReportFilled /> products</a></li>
            <li><a href="#" onClick={help}> <GiHelp /> Help </a></li>
            <li><a href="#" onClick={handleLogout}> <FiLogOut /> Logout</a></li>
          </ul>
        </aside>

        <main className="main-content">
          <h1>Welcome to the Dashboard</h1>
          <p>This is the main content area.</p>

          <section className="cards">
            <div className="card1">
              <h2>Total Users</h2>
              <p>1,203</p>
            </div>
            <div className="card2">
              <h2>Active Posts</h2>
              <p>350</p>
            </div>
            <div className="card3">
              <h2>Sales</h2>
              <p>$12,450</p>
            </div>
          </section>



          <BarChart
            xAxis={[{ data: ['group A', 'group B', 'group C'] }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            height={300}
          />
        </main>
      </div>
    </>
  );
}