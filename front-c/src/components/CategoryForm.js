import React, { useState } from 'react';

const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState([]);
  const [descripcion, setDescripcion] = useState([]);

  const handleCategory = () => {
    setCategories([...categories, categoryName]);
    setCategoryName('');
    
    const newCategoria ={
        //Accediendo a los const de CategoryForm
        nombreCategoria: nombreCategoria,
        descripcion: descripcion
    };
    setCategorias([...categorias, newCategoria]);
  };

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
        type='text'
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder='Descripcion'
        className='form-control mb-2'
      />
      <button onClick={handleCategory} className="btn btn-primary">Agregar Categoría</button>
      <h4 className='mt-4'>Categorias</h4>
      <table className="table table-striped mt-2">
        <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
        </tr>
        <tbody>
            {categorias.map((categoria, index) =>(
                <tr key={index}>
                    <td>{categoria.nombreCategoria}</td>
                    <td>{categoria.descripcion}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryForm;
