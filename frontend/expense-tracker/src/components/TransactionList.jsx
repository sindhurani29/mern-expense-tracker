import React from 'react';

export default function TransactionList({ transactions = [], onDelete }){
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '1rem',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #d1d5db' }}>
            <th style={{ padding: '0.5rem' }}>Title</th>
            <th style={{ padding: '0.5rem' }}>Amount</th>
            <th style={{ padding: '0.5rem' }}>Type</th>
            <th style={{ padding: '0.5rem' }}>Category</th>
            <th style={{ padding: '0.5rem' }}>Date</th>
            <th style={{ padding: '0.5rem' }}></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id} style={{ borderBottom: '1px solid #d1d5db' }}>
              <td style={{ padding: '0.5rem' }}>{tx.title}</td>
              <td style={{ padding: '0.5rem' }}>{tx.amount}</td>
              <td style={{ padding: '0.5rem' }}>{tx.type}</td>
              <td style={{ padding: '0.5rem' }}>{tx.category}</td>
              <td style={{ padding: '0.5rem' }}>{new Date(tx.date).toLocaleDateString()}</td>
              <td style={{ padding: '0.5rem' }}>
                <button
                  onClick={() => onDelete(tx._id)}
                  style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
