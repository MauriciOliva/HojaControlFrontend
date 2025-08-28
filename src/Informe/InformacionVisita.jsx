import React from 'react'


export const InformacionVisita = ({ datosVisita, setDatosVisita }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosVisita(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
        {/* Información de la Visita */}
      <div className="mb-5 p-4 bg-gray-50 rounded-md">
        <h2 className="text-md font-semibold mb-3 text-blue-700">Información de la Visita</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">SID-TT *</label>
            <input
              type="text"
              name="sidTT"
              value={datosVisita.sidTT}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Ingrese SID-TT"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">CIUDAD *</label>
            <input
              type="text"
              name="ciudad"
              value={datosVisita.ciudad}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Nombre de la ciudad"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">FECHA DE VISITA *</label>
            <input
              type="date"
              name="fechaVisita"
              value={datosVisita.fechaVisita}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">CONTRATISTA</label>
            <input
              type="text"
              name="contratista"
              value={datosVisita.contratista}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Nombre del contratista"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HORA ENTRADA</label>
            <input
              type="time"
              name="horaEntrada"
              value={datosVisita.horaEntrada}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HORA DE SALIDA</label>
            <input
              type="time"
              name="horaSalida"
              value={datosVisita.horaSalida}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
