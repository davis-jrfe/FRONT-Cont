import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import InventoryForm from './components/InventoryForm';
import AccountingForm from './components/AccountingForm';
import BillinForm from './components/BillinForm';

function App() {
  return (
    <Router>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/contabilidad" element={<AccountingForm/>} />
            <Route path="/ventas" element={<h2>Ventas</h2>} />
            <Route path="/inventario" element={<InventoryForm />} />
            <Route path="/facturacion" element={<BillinForm/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
