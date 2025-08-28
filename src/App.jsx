import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import IFX from './assets/image.png';
import {InformacionVisita } from './Informe/InformacionVisita';
import { InformacionCliente } from './Informe/InformacionCliente';
import { InformeEquipo } from './Informe/InformeEquipo';
import { Firmas } from './Informe/Firmas';

const FormatoControlVisita = () => {
  // Estado para carga y mensajes
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Manejar cambios en los inputs
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

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

  // Función para generar Excel localmente
  const generarExcelLocalmente = async () => {
    try {
      // Crear un nuevo workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Formato de Visita');

      // Estilos
      const headerStyle = {
        font: { bold: true, color: { argb: 'FFFFFFFF' } },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0070C0' } },
        alignment: { vertical: 'middle', horizontal: 'center' }
      };

      const titleStyle = {
        font: { bold: true, size: 16 },
        alignment: { vertical: 'middle', horizontal: 'center' }
      };

      const subheaderStyle = {
        font: { bold: true },
        fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDEBF7' } }
      };

      // Título
      worksheet.mergeCells('A1:G2');
      worksheet.getCell('A1').value = 'FORMATO DE CONTROL DE VISITA Y ACTA DE ENTREGA DE SERVICIO';
      worksheet.getCell('A1').style = titleStyle;

      // Información de la visita
      worksheet.mergeCells('A4:B4');
      worksheet.getCell('A4').value = 'INFORMACIÓN DE LA VISITA';
      worksheet.getCell('A4').style = subheaderStyle;

      const infoVisitaRows = [
        ['SID-TT', datosVisita.sidTT],
        ['CIUDAD', datosVisita.ciudad],
        ['FECHA DE VISITA', datosVisita.fechaVisita],
        ['CONTRATISTA', datosVisita.contratista],
        ['HORA ENTRADA', datosVisita.horaEntrada],
        ['HORA SALIDA', datosVisita.horaSalida]
      ];

      infoVisitaRows.forEach((row, idx) => {
        worksheet.getCell(`A${5 + idx}`).value = row[0];
        worksheet.getCell(`B${5 + idx}`).value = row[1];
      });

      // Información del cliente
      worksheet.mergeCells('D4:E4');
      worksheet.getCell('D4').value = 'INFORMACIÓN DEL CLIENTE';
      worksheet.getCell('D4').style = subheaderStyle;

      const infoClienteRows = [
        ['NOMBRE', datosCliente.nombre],
        ['SEDE', datosCliente.sede],
        ['DIRECCIÓN', datosCliente.direccion],
        ['TELÉFONO', datosCliente.telefono],
        ['CONTACTO', datosCliente.contacto]
      ];

      infoClienteRows.forEach((row, idx) => {
        worksheet.getCell(`D${5 + idx}`).value = row[0];
        worksheet.getCell(`E${5 + idx}`).value = row[1];
      });

      // Equipos
      worksheet.mergeCells('A12:G12');
      worksheet.getCell('A12').value = 'INFORMACIÓN SOBRE EQUIPOS';
      worksheet.getCell('A12').style = subheaderStyle;

      // Encabezados de la tabla de equipos
      const equipoHeaders = ['No', 'Placa', 'Serial', 'Marca', 'Estado', 'Descripción del Daño', 'Instalado/Retirado'];
      worksheet.addRow(equipoHeaders);
      worksheet.getRow(13).eachCell((cell) => {
        cell.style = headerStyle;
      });

      // Datos de equipos
      equipos.filter(e => e.placa || e.serial || e.marca).forEach((equipo, idx) => {
        worksheet.addRow([
          idx + 1,
          equipo.placa,
          equipo.serial,
          equipo.marca,
          equipo.estado,
          equipo.descripcionDano,
          equipo.instaladoRetirado
        ]);
      });

      // Reporte técnico
      const lastRow = worksheet.rowCount + 2;
      worksheet.mergeCells(`A${lastRow}:G${lastRow}`);
      worksheet.getCell(`A${lastRow}`).value = 'REPORTE TÉCNICO Y/O OBSERVACIONES';
      worksheet.getCell(`A${lastRow}`).style = subheaderStyle;

      worksheet.mergeCells(`A${lastRow + 1}:G${lastRow + 3}`);
      worksheet.getCell(`A${lastRow + 1}`).value = reporteTecnico;
      worksheet.getCell(`A${lastRow + 1}`).alignment = { wrapText: true };

      // Razón por no firmar
      if (noFirmaCliente) {
        worksheet.mergeCells(`A${lastRow + 5}:G${lastRow + 5}`);
        worksheet.getCell(`A${lastRow + 5}`).value = 'NO SE FIRMÓ POR CLIENTE ¿POR QUÉ?';
        worksheet.getCell(`A${lastRow + 5}`).style = subheaderStyle;

        worksheet.mergeCells(`A${lastRow + 6}:G${lastRow + 6}`);
        worksheet.getCell(`A${lastRow + 6}`).value = noFirmaCliente;
      }

      // Ajustar anchos de columnas
      worksheet.columns = [
        { width: 5 },  // No
        { width: 15 }, // Placa
        { width: 20 }, // Serial
        { width: 15 }, // Marca
        { width: 15 }, // Estado
        { width: 30 }, // Descripción
        { width: 20 }  // Instalado/Retirado
      ];

      // Generar el buffer del Excel
      const buffer = await workbook.xlsx.writeBuffer();
      
      // Crear blob y descargar
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `formato-visita-${datosVisita.sidTT || new Date().getTime()}.xlsx`);
      
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

      <InformacionVisita/>
      
      <InformacionCliente/>
      
      <InformeEquipo/>

      <Firmas/>

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