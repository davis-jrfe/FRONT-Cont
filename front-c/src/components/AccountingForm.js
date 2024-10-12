import React, { useState } from 'react';

const AccountingForm = () => {
  const [transactions, setTransactions] = useState([]);
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleAddTransaction = () => {
    const newTransaction = {
      concept,
      amount,
      date
    };
    setTransactions([...transactions, newTransaction]);
    setConcept('');
    setAmount('');
    setDate('');
  };

  return (
    <div className="container">
      <h3>Agregar Transacción</h3>
      <div className="mb-3">
        <input
          type="text"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Concepto"
          className="form-control mb-2"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monto"
          className="form-control mb-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="form-control mb-2"
        />
      </div>
      <button onClick={handleAddTransaction} className="btn btn-primary">Agregar Transacción</button>

      <h4 className="mt-4">Lista de Transacciones</h4>
      <table className="table table-striped mt-2">
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.concept}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountingForm;
