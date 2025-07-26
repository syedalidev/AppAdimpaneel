import React, { useEffect, useState } from 'react'
import { collection,  addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../components/config/firebase';

export default function Appointment (){


        const styles = {
  approve: {
    backgroundColor: '#4CAF50',
    color: 'white',
    marginRight: '8px',
    border: 'none',
    padding: '6px 10px',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  reject: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};

    const [appointment,setAppointment]=useState([]);


     useEffect(() => {
    fetchAppointments();
  },[]);

    const fetchAppointments = async ()=>{
        const snapshot = await getDocs(collection(db, 'appointments'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAppointment(data);
    };


    const updateStatus = async (id, newStatus) => {
    const appointmentRef = doc(db, 'appointments', id);
    await updateDoc(appointmentRef, { status: newStatus });
    fetchAppointments();
  }; 

    return(
        <>

{/* <div className='appointment'>
    <h1>Appointment approve</h1>
</div>

     <div style={{ padding: '20px' }}>
      <h2>Appointments</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th>Name</th>
            <th>Phone</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointment.map((item) => {
            const [date, time] = item.preferredDateTime?.split(' ') || ['-', '-'];
            return (
              <tr key={item.id} style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.reason}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td style={{ textTransform: 'capitalize' }}>{item.status || 'pending'}</td>
                <td>
                  <button onClick={() => updateStatus(item.id, 'approved')} style={styles.approve}>Approve</button>
                  <button onClick={() => updateStatus(item.id, 'rejected')} style={styles.reject}>Reject</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div> */}


    <div className="appointment-container">
  <h1 className="appointment-title">Appointment Approval</h1>

  <div className="appointment-table-wrapper">
    <h2>Appointments</h2>
    <table className="appointment-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Reason</th>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointment.map((item) => {
          const [date, time] = item.preferredDateTime?.split(' ') || ['-', '-'];
          return (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.reason}</td>
              <td>{date}</td>
              <td>{time}</td>
              <td>
                <span className={`status ${item.status?.toLowerCase() || 'pending'}`}>
                  {item.status || 'pending'}
                </span>
              </td>
              <td>
                <button className="btn approve" onClick={() => updateStatus(item.id, 'approved')}>
                  Approve
                </button>
                <button className="btn reject" onClick={() => updateStatus(item.id, 'rejected')}>
                  Reject
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

        </>
    )




}