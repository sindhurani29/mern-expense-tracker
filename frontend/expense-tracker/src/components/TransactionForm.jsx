import React, { useState } from 'react';
import API from '../api/axios';

export default function TransactionForm({ onAdded }){
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('General');

  const submit = async e => {
    e.preventDefault();
    try{
      await API.post('/transactions', { title, amount: Number(amount), type, category })
      setTitle('')
      setAmount('')
      setType('expense')
      setCategory('General')
      onAdded && onAdded()
    }catch(err){
      console.error(err);
    }
  }

  return (
    <form onSubmit={submit} style={{
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
        <input
          style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
          placeholder="Title"
          value={title}
          onChange={e=>setTitle(e.target.value)}
          required
        />
        <input
          style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
          placeholder="Amount"
          value={amount}
          onChange={e=>setAmount(e.target.value)}
          required
          type="number"
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <select
          style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
          value={type}
          onChange={e=>setType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          style={{
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db',
            flexGrow: 1
          }}
          placeholder="Category"
          value={category}
          onChange={e=>setCategory(e.target.value)}
        />
        <button style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#2563eb',
          color: 'white',
          borderRadius: '0.375rem',
          border: 'none'
        }}>Add</button>
      </div>
    </form>
  )
}
