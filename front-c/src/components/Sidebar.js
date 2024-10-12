import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column bg-dark vh-100 p-3 text-white">
      <h2 className="text-center">Panel</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/contabilidad" className="nav-link text-white">Contabilidad</Link>
        </li>
        <li className="nav-item">
          <Link to="/ventas" className="nav-link text-white">Ventas</Link>
        </li>
        <li className="nav-item">
          <Link to="/inventario" className="nav-link text-white">Inventario</Link>
        </li>
        <li className='nav-item'>
          <Link to="/facturacion" className='nav-link text-white'>Facturacion</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
