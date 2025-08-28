import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import IFX from './assets/image.png';
import {InformacionVisita } from './Informe/InformacionVisita';
import { InformacionCliente } from './Informe/InformacionCliente';
import { InformeEquipo } from './Informe/InformeEquipo';
import { Firmas } from './Informe/Firmas';

const FormatoControlVisita = () => {
  // Estados para reporte técnico
  const [reporteTecnico, setReporteTecnico] = useState('');

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

  // Estados para las firmas (imágenes)
  const [firmaCliente, setFirmaCliente] = useState(null);
  const [firmaTecnico, setFirmaTecnico] = useState(null);
  const [firmaAlmacenista, setFirmaAlmacenista] = useState(null);

  const [noFirmaCliente, setNoFirmaCliente] = useState('');

  // Estados para información de firmantes
  const [firmanteCliente, setFirmanteCliente] = useState({ nombre: '', dpi: '' });
  const [firmanteTecnico, setFirmanteTecnico] = useState({ nombre: '', dpi: '' });
  const [firmanteAlmacenista, setFirmanteAlmacenista] = useState({ nombre: '', cedula: '' });


  // Estado para carga y mensajes
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Estados para la información de la visita
  const [datosVisita, setDatosVisita] = useState({
      sidTT: '',
      ciudad: '',
      fechaVisita: '',
      contratista: '',
      horaEntrada: '',
      horaSalida: ''
  });

  // Estados para los equipos
  const [equipos, setEquipos] = useState([
      { no: 1, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
      { no: 2, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
      { no: 3, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
      { no: 4, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
      { no: 5, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' }
  ]);

  // Manejar cambios en los inputs
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const [datosCliente, setDatosCliente] = useState({
    nombre: '',
    sede: '',
    direccion: '',
    telefono: '',
    contacto: ''
  }); 

  // Función para mostrar mensajes
  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje({ texto: '', tipo: '' }), 5000);
  };

  // Validar formulario
  const validarFormulario = () => {
    if (!datosVisita.sidTT) {
      mostrarMensaje('El campo SID-TT es obligatorio', 'error');
      return false;
    }
    if (!datosVisita.ciudad) {
      mostrarMensaje('El campo Ciudad es obligatorio', 'error');
      return false;
    }
    if (!datosVisita.fechaVisita) {
      mostrarMensaje('La fecha de visita es obligatoria', 'error');
      return false;
    }
    if (!datosCliente.nombre) {
      mostrarMensaje('El nombre del cliente es obligatorio', 'error');
      return false;
    }
    return true;
  };

  // Función para generar Excel desde plantilla certificada
  const generarExcelLocalmente = async () => {
    try {
      // Cargar la plantilla
      const response = await fetch('./Plantilla.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);
      // Mostrar nombres de hojas para depuración
      const sheetNames = workbook.worksheets.map(ws => ws.name);
      console.log('Nombres de hojas en la plantilla:', sheetNames);
      // Usar la primera hoja disponible
      const worksheet = workbook.worksheets[0];
      if (!worksheet) {
        throw new Error('No se encontró ninguna hoja en la plantilla.');
      }

      // Llenar datos en celdas específicas (ajusta según tu plantilla)
      // Ajusta las celdas según el formato visual de tu plantilla
      // Encabezado principal
      worksheet.getCell('C12').value = datosVisita.sidTT; // SID-TT
      worksheet.getCell('K12').value = datosVisita.ciudad; // CIUDAD
      worksheet.getCell('W12').value = datosVisita.fechaVisita; // FECHA DE VISITA
      worksheet.getCell('Z13').value = datosVisita.contratista; // CONTRATISTA
      worksheet.getCell('H13').value = datosVisita.horaEntrada; // HORA ENTRADA
      worksheet.getCell('R13').value = datosVisita.horaSalida; // HORA SALIDA

      // Información del cliente
      worksheet.getCell('E16').value = datosCliente.nombre; // NOMBRE
      worksheet.getCell('X16').value = datosCliente.sede; // SEDE
      worksheet.getCell('E17').value = datosCliente.direccion; // DIRECCIÓN
      worksheet.getCell('X17').value = datosCliente.telefono; // TELÉFONO
      worksheet.getCell('E18').value = datosCliente.contacto; // CONTACTO

      // Equipos (ajusta el inicio de fila según tu plantilla)
      let equipoStartRow = 22; // Fila donde inicia la tabla de equipos
      equipos.forEach((equipo, idx) => {
        worksheet.getCell(`C${equipoStartRow + idx}`).value = equipo.placa; // Placa
        worksheet.getCell(`G${equipoStartRow + idx}`).value = equipo.serial; // Serial
        worksheet.getCell(`J${equipoStartRow + idx}`).value = equipo.marca; // Marca
        worksheet.getCell(`N${equipoStartRow + idx}`).value = equipo.estado; // Estado
        worksheet.getCell(`S${equipoStartRow + idx}`).value = equipo.descripcionDano; // Descripción daño
        worksheet.getCell(`AB${equipoStartRow + idx}`).value = equipo.instaladoRetirado; // Instalado/Retirado
      });

      // Reporte técnico y parte de abajo
      worksheet.getCell('B34').value = reporteTecnico; // Ajusta la celda según tu plantilla

      // Firmas y datos de firmantes (ajusta según tu plantilla)
  // Coloca el nombre y DPI a la par del texto original en la celda
  worksheet.getCell('F47').value = (worksheet.getCell('F47').value || '') + ' ' + (firmanteCliente?.nombre || '');
  worksheet.getCell('F48').value = (worksheet.getCell('F48').value || '') + ' ' + (firmanteCliente?.dpi || '');
  worksheet.getCell('K47').value = (worksheet.getCell('K47').value || '') + ' ' + (firmanteTecnico?.nombre || '');
  worksheet.getCell('K48').value = (worksheet.getCell('K48').value || '') + ' ' + (firmanteTecnico?.dpi || '');
  worksheet.getCell('AE47').value = (worksheet.getCell('AE47').value || '') + ' ' + (firmanteAlmacenista?.nombre || '');
  worksheet.getCell('AE48').value = (worksheet.getCell('AE48').value || '') + ' ' + (firmanteAlmacenista?.cedula || '');

      // Razón por no firmar
      worksheet.getCell('V43').value = noFirmaCliente || '';

      // Descargar el archivo
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `formato-certificado-${datosVisita.sidTT || new Date().getTime()}.xlsx`);
      return true;
    } catch (error) {
      console.error('Error generando Excel:', error);
      return false;
    }
  };

  // Función para guardar y generar Excel
  const handleGuardar = async () => {
    if (!validarFormulario()) return;

    setCargando(true);
    
    try {
      // Generar Excel localmente
      const resultado = await generarExcelLocalmente();
      
      if (resultado) {
        mostrarMensaje('Excel generado y descargado correctamente');
      } else {
        mostrarMensaje('Error al generar el Excel', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      mostrarMensaje('Error al procesar el formulario', 'error');
    } finally {
      setCargando(false);
    }
  };

  // Función para limpiar el formulario
  const limpiarFormulario = () => {
    setDatosVisita({
      sidTT: '',
      ciudad: '',
      fechaVisita: '',
      contratista: '',
      horaEntrada: '',
      horaSalida: ''
    });
    setDatosCliente({
      nombre: '',
      sede: '',
      direccion: '',
      telefono: '',
      contacto: ''
    });
    setEquipos([
      { no: 1, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
      { no: 2, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
      { no: 3, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
      { no: 4, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' },
      { no: 5, placa: '', serial: '', marca: '', estado: '', descripcionDano: '', instaladoRetirado: '' }
    ]);
    setReporteTecnico('');
    setNoFirmaCliente('');
    setFirmaCliente(null);
    setFirmaTecnico(null);
    setFirmaAlmacenista(null);
    setFirmanteCliente({ nombre: '', dpi: '' });
    setFirmanteTecnico({ nombre: '', dpi: '' });
    setFirmanteAlmacenista({ nombre: '', cedula: '' });
    mostrarMensaje('Formulario limpiado', 'info');
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-md max-w-5xl">
      {/* Mensaje de estado */}
      {mensaje.texto && (
        <div className={`mb-4 p-3 rounded-md ${
          mensaje.tipo === 'error' ? 'bg-red-100 text-red-700' : 
          mensaje.tipo === 'info' ? 'bg-blue-100 text-blue-700' : 
          'bg-green-100 text-green-700'
        }`}>
          {mensaje.texto}
        </div>
      )}

      <img src={IFX} alt="" className="mx-auto mb-4" />
      <h1 className="text-xl font-bold text-center mb-4 text-blue-800 border-b-2 border-blue-200 pb-2">
        FORMATO DE CONTROL DE VISITA Y ACTA DE ENTREGA DE SERVICIO
      </h1>

  <InformacionVisita datosVisita={datosVisita} setDatosVisita={setDatosVisita} />
  <InformacionCliente datosCliente={datosCliente} setDatosCliente={setDatosCliente} />
      
        <InformeEquipo 
          equipos={equipos} 
          setEquipos={setEquipos} 
          reporteTecnico={reporteTecnico} 
          setReporteTecnico={setReporteTecnico} 
          agregarEquipo={agregarEquipo} 
          eliminarEquipo={eliminarEquipo} 
        />

        <Firmas 
          firmaCliente={firmaCliente} setFirmaCliente={setFirmaCliente}
          firmaTecnico={firmaTecnico} setFirmaTecnico={setFirmaTecnico}
          firmaAlmacenista={firmaAlmacenista} setFirmaAlmacenista={setFirmaAlmacenista}
          noFirmaCliente={noFirmaCliente} setNoFirmaCliente={setNoFirmaCliente}
          firmanteCliente={firmanteCliente} setFirmanteCliente={setFirmanteCliente}
          firmanteTecnico={firmanteTecnico} setFirmanteTecnico={setFirmanteTecnico}
          firmanteAlmacenista={firmanteAlmacenista} setFirmanteAlmacenista={setFirmanteAlmacenista}
        />

      {/* Botones de acción */}
      <div className="flex justify-center mt-6 space-x-4">
        <button 
          onClick={limpiarFormulario}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-200"
        >
          Limpiar
        </button>
        <button 
          onClick={handleGuardar}
          disabled={cargando}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-200 disabled:opacity-50"
        >
          {cargando ? 'Generando Excel...' : 'Generar Excel'}
        </button>
      </div>
    </div>
  );
};

export default FormatoControlVisita;