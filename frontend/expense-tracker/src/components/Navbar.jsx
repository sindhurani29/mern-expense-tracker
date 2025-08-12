import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, getToken } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const logout = () => {
    removeToken();
    navigate('/login');
  }

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        padding: '0.75rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/dashboard" style={{ fontWeight: '700', fontSize: '1.125rem', textDecoration: 'none', color: 'black' }}>
          ExpenseTracker
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {token ? (
            <button
              onClick={logout}
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none'
              }}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" style={{ padding: '0.25rem 0.75rem', textDecoration: 'none', color: 'black' }}>Login</Link>
              <Link to="/register" style={{ padding: '0.25rem 0.75rem', textDecoration: 'none', color: 'black' }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
