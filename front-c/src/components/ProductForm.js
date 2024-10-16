import React, {useEffect, useState} from "react";
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductForm = () =>{
    const [productos, setProductos] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [descripcion, setDescripcion] = useState('')
    const [cantidad, setCantidad] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);

    //Funcion para obtener categorias
    useEffect(()=>{
        const obtenerCategorias = async ()=>{
            try {
                const response = await axios.get('http://localhost:9003/api/categorias');
                setCategorias(response.nombreCategoria);
            }catch(error){
                console.error('Error al cargar las categorias: ', error);
            }
        };
        obtenerCategorias();
    },[]);

    const handleProduct = () => {
        const newProducto = {
            codigo: codigo,
            nombreProducto: nombreProducto,
            categoria:categoria,
            proveedor: proveedor,
            descripcion: descripcion,
            cantidad: cantidad
        };
        setProductos([...productos, newProducto]);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                <h3>Productos</h3>
                <input
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="Codigo de producto"
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    value={nombreProducto}
                    onChange={(e) => setNombreProducto(e.target.value)}
                    placeholder="Nombre del producto"
                    className="form-control mb-2"
                />
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="form-select mb-2"
                >
                    <option value="">Selecciona una Categoria</option>
                    {categorias.map((cat) => (
                        <option key={cat.idCategoria} value={cat.idCategoria}>
                            {cat.nombreCategoria}
                        </option>
                    ))}

                </select>
                <input
                    type="text"
                    value={proveedor}
                    onChange={(e) => setProveedor(e.target.value)}
                    placeholder="Proveedor"
                    className="form-control mb-2"
                />
                <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Descripcion"
                    className="form-control mb-2"
                />
                <input
                    type="int"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    placeholder="Cantidad de productos"
                    className="form-control mb-2"
                />
                <button onClick={handleProduct} className="btn btn-primary">Agregar Producto</button>
                </div>

                <div className="col">
                    <h3>Vincular proveedor con producto</h3>
                    <select 
                    className="form-select mb-2"
                    />
                    <select
                    className="form-select mb-2"
                    />
                    <button className="btn btn-primary">Vincular producto con proveedor</button>
                </div>
            </div>

            <h4 className="mt*4">Productos</h4>
            <table className="table table-striped mt-2">
                <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Producto</th>
                    <th>Categoria</th>
                    <th>Proveedor</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto, index) => (
                    <tr key={index}>
                        <td>{producto.codigo}</td>
                        <td>{producto.nombreProducto}</td>
                        <td>{producto.categoria}</td>
                        <td>{producto.proveedor}</td>
                        <td>{producto.descripcion}</td>
                        <td>{producto.cantidad}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default ProductForm;