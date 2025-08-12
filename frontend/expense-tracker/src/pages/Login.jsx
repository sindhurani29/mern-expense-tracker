import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { saveToken } from '../utils/auth';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try{
      const res = await API.post('/login', { email, password });
      saveToken(res.data.token)
      navigate('/dashboard')
    }catch(err){
      setError(err?.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div style={{
      maxWidth: '28rem',
      margin: '1rem auto',
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Login</h2>
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#b91c1c',
          padding: '0.5rem',
          marginBottom: '0.75rem',
          borderRadius: '0.375rem'
        }}>
          {error}
        </div>
      )}
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db'
          }}
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <input
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db'
          }}
          placeholder="Password"
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: 'none'
          }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '0.75rem' }}>
        Don't have an account? <Link to="/register" style={{ color: '#2563eb', textDecoration: 'none' }}>Register</Link>
      </p>
    </div>
  )
}
