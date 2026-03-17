// src/pages/Login.tsx
import { useState } from 'react';
import { supabase } from '../services/supabase';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.setItem('token', data.session.access_token);
    alert('Login exitoso');
    navigate('/dashboard');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <input className={styles.input} placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input className={styles.input} type="password" onChange={e => setPassword(e.target.value)} />
      <button className={styles.button} onClick={handleLogin}>Login</button>
    </div>
  );
}