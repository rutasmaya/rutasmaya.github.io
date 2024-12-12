function login() {
  load.display = 'block';
  var user = document.getElementById("username").value.trim();
  var pwd = document.getElementById("password").value.trim();

  if (user !== '' && pwd !== '') {  
      $.ajax({
          type: "POST", // Usar método POST
          url: cn + "LoginappSecure", // URL de tu servicio
          data: { // Enviar los datos como objeto de formulario
              User: user,
              Pwd: pwd
          },
          success: function (result) {

            console.log(result);
    
              result = result.split(",");
              if (result[0] !== "0" && result[0] !== "") {
                  localStorage.setItem("sesion", 1);
                  localStorage.setItem("id", result[0]); 
                  localStorage.setItem("nombre", result[1]);   
                  localStorage.setItem("apellidop", result[2]); 
                  localStorage.setItem("apellidom", result[3]); 
                  localStorage.setItem("telefono", result[4]);   
                  localStorage.setItem("correo", result[5]); 
                  localStorage.setItem("rol", result[6]); 
                 
                   // Establecer la cookie del token con opciones de seguridad
                   //document.cookie = `token=${result[7]}; Secure; SameSite=Strict; max-age=3600`; // Expira en 1 hora

                   //document.cookie = `token=${result[7]}; SameSite=Strict; max-age=3600`; // Expira en 1 hora SINSECURE PARA HTTP
                  
                  // document.cookie = `token=${result[7]}; max-age=3600; path=/`;

                  document.cookie = `token=${result[7]}; max-age=3600; path=/; SameSite=None`;
                   console.log("Cookies actuales:", document.cookie);



                   setTimeout(() => window.location.href = "inicio.html", 1000);
              } else {  
                  msgAlert("error", "Mensaje", "Datos incorrectos");
                  load.display = 'none';
              }
          },
          error: function () {
              msgAlert("warning", "Mensaje", "Verifique su conexión");
              load.display = 'none';
          }
      });
  } else {
      msgAlert("info", "Mensaje", "Agregue los datos solicitados");
      load.display = 'none';
  }          
}

  function cerrar(){
    localStorage.removeItem("sesion");
    window.location.href = "login.html"
  }

  function cnotis(user){
    $.ajax({
        type: "GET",
        url: cn + "Cnotis&User=" + user,
        success: function (result) {
          result = result.split("<");
            result = result[0];
           localStorage.setItem("cnotis", result);
        },
        error: function (jqXmlHttpRequest, textStatus, errorThrown) {   
        }
    });
  }

  function info(user){
    $.ajax({
        type: "GET",
        url: cn + "Infouserapp&User=" + user,
        success: function (result) {
          result = result.split("<");
            result = result[0];
            var dato = result.split('|');
            localStorage.setItem("nombre", dato[0]);   
            localStorage.setItem("telefono", dato[1]);   
            localStorage.setItem("celular", dato[2]);  
            localStorage.setItem("cp", dato[3]); 
            localStorage.setItem("direccion", dato[4]); 
            localStorage.setItem("correo", dato[5]); 
            localStorage.setItem("idrole", dato[6]); 
            setTimeout(window.location.href = "index.html", 5000);	
        },
        error: function (jqXmlHttpRequest, textStatus, errorThrown) {   
        }
    });
}

$(document).ready(function(){

  var ses = localStorage.getItem("sesion");
  if(ses == 1){
     //window.location.href = "index.html";	
     load.display = 'none';
  }
  else{
    load.display = 'none';
  }
});

