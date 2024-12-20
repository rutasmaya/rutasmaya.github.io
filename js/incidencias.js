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
                                      fontSize: 10,
                                      
                                  };
                          
                                  // Configuración de márgenes
                                  doc.content[1].margin = [0, 0, 0, 0];
                          
                                 
                                  // Aplica un tamaño de letra más pequeño directamente en cada celda del cuerpo de la tabla
                                  doc.content[1].table.body.forEach(function(row) {
                                      row.forEach(function(cell) {
                                          cell.fontSize = 8; // Tamaño de letra más pequeño para el contenido
                                      });
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
  