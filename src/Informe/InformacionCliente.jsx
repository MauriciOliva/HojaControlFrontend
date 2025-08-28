import React from 'react'


export const InformacionCliente = ({ datosCliente, setDatosCliente }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatosCliente(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div>{/* Información sobre el Cliente */}
        <div className="mb-5 p-4 bg-gray-50 rounded-md">
            <h2 className="text-md font-semibold mb-3 text-blue-700">Información sobre el Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NOMBRE *</label>
                <input
                type="text"
                name="nombre"
                value={datosCliente.nombre}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Nombre completo"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEDE</label>
                <input
                type="text"
                name="sede"
                value={datosCliente.sede}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Sede del cliente"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DIRECCIÓN</label>
                <input
                type="text"
                name="direccion"
                value={datosCliente.direccion}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Dirección completa"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">TELÉFONO</label>
                <input
                type="text"
                name="telefono"
                value={datosCliente.telefono}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Número de teléfono"
                />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">CONTACTO</label>
                <input
                type="text"
                name="contacto"
                value={datosCliente.contacto}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Persona de contacto"
                />
            </div>
            </div>
        </div>
        </div>
    )
}
