//var cn = "https://aetechnologies.somee.com/AE/Admin/requestnoti.ashx?Comando=";

//ar cn = "http://airestsh.somee.com/Api/wsaires.ashx?Comando=";

var cn2 = "https://airestsh.somee.com/Api/CrudServicios.ashx?Comando=";
var cn = "https://amahcarev2.somee.com/requestnoti.ashx?Comando=";

//var cn = "http://localhost:51134/requestnoti.ashx?Comando=";


//var cn = "http://localhost:53224/Api/wsaires.ashx?Comando=";
//var cn2 = "http://localhost:53224/Api/CrudServicios.ashx?Comando=";

var loadingElement = document.getElementById("loading");

if (loadingElement) {
    var load = document.getElementById("loading").style;
}


var spancnotis = document.getElementById("cnotis");


  // Función para obtener el valor de una cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}



function validaTk(){

  



    $.ajax({
        type: "POST",
        url: cn + "ValidateToken",
        data: {}, // No es necesario enviar el token manualmente
        xhrFields: {
            withCredentials: true // Asegura que las cookies se envíen
        },
        success: function(response) {
            if (response === "TokenOK") {
                console.log("El token es válido.");
            } else {
                console.log("El token no es válido.");
                //window.location.href = "login.html"; // Redirigir si el token no es válido
            }
        },
        error: function() {
            console.log("Error al validar el token.");
            //window.location.href = "login.html";
        }
    });




}