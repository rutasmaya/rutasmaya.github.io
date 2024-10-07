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
              for (var i = 0; i < data.length; i++) {

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
                        <div class="col-sm-6 col-lg-6 col-md-6">
                            <img src="${data[i].logo}" alt="" class="iconpop">
                            <h5>${data[i].nombre}</h5>
                            <p class="estadopop">${data[i].estado}</p>
                            <p id="labelDescripcion" class="textpop">
                            ${data[i].descripcion}
                            </p>

                            <textarea id="txtDescripcion" class="textpop" name="comentarios" rows="15"  style="width: 100%; display: none">${data[i].descripcion}</textarea>
                            
                            <br>
                            <img src="${imgestatus}" alt="" class="iconpop">
                            <h5>${data[i].estatus}</h5>
                            <p class="estadopop">${data[i].fecha}</p>
                            <br><br>
                        </div>
                        <div class="col-sm-6 col-lg-6 col-md-6 mapalto">
                            <h5>${data[i].descripcionimg}</h5>
                            <img src="${data[i].imagen}" class="imagepop" alt="">
                            <h5>Haga click para actualizar la información</h5>
                            <br>
                            <center>
                                <a id="btnActualizar" onclick="actualizar()" class="button button-width-xl-280 button-default-outline button-wapasha" style="margin-top: 3px;" >Actualizar</a>
                                <br>

                                <table style="width: 100%">
                                    <tr>
                                    <td> <a id="btnCancelar" onclick="cancelar()" class="button button-width-xl-280 button-error-outline button-wapasha" style="margin-top: 3px; display: none" >Cancelar</a></td>
                                    <td><a id="btnGuardar" onclick="actualizarRutasTransporte(${data[i].idRuta})" class="button button-width-xl-280 button-info-outline button-wapasha" style="margin-top: 3px; display: none" >Guardar</a></td>
                                    </tr>
                                </table>

                            </center>
                            <br>
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
