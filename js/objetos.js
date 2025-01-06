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
          for (var i = 0; i < data.length; i++) {

            console.log(data[i].estacionregistro);

            if(data[i].estacionregistro != null){
              ed = "Estación donde se perdió: " + verificarValor(data[i].estacionregistro);
            }
            else{
              ed == "";
            }

            if(data[i].estacionencontrado != null){
              es = "Estación donde se encontró: " + verificarValor(data[i].estacionencontrado);
            }
            else{
              es == "";
            }

            if(data[i].estacionrecuperado != null){
              ei = "Estación donde se entregó: " + verificarValor(data[i].estacionrecuperado);
            }
            else{
              ei == "";
            }

            html = html + ` 

                   <tr>
                
                        <td>${verificarValor(data[i].nombreObjeto)}</td>
                        <td>${verificarValor(data[i].nombreDueño)}</td>
                        <td>${verificarValor(data[i].telefonoDueño)}</td>
                        <td>${verificarValor(data[i].descripcion)}<br><b>${ed}</b></td>
                        <td>${verificarValor(data[i].registradopor)}</td>
                        <td>${formatearFecha(data[i].fecharegistro)}</td>
                        <td>${verificarValor(data[i].encontradopor)}</td>
                        <td>${formatearFecha(data[i].fechaencontrado)}</td>
                        <td>${verificarValor(data[i].descripencontrado)}<br><b>${es}</b></td>
                        <td>${verificarValor(data[i].entregadopor)}</td>
                        <td>${formatearFecha(data[i].fechaentregado)}</td>
                        <td>${verificarValor(data[i].descriprecuperado)}<br><b>${ei}</b></td>
                        <td class="${obtenerClaseEstatus(data[i].estatus)}">${verificarValor(data[i].estatus)}</td>
                    </tr>
                    

        ` ;
  

             
          }
          
            if(html == ""){html = "<br><br><center>No se encontraron servicios intente con una fecha o estatus diferente</center>";}

          document.getElementById("divTabla").innerHTML = 

          ` 

            <table id="ejemplo" class="table table-striped table-bordered" style="width:100%; font-size:12px">
        <thead>
            <tr>
       
                <th>Objeto</th>
                <th>Dueño</th>
                <th>Teléfono</th>
                <th>Detalle</th>
                <th>Registrado por</th>
                <th>Registro</th>
                <th>Encontrado por</th>
                <th>Encontrado</th>
                <th>Detalle encontrado</th>
                <th>Entregado por</th>
                <th>Entregado</th>
                <th>Detalle recuperado</th>
                <th>Estatus</th>
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
                                title: 'Objetos registrados',
                                titleAttr: 'PDF',
                                className: 'btn btn-app export pdf',
                                orientation: 'landscape', // Establece la orientación a horizontal
                                exportOptions: {
                                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
                            
        
                        
        
                            {
                                extend:    'excelHtml5',
                                text:      '<i class="fa fa-file-excel-o"></i>Excel',
                                title:'Objetos registrados',
                                titleAttr: 'Excel',
                                className: 'btn btn-app export excel',
                                exportOptions: {
                                    columns: [ 0, 1,2,3,4,5,6,7,8,9,10,11,12 ]
                                },
                            },
                           
                            {
                                extend:    'print',
                                text:      '<i class="fa fa-print"></i>Imprimir',
                                title:'Objetos registrados',
                                titleAttr: 'Imprimir',
                                className: 'btn btn-app export imprimir',
                                exportOptions: {
                                    columns: [ 0, 1,2,3,4,5,6,7,8,9,10,11,12 ]
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