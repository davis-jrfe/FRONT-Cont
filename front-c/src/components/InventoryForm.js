import React, { useState } from 'react';
import CategoryForm from './CategoryForm';
import SupplierForm from './SupplierForm';
import ProductForm from './ProductForm';

const InventoryForm = () => {
  const [activeForm, setActiveForm] = useState(null);

  const renderForm = () => {
    switch (activeForm) {
      case 'category':
        return <CategoryForm />;
      case 'supplier':
        return <SupplierForm />;
      case 'product':
        return <ProductForm />;
      default:
        return <p>Seleccione una opción para gestionar el inventario.</p>;
    }
  };

  return (
    <div className="container">
      <h3>Gestión de Inventario</h3>
      <div className="mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => setActiveForm('supplier')}
        >
          Proveedores
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={() => setActiveForm('category')}
        >
          Categorías
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setActiveForm('product')}
        >
          Productos
        </button>
      </div>

      <div className="mt-4">
        {renderForm()}
      </div>
    </div>
  );
};

export default InventoryForm;
