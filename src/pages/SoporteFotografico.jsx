import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import IFX from '../assets/image.png';
import { useLocation, useNavigate } from 'react-router-dom'

export const SoporteFotografico = () => {
  const navigate = useNavigate()
  // Guardar referencias a los archivos originales
  const [imageFiles, setImageFiles] = useState({});
  const [images, setImages] = useState({
    fachada: null,
    equiposRack: null,
    puntosElectricos: null,
    raisecomInstalado: null,
    raisecomEnergia: null,
    raisecomRack: null,
    raisecomSerial: null,
    raisecomMarquillado: null,
    raisecomConexiones: null,
    firewallInstalado: null,
    firewallEnergia: null,
    firewallRack: null,
    firewallSerial: null,
    firewallMarquillado: null,
    firewallConexiones: null,
    conexionLan: null,
    conexionesWan: null,
    actaEntrega: null,
    speedTest: null,
    pingInternet: null,
    pingGateway: null,
    trazaInternet: null
  });

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setImages(prev => ({
        ...prev,
        [field]: URL.createObjectURL(file)
      }));
      setImageFiles(prev => ({
        ...prev,
        [field]: file
      }));
    }
  };

  const ImageUploadBox = ({ title, field, note }) => (
    <div className="border rounded p-2 mb-4">
      <h3 className="font-bold text-sm mb-2">{title}</h3>
      <div className="border-dashed border-2 border-gray-300 rounded-md h-32 flex items-center justify-center">
        {images[field] ? (
          <div className="relative h-full w-full">
            <img 
              src={images[field]} 
              alt={title} 
              className="h-full w-full object-contain"
            />
            <button 
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              onClick={() => {
                setImages(prev => ({...prev, [field]: null}));
                setImageFiles(prev => ({...prev, [field]: null}));
              }}
            >
              ×
            </button>
          </div>
        ) : (
          <label className="cursor-pointer text-center p-4">
            <div className="text-gray-500">Haga clic para subir imagen</div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, field)}
            />
          </label>
        )}
      </div>
      {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
    </div>
  );

  // Mapeo de campos a rangos de celdas en el Excel
  const getCellRange = (field) => {
    const positions = {
      fachada: "B20:J31",
      equiposRack: "K20:W31",
      puntosElectricos: "X19:AH32",
      raisecomInstalado: "B38:J51",
      raisecomEnergia: "K38:W51",
      raisecomRack: "X38:AH51",
      raisecomSerial: "B53:J67",
      raisecomMarquillado: "K53:W67",
      raisecomConexiones: "X53:AH67",
      firewallInstalado: "B69:J83",
      firewallEnergia: "K69:W83",
      firewallRack: "X69:AH83",
      firewallSerial: "B85:J99",
      firewallMarquillado: "K85:W99",
      firewallConexiones: "X85:AH99",
      conexionLan: "B101:J115",
      conexionesWan: "K101:W115",
      actaEntrega: "X101:AH115",
      speedTest: "B117:J131",
      pingInternet: "K117:W131",
      pingGateway: "X117:AH131",
      trazaInternet: "B133:J147",
    };
    
    return positions[field] || "B180:J195";
  };

  // Función mejorada para generar Excel
  const generateExcel = async () => {
    try {
      // Cargar la plantilla desde public
      const response = await fetch('/CondicionesCliente.xlsx');
      if (!response.ok) {
        throw new Error(`Error al cargar plantilla: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      const worksheet = workbook.worksheets[0];

      // Procesar cada imagen
      const imageInsertionPromises = Object.entries(imageFiles).map(async ([field, file]) => {
        if (!file) return;
        
        try {
          const buffer = await file.arrayBuffer();
          
          // Determinar la extensión correcta
          let extension = 'png';
          if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            extension = 'jpeg';
          }
          
          // Agregar imagen al Excel
          const imageId = workbook.addImage({
            buffer: buffer,
            extension: extension,
          });
          
          // Obtener el rango de celdas para esta imagen
          const cellRange = getCellRange(field);
          
          // Insertar la imagen en el rango calculado
          worksheet.addImage(imageId, cellRange);
          
          console.log(`Imagen ${field} insertada en rango: ${cellRange}`);
        } catch (error) {
          console.error(`Error procesando imagen ${field}:`, error);
          throw error;
        }
      });

      // Esperar a que todas las imágenes se procesen
      await Promise.all(imageInsertionPromises);

      // Guardar el archivo
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `soporte-fotografico-${new Date().toISOString().slice(0,10)}.xlsx`);
      
      alert('Excel generado correctamente con las imágenes');
    } catch (error) {
      console.error('Error al generar el Excel:', error);
      alert('Error al generar el Excel. Verifica la consola para más detalles.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <img src={IFX} alt="" className="mx-auto mb-4" />
      <h1 className="text-xl font-bold text-center mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">
        FORMATO DE CONTROL DE VISITA Y ACTA DE ENTREGA DE SERVICIO  
      </h1>
      {/* Encabezado */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold">SOPORTE FOTOGRÁFICO IFX NETWORKS</h1>
      </div>

      {/* Metadatos */}
      <div className="flex justify-end mb-6">
        <div className="text-right">
          <div><span className="font-semibold">CÓDIGO:</span> IMS-FR33</div>
          <div><span className="font-semibold">VERSIÓN:</span> 1.0</div>
          <div><span className="font-semibold">CLASIFICACIÓN:</span> Público</div>
          <div><span className="font-semibold">PÁGINA:</span> 2 de 4</div>
        </div>
      </div>

      {/* Título principal */}
      <h2 className="text-lg font-bold mb-4">CONDICIONES ACTUALES DEL CLIENTE</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Columna 1 */}
        <div>
          <h3 className="font-bold mb-2">FACHADA CLIENTE</h3>
          <ImageUploadBox 
            title="" 
            field="fachada" 
          />
        </div>

        {/* Columna 2 */}
        <div>
          <h3 className="font-bold mb-2">FOTOS EQUIPOS DE CLIENTE EN RACK</h3>
          <ImageUploadBox 
            title="" 
            field="equiposRack" 
          />
        </div>

        {/* Columna 3 */}
        <div>
          <h3 className="font-bold mb-2">FOTOS DE PUNTOS ELECTRICOS DISPONIBLES</h3>
          <ImageUploadBox 
            title="" 
            field="puntosElectricos" 
          />
        </div>
      </div>

      {/* Sección de condiciones de entrega */}
      <h2 className="text-lg font-bold my-4">CONDICIONES DE ENTREGA DE SERVICIO</h2>

      {/* Equipo Raisecom */}
      <h3 className="font-bold mt-6 mb-2">EQUIPO RAISECOM INSTALADO</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ImageUploadBox 
          title="" 
          field="raisecomInstalado" 
          note="UFINET NO INSTALO SUS EQUIPOS"
        />
        <ImageUploadBox 
          title="EQUIPO CONECTADO ENERGIA" 
          field="raisecomEnergia" 
          note="UFINET NO INSTALO SUS EQUIPOS"
        />
        <ImageUploadBox 
          title="EQUIPO INSTALADO EN RACK CLIENTE" 
          field="raisecomRack" 
          note="UFINET NO INSTALO SUS EQUIPOS"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ImageUploadBox 
          title="SERIAL EQUIPO RAISECOM" 
          field="raisecomSerial" 
          note="UFINET NO INSTALO SUS EQUIPOS"
        />
        <ImageUploadBox 
          title="MARQUILLADO DE EQUIPO" 
          field="raisecomMarquillado" 
          note="UFINET NO INSTALO SUS EQUIPOS"
        />
        <ImageUploadBox 
          title="CONEXIÓNES DEL EQUIPO" 
          field="raisecomConexiones" 
          note="UFINET NO INSTALO SUS EQUIPOS"
        />
      </div>

      {/* Equipo Firewall */}
      <h3 className="font-bold mt-6 mb-2">EQUIPO FIREWALL INSTALADO</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ImageUploadBox 
          title="" 
          field="firewallInstalado" 
        />
        <ImageUploadBox 
          title="EQUIPO CONECTADO ENERGIA" 
          field="firewallEnergia" 
        />
        <ImageUploadBox 
          title="EQUIPO INSTALADO EN RACK CLIENTE" 
          field="firewallRack" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ImageUploadBox 
          title="SERIAL EQUIPO FIREWALL" 
          field="firewallSerial" 
        />
        <ImageUploadBox 
          title="MARQUILLADO DE EQUIPO" 
          field="firewallMarquillado" 
        />
        <ImageUploadBox 
          title="CONEXIÓNES DEL EQUIPO" 
          field="firewallConexiones" 
        />
      </div>

      {/* Otras conexiones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ImageUploadBox 
          title="CONEXIÓN A LAN DE CLIENTE" 
          field="conexionLan" 
        />
        <ImageUploadBox 
          title="CONEXIONES WAN" 
          field="conexionesWan" 
        />
        <ImageUploadBox 
          title="ACTA DE ENTREGA" 
          field="actaEntrega" 
        />
      </div>

      {/* Pruebas de conectividad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ImageUploadBox 
          title="SPEED TEST" 
          field="speedTest" 
        />
        <ImageUploadBox 
          title="PING A INTERNET (MIL PAQUETES)" 
          field="pingInternet" 
        />
        <ImageUploadBox 
          title="PING GATEWAY (MIL PAQUETES)" 
          field="pingGateway" 
        />
      </div>

      <div className="mb-8">
        <ImageUploadBox 
          title="TRAZA A INTERNET" 
          field="trazaInternet" 
        />
      </div>

      {/* Vista previa de imágenes subidas */}
      <div className="mt-8 p-4 border rounded">
        <h3 className="font-bold text-lg mb-4">Vista previa de imágenes subidas</h3>
        {Object.values(images).filter(img => img !== null).length === 0 ? (
          <p className="text-gray-500 text-center">No hay imágenes subidas</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(images).map(([key, value]) => (
              value && (
                <div key={key} className="border rounded p-2">
                  <div className="font-semibold text-sm mb-2">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                  <img 
                    src={value} 
                    alt={key} 
                    className="h-32 w-full object-contain"
                  />
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Botón de enviar */}
      <div className="flex justify-center mt-8 space-x-4">
        <button 
          onClick={() => navigate('/')}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-200"
        >
          Informe de Control
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={generateExcel}
        >
          Generar Excel
        </button>
      </div>
    </div>
  );
};