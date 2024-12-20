$(document).ready(function(){  
  
    listaIncidencias();
   
 });


 function listaIncidencias(){
   
  
   

    var folio = document.getElementById("txtFolio").value;

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
        url: cn + "SeleccionarIncidencias&Folio=" + folio + "&FechaIni=" + f1 + "&FechaFin=" + f2, 
        success: function (result) {

  

          result = result.split("<");
            result = result[0];
        var x = result.replace(/\\r\\n/g, '');   
        var data = JSON.parse(x)  
        var html = "";   
        var rol = localStorage.getItem("rol"); 
        var btnEditar = "";
        
        for (var i = 0; i < data.length; i++) {


          if(rol == "1"){
            btnEditar =  ` 

            <a style="padding: 5px; color: #fff;" id="${verificarValor(data[i].folio)}|${verificarValor(data[i].idarea)}|${verificarValor(data[i].idestacion)}|${data[i].fechaincidencia}|${verificarValor(data[i].idempleado)}|${verificarValor(data[i].descripcion)}" class="btn btn-sm btn-secondary" onclick="modalUpdate(this.id)">
                            <span class="fa fa-edit"></span> Editar
                        </a>
                         ` ;
          }


          html = html + ` 

                 <tr >
              
                      <td style="width: auto; white-space: nowrap;" data-a-wrap="true" data-f-color="000" data-f-bold="true" data-a-v="top" data-f-underline="false" data-b-a-s="thin"  >
                      <b >FOLIO:</b> ${verificarValor(data[i].folio)} <br> 
                      <b >ÁREA:</b> ${verificarValor(data[i].area)} <br> 
                      <b >ESTACIÓN:</b> ${verificarValor(data[i].estacion)} <br> 
                      <b >FECHA DE INCIDENCIA:</b> ${formatearFecha(data[i].fechaincidencia)} <br>
                      <b >EMPLEADO:</b> ${verificarValor(data[i].empleado)} 
                      </td>
                    <td style="position: relative; padding-bottom: 30px;" data-a-wrap="true" data-a-v="top" data-b-a-s="thin" >
                    ${verificarValor(data[i].descripcion)}
                    <br><br>
                    <span style="position: absolute; bottom: 20px; right: 5px; color: #78797a !important; font-size: 10px;">FECHA DE REGISTRO: ${formatearFecha(data[i].fecharegistro)}</span>
                    <span style="position: absolute; bottom: 5px; right: 5px; color: #78797a !important; font-size: 10px;">REGISTRADO POR: ${verificarValor(data[i].usuariocrea)}</span>
                    </td>

                    <td style="position: relative; justify-content: center; align-items: center; vertical-align: middle; " data-exclude="true">
                        ${btnEditar}
                    </td>


           
           
          
                  </tr>
                  

      ` ;


           
        }
        
          if(html == ""){html = "<br><br><center>No se encontraron servicios intente con una fecha o estatus diferente</center>";}

        document.getElementById("divTablaIncidencias").innerHTML = 

        `
        
        <button id="button-excel" onclick="nuevoExcel()" class="btn btn-secondary  btn-app  excel" style="float: inline-start;margin-right: 5px;"><i class="fa fa-file-excel-o"></i> Excel</button>

          <table id="ejemplo" class="table table-striped table-bordered" style="width:100%; font-size:12px" data-cols-width="35,115">
      <thead>
      <tr style="display:none">
            <td
              class="header"
              colspan="2"
              data-f-sz="25"
              data-f-color="000"
              data-a-h="center"
              data-a-v="middle"
              data-f-underline="true"
              data-f-bold="true"
            >
              Reporte de Incidencias
            </td>
          </tr>
          <tr style="display:none"
           class="header"
              colspan="2"
              data-f-sz="25"
              data-f-color="000"
              data-a-h="center"
              data-a-v="middle"
              data-f-underline="true"
         ></tr>
          <tr>
     
              <th data-b-a-s="thin" data-fill-color="28a745" data-f-sz="14" data-f-color="FFFFFFFF" data-f-bold="true">Detalle</th>
              <th data-b-a-s="thin" data-fill-color="28a745" data-f-sz="14" data-f-color="FFFFFFFF" data-f-bold="true">Descripcion de la incidencia</th>
              <th data-exclude="true">Acciones</th>
          </tr>
      </thead>
      <tbody>
    ` 
    +
        
        html + 
        

        ` 

        </tbody>
      
  </table>
  ` 
        
        ;
        $("#modal-detalle").modal("show");



        var table = $('#ejemplo').DataTable( {

      

     




  
          "paging": true,
          "lengthChange": true,
          "searching": true,
          "ordering": false,
          "info": true,
          "autoWidth": true,
          "language": idioma,
          "pageLength": -1, // Inicia con "Mostrar Todo"
          "lengthMenu": [[5,10,20, -1],[5,10,50,"Mostrar Todo"]],

          dom: 'Bfrt<"col-md-6 inline"i> <"col-md-6 inline"p>',
          
          
          buttons: {
                dom: {
                  container:{
                    tag:'div',
                    className:'flexcontent'
                  },
                  buttonLiner: {
                    tag: null
                  }
                },
                
                
                
                
                buttons: [
      
      
                          {
                              extend:    'copyHtml5',
                              text:      '<i class="fa fa-clipboard"></i>Copiar',
                              title:'Reporte de Incidencias',
                              titleAttr: 'Copiar',
                              className: 'btn btn-app export barras',
                              exportOptions: {
                                  columns: [ 0, 1 ]
                              }
                          },

                          {
                              /*extend: 'pdfHtml5',
                              text: '<i class="fa fa-file-pdf-o"></i>PDF',
                              title: 'Incidencias',
                              titleAttr: 'PDF',
                              className: 'btn btn-app export pdf',
                              orientation: 'landscape', // Establece la orientación a horizontal
                              exportOptions: {
                                  columns: [0, 1]
                              },*/

                              extend: 'pdfHtml5',
                                text: '<i class="fa fa-file-pdf-o"></i>PDF',
                                title: 'Reporte de Incidencias',
                                titleAttr: 'PDF',
                                className: 'btn btn-app export pdf',
                                orientation: 'landscape',
                                exportOptions: {
                                    columns: [0, 1],
                                    format: {
                                        body: function (data, row, column, node) {
                                            // Reemplazar <br> con saltos de línea en el PDF
                                            return data
                                            .replace(/<b>/g, '')       // Elimina <b>
                                            .replace(/<\/b>/g, '')     // Elimina </b>
                                            .replace(/<br\s*\/?>/g, '') // Convierte <br> a salto de línea
                                            .replace(/<span style="position: absolute; bottom: 20px; right: 5px; color: #78797a !important; font-size: 10px;">/g, '')
                                            .replace(/<span style="position: absolute; bottom: 5px; right: 5px; color: #78797a !important; font-size: 10px;">/g, '')
                                            .replace(/<\/span>/g, '')
                                        }
                                    }
                                },

                               
                                customize: function(doc) {
                                  // Añadir anchos específicos a las columnas si es necesario
                                  doc.content[1].table.widths = ['25%', '75%'];  // Ajusta el ancho de las columnas
                              
                                  // Ajustes de estilo para el título
                                  doc.styles.title = {
                                      color: '#3d6938',
                                      fontSize: 16,
                                      alignment: 'center'
                                  };
                              
                                  // Ajuste de estilo para encabezados
                                  doc.styles.tableHeader = {
                                      fillColor: '#037c75',
                                      color: 'white',
                                      alignment: 'center',
                                      fontSize: 10
                                  };
                              
                                  // Configuración de márgenes
                                  doc.content[1].margin = [0, 0, 0, 0];
                              
                                  // Aplica un tamaño de letra más pequeño directamente en cada celda del cuerpo de la tabla
                                  doc.content[1].table.body.forEach(function(row) {
                                      row.forEach(function(cell) {
                                          cell.fontSize = 8; // Tamaño de letra más pequeño para el contenido
                                      });
                                  });
                              
                                  // Agregar una imagen en la parte superior izquierda junto al título
                                  var logo = 'data:image/png;base64,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'; // Base64 de la imagen
                                  doc.content.unshift({
                                      columns: [
                                          {
                                              image: logo,
                                              width: 50, // Ajusta el tamaño del logo
                                              margin: [0, 0, 10, 0] // Margen alrededor del logo
                                          },
                                        
                                      ],
                                      margin: [0, 0, 0, 10] // Margen alrededor del bloque del encabezado
                                  });
                              }
                              
                          },
                          
      
                          
                      

/*
                          {
                            extend: 'excelHtml5',
                            text: '<i class="fa fa-file-excel-o"></i> Excel',
                            title: 'Reporte de Incidencias',
                            titleAttr: 'Excel',
                            className: 'btn btn-app export excel',
                            exportOptions: {
                                columns: [0, 1],
                                format: {
                                    body: function (data, row, column, node) {
                                        // Eliminar etiquetas HTML y convertir saltos de línea
                                        var cleanedData = data
                                            .replace(/<\/?b>/g, '')              // Eliminar <b> y </b>
                                            .replace(/<br\s*\/?>/g, '')       // Reemplazar <br> por salto de línea
                                            .replace(/<[^>]*>/g, '')         // Eliminar cualquier otra etiqueta HTML
                                            .replace(/^\s+|\s+$/gm, '');          // Eliminar espacios al inicio y al final de cada línea
                                            cleanedData += '\n';
                                        return cleanedData;
                                    }
                                }
                            },
                            customize: function (xlsx) {
                                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                                var colWidths = [40, 100]; // Anchos deseados para las columnas
                                var cols = sheet.getElementsByTagName('cols')[0];
                                if (!cols) {
                                    cols = sheet.createElement('cols');
                                    sheet.getElementsByTagName('worksheet')[0].appendChild(cols);
                                }
                                colWidths.forEach(function (width, index) {
                                    var col = sheet.createElement('col');
                                    col.setAttribute('min', index + 1);
                                    col.setAttribute('max', index + 1);
                                    col.setAttribute('width', width);
                                    col.setAttribute('customWidth', '1');
                                    cols.appendChild(col);
                                });
                            
                                var rows = sheet.getElementsByTagName('row');
                                for (var i = 0; i < rows.length; i++) {
                                    var cells = rows[i].getElementsByTagName('c');
                                    rows[i].setAttribute('s', '55'); // Ajuste de texto
                                    for (var j = 0; j < cells.length; j++) {
                                        cells[j].setAttribute('s', '55');
                                    }

                                }
                            
                                var worksheet = sheet.getElementsByTagName('worksheet')[0];
                                var pageSetup = sheet.getElementsByTagName('pageSetup')[0];
                                if (!pageSetup) {
                                    pageSetup = sheet.createElement('pageSetup');
                                    worksheet.appendChild(pageSetup);
                                }
                                pageSetup.setAttribute('orientation', 'landscape'); // Configurar orientación horizontal
                                pageSetup.setAttribute('paperSize', '9'); // Tamaño de papel A4 (opcional)

                            }
                            
                            
                        },
                        
                       */ 

                          
                          {
                              extend:    'print',
                              text:      '<i class="fa fa-print"></i>Imprimir',
                              title:'Incidencias',
                              titleAttr: 'Imprimir',
                              className: 'btn btn-app export imprimir',
                              exportOptions: {
                                  columns: [ 0, 1 ]
                              }
                          },
                          {
                              extend:    'pageLength',
                              titleAttr: 'Registros a mostrar',
                              className: 'selectTable'
                          }
                      ]
              } 
              
              
              

          });




          



        },
        error: function (jqXmlHttpRequest, textStatus, errorThrown) {
          //console.log(jqXmlHttpRequest + textStatus + errorThrown);
        }
    });
}

function validarFecha(fecha) {
    if (fecha === "01/01/1900") {
        return ""; // Retorna vacío si la fecha es 01/01/1900
    }
    return formatearFecha(fecha); // Formatea la fecha normalmente
  }

function verificarValor(valor) {
    return valor != null ? valor : ""; // Si el valor es null, retorna cadena vacía
}





  function formatearFecha(fecha) {
    if (fecha === "1900-01-01T00:00:00" || !fecha) {
        return ""; // Retorna vacío si la fecha es "1900-01-01T00:00:00" o es null/undefined
    }

    const fechaObj = new Date(fecha);
    if (isNaN(fechaObj.getTime())) {
        return ""; // Retorna vacío si la fecha no es válida
    }

    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Mes (0-11) + 1
    const day = String(fechaObj.getDate()).padStart(2, '0');
    const hours = String(fechaObj.getHours()).padStart(2, '0');
    const minutes = String(fechaObj.getMinutes()).padStart(2, '0');
    const seconds = String(fechaObj.getSeconds()).padStart(2, '0');

    // Retorna el formato deseado
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}




  

  async function nuevoExcel() {
    try {
      // Paso 1: Convertir la tabla en un archivo Excel usando TableToExcel
      const table = document.querySelector("#ejemplo");
      const blob = await TableToExcel.convert(table, {
        name: "Reporte de Incidencias.xlsx",
        sheet: { name: "Hoja1" }
      });
  

    } catch (error) {
      console.error("Ocurrió un error al generar el archivo Excel:", error);
    }
  }
  