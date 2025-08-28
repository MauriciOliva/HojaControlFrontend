import React from 'react'

    // Manejar subida de imágenes
export const Firmas = ({ firmaCliente, setFirmaCliente, firmaTecnico, setFirmaTecnico, firmaAlmacenista, setFirmaAlmacenista, noFirmaCliente, setNoFirmaCliente, firmanteCliente, setFirmanteCliente, firmanteTecnico, setFirmanteTecnico, firmanteAlmacenista, setFirmanteAlmacenista }) => {
    const handleImageUpload = (setImage) => (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div>
            {/* Firmas */}
            <div className="mb-5 p-4 bg-gray-50 rounded-md">
                <h2 className="text-md font-semibold mb-3 text-blue-700">Firmas</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Firma del Cliente */}
                <div className="text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Firma del Cliente</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 h-32 flex items-center justify-center bg-white">
                    {firmaCliente ? (
                        <img src={firmaCliente} alt="Firma del cliente" className="max-h-28 max-w-full" />
                    ) : (
                        <label className="cursor-pointer text-center">
                        <div className="text-gray-500 text-sm">Haga clic para subir firma</div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload(setFirmaCliente)}
                            className="hidden"
                        />
                        </label>
                    )}
                    </div>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={firmanteCliente.nombre}
                        onChange={(e) => setFirmanteCliente({...firmanteCliente, nombre: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm mt-2"
                    />
                    <input
                        type="text"
                        placeholder="DPI"
                        value={firmanteCliente.dpi}
                        onChange={(e) => setFirmanteCliente({...firmanteCliente, dpi: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm mt-2"
                    />
                </div>

                {/* Firma Técnico */}
                <div className="text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Firma Técnico</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 h-32 flex items-center justify-center bg-white">
                    {firmaTecnico ? (
                        <img src={firmaTecnico} alt="Firma del técnico" className="max-h-28 max-w-full" />
                    ) : (
                        <label className="cursor-pointer text-center">
                        <div className="text-gray-500 text-sm">Haga clic para subir firma</div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload(setFirmaTecnico)}
                            className="hidden"
                        />
                        </label>
                    )}
                    </div>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={firmanteTecnico.nombre}
                        onChange={(e) => setFirmanteTecnico({...firmanteTecnico, nombre: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm mt-2"
                    />
                    <input
                        type="text"
                        placeholder="DPI"
                        value={firmanteTecnico.dpi}
                        onChange={(e) => setFirmanteTecnico({...firmanteTecnico, dpi: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm mt-2"
                    />
                </div>

                {/* Firma Almacenista */}
                <div className="text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Firma del Almacenista</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 h-32 flex items-center justify-center bg-white">
                    {firmaAlmacenista ? (
                        <img src={firmaAlmacenista} alt="Firma del almacenista" className="max-h-28 max-w-full" />
                    ) : (
                        <label className="cursor-pointer text-center">
                        <div className="text-gray-500 text-sm">Haga clic para subir firma</div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload(setFirmaAlmacenista)}
                            className="hidden"
                        />
                        </label>
                    )}
                    </div>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={firmanteAlmacenista.nombre}
                        onChange={(e) => setFirmanteAlmacenista({...firmanteAlmacenista, nombre: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm mt-2"
                    />
                    <input
                        type="text"
                        placeholder="Cédula"
                        value={firmanteAlmacenista.cedula}
                        onChange={(e) => setFirmanteAlmacenista({...firmanteAlmacenista, cedula: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded text-sm mt-2"
                    />
                </div>
                </div>
            </div>

            {/* Razón por no firmar */}
            <div className="mb-5 p-4 bg-gray-50 rounded-md">
                    <label className="block text-sm font-medium text-gray-700 mb-2">NO SE FIRMÓ POR CLIENTE ¿POR QUÉ?</label>
                <input
                    type="text"
                    value={noFirmaCliente}
                    onChange={(e) => setNoFirmaCliente(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="Razón por la que no se firmó..."
                />
            </div>
        </div>
    )
}
