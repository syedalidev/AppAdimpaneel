import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../components/config/firebase';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
function UserList() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selecteduser, setSelecteduser] = useState(null);
  const [updatedName, setUpdateName] = useState('');
  const [updatedRole, setRole] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersCollection = collection(db, 'users');
    const snapshot = await getDocs(usersCollection);

    const usersData = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(user => user.role !== 'admin'); // hide admin 

    setUsers(usersData);
  }
  //delete data 

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      fetchUsers();
    } catch (error) {
      console.error('Delete failed:', error);
    }

  };

  // Updata data


  const handleUpdateClick = (user) => {

    setSelecteduser(user);
    setUpdateName(user.name);
    setUpdateEmail(user.email)
    setRole(user.role);
    setOpen(true)

  };


  const updateClickSubmit = async () => {
    if (selecteduser) {
      const userRef = doc(db, 'users', selecteduser.id);
      await updateDoc(userRef, {
        name: updatedName,
        email: updateEmail,
        role: updatedRole,



      });
      setOpen(false);
      fetchUsers();
    }
  };




  return (
    <>
      <div className='usersname'>
        <h2>All Registered Users</h2>
      </div>
      <ul>

        <div className='userslist '>

          <h1 className='user_heading'>App User  </h1>

          {users.map(user => (


            <li key={user.id}>
              <strong>Name:</strong> {user.name || 'N/A'} <br />
              <strong>Email:</strong> {user.email || 'N/A'} <br />
              <strong>Role:</strong> {user.role || 'user'} <br />
              <strong>UID:</strong> {user.id}

              <Button id='user_delete' variant="outlined" startIcon={<DeleteIcon />} color='error' onClick={() => handleDelete(user.id)}>  Delete </Button>
              <Button id='user_update' variant="outlined" onClick={() => handleUpdateClick(user)} >update</Button>


            </li>

          ))}
        </div>

      </ul>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update User Info</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={updatedName}
            onChange={(e) => setUpdateName(e.target.value)}
          />


          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
          />

          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            value={updatedRole}
            onChange={(e) => setRole(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={updateClickSubmit} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>

    </>

  );
}

export default UserList;
