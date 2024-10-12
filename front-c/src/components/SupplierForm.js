import React, { useState } from 'react';

const SupplierForm = () => {
    /*
  const [suppliers, setSuppliers] = useState([]);
  const [supplierName, setSupplierName] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  */
  const [proveedores, setProveedores] = useState([]);
  const [nombreProveedor, setNombreProveedor] = useState([]);
  const [nombreComercial, setNombreComercial] = useState([]);
  const [correo, setCorreo] = useState([]);
  const [telefono, setTelefono] = useState([]);
  const [direccion, setDireccion] = useState([]);


  const handleSupplier = () => {
    /*
    const newSupplier = {
      name: supplierName,
      email: supplierEmail,
      phone: supplierPhone,
    };
    setSuppliers([...suppliers, newSupplier]);
    setSupplierName('');
    setSupplierEmail('');
    setSupplierPhone('');
    */

    const newProveedor ={
        //Accediendo a los const de SupplierForm
        nombreProveedor: nombreProveedor,
        nombreComercial: nombreComercial,
        correo: correo,
        telefono: telefono,
        direccion: direccion
    };
    setProveedores([... proveedores, newProveedor]);
  };

  return (
    <div className="container">
      <h3>Proveedores</h3>
      <div className="mb-3">
        <input
          type="text"
          value={nombreProveedor}
          onChange={(e) => setNombreProveedor(e.target.value)}
          placeholder="Nombre del Proveedor"
          className="form-control mb-2"
        />
        <input
            type='text'
            value={nombreComercial}
            onChange={(e) => setNombreComercial(e.target.value)}
            placeholder='Nombre Comercial'
            className='form-control mb-2'
        />
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo Electrónico"
          className="form-control mb-2"
        />
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono"
          className="form-control mb-2"
        />
        <input
            type='text'
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder='Direccion'
            className='form-control mb-2'
        />
      </div>
      <button onClick={handleSupplier} className="btn btn-primary">Agregar Proveedor</button>

      <h4 className="mt-4">Lista de Proveedores</h4>
      <table className="table table-striped mt-2">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nombre Comercial</th>
            <th>Correo Electrónico</th>
            <th>Teléfono</th>
            <th>Direccion</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor, index) => (
            <tr key={index}>
              <td>{proveedor.nombreProveedor}</td>
              <td>{proveedor.nombreComercial}</td>
              <td>{proveedor.correo}</td>
              <td>{proveedor.telefono}</td>
              <td>{proveedor.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierForm;
