import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaFileAlt } from 'react-icons/fa';


const BillinForm = () => {
    const [dtesenviados, setDtesenviados] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7); // Cambiado a 8 elementos por página

    const fetchDTES = async () => {
        try {
            const response = await fetch('http://localhost:9002/api/historial-documento');
            const data = await response.json();
            setDtesenviados(data.receptor);
        } catch (error) {
            console.error('Error al obtener los DTE', error);
        }
    };

    const visualizarPDF = async (codigoGeneracion) => {
        try {
            const response = await fetch(`http://localhost:9002/api/documentos/pdf/${codigoGeneracion}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al visualizar el PDF');
            }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    const descargarJSON = async (codigoGeneracion) => {
        try {
            const response = await fetch(`http://localhost:9002/api/documentos/json/${codigoGeneracion}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al descargar el JSON');
            }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${codigoGeneracion}.json`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchDTES();
    }, []);

    // Calcular los índices de inicio y fin
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dtesenviados.slice(indexOfFirstItem, indexOfLastItem);

    // Cambiar de página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Número total de páginas
    const totalPages = Math.ceil(dtesenviados.length / itemsPerPage);

    return (
        <div className='container'>
            <h2>Historial de DTE's</h2>
            <table className='table table-striped mt-2'>
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Codigo de Generacion</th>
                        <th>Sello de Recibido</th>
                        <th>Estado del Documento</th>
                        <th>Fecha Emision</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((dteenviado, index) => (
                        <tr key={index}>
                            <td>{dteenviado.n_Dte}</td>
                            <td>{dteenviado.cod_Generacion}</td>
                            <td>{dteenviado.sello_Recibido}</td>
                            <td>{dteenviado.estado}</td>
                            <td>{dteenviado.fecha_emision}</td>
                            <td>${dteenviado.monto_Total_Operacion}</td>
                            <td style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 5px' }} 
                                    title="Descargar PDF"
                                    onClick={() => visualizarPDF(dteenviado.cod_Generacion)}
                                >
                                    <FaFilePdf size={25} />
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-success" 
                                    style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 5px' }} 
                                    title="Descargar JSON"
                                    onClick={() => descargarJSON(dteenviado.cod_Generacion)}
                                >
                                    <FaFileAlt size={25} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav>
                <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default BillinForm;
