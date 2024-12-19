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
                      <b >Folio:</b> ${verificarValor(data[i].folio)} <br> 
                      <b >Área:</b> ${verificarValor(data[i].area)} <br> 
                      <b >Estacion:</b> ${verificarValor(data[i].estacion)} <br> 
                      <b >Fecha de incidencia:</b> ${formatearFecha(data[i].fechaincidencia)} <br>
                      <b >Empleado:</b> ${verificarValor(data[i].empleado)} 
                      
                     
                
                      </td>
                    <td style="position: relative; padding-bottom: 30px;" data-a-wrap="true" data-a-v="top" data-b-a-s="thin" >
                    ${verificarValor(data[i].descripcion)}
                    <br><br>
                    <span style="position: absolute; bottom: 20px; right: 5px; color: #78797a !important; font-size: 10px;">Fecha de registro: ${formatearFecha(data[i].fecharegistro)}</span>
                    <span style="position: absolute; bottom: 5px; right: 5px; color: #78797a !important; font-size: 10px;">Registrado por: ${verificarValor(data[i].usuariocrea)}</span>
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

                              // Uso en el botón PDF
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
                                          // Reemplazar elementos HTML con texto plano
                                          return data
                                              .replace(/<b>/g, '')       // Elimina <b>
                                              .replace(/<\/b>/g, '')     // Elimina </b>
                                              .replace(/<br\s*\/?>/g, '') // Convierte <br> a salto de línea
                                              .replace(/<span style=".*?">/g, '') // Elimina spans específicos
                                              .replace(/<\/span>/g, '');  // Elimina </span>
                                      }
                                  }
                              },
                              customize: function (doc) {
                                  // Agregar una imagen de fondo al PDF
                                  doc.content.splice(0, 0, {
                                      image: 'data:image/png;base64,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',
                                      width: 600, // Ajusta el ancho de la imagen
                                      absolutePosition: { x: 0, y: 0 }, // Posición absoluta en la página
                                      opacity: 0.3 // Ajusta la transparencia de la imagen
                                  });
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
  

  function getBase64FromImageUrl(url, callback) {
    var img = new Image();
    img.crossOrigin = 'Anonymous'; // Permitir cargar imágenes de diferentes dominios
    img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL('image/png');
        callback(dataURL);
    };
    img.src = url;
}