import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

export default function Dashboard(){
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true)
    try{
      const res = await API.get('/transactions');
      setTransactions(res.data)
    }catch(err){
      console.error(err);
    }finally{ setLoading(false) }
  }

  useEffect(()=>{ fetch() }, []);

  const del = async id => {
    try{
      await API.delete(`/transactions/${id}`)
      setTransactions(prev => prev.filter(t => t._id !== id))
    }catch(err){ 
      console.error(err);
    }
  }

  const total = transactions.reduce((s, t) => t.type === 'income' ? s + t.amount : s - t.amount, 0);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1rem'
    }}>
      <div style={{
        gridColumn: 'span 1',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <TransactionForm onAdded={fetch} />
        {loading ? <div>Loading...</div> : <TransactionList transactions={transactions} onDelete={del} />}
      </div>

      <aside style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ fontSize: '1.125rem' }}>Balance</h3>
          <p style={{ fontWeight: '700', fontSize: '1.5rem' }}>${total.toFixed(2)}</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '0.375rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ fontWeight: '600' }}>Summary</h4>
          <p>Total transactions: {transactions.length}</p>
        </div>
      </aside>

      <style>
        {`
          @media (min-width: 768px) {
            div[style*="grid-template-columns"] {
              grid-template-columns: repeat(3, 1fr);
            }
            div[style*="grid-column: span 1"] {
              grid-column: span 2;
            }
          }
        `}
      </style>
    </div>
  )
}
