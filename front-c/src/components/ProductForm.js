import React, {useState} from "react";

const ProductForm = () =>{
    const [productos, setProductos] = useState([]);
    const [codigo, setCodigo] = useState([]);
    const [nombreProducto, setNombreProducto] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [proveedor, setProveedor] = useState([]);
    const [descripcion, setDescripcion] = useState([]);
    const [cantidad, setCantidad] = useState([]);

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
            <h3>Productos</h3>
            <div className="mb-3">
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
                <input
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder="Categoria"
                    className="form-control mb-2"
                />
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
            </div>
            <button onClick={handleProduct} className="btn btn-primary">Agregar Producto</button>

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