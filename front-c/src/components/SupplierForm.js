import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoCodeReview } from 'react-icons/go';
import { FaEdit, FaTrash } from 'react-icons/fa';


const SupplierForm = () => {
  const [proveedores, setProveedores] = useState([]);
  const [nombreProveedor, setNombreProveedor] = useState([]);
  const [nombreComercial, setNombreComercial] = useState([]);
  const [correo, setCorreo] = useState([]);
  const [telefono, setTelefono] = useState([]);
  const [direccion, setDireccion] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado]=useState(null);


  //Funcion para obtener los proveedores desde el servidor
  const fetchProveedores = async () => {
    try{
      const response = await fetch('http://localhost:9003/api/proveedores');
      const data = await response.json();
      setProveedores(data);
    }catch(error){
      console.error('Error al obtener los proveedores: ', error);
    }
  };

  useEffect(() => {
    //Llama la funcion cuando se monta el componenete para obtener los proveedores
    fetchProveedores();
  },[]);

  //Funcion para eliminar datos de los inputs (Se usa en varios metodos)
  const Clear = async () =>{
    setNombreProveedor('');
    setNombreComercial('');
    setCorreo('');
    setTelefono('');
    setDireccion('');
  }
  

  //Boton para agregar proveedores
  const SupplierPress = async () => {
    //Validar los campos correspondientes
    if(!nombreProveedor || !correo || !telefono || !direccion){
      alert('Es necesario que se llenen ciertos campos');
      return;
    }
    try{
      const response = await fetch('http://localhost:9003/api/proveedores',{
        method: 'POST',
        headers: {
          Accept :'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          nombreProveedor: nombreProveedor,
          nombreComercial: nombreComercial,
          correo: correo,
          telefono: telefono,
          direccion: direccion
        }),
      });

      const resultadoData = await response.json();

      //Validar si el proveedor se agrego correctamete
      if(response.status===201 && resultadoData.message === 'Se ha agregado un proveedor'){
        alert('El proveedor se ha agregado correctamente');

        //Agregar el proveedor en la tabla
        setProveedores([...proveedores, {nombreProveedor,nombreComercial,correo,telefono,direccion}]);

        //Limpiar los inputs
        setNombreProveedor('');
        setNombreComercial('');
        setCorreo('');
        setTelefono('');
        setDireccion('');
      }else{
        alert(resultadoData.message || 'Error al agregar proveedor');
      }

    }catch (error){
      console.error('Error al agregar proveedor:...', error);
      alert('Hubo un error al conectarse al servidor');
    }
  };

  //Funcion para actualizar los proveedores
  const UpdateSupplierPress = async ()=>{
    try{
      const response = await fetch(`http://localhost:9003/api/proveedores/${proveedorSeleccionado.idProveedor}`,{
        method: 'PUT',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreProveedor,nombreComercial,correo,telefono,direccion,
        }),
      });
      const resultadoData = await response.json();

      if(response.status === 200 && resultadoData.message === 'Se ha actualizado el proveedor'){
        alert('Proveedor actualizado correctamente');

        setProveedores(proveedores.map((proveedor) =>
        proveedor.idProveedor === proveedorSeleccionado.idProveedor ? {...proveedor,nombreProveedor,nombreComercial,correo,telefono,direccion}:proveedor
        ));

        Clear();
        setIsModalOpen(false);
      }else{
        alert('Error al actualizar el proveedor')
      }
    }catch(error){
      console.log('Error al actualizar el proveedor:...', error);
      alert('Hubo un error al conectar al servidor');
    }
  }

  //Funcion para desplegar el Modal por medio del boton
  const UpdatePress = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    setNombreProveedor(proveedor.nombreProveedor);
    setNombreComercial(proveedor.nombreComercial);
    setCorreo(proveedor.correo);
    setTelefono(proveedor.telefono);
    setDireccion(proveedor.direccion);
    setIsModalOpen(true);
  }

  const DeleteSupplierPress = async (idProveedor)=>{
    try{
      const response = await fetch(`http://localhost:9003/api/proveedores/${idProveedor}`,{
        method: 'DELETE',
      });

      const resultadoData = await response.json();
      if(response.status === 200 && resultadoData.message === 'Se ha eliminado el proveedor'){
        alert('El proveedor ha sido eliminado');
        setProveedores(proveedores.filter((proveedor) => proveedor.idProveedor !== idProveedor));

      }else{
        alert('Erro al eliminar proveedor');
      }
    }catch(error){
      console.log('Error al elminar el proveedor:...', error);
      alert('Hubo un error al conectar el servidor');
    }
  }

   


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
      
      <button onClick={SupplierPress} className="btn btn-primary">Agregar Proveedor</button>

      <h4 className="mt-4">Lista de Proveedores</h4>
      <table className="table table-striped mt-2">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nombre Comercial</th>
            <th>Correo Electrónico</th>
            <th>Teléfono</th>
            <th>Direccion</th>
            <th>Acciones</th>
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
              <td style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <button
                  type='button' 
                  className='btn btn-success'
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 5px' }} 
                  title='Actualizar'
                  onClick={()=> UpdatePress(proveedor)}
                >
                  <FaEdit size={25}/>
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 5px' }} 
                  title='Eliminar'
                  onClick={()=>DeleteSupplierPress(proveedor.idProveedor)}
                >
                  <FaTrash size={25}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div style={{
          position: 'fixed', 
          top: '0', 
          left: '0', 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center'
        }}>
          <div style={{
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '10px', 
              width: '500px', 
              textAlign: 'center'
          }}>
            <h3>Actualizar Informacion de Proveedor</h3>
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
            <button className='btn btn-success' onClick={UpdateSupplierPress}>Actualizar</button>
            <button className='btn btn-danger' onClick={()=>{setIsModalOpen(false);Clear()}}>Salir</button>
          </div>
        </div>

      )}

    </div>
  );
};

export default SupplierForm;
