import React, {useState} from "react";

const BillinForm = () =>{
    const [documentos, setDocumentos] = useState([]);
};

return(
    <div className="container">
        <h3>Documentos</h3>
        <button className="btn btn-primary">Cargar Documentos</button>
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
)