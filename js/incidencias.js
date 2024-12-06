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
        for (var i = 0; i < data.length; i++) {


          html = html + ` 

                 <tr>
              
                      <td style="width: auto; white-space: nowrap;">
                      <b>Folio:</b> ${verificarValor(data[i].folio)} <br> 
                      <b>Área:</b> ${verificarValor(data[i].area)} <br> 
                      <b>Estacion:</b> ${verificarValor(data[i].estacion)} <br> 
                      <b>Fecha de incidencia:</b> ${formatearFecha(data[i].fechaincidencia)} <br>
                      <b>Empleado:</b> ${verificarValor(data[i].empleado)} 
                      
                     
                
                      </td>
                    <td style="position: relative; padding-bottom: 30px;">
                    ${verificarValor(data[i].descripcion)}
                    <br><br>
                    <span style="position: absolute; bottom: 20px; right: 5px; color: #78797a !important; font-size: 10px;">Fecha de registro: ${formatearFecha(data[i].fecharegistro)}</span>
                    <span style="position: absolute; bottom: 5px; right: 5px; color: #78797a !important; font-size: 10px;">Registrado por: ${verificarValor(data[i].usuariocrea)}</span>
                    </td>


           
           
          
                  </tr>
                  

      ` ;


           
        }
        
          if(html == ""){html = "<br><br><center>No se encontraron servicios intente con una fecha o estatus diferente</center>";}

        document.getElementById("divTablaIncidencias").innerHTML = 

        ` 

          <table id="ejemplo" class="table table-striped table-bordered" style="width:100%; font-size:12px">
      <thead>
          <tr>
     
              <th>Detalle</th>
              <th>Descripcion de la incidencia</th>
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
                                      color: '#4c8aa0',
                                      fontSize: 16,
                                      alignment: 'center'
                                  };
                          
                                  // Ajuste de estilo para encabezados
                                  doc.styles.tableHeader = {
                                      fillColor: '#4c8aa0',
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
                                        // Eliminar etiquetas HTML no deseadas y convertir saltos de línea
                                        return data
                                            .replace(/<b>/g, '')       // Elimina <b>
                                            .replace(/<\/b>/g, '')     // Elimina </b>
                                            .replace(/<br\s*\/?>/g, '') // Convierte <br> a salto de línea en Excel
                                            .replace(/<span[^>]*>/g, '') // Elimina cualquier <span> que tenga estilos
                                            .replace(/<\/span>/g, '');  // Elimina el cierre de <span>
                                    }
                                }
                            },
                            customize: function(xlsx) {
                                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                                
                                // Ajustar el ancho de las columnas en Excel
                                var colWidths = [25, 75];  // Establece los anchos de las columnas en Excel
                
                                // Encontrar el nodo <cols> que define el ancho de las columnas
                                var cols = sheet.getElementsByTagName('cols')[0];
                
                                // Asegurarse de que el nodo <cols> exista
                                if (!cols) {
                                    cols = document.createElement('cols');
                                    sheet.appendChild(cols);
                                }
                
                               
                
                                // Aplicar los nuevos anchos de columna
                                colWidths.forEach(function(width, index) {
                                    var col = document.createElement('col');
                                    col.setAttribute('width', width);
                                    cols.appendChild(col);
                                });
                            }
                        },
      
                         

                          {
                              extend:    'csvHtml5',
                              text:      '<i class="fa fa-file-text-o"></i>CSV',
                              title:'Reporte de Incidencias',
                              titleAttr: 'CSV',
                              className: 'btn btn-app export csv',
                              exportOptions: {
                                  columns: [ 0, 1]
                              }
                          },
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