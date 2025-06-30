$(document).ready(function(){  
   serviciosCliente(); 
});


function validarFecha(fecha) {
  if (fecha === "01/01/1900") {
      return ""; // Retorna vacío si la fecha es 01/01/1900
  }
  return formatearFecha(fecha); // Formatea la fecha normalmente
}




function serviciosCliente(){
  var est = document.getElementById("idtxtEstatus").value;
  var ed = "";
  var es = "";
  var ei = "";

  if(est == "T"){
    est = "todos";
  }
  if(est == "P"){
    est = "perdido";
  }
  if(est == "E"){
    est = "encontrado";
  }
  if(est == "R"){
    est = "recuperado";
  }

  var nombre = "";
  var f1 = document.getElementById("txtFechaIni").value;
  var f2 = document.getElementById("txtFechaFin").value;

  if(f1 != "" && f2 == ""){
    msgAlert("info","Sugerencia", "Agregue la fecha inicial y final para poder consultar por un rango especifico");
    f1 = "";
    f2 = "";
  }

  if(f1 == "" && f2 != ""){
    msgAlert("info","Sugerencia", "Agregue la fecha inicial y final para poder consultar por un rango especifico");
    f1 = "";
    f2 = "";
  }

  $.ajax({
    type: "GET",
    url: cn + "SeleccionarObjetosK2&Nom=" + nombre + "&Estatus=" + est + "&FechaIni=" + f1 + "&FechaFin=" + f2, 
    success: function (result) {
      result = result.split("<");
      result = result[0];
      var x = result.replace(/\\r\\n/g, '');   
      var data = JSON.parse(x);
      var html = "";     
      var fecharpt="";
      var estacionrpt = "";
      var descripcionrpt = "";
      var observacionrpt = "";

      var tipoestatus = "";
      var tooltipotipo = "";

      for (var i = 0; i < data.length; i++) {

        if(data[i].estacionregistro != null){
          ed = verificarValor(data[i].estacionregistro);
        }
        if(data[i].estacionencontrado != null){
          es =  verificarValor(data[i].estacionencontrado);
        }
        if(data[i].estacionrecuperado != null){
          ei =  verificarValor(data[i].estacionrecuperado);
        }

        if(data[i].estatus == "perdido"){
          fecharpt = data[i].fecharegistro;
          estacionrpt = ed;
          descripcionrpt = data[i].descripcion;
          observacionrpt = "";
          tipoestatus = "OP";
          tooltipotipo = "Objeto Perdido";
        } 

        if(data[i].estatus == "encontrado"){
          fecharpt = data[i].fechaencontrado;
          estacionrpt = es;
          descripcionrpt = data[i].descripencontrado;
          observacionrpt = verificarValor(data[i].descripcion);
          tipoestatus = "OE";
          tooltipotipo = "Objeto Encontrado";
        }

        if(data[i].estatus == "recuperado"){
          fecharpt = data[i].fechaentregado;
          estacionrpt = ei;
          descripcionrpt = data[i].descriprecuperado;
          observacionrpt = verificarValor(data[i].descripcion) + verificarValor(data[i].descripencontrado);
          tipoestatus = "OR";
          tooltipotipo = "Objeto Recuperado";
        }

        html += `
          <tr>
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${verificarValor(i+1)}</td>
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${verificarValor(data[i].idobjeto)}</td>
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${formatearFecha(fecharpt)}</td>
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10" class="${obtenerClaseTipoEstatus(tipoestatus)}"  title="${tooltipotipo}"><b>${verificarValor(tipoestatus)}</b></td>  
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${verificarValor(estacionrpt)}</td>
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${verificarValor(data[i].tren)}</td>
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${verificarValor(data[i].nombreObjeto)}</td>
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10" >${verificarValor(descripcionrpt)}</td>
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10" >${verificarValor(data[i].valor)}</td>
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${verificarValor(observacionrpt)}</td>

            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${formatearFecha(data[i].fechaencontrado)}</td>
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${formatearFecha(data[i].fechaentregado)}</td>
            <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${formatearFecha(data[i].fechaentregado)}</td>
          </tr>`;

        ed = "";
        es = "";
        ei = "";
      }

      if(html == ""){
        
      }

      document.getElementById("divTabla").innerHTML = `
        <button id="button-excel" class="btn btn-secondary buttons-excel buttons-html5 btn-app export excel" style="float: inline-start;margin-right: 5px;">
          <span>
            <i class="fa fa-file-excel-o"></i> 
            Excel
          </span>
        </button>

        <table id="ejemplo" class="table table-striped table-bordered" style="width:100%; font-size:12px" data-cols-width="5,10,12,7,10,7,25,30,5,25">
          <thead>
            <tr style="display:none">
              <td class="header" colspan="9" data-f-sz="16" data-f-color="000" data-a-h="center" data-a-v="middle" data-f-underline="false" data-f-bold="true" data-height="200">
                <img src="https://rutasmaya.github.io/img/Imagen1rptt.png" width="200">  Coordinación General de Gestión de Infraestructura Ferroviaria
              </td>
            </tr>
            <tr style="display:none;">
              <td colspan="9" data-f-sz="16" data-f-color="000" data-fill-color="DAE9F8" data-a-h="center" data-a-v="middle" data-f-bold="true" data-a-wrap="true" data-b-a-s="thin">
                Bitácora de Objetos Perdidos/Olvidados
              </td>
            </tr>
            <tr>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">No</th>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true" data-a-wrap="true">Registro</th>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Fecha</th>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true" >Tipo</th>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Estación</th>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Tren</th>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Objeto Perdido</th>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Descripción del Objeto</th>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Valor</th>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Observaciones</th>

              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Fecha Hallazgo</th>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Fecha Solicitud</th>
              <th data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Fecha Entrega</th>
            </tr>
          </thead>
          <tbody>
            ${html}
          </tbody>
        </table>
      `;

    
     

        // Quitar el prefijo data:image/png;base64,
      var miLogoBase64 = "data:image/png;base64,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";

      // Inicializar DataTable (igual que antes)
      $("#modal-detalle").modal("show");
      $('#ejemplo').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": true,
        "language": {
          "emptyTable": "No se encontraron resultados, seleccione una fecha diferente",
          "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
          "infoEmpty": "Mostrando 0 registros",
          "infoFiltered": "(filtrado de _MAX_ registros totales)",
          "lengthMenu": "Mostrar _MENU_ registros",
          "loadingRecords": "Cargando...",
          "processing": "Procesando...",
          "search": "Buscar:",
          "zeroRecords": "No se encontraron resultados",
          "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
          },
          "aria": {
            "sortAscending": ": activar para ordenar la columna ascendente",
            "sortDescending": ": activar para ordenar la columna descendente"
          }
        },
        "lengthMenu": [[5,10,20, -1],[5,10,50,"Mostrar Todo"]],
        dom: 'Bfrt<"col-md-6 inline"i> <"col-md-6 inline"p>',
        buttons: [
         
          {
            extend: 'copyHtml5',
            text: '<i class="fa fa-clipboard"></i> Copiar',
            title:'Bitácora de Objetos Perdidos/Olvidados',
            titleAttr: 'Copiar',
            className: 'btn btn-app export barras',
            exportOptions: { columns: [0, 1] }
          },
       
          {
            extend: 'pdfHtml5',
            text: '<i class="fa fa-file-pdf-o"></i> PDF',
            title: '',
            filename: 'Bitácora de Objetos Perdidos/Olvidados', // nombre del archivo sin extensión
            className: 'btn btn-app export pdf',
            orientation: 'landscape',
            exportOptions: { columns: [0,1,2,3,4,5,6,7,8,9,10,11,12] },
            customize: function(doc) {
              // 1. Insertar imagen al principio
              doc.content.unshift({
                columns: [
                  {
                    image: miLogoBase64,
                    width: 100
                  },
                  {
                    // Aquí pones un array de textos
                    stack: [
                      {
                        text: 'Coordinación General de Gestión de Infraestructura Ferroviaria',
                        alignment: 'center',
                        color: '#3d6938',
                        fontSize: 16
                      },
                      {
                        text: 'Bitácora de Objetos Perdidos/Olvidados',
                        alignment: 'center',
                        color: '#3d6938',
                        fontSize: 14,
                        margin: [0, 5, 0, 0]  // margen superior opcional
                      }
                    ],
                    margin: [0, 20, 0, 0] // margen superior de todo el bloque de títulos
                  }
                ]
              });

              // 2. Cambiar estilos del título
              doc.styles.tableHeader = { fillColor: '#275317', color: 'white', alignment: 'center', fontSize: 10 };
              // 3. Encontrar dinámicamente el nodo de la tabla
              var tableNode = doc.content.find(function(el) {
                return el.table !== undefined;
              });

              if (tableNode) {
                tableNode.margin = [0, 0, 0, 0];
                tableNode.table.body.forEach((row, rowIndex) => {
                  row.forEach((cell, colIndex) => {
                    // Tamaño de letra
                    cell.fontSize = 8;
                    // Centrar las columnas 0,1,2,3 y 5
                    if ([0,1,2,3,5].includes(colIndex)) {
                      cell.alignment = 'center';
                    }
                  });
                });
              }
            }
          },

          {
            extend: 'print',
            text: '<i class="fa fa-print"></i> Imprimir',
            title:'Bitácora de Objetos Perdidos/Olvidados',
            className: 'btn btn-app export imprimir',
            exportOptions: { columns: [0,1,2,3,4,5,6,7,8,9,10,11,12] }
          },
          {
            extend: 'pageLength',
            className: 'selectTable',
            titleAttr: 'Registros a mostrar',
            text: function (dt) {
              // dt = DataTable API instance
              var currentLength = dt.page.len();
              return 'Mostrar ' + (currentLength === -1 ? 'todos' : currentLength + ' filas');
            },
            lengthMenu: [
              [5, 10, 20, -1],
              ['Mostrar 5', 'Mostrar 10', 'Mostrar 20', 'Mostrar todos']
            ]
          }

        ]
      });

      // Asignar evento click para el botón Excel que llama a nuevoExcel() con los datos
      document.getElementById("button-excel").onclick = function() {
        nuevoExcel(data);
      };

    },
    error: function (jqXmlHttpRequest, textStatus, errorThrown) {
      //console.log(jqXmlHttpRequest + textStatus + errorThrown);
    }
  });
}



// Nueva función que genera el Excel con imagen usando ExcelJS
async function nuevoExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Servicios Cliente');

  // <<< Aquí configuramos página >>>
  sheet.pageSetup = {
    orientation: 'landscape',      // horizontal
    horizontalCentered: true,      // centrar contenido en la hoja
    margins: {
      left:   0.2,
      right:  0.2,
      top:    0.2,
      bottom: 0.2,
      header: 0.2,
      footer: 0.2
    }
  };

  // Función para obtener base64 desde URL de imagen
  async function getBase64FromUrl(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  const imageUrl = 'https://rutasmaya.github.io/img/Imagen1.png';
  const base64 = await getBase64FromUrl(imageUrl);
  const imageId = workbook.addImage({
    base64: base64,
    extension: 'png',
  });

  // Poner imagen en la hoja (ajusta filas y columnas si quieres)
  sheet.addImage(imageId, {
    tl: { col: 0, row: 0 },    // fila 3 en Excel (0 → 1, 1 → 2, 2 → 3)
    ext: { width: 150, height: 85 }
  });

  // Títulos
  sheet.mergeCells('A1:M1');
  let titleCell = sheet.getCell('A1');
  titleCell.value = 'Coordinación General de Gestión de Infraestructura Ferroviaria';
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  titleCell.font = { size: 16, bold: true };
  sheet.getRow(1).height = 35;

  sheet.mergeCells('A2:M2');
  let subtitleCell = sheet.getCell('A2');
  subtitleCell.value = 'Bitácora de Objetos Perdidos/Olvidados';
  subtitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  subtitleCell.font = { size: 14, bold: true };
  subtitleCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFDAE9F8' } // Color con FF para opacidad completa
  };
  sheet.getRow(2).height = 35;

  // Encabezados
  const headers = ['No', 'No de Registro', 'Fecha', 'Tipo', 'Estación', 'Tren', 'Objeto Perdido', 'Descripción del Objeto', 'Valor', 'Observaciones', 'Fecha Hallazgo', 'Fecha de Solicitud', 'Fecha de Entrega'];
  // Insertar encabezados en fila 3
sheet.addRow(headers);

const headerRow = sheet.getRow(3);
headerRow.height = 32;

// Aplicar estilos a cada celda
headerRow.eachCell((cell) => {
  cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
  cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF275317' }
  };
});

 // Establecer autofiltro
  sheet.autoFilter = {
    from: { row: 3, column: 1 },
    to: { row: 3, column: headers.length }
  };

  // Congelar fila 1
  sheet.views = [
    { state: 'frozen', ySplit: 3 }
  ];

  // Ancho columnas
  sheet.columns = [
    { width: 5 }, { width: 10 }, { width: 11 }, { width: 7 },
    { width: 15 }, { width: 7 }, { width: 20 }, { width: 30 }, 
    { width: 7 }, { width: 22 }, { width: 11 }, { width: 11 }, { width: 11 }
  ];

  // Parámetros para altura dinámica
  const LINE_HEIGHT = 15;             // Pt por línea
  const colWidths  = sheet.columns.map(c => c.width || 10);

  // Agregar filas con formato
  for (let i = 0; i < data.length; i++) {
    let ed = data[i].estacionregistro ? verificarValor(data[i].estacionregistro) : "";
    let es = data[i].estacionencontrado ? verificarValor(data[i].estacionencontrado) : "";
    let ei = data[i].estacionrecuperado ? verificarValor(data[i].estacionrecuperado) : "";
    let fecharpt = "";
    let estacionrpt = "";
    let descripcionrpt = "";
    let observacionrpt = "";
    let tipoestatus = "";
    let valor = "";

    if (data[i].estatus === "perdido") {
      fecharpt = data[i].fecharegistro;
      estacionrpt = ed;
      descripcionrpt = data[i].descripcion;
      observacionrpt = "";
      tipoestatus = "OP";
    } else if (data[i].estatus === "encontrado") {
      fecharpt = data[i].fechaencontrado;
      estacionrpt = es;
      descripcionrpt = data[i].descripencontrado;
      observacionrpt = verificarValor(data[i].descripcion);
      tipoestatus = "OE";
    } else if (data[i].estatus === "recuperado") {
      fecharpt = data[i].fechaentregado;
      estacionrpt = ei;
      descripcionrpt = data[i].descriprecuperado;
      observacionrpt = verificarValor(data[i].descripcion) + verificarValor(data[i].descripencontrado);
      tipoestatus = "OR";
    }

    const row = sheet.addRow([
      i + 1,
      verificarValor(data[i].idobjeto),
      formatearFecha(fecharpt),
      tipoestatus,
      verificarValor(estacionrpt),
      verificarValor(data[i].tren),
      verificarValor(data[i].nombreObjeto),
      verificarValor(descripcionrpt),
      verificarValor(data[i].valor),
      verificarValor(observacionrpt),

      formatearFecha(data[i].fechaencontrado),
      formatearFecha(data[i].fechaentregado),
      formatearFecha(data[i].fechaentregado)
         
    ]);

    // Formato por celda de fila datos

    row.eachCell((cell, colNumber) => {
      cell.alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: [1, 2, 3, 4, 11, 12, 13].includes(colNumber) ? 'center' : 'left' // AQUI SE CENTRA LA CELDA
      };
      cell.font = { size: 10 };
      cell.border = {
        top:    { style: 'thin' },
        left:   { style: 'thin' },
        bottom: { style: 'thin' },
        right:  { style: 'thin' }
      };
    });

    //row.height = 18;

    // Altura dinámica: calcular nº líneas que necesita la celda más "ancha"
    let maxLines = 1;
    row.eachCell((cell, idx) => {
      const text    = (cell.value||'').toString();
      const width   = colWidths[idx-1];
      const lines   = Math.ceil(text.length / width) || 1;
      if (lines > maxLines) maxLines = lines;
    });
    row.height = maxLines * LINE_HEIGHT;
  }

  // Descargar archivo Excel
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, "Reporte_Servicios_Cliente.xlsx");
}


function formatearFecha(fecha) {
  if (fecha === "1900-01-01T00:00:00" || !fecha) {
      return ""; // Retorna vacío si la fecha es "01/01/1900" o es null/undefined
  }
  const fechaObj = new Date(fecha);
  if (isNaN(fechaObj.getTime())) {
      return ""; // Retorna vacío si la fecha no es válida
  }
  return fechaObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  });
}


function verificarValor(valor) {
    return valor != null ? valor : ""; // Si el valor es null, retorna cadena vacía
}



function obtenerClaseEstatus(estatus) {
    switch (estatus) {
        case "todos":
            return "text-success";
        case "perdido":
            return "text-danger";
        case "encontrado":
            return "text-success";
        case "recuperado":
            return "text-primary";
        default:
            return ""; // Clase vacía si no hay coincidencia
    }
}

function obtenerClaseTipoEstatus(estatus) {
    switch (estatus) {
        case "todos":
            return "text-success";
        case "OP":
            return "text-danger";
        case "OE":
            return "text-success";
        case "OR":
            return "text-primary";
        default:
            return ""; // Clase vacía si no hay coincidencia
    }
}



