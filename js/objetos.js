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
  
      var estatus = "";
      var cliente = "";
      var serv = "";
        $.ajax({
          type: "GET",
          url: cn + "SeleccionarObjetosK2&Nom=" + nombre + "&Estatus=" + est + "&FechaIni=" + f1 + "&FechaFin=" + f2, 
          success: function (result) {
  
          result = result.split("<");
          result = result[0];
          var x = result.replace(/\\r\\n/g, '');   
          var data = JSON.parse(x)  
          var html = "";     
          var fecharpt="";
          var estacionrpt = "";
          var descripcionrpt = "";
          var observacionrpt = "";

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
            } 

            if(data[i].estatus == "encontrado"){
              fecharpt = data[i].fechaencontrado;
              estacionrpt = es;
              descripcionrpt = data[i].descripencontrado;
              observacionrpt = verificarValor(data[i].descripcion);
            }

            if(data[i].estatus == "recuperado"){
              fecharpt = data[i].fechaentregado;
              estacionrpt = ei;
              descripcionrpt = data[i].descriprecuperado;
              observacionrpt = verificarValor(data[i].descripcion) + verificarValor(data[i].descripencontrado);
            }
          
            html = html + ` 

              <tr>
                   <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${verificarValor(i+1)}</td>
                   <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${formatearFecha(fecharpt)}</td>
                   <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${verificarValor(estacionrpt)}</td>
                   <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${verificarValor("<center>1</center>")}</td>
                   <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${verificarValor(data[i].nombreObjeto)}</td>
                   <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10" >${verificarValor(descripcionrpt)}</td>
                   <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-b-a-s="thin" data-f-sz="10">${verificarValor(observacionrpt)}</td>

                   <td data-a-wrap="true" data-a-h="center" data-a-v="middle" data-f-sz="10" data-b-a-s="thin" class="${obtenerClaseEstatus(data[i].estatus)}"><b>${verificarValor(data[i].estatus)}</b></td>  
              </tr>
                    

        ` ;

        ed = "";
        es = "";
        ei = "";
  

             
          }
          
            if(html == ""){html = "<br><br><center>No se encontraron servicios intente con una fecha o estatus diferente</center>";}

          document.getElementById("divTabla").innerHTML = 

          ` 

              <button id="button-excel" onclick="nuevoExcel()" class="btn btn-secondary  btn-app  excel" style="float: inline-start;margin-right: 5px;"><i class="fa fa-file-excel-o"></i> Excel</button>

            <table id="ejemplo" class="table table-striped table-bordered" style="width:100%; font-size:12px" data-cols-width="5,15,20,10,20,40,40,15">
        <thead>
        
         <tr style="display:none">
            <td
              class="header"
              colspan="8"
              data-f-sz="16"
              data-f-color="000"
              data-a-h="center"
              data-a-v="middle"
              data-f-underline="false"
              data-f-bold="true"
              data-height="200"
            >
            <img src="https://rutasmaya.github.io/img/Imagen1rptt.png" width="200">  Coordinación General de Gestión de Infraestructura Ferroviaria
            </td>
          </tr>
       
         <tr style="display:none; ">
            <td
              
              colspan="8"
              data-f-sz="16"
              data-f-color="000" 
              data-fill-color="DAE9F8"
              data-a-h="center"
              data-a-v="middle"
     
              data-f-bold="true"
              data-a-wrap="true" 
              data-b-a-s="thin"

            >Reporte de Objetos Perdidos en Estación </td>
          </tr>
        
            <tr>
            <th data-a-h="center" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">No</th>
            <th data-a-h="center" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Fecha</th>
            <th data-a-h="center" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Estación</th>
            <th data-a-h="center" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Cantidad</th>
            <th data-a-h="center" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Objeto Perdido</th>
            <th data-a-h="center" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Descripción del Objeto Extraviado</th>
            <th data-a-h="center" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Observaciones</th>
            <th data-a-h="center" data-b-a-s="thin" data-fill-color="275317" data-f-sz="11" data-f-color="FFFFFFFF" data-f-bold="true">Estatus</th>
              
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
                                title:'Titulo de tabla copiada',
                                titleAttr: 'Copiar',
                                className: 'btn btn-app export barras',
                                exportOptions: {
                                    columns: [ 0, 1 ]
                                }
                            },

                            {
                                extend: 'pdfHtml5',
                                text: '<i class="fa fa-file-pdf-o"></i>PDF',
                                title: 'Reporte de Objetos Perdidos en Estación',
                                titleAttr: 'PDF',
                                className: 'btn btn-app export pdf',
                                orientation: 'landscape', // Establece la orientación a horizontal
                                exportOptions: {
                                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                                },
                                customize: function(doc) {

                                   
                                 
                               

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
                                extend:    'excelHtml5',
                                text:      '<i class="fa fa-file-excel-o"></i>Excel',
                                title:'Reporte de Objetos Perdidos en Estación',
                                titleAttr: 'Excel',
                                className: 'btn btn-app export excel',
                                exportOptions: {
                                    columns: [ 0, 1,2,3,4,5,6,7]
                                },
                            },
                            */
                           
                            {
                                extend:    'print',
                                text:      '<i class="fa fa-print"></i>Imprimir',
                                title:'Reporte de Objetos Perdidos en Estación',
                                titleAttr: 'Imprimir',
                                className: 'btn btn-app export imprimir',
                                exportOptions: {
                                    columns: [ 0, 1,2,3,4,5,6,7]
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


async function nuevoExcel() {
  try {
    // Paso 1: Convertir la tabla en un archivo Excel usando TableToExcel
    const table = document.querySelector("#ejemplo");
    const blob = await TableToExcel.convert(table, {
      name: "Informe de Objetos Perdidos-Para Transparencia.xlsx",
      sheet: { name: "Obj Extraviados" }
    });
  } catch (error) {
    console.error("Ocurrió un error al generar el archivo Excel:", error);
  }
}
