import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { saveToken } from '../utils/auth';

export default function Register(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try{
      const res = await API.post('/register', { username, email, password });
      saveToken(res.data.token)
      navigate('/dashboard')
    }catch(err){
      setError(err?.response?.data?.message || 'Register failed');
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
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Register</h2>
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
          placeholder="Username"
          value={username}
          onChange={e=>setUsername(e.target.value)}
          required
        />
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
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: 'none'
          }}>
          Register
        </button>
      </form>
    </div>
  )
}
