function listarRutasTransporte(filtro){  
        $.ajax({
          type: "GET",
          url: "https://airestsh.somee.com/Api/CrudEstaciones.ashx?Comando=SelectRutasTransporte&Filtro="+filtro, 
           success: function (result) {

            var imgestatus = "";
  
            if(result != "[]"){
              result = result.split("<");
              result = result[0];
              var x = result.replace(/\\r\\n/g, '');   
              var data = JSON.parse(x)  
              var html = "";    
              var htmlinterno = "";    
             
              for (var i = 0; i < data.length; i++) {

                $.ajax({
                  url: cn + "SeleccionarTransportesEstacion&id="+ data[i].idRuta, 
                  success: function (result) {   
                
                    var x = result.replace(/\\r\\n/g, '');  
                    localStorage.setItem("prod", x);  
                    var data = JSON.parse(x)  
                    var bgestatus = "";
                    var txtestatus = ""
                    var icono = ""; 
                    var titulo = "";
                    for (var i = 0; i < data.length; i++) {
                       icono = ""; 
                       titulo = "";
                      if(data[i].tipo == "hotel"){
                        icono = 'ri-hotel-line';
                        titulo = "Hotel";
                      }

                      if(data[i].tipo == "transporte"){
                        icono = 'ri-bus-fill';
                        titulo = "Transporte"
                      }

                      if(data[i].tipo == "restaurante"){
                        icono = 'ri-restaurant-line';
                        titulo = "Restaurante";
                      }

                      if(data[i].tipo == "aeropuerto"){
                        icono = 'ri-flight-takeoff-line';
                        titulo = "Aeropuerto";
                      }

                      if(data[i].tipo == "tren"){
                        icono = 'ri-train-line';
                        titulo = "Tren";
                      }

                      if(data[i].tipo == "destino"){
                        icono = 'ri-road-map-line';
                        titulo = "Destino Turistico";
                      }


               


                
                    
                      if(data[i].estatus == "Actualizado"){
                        bgestatus = "bg-label-success";
                        txtestatus = "text-success";
                      }
        
                      if(data[i].estatus == "Actualizado hace más de 1 mes"){
                        bgestatus = "bg-label-warning";
                        txtestatus = "text-warning";
                      }
        
                      if(data[i].estatus == "Actualizado hace más de 3 meses"){
                        bgestatus = "bg-label-danger";
                        txtestatus = "text-danger";
                      }
    
                      htmlinterno = htmlinterno +   `
                          <div class=" col-lg-4 col-sm-6 ">
                              <div class="card h-100">
                                <div class="card-body">
                                  <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                    <div class="avatar">
                                      <div class="avatar-initial ${bgestatus} rounded-3">
                                         <i class="${icono} ri-24px"></i>
                                      </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                      <p class="mb-0 ${txtestatus} me-1">${titulo}</p>
                                      <a ><i class="ri-edit-2-fill ${txtestatus} ri-20px"></i></a>
                                    </div>
                                  </div>
                                  <div class="card-info ">
                                    <center>
                                      <div class="badge bg-label-info rounded-pill"><b>${data[i].nombretransporte}</b></div>
                                      <br><br>
                                      <p class="textpop2"><i class="ri-calendar-schedule-fill ri-22px"></i> ${data[i].horario}</p>
                                      <p class="textpop2"><i class="ri-money-dollar-circle-fill ri-22px"></i> ${data[i].precio}</p>
                                      <p class="textpop2"><i class="ri-map-pin-2-fill ri-22px"></i> ${data[i].direccion} </p>
                                      <p class="textpop2"><i class="ri-phone-fill ri-22px"></i> ${data[i].contacto} </p>
                                    </center>
                                  </div>
                                  <br>
                                  <center>
                                      <i class="ri-checkbox-circle-fill ${txtestatus}"></i>
                                      <div class="badge ${bgestatus} rounded-pill"><b>${data[i].fechaedicion}</b></div>
                                      <b><p class="textpop3">${data[i].estatus} </p></b>
                                  </center>
                                </div>
                              </div>
                            </div>                        
                    `;
             
                    }

                    document.getElementById("divTransportesEstacion").innerHTML = htmlinterno;
                          
                  }
              });

              if(data[i].estatus == "Actualizado"){
                imgestatus = "img/successimg.png"
              }

              if(data[i].estatus == "Actualizado hace más de 1 mes"){
                imgestatus = "img/warningimg.png"
              }

              if(data[i].estatus == "Actualizado hace más de 3 meses"){
                imgestatus = "img/errorimg.png"
              }

                html = html + `
                    <div class="row">
                        <div class="col-sm-6 col-lg-12 col-md-6">
                   
                            <div class="row">
                                <div class=" col-lg-6 col-sm-6 ">
                                  <img src="${data[i].logo}" alt="" class="iconpop">
                                  <h5>${data[i].idRuta}.-${data[i].nombre}</h5>
                                  <p class="estadopop">${data[i].estado}</p>
                                </div>

                                <div class="col-lg-6 col-sm-6" style="text-align:end">
                                  <img src="img/logomodal.png" alt="" width="100px" >
                                  <!--<p class="estadopop">${data[i].descripci2nimg}</p>-->
                                 
                                </div>
                            </div>

                             <p id="labelDescripcion" class="textpop4">
                                    ${data[i].descripcion}
                                  </p>
                      
                            
                              <!--
                            <textarea id="txtDescripcion" class="textpop" name="comentarios" rows="15"  style="width: 100%; display: none">${data[i].descripcion}</textarea>    
                            <br>
                            <img src="${imgestatus}" alt="" class="iconpop">
                            <h5>${data[i].estatus}</h5>
                            <p class="estadopop">${data[i].fecha}</p>
                            <br>-->

                            <div class="row" id="divTransportesEstacion">
                              ${htmlinterno}
                            </div>

                        </div>
                        
                    </div>




                    




                `;
              }
              document.getElementById("divPopup").innerHTML = html + '<br><br>';

              
            }
            else{
              html = "<br><br><center>No se encontraron resultados</center>";
              document.getElementById("divPopup").innerHTML = html + '<br><br>';
            }
          },
          error: function (jqXmlHttpRequest, textStatus, errorThrown) {
          }
    });
  }
  
  function actualizar(){
    document.getElementById("labelDescripcion").style.display = 'none';
    document.getElementById("txtDescripcion").style.display = 'block';
    document.getElementById("txtDescripcion").focus();
    document.getElementById("btnActualizar").style.display = 'none';
    document.getElementById("btnCancelar").style.display = 'block';
    document.getElementById("btnGuardar").style.display = 'block';
  }

  function cancelar(){
    document.getElementById("labelDescripcion").style.display = 'block';
    document.getElementById("txtDescripcion").style.display = 'none';
    document.getElementById("btnActualizar").style.display = 'block';
    document.getElementById("btnCancelar").style.display = 'none';
    document.getElementById("btnGuardar").style.display = 'none';
  }

  function actualizarRutasTransporte(id){  
    var desc = document.getElementById("txtDescripcion").value;
    $.ajax({
      type: "GET",
      url: "https://airestsh.somee.com/Api/CrudEstaciones.ashx?Comando=ActualizarRutasTransporte&IdRuta="+id + "&Descripcion=" + desc, 
        success: function (result) {
            listarRutasTransporte(id)
            document.getElementById("labelDescripcion").style.display = 'block';
            document.getElementById("txtDescripcion").style.display = 'none';
            document.getElementById("btnActualizar").style.display = 'block';
            document.getElementById("btnCancelar").style.display = 'none';
            document.getElementById("btnGuardar").style.display = 'none';
        },
        error: function (jqXmlHttpRequest, textStatus, errorThrown) {
        }
    });
}
