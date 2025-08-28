import React, { useRef } from 'react'
import SignatureCanvas from 'react-signature-canvas';

    // Manejar subida de imágenes
export const Firmas = ({ firmaCliente, setFirmaCliente, firmaTecnico, setFirmaTecnico, firmaAlmacenista, setFirmaAlmacenista, noFirmaCliente, setNoFirmaCliente, firmanteCliente, setFirmanteCliente, firmanteTecnico, setFirmanteTecnico, firmanteAlmacenista, setFirmanteAlmacenista }) => {
    const sigCanvasCliente = useRef();
    const sigCanvasTecnico = useRef();
    const sigCanvasAlmacenista = useRef();

    const clearFirmaCliente = () => {
        sigCanvasCliente.current.clear();
        setFirmaCliente(null);
    };
    const saveFirmaCliente = () => {
        if (!sigCanvasCliente.current.isEmpty()) {
            const dataUrl = sigCanvasCliente.current.getTrimmedCanvas().toDataURL('image/png');
            setFirmaCliente(dataUrl);
        }
    };

    const clearFirmaTecnico = () => {
        sigCanvasTecnico.current.clear();
        setFirmaTecnico(null);
    };
    const saveFirmaTecnico = () => {
        if (!sigCanvasTecnico.current.isEmpty()) {
            const dataUrl = sigCanvasTecnico.current.getTrimmedCanvas().toDataURL('image/png');
            setFirmaTecnico(dataUrl);
        }
    };

    const clearFirmaAlmacenista = () => {
        sigCanvasAlmacenista.current.clear();
        setFirmaAlmacenista(null);
    };
    const saveFirmaAlmacenista = () => {
        if (!sigCanvasAlmacenista.current.isEmpty()) {
            const dataUrl = sigCanvasAlmacenista.current.getTrimmedCanvas().toDataURL('image/png');
            setFirmaAlmacenista(dataUrl);
        }
    };
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
                {/* Firma del Cliente con firma digital */}
                <div className="text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Firma del Cliente</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 flex flex-col items-center justify-center bg-white">
                        <SignatureCanvas
                            ref={sigCanvasCliente}
                            penColor="black"
                            canvasProps={{width: 300, height: 100, className: 'rounded bg-white border'}}
                        />
                        <div className="flex gap-2 mt-2">
                            <button type="button" onClick={saveFirmaCliente} className="bg-blue-500 text-white px-2 py-1 rounded">Guardar</button>
                            <button type="button" onClick={clearFirmaCliente} className="bg-gray-400 text-white px-2 py-1 rounded">Limpiar</button>
                        </div>
                        {firmaCliente && (
                            <img src={firmaCliente} alt="Firma del cliente" className="max-h-28 max-w-full mt-2" />
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

                {/* Firma Técnico con firma digital */}
                <div className="text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Firma Técnico</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 flex flex-col items-center justify-center bg-white">
                        <SignatureCanvas
                            ref={sigCanvasTecnico}
                            penColor="black"
                            canvasProps={{width: 300, height: 100, className: 'rounded bg-white border'}}
                        />
                        <div className="flex gap-2 mt-2">
                            <button type="button" onClick={saveFirmaTecnico} className="bg-blue-500 text-white px-2 py-1 rounded">Guardar</button>
                            <button type="button" onClick={clearFirmaTecnico} className="bg-gray-400 text-white px-2 py-1 rounded">Limpiar</button>
                        </div>
                        {firmaTecnico && (
                            <img src={firmaTecnico} alt="Firma del técnico" className="max-h-28 max-w-full mt-2" />
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

                {/* Firma Almacenista con firma digital */}
                <div className="text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Firma del Almacenista</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 flex flex-col items-center justify-center bg-white">
                        <SignatureCanvas
                            ref={sigCanvasAlmacenista}
                            penColor="black"
                            canvasProps={{width: 300, height: 100, className: 'rounded bg-white border'}}
                        />
                        <div className="flex gap-2 mt-2">
                            <button type="button" onClick={saveFirmaAlmacenista} className="bg-blue-500 text-white px-2 py-1 rounded">Guardar</button>
                            <button type="button" onClick={clearFirmaAlmacenista} className="bg-gray-400 text-white px-2 py-1 rounded">Limpiar</button>
                        </div>
                        {firmaAlmacenista && (
                            <img src={firmaAlmacenista} alt="Firma del almacenista" className="max-h-28 max-w-full mt-2" />
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
