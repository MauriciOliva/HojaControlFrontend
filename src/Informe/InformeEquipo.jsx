import React, { useState } from 'react'

export const InformeEquipo = () => {
    // Estados para los equipos
    const [equipos, setEquipos] = useState([
        { no: 1, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
        { no: 2, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
        { no: 3, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
        { no: 4, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
        { no: 5, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' }
    ]);

    // Estados para reporte técnico
    const [reporteTecnico, setReporteTecnico] = useState('');
    

    // Manejar cambios en equipos
    const handleEquipoChange = (index, field, value) => {
        const newEquipos = [...equipos];
        newEquipos[index] = { ...newEquipos[index], [field]: value };
        setEquipos(newEquipos);
    };

    // Función para agregar más filas de equipos
    const agregarEquipo = () => {
        setEquipos([...equipos, { 
        no: equipos.length + 1, 
        placa: '', 
        serial: '', 
        marca: '', 
        estado: '', 
        descripcionDano: '', 
        instaladoRetirado: '' 
        }]);
    };

    // Función para eliminar la última fila de equipos
    const eliminarEquipo = () => {
        if (equipos.length > 1) {
        setEquipos(equipos.slice(0, -1));
        }
    };

    return (
        <div>{/* Información sobre Equipos */}
            <div className="mb-5 p-4 bg-gray-50 rounded-md">
                <div className="flex justify-between items-center mb-3">
                <h2 className="text-md font-semibold text-blue-700">Información sobre Equipos</h2>
                <div className="flex space-x-2">
                    <button 
                    onClick={agregarEquipo}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded"
                    >
                    + Agregar
                    </button>
                    <button 
                    onClick={eliminarEquipo}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
                    >
                    - Eliminar
                    </button>
                </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2 w-8">No</th>
                            <th className="border border-gray-300 p-2">Placa</th>
                            <th className="border border-gray-300 p-2">Serial</th>
                            <th className="border border-gray-300 p-2">Marca</th>
                            <th className="border border-gray-300 p-2">Estado</th>
                            <th className="border border-gray-300 p-2">Descripción del daño</th>
                            <th className="border border-gray-300 p-2">Instalado/Retirado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {equipos.map((equipo, index) => (
                            <tr key={index}>
                            <td className="border border-gray-300 p-2 text-center">{equipo.no}</td>
                            <td className="border border-gray-300 p-1">
                                <input
                                type="text"
                                value={equipo.placa}
                                onChange={(e) => handleEquipoChange(index, 'placa', e.target.value)}
                                className="w-full p-1 border rounded text-sm"
                                />
                            </td>
                            <td className="border border-gray-300 p-1">
                                <input
                                type="text"
                                value={equipo.serial}
                                onChange={(e) => handleEquipoChange(index, 'serial', e.target.value)}
                                className="w-full p-1 border rounded text-sm"
                                />
                            </td>
                            <td className="border border-gray-300 p-1">
                                <input
                                type="text"
                                value={equipo.marca}
                                onChange={(e) => handleEquipoChange(index, 'marca', e.target.value)}
                                className="w-full p-1 border rounded text-sm"
                                />
                            </td>
                            <td className="border border-gray-300 p-1">
                                <select
                                value={equipo.estado}
                                onChange={(e) => handleEquipoChange(index, 'estado', e.target.value)}
                                className="w-full p-1 border rounded text-sm"
                                >
                                <option value="">Seleccionar</option>
                                <option value="Averiado">Averiado</option>
                                <option value="Bueno">Bueno</option>
                                </select>
                            </td>
                            <td className="border border-gray-300 p-1">
                                <input
                                type="text"
                                value={equipo.descripcionDano}
                                onChange={(e) => handleEquipoChange(index, 'descripcionDano', e.target.value)}
                                className="w-full p-1 border rounded text-sm"
                                />
                            </td>
                            <td className="border border-gray-300 p-1">
                                <select
                                value={equipo.instaladoRetirado}
                                onChange={(e) => handleEquipoChange(index, 'instaladoRetirado', e.target.value)}
                                className="w-full p-1 border rounded text-sm"
                                >
                                <option value="">Seleccionar</option>
                                <option value="Instalado">Instalado</option>
                                <option value="Retirado">Retirado</option>
                                </select>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reporte Técnico y/o observaciones */}
            <div className="mb-5 p-4 bg-gray-50 rounded-md">
                <h2 className="text-md font-semibold mb-2 text-blue-700">Reporte Técnico y/o observaciones</h2>
                <textarea
                    value={reporteTecnico}
                    onChange={(e) => setReporteTecnico(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm h-24"
                    placeholder="Describa el reporte técnico y observaciones..."
                />
            </div>
        </div>
    )
}
