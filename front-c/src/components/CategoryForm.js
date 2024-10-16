import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';


// import {API_URL_CONTABLE} from '@env'; // Si usas variables de entorno
import AsyncStorage from '@react-native-async-storage/async-storage';

const CategoryForm = () => {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Función para obtener las categorías desde el servidor
  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:9003/api/categoria');
      const data = await response.json();
      setCategorias(data); // Asume que 'data' contiene un array de categorías
    } catch (error) {
      console.error('Error al obtener las categorías: ', error);
    }
  };

  useEffect(() => {
    // Llamar a la función cuando se monta el componente para obtener las categorías
    fetchCategorias();
  }, []);

  //Funcion para eliminar datos de los inputs (Se usa en varios metodos)
  const Clear = async () =>{
    setNombreCategoria('');
    setDescripcion('');
  }

  //Configuracion del boton de Agregar Categoria
  const CategoryPress = async () => {
    // Validar el campo de nombre de la categoría
    if (!nombreCategoria) {
      alert('Es necesario el nombre de la categoría');
      return;
    }

    try {
      const response = await fetch('http://localhost:9003/api/categoria', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreCategoria: nombreCategoria,
          descripcion: descripcion,
        }),
      });

      const resultadoData = await response.json();

      // Validar si la categoría fue agregada correctamente
      if (response.status === 201 && resultadoData.message === 'Se ha agregado una categoria') {
        alert('Categoría agregada exitosamente');

        // Agregar la nueva categoría al estado local para mostrarla en la tabla
        setCategorias([...categorias, { nombreCategoria, descripcion }]);

        // Limpiar los campos del formulario después de agregar
        Clear();
      } else {
        alert(resultadoData.message || 'Error al agregar la categoría');
      }
    } catch (error) {
      console.error('Error al agregar la categoría: ', error);
      alert('Hubo un error al conectarse con el servidor');
    }
  };

  //Funcion para actualizar las categorias
  const UpdateCategoryPress = async () =>{
    try{
      const response = await fetch(`http://localhost:9003/api/categoria/${categoriaSeleccionada.idCategoria}`,{
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreCategoria,
          descripcion,
        }),
      });
      const resultadoData = await response.json();

      if(response.status === 200 && resultadoData.message === 'Se ha actualizado la categoria'){
        alert('Categoria actualizada correctamente');
        
        setCategorias(categorias.map((categoria) => 
          categoria.idCategoria === categoriaSeleccionada.idCategoria ? {...categoria,nombreCategoria,descripcion}:categoria
        ));

        Clear();
        setIsModalOpen(false);
      }else{
        alert('Error al actualizar categoria')
      }
    }catch (error){
      console.log('Error al actualizar la categoria:...', error);
      alert('Hubo un error al conectar al servidor')
    }
  }

    //Funcion para desplegar el Modal por medio del boton
    const EditPress = (categoria) =>{
      setCategoriaSeleccionada(categoria);
      setNombreCategoria(categoria.nombreCategoria);
      setDescripcion(categoria.descripcion);
      setIsModalOpen(true);
    } ;

//Funcion para que elimine una categoria
  const DeleteCategoryPress = async (idCategoria)=>{
    try {
      const response = await fetch(`http://localhost:9003/api/categoria/${idCategoria}`,{
        method: 'DELETE',
      });

      const resultadoData = await response.json();
      if(response.status === 200 && resultadoData.message === 'Se ha eliminado la categoria'){
        alert('Categoria eliminada exitosamente');
        setCategorias(categorias.filter((categoria) => categoria.idCategoria !== idCategoria));

      }else{
        alert('Error al eliminar la categoria');
      }
    }catch (error){
      console.log('Error al eliminar categoria:...', error);
      alert('Hubo un error al conectar el servidor');
    }
  }




  return (
    <div className="container">
      <h3>Categorías</h3>
      <input
        type="text"
        value={nombreCategoria}
        onChange={(e) => setNombreCategoria(e.target.value)}
        placeholder="Nombre de la Categoría"
        className="form-control mb-2"
      />
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
        className="form-control mb-2"
      />
      <button onClick={CategoryPress} className="btn btn-primary">
        Agregar Categoría
      </button>

      <h4 className="mt-4">Categorías</h4>
      <table className="table table-striped mt-2">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria, index) => (
            <tr key={index}>
              <td>{categoria.nombreCategoria}</td>
              <td>{categoria.descripcion}</td>
              <td style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                <button
                  type='button' 
                  className='btn btn-success'
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 5px' }} 
                  title='Actualizar'
                  onClick={()=>EditPress(categoria)}
                >
                  <FaEdit size={25}/>
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 5px' }} 
                  title='Eliminar'
                  onClick={()=>DeleteCategoryPress(categoria.idCategoria)}
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
            <h3>Actualizar Categoria</h3>
            <input
              type="text"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
              className="form-control mb-2"
            />
            <button className='btn btn-success' onClick={UpdateCategoryPress} >Actualizar</button>
            <button className='btn btn-danger' onClick={()=> {setIsModalOpen(false); Clear()}}>Salir</button>
          </div>
        </div>
      )}
      


    </div>
  );
};
export default CategoryForm;
