
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { auth, db } from './config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Email and password are required.");
        setLoading(false);
        return;
      }

      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().role === 'admin') {
        navigate('/dashboard',{ replace: true });
      } else {
        setError('Access Denied: You are not an admin.');
      }
    } catch (err) {
      setError('Invalid credentials or user not allowed.');
    }

    setLoading(false);
  };

  return (
    <>
      <img  id='logo' src="https://www.aalpha.net/wp-content/uploads/2022/06/Test-case-for-a-login-page.jpg" alt="" />
      <h2 id='main_logo'>Admin Dashboard</h2>

      <div className='emailinput'>
        <TextField className='holder' label="Email" type='email' variant="outlined" value={email}
          onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className='password_inp'>
        <TextField className='holder' label="Password" type='password' variant="outlined" value={password}
          onChange={(e) => setPassword(e.target.value)} />
      </div>

      <Button id='btnlogin' variant="outlined" onClick={login} disabled={loading}>
        {loading ? "Logging in..." : "Log In"}
      </Button>

      {error && <p style={{ color: 'red', textAlign:'center'}}>{error}</p>}
    </>
  );
}

export default Adminlogin;

