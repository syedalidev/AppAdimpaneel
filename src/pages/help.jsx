import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../components/config/firebase';
export default function Help() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, 'helpRequests'));
      setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, 'helpRequests', id), { status: newStatus });
    setRequests(prev =>
      prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
    );
  };

  return (
    // <div>

    //     <div className='helprequest'>
    //   <h2>Help Requests</h2>
    //   </div>
    //   <table border="1" cellPadding="10">
    //     <thead>
    //       <tr>
    //         <th>Name</th>
    //         <th>Phone</th>
    //         <th>Category</th>
    //         <th>Description</th>
    //         <th>Status</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {requests.map(req => (
    //         <tr key={req.id}>
    //           <td>{req.name}</td>
    //           <td>{req.phone}</td>
    //           <td>{req.category}</td>
    //           <td>{req.description}</td>
    //           <td>{req.status}</td>
    //           <td>
    //             <button onClick={() => updateStatus(req.id, 'Approved')}>Approve</button>
    //             <button onClick={() => updateStatus(req.id, 'Rejected')}>Reject</button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>



    <div className="help-requests-container">
  <h2 className="title">Help Requests</h2>
  <div className="table-wrapper">
    <table className="help-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Category</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(req => (
          <tr key={req.id}>
            <td>{req.name}</td>
            <td>{req.phone}</td>
            <td>{req.category}</td>
            <td>{req.description}</td>
            <td>
              <span className={`status ${req.status.toLowerCase()}`}>
                {req.status}
              </span>
            </td>
            <td>
              <button className="btn approve" onClick={() => updateStatus(req.id, 'Approved')}>Approve</button>
              <button className="btn reject" onClick={() => updateStatus(req.id, 'Rejected')}>Reject</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

