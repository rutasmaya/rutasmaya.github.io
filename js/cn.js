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

    var token = getCookie('token');
    if (!token) {
        window.location.href = "login.html";
        return;
    }
    $.ajax({
        type: "POST",
        url: cn + "ValidateToken",
        data: { TokenK: token },
        success: function (response) {
            if (response === "TokenOK") {
                console.log("© RutasMayaSystem 2024");
            } else {
                window.location.href = "login.html";
            }
        },
        error: function () {
           window.location.href = "login.html";
        }
    });  

}




function confirmLogout() {
    cuteAlert({
        type: "question",
        title: "Mensaje",
        message: "¿Estás seguro que deseas cerrar la sesión?",
        confirmText: "Ok",
        cancelText: "Cancelar"
    }).then((e) => {
        if (e === "confirm") {
            // Eliminar las cookies del token
            document.cookie = "token=; max-age=0; path=/;";
 
            // Eliminar cualquier dato adicional de la sesión
            localStorage.removeItem("sesion");
 
            // Redirigir al usuario al inicio de sesión o página principal
            window.location.href = "index.html";
        } else {
            console.log("Cancelado");
        }
    });
 }