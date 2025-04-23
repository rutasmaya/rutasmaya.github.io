
$(document).ready(function(){  

  var rol = localStorage.getItem("rol"); 
  
 


if(rol == 1){
  document.getElementById("catEmpleados").style.display = 'block';
}
  
  
    selectEstaciones();
    selectAreas();
    selectEmpleados();
    selectTrenes();
   
 });

function selectEstaciones(){
    var html = "";
    var chek = "";
    var color = "success";
          $.ajax({
              url:cn + "SeleccionarEstaciones", 
              success: function (result) {   
            
                var x = result.replace(/\\r\\n/g, '');  
                localStorage.setItem("prod", x);  
                var data = JSON.parse(x)  
                for (var i = 0; i < data.length; i++) {
                
                  if(data[i].activo == true ){
                    chek = "checked";
                    color = "success";
                }else{
                    chek = "";
                     color = "danger";
                }

                html = html +   `

                         <tr>
                        <td style="vertical-align: middle; ">
                          <div class="me-2">
                            <div class="avatar flex-shrink-0">
                              <div class="avatar-initial bg-label-${color} rounded-3">
                                <div>
                          

                                  
                                  <i class="ri-signpost-line ri-24px img-fluid"></i>

                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style="vertical-align: middle;">
                          <div class="me-4">
                            <h6 class="mb-1">${data[i].nombre}</h6>
                            <p class="mb-0">${data[i].estado}</p>
                          </div>
                        </td>
                        <td class="text-success fw-medium text-end" style="vertical-align: middle;" >
                          <div class="user-progress d-flex align-items-center gap-2">
                            <label class="switch switch-secondary">
                              <input type="checkbox" id="Estaciones|${data[i].idestacion}" onclick="cambiarEstatus(this.id)" class="switch-input" ${chek}>
                              <span class="switch-toggle-slider">
                                <span class="switch-on">
                                  <i class="ri-check-line"></i>
                                </span>
                                <span class="switch-off">
                                  <i class="ri-close-line"></i>
                                </span>
                              </span>
                            </label>
                          </div>
                        </td>
                        <td class="text-end fw-medium" style="vertical-align: middle;">
                          <button id="Estaciones|${data[i].idestacion}|${data[i].nombre}|${data[i].estado}" onclick="verEditar(this.id);" type="button" class="btn rounded-pill btn-icon btn-primary waves-effect waves-light">
                            <span class="tf-icons ri-edit-2-fill ri-22px"></span>
                          </button>
                        </td>
                      </tr>
                
                `;


                  
                }

                document.getElementById("tablaEstaciones").innerHTML =  html ;
                            
              }
          });

}

function selectAreas(){
    var html = "";
    var chek = "";
    var color = "success";
          $.ajax({
              url:cn + "SeleccionarAreas", 
              success: function (result) {  
                
                var x = result.replace(/\\r\\n/g, '');  
                localStorage.setItem("prod", x);  
                var data = JSON.parse(x)  
                for (var i = 0; i < data.length; i++) {
                
                  if(data[i].activo == true ){
                    chek = "checked";
                    color = "success";
                }else{
                    chek = "";
                    color = "danger";
                }

                html = html +   `

                         <tr>
                        <td style="vertical-align: middle; ">
                          <div class="me-2">
                            <div class="avatar flex-shrink-0">
                              <div class="avatar-initial bg-label-${color} rounded-3">
                                <div>
                                  <i class="ri-map-pin-5-line ri-24px img-fluid"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style="vertical-align: middle;">
                          <div class="me-4">
                            <h6 class="mb-1">${data[i].nombrearea}</h6>
                          </div>
                        </td>
                        <td class="text-success fw-medium text-end" style="vertical-align: middle;" >
                          <div class="user-progress d-flex align-items-center gap-2">
                            <label class="switch switch-secondary">
                              <input type="checkbox" id="Areas|${data[i].idarea}"  onclick="cambiarEstatus(this.id)" class="switch-input" ${chek}>
                              <span class="switch-toggle-slider">
                                <span class="switch-on">
                                  <i class="ri-check-line"></i>
                                </span>
                                <span class="switch-off">
                                  <i class="ri-close-line"></i>
                                </span>
                              </span>
                            </label>
                          </div>
                        </td>
                        <td class="text-end fw-medium" style="vertical-align: middle;">
                          <button id="Areas|${data[i].idarea}|${data[i].nombrearea}" onclick="verEditar(this.id);" type="button" class="btn rounded-pill btn-icon btn-primary waves-effect waves-light">
                            <span class="tf-icons ri-edit-2-fill ri-22px"></span>
                          </button>
                        </td>
                      </tr>
                
                `;


                  
                }

               

                document.getElementById("tablaAreas").innerHTML =  html ;
                            
              }
          });

}
        
function selectEmpleados(){
    var html = "";
    var chek = "";
    var color = "success";
          $.ajax({
              url:cn + "SeleccionarEmpleados", 
              success: function (result) {  
                
                var x = result.replace(/\\r\\n/g, '');  
                localStorage.setItem("prod", x);  
                var data = JSON.parse(x)  
                for (var i = 0; i < data.length; i++) {
                
                  if(data[i].activo == true ){
                    chek = "checked";
                    color = "success";
                }else{
                    chek = "";
                    color = "danger"
                }

                html = html +   `

                         <tr>
                        <td style="vertical-align: middle; ">
                          <div class="me-2">
                            <div class="avatar flex-shrink-0">
                              <div class="avatar-initial bg-label-${color} rounded-3">
                                <div>
                                  <i class="ri-user-line ri-24px img-fluid"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style="vertical-align: middle;">
                          <div class="me-4">
                            <h6 class="mb-1">${data[i].nombre}</h6>
                             <p class="mb-0">${data[i].apellidop} ${data[i].apellidom}</p>
                          </div>
                        </td>
                        <td class="text-success fw-medium text-end" style="vertical-align: middle;" >
                          <div class="user-progress d-flex align-items-center gap-2">
                            <label class="switch switch-secondary">
                              <input type="checkbox" id="Empleados|${data[i].iduser}"  onclick="cambiarEstatus(this.id)" class="switch-input" ${chek}>
                              <span class="switch-toggle-slider">
                                <span class="switch-on">
                                  <i class="ri-check-line"></i>
                                </span>
                                <span class="switch-off">
                                  <i class="ri-close-line"></i>
                                </span>
                              </span>
                            </label>
                          </div>
                        </td>
                        <td class="text-end fw-medium" style="vertical-align: middle;">
                          <button id="Empleados|${data[i].iduser}|${data[i].nombre}|${data[i].apellidop} ${data[i].apellidom}|${data[i].telefono}" onclick="verEditar(this.id);" type="button" class="btn rounded-pill btn-icon btn-primary waves-effect waves-light">
                            <span class="tf-icons ri-edit-2-fill ri-22px"></span>
                          </button>
                        </td>
                      </tr>
                
                `;


                  
                }

                document.getElementById("tablaEmpleados").innerHTML =  html ;
                            
              }
          });

}

function selectTrenes(){

  var idestacion = localStorage.getItem("idestacion"); 
  var filtro = "-1";

  var html = "";
  var chek = "";
  var color = "success";
        $.ajax({
          url: cn + "SeleccionarTrenesAdmin&id=" + idestacion + "&Filtro=" + filtro, 
            success: function (result) {  
              
              var x = result.replace(/\\r\\n/g, '');  
              localStorage.setItem("prod", x);  
              var data = JSON.parse(x)  
              for (var i = 0; i < data.length; i++) {
              
                if(data[i].activo == true ){
                  chek = "checked";
                  color = "success";
              }else{
                  chek = "";
                  color = "danger"
              }

              html = html +   `

                        <tr>
                      <td style="vertical-align: middle; ">
                        <div class="me-2">
                          <div class="avatar flex-shrink-0">
                            <div class="avatar-initial bg-label-${color} rounded-3">
                              <div>
                                  <i class="ri-train-line ri-24px img-fluid"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style="vertical-align: middle;">
                        <div class="me-4">
                          <h6 class="mb-1">Tren: ${data[i].tren} | Salida: ${data[i].salida} </h6>
                            <p class="mb-0">De: ${data[i].origen} a: ${data[i].destino} </p>
                        </div>
                      </td>
                      <td class="text-success fw-medium text-end" style="vertical-align: middle;" >
                        <div class="user-progress d-flex align-items-center gap-2">
                          <label class="switch switch-secondary">
                            <input type="checkbox" id="Trenes|${data[i].idtren}"  onclick="cambiarEstatus(this.id)" class="switch-input" ${chek}>
                            <span class="switch-toggle-slider">
                              <span class="switch-on">
                                <i class="ri-check-line"></i>
                              </span>
                              <span class="switch-off">
                                <i class="ri-close-line"></i>
                              </span>
                            </span>
                          </label>
                        </div>
                      </td>
                      <td class="text-end fw-medium" style="vertical-align: middle;">
                        <button id="Trenes|${data[i].idtren}|${data[i].tren}|${data[i].origen}|${data[i].destino}|${data[i].salida}|${data[i].llegada}" onclick="verEditar(this.id);" type="button" class="btn rounded-pill btn-icon btn-primary waves-effect waves-light">
                          <span class="tf-icons ri-edit-2-fill ri-22px"></span>
                        </button>
                      </td>
                    </tr>
              
              `;


                
              }

              document.getElementById("tablaTrenes").innerHTML =  html ;
                          
            }
        });

}


function agregarEmpleado(){
    var nombre = document.getElementById("txtNombre").value;
    var apellidos = document.getElementById("txtApellidos").value;
    var tel = document.getElementById("txtTelefono").value;
    if (nombre === "" || apellidos === "" || tel === "") {
        msgAlert("info", "Mensaje", "Agrega los datos solicitados: <b>Nombre, Apellidos y Teléfono</b>");
    } else {
        apellidos = apellidos.split(' ');
        $.ajax({
            url: cn + "AgregarUsuarioK&Nom=" + nombre + "&Ap=" + apellidos[0] + "&Am=" + apellidos[1] + "&tel=" + tel + "&Email=" + tel + "&Pwd=" + tel,
            success: function (result) {
                    selectEmpleados();
                    document.getElementById("txtNombre").value = "";
                    document.getElementById("txtApellidos").value = "";
                    document.getElementById("txtTelefono").value  = "";
                    msgAlert("success", "Mensaje", "Empleado agregado");
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud AJAX:", error);
                msgAlert("danger", "Error", "Ocurrió un problema al realizar la solicitud: " + error);
            }
        });
    }
}

function agregarEstacion(){
    var nombre = document.getElementById("txtEstacion").value;
    var estado = document.getElementById("txtEstado").value;
    var usuario = localStorage.getItem("id");
    if (nombre === "" || estado === "") {
        msgAlert("info", "Mensaje", "Agrega los datos solicitados: <b>Nombre de estación y Estado</b>");
    } else {
        $.ajax({
            url: cn + "InsertarEstacion&Nom=" + nombre + "&Estado=" + estado + "&User=" + usuario,
            success: function (result) {
                console.log(result);
                selectEstaciones();
                    document.getElementById("txtEstacion").value = "";
                    document.getElementById("txtEstado").value = "";
                    msgAlert("success", "Mensaje", "Estación agregada");
            },
            error: function (xhr, status, error) {
                msgAlert("danger", "Error", "Ocurrió un problema al realizar la solicitud: " + error);
            }
        });
    }
}


function agregarArea(){
    var nombre = document.getElementById("txtArea").value;
    var usuario = localStorage.getItem("id");
    if (nombre === "" ) {
        msgAlert("info", "Mensaje", "Agrega los datos solicitados: <b>Nombre de área</b>");
    } else {
        $.ajax({
            url: cn + "InsertarArea&Nom=" + nombre + "&User=" + usuario,
            success: function (result) {
         
                selectAreas();
                    document.getElementById("txtArea").value = "";
                    msgAlert("success", "Mensaje", "Área agregada");
            },
            error: function (xhr, status, error) {
                msgAlert("danger", "Error", "Ocurrió un problema al realizar la solicitud: " + error);
            }
        });
    }
}

function agregarTren(){
  var tren = document.getElementById("txtTren").value;
  var origen = document.getElementById("txtOrigen").value;
  var destino = document.getElementById("txtDestino").value;
  var llegada = document.getElementById("txtLlegada").value;
  var salida = document.getElementById("txtSalida").value;
  var idestacion = localStorage.getItem("idestacion"); 

  if (tren === "" || origen === "" || destino === "" || llegada === "") {
      msgAlert("info", "Mensaje", "Agrega los datos solicitados");
  } else {
      $.ajax({
          url: cn + "InsertarTren&Tren=" + tren + "&Origen=" + origen + "&Destino=" + destino + "&Salida=" + salida + "&Llegada=" + llegada + "&id=" + idestacion,
          success: function (result) {
            console.log(result);
                  selectTrenes();
                  document.getElementById("txtTren").value = "";
                  document.getElementById("txtOrigen").value = "";
                  document.getElementById("txtDestino").value = "";
                  document.getElementById("txtSalida").value = "";
                  document.getElementById("txtLlegada").value = "";
                  msgAlert("success", "Mensaje", "Registro agregado");
          },
          error: function (xhr, status, error) {
              console.error("Error en la solicitud AJAX:", error);
              msgAlert("danger", "Error", "Ocurrió un problema al realizar la solicitud: " + error);
          }
      });
  }
}


function cambiarEstatus(valor){
    var valor2 = valor.split('|');
    var catalogo = valor2[0];
    var idreg = valor2[1];
    var estatus = document.getElementById(valor).checked;
    var usuario = localStorage.getItem("id");
        $.ajax({
            url: cn + "cambiarEstatusRegistro&Catalogo=" + catalogo + "&Estatus=" + estatus + "&Id=" + idreg + "&User=" + usuario,
            success: function (result) {
                if(catalogo == "Estaciones"){
                    selectEstaciones();
                }
                if(catalogo == "Areas"){
                    selectAreas();
                }
                if(catalogo == "Empleados"){
                    selectEmpleados();
                }
                if(catalogo == "Trenes"){
                  selectTrenes();
              }
                if(estatus == true){
                    msgAlert("success", "Mensaje", "Registro activado");
                }
                else{
                    msgAlert("error", "Mensaje", "Registro desactivado ");
                }    
            },
            error: function (xhr, status, error) {
                msgAlert("danger", "Error", "Ocurrió un problema al realizar la solicitud: " + error);
            }
        });  
}

function verEditar(data){

  data  = data.split('|');
  if(data[0] == "Estaciones" ){
    document.getElementById("divAgregarEstacion").style.display = 'none';
    document.getElementById("editarEstacion").style.display = 'block';
    document.getElementById("txtIdEstacion").value = data[1];
    document.getElementById("txtEstacion").value = data[2];
    document.getElementById("txtEstado").value = data[3];
  }

  if(data[0] == "Areas" ){
    document.getElementById("divAgregarArea").style.display = 'none';
    document.getElementById("editarArea").style.display = 'block';
    document.getElementById("txtIdArea").value = data[1];
    document.getElementById("txtArea").value = data[2];
  }

  if(data[0] == "Empleados" ){
    document.getElementById("btnAgregarEmpleado").setAttribute("style", "display: none !important;");
    document.getElementById("divEditarEmpleado").style.display = 'block';
    document.getElementById("txtIdEmpleado").value = data[1];
    document.getElementById("txtNombre").value = data[2];
    document.getElementById("txtApellidos").value = data[3];
    document.getElementById("txtTelefono").value = data[4];
  }

  if(data[0] == "Trenes" ){
    document.getElementById("btnAgregarTren").setAttribute("style", "display: none !important;");
    document.getElementById("divEditarTren").style.display = 'block';
    document.getElementById("txtIdTren").value = data[1];
    document.getElementById("txtTren").value = data[2];
    document.getElementById("txtOrigen").value = data[3];
    document.getElementById("txtDestino").value = data[4];
    document.getElementById("txtSalida").value = data[5];
    document.getElementById("txtLlegada").value = data[6];
  }

}

function cancelaEditarEstacion(){
  document.getElementById("editarEstacion").setAttribute("style", "display: none !important;");
  document.getElementById("divAgregarEstacion").style.display = 'block';
  document.getElementById("txtEstacion").value = "";
  document.getElementById("txtEstado").value = "";
}

function cancelaEditarArea(){
  document.getElementById("editarArea").setAttribute("style", "display: none !important;");
  document.getElementById("divAgregarArea").style.display = 'block';
  document.getElementById("txtArea").value = "";
}

function cancelaEditarEmpleado(){
  document.getElementById("divEditarEmpleado").setAttribute("style", "display: none !important;");
  document.getElementById("btnAgregarEmpleado").style.display = 'block';
  document.getElementById("txtNombre").value = "";
  document.getElementById("txtApellidos").value = "";
  document.getElementById("txtTelefono").value = "";
}

function cancelaEditarTren(){
  document.getElementById("divEditarTren").setAttribute("style", "display: none !important;");
  document.getElementById("btnAgregarTren").style.display = 'block';
  document.getElementById("txtTren").value = "";
  document.getElementById("txtOrigen").value = "";
  document.getElementById("txtDestino").value = "";
  document.getElementById("txtSalida").value = "";
  document.getElementById("txtLlegada").value = "";
}

function editarEstacion(){
  var nombre = document.getElementById("txtEstacion").value;
  var estado = document.getElementById("txtEstado").value;
  var usuario = localStorage.getItem("id");
  var id = document.getElementById("txtIdEstacion").value;
  if (nombre === "" || estado === "") {
      msgAlert("info", "Mensaje", "Agrega los datos solicitados: <b>Nombre de estación y Estado</b>");
  } else {
      $.ajax({
          url: cn + "EditarEstacion&Nom=" + nombre + "&Estado=" + estado + "&User=" + usuario + "&Id=" + id,
          success: function (result) {
              console.log(result);
              selectEstaciones();
              cancelaEditarEstacion();
                  msgAlert("success", "Mensaje", "Estación editada");
          },
          error: function (xhr, status, error) {
              msgAlert("danger", "Error", "Ocurrió un problema al realizar la solicitud: " + error);
          }
      });
  }
}

function editarArea(){
  var nombre = document.getElementById("txtArea").value;
  var usuario = localStorage.getItem("id");
  var id = document.getElementById("txtIdArea").value;
  if (nombre === "") {
      msgAlert("info", "Mensaje", "Agrega los datos solicitados");
  } else {
      $.ajax({
          url: cn + "EditarArea&Nom=" + nombre + "&User=" + usuario + "&Id=" + id,
          success: function (result) {
              console.log(result);
              selectAreas();
              cancelaEditarArea();
                  msgAlert("success", "Mensaje", "Area editada");
          },
          error: function (xhr, status, error) {
              msgAlert("danger", "Error", "Ocurrió un problema al realizar la solicitud: " + error);
          }
      });
  }
}

function editarEmpleado(){
  var nombre = document.getElementById("txtNombre").value;
  var apellidos = document.getElementById("txtApellidos").value;
  var tel = document.getElementById("txtTelefono").value;
  var ap = apellidos.split(' ')[0];
  var am = apellidos.split(' ')[1];
  var usuario = localStorage.getItem("id");
  var id = document.getElementById("txtIdEmpleado").value;
  if (nombre === "" || apellidos === "" || tel === "") {
      msgAlert("info", "Mensaje", "Agrega los datos solicitados");
  } else {
      $.ajax({
          url: cn + "EditarEmpleado&Nom=" + nombre + "&Ap=" + ap + "&Am=" + am + "&tel=" + tel + "&User=" + usuario + "&Id=" + id,
          success: function (result) {
              console.log(result);
              selectEmpleados();
              cancelaEditarEmpleado();
                  msgAlert("success", "Mensaje", "Empleado modificado");
          },
          error: function (xhr, status, error) {
              msgAlert("danger", "Error", "Ocurrió un problema al realizar la solicitud: " + error);
          }
      });
  }
}


function editarTren(){
  var tren = document.getElementById("txtTren").value;
  var origen = document.getElementById("txtOrigen").value;
  var destino = document.getElementById("txtDestino").value;
  var llegada = document.getElementById("txtLlegada").value;
  var salida = document.getElementById("txtSalida").value;

  var usuario = localStorage.getItem("id");
  var id = document.getElementById("txtIdTren").value;
  if (tren === "" || origen === "" || destino === "" || salida === "") {
      msgAlert("info", "Mensaje", "Agrega los datos solicitados");
  } else {
    console.log( cn + "EditarTren&Tren=" + tren + "&Origen=" + origen + "&Destino=" + destino + "&Salida=" + salida + "&Llegada=" + llegada + "&User=" + usuario + "&Id=" + id);
      $.ajax({
          url: cn + "EditarTren&Tren=" + tren + "&Origen=" + origen + "&Destino=" + destino + "&Salida=" + salida + "&Llegada=" + llegada + "&User=" + usuario + "&Id=" + id,
          success: function (result) {
              console.log(result);
              selectTrenes();
              cancelaEditarTren();
                  msgAlert("success", "Mensaje", "Tren modificado");
          },
          error: function (xhr, status, error) {
              msgAlert("danger", "Error", "Ocurrió un problema al realizar la solicitud: " + error);
          }
      });
  }
}



