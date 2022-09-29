//EVENTOS O FUNCIONALIDADES PARA TABLA DISFRACES


//Funcion limpiar campos del formulario

function limpiar_formulario(){
	//if (confirm("Esta seguro que desea limpiar el formulario?")){
		var campoTextoID = document.getElementById("codigo");
		var campoTextoNombre = document.getElementById("name");
		var campoTextoMarca = document.getElementById("brand");
		var campoTextoModelo = document.getElementById("model");
		var campoTextoCategoria = document.getElementById("category_id");
		
		
		campoTextoID.value = "";
		campoTextoNombre.value = "";
		campoTextoMarca.value = "";
		campoTextoModelo.value = "";
		campoTextoCategoria.value = "";		
		
		
		//Otra forma de limpiar las cajas del html
		
		/*
		$("#codigo").val("");
		$("#name").val("");
		$("#fecha").val("");
		$("#valor").val("");
		$("#desc").val("");
		$("#user").val("");
		*/
	//}
}


//Funcion (GET) consultar o traer toda la informacion o registro de la tabla costume
function consultar_todo(){
    $.ajax({
        url:"https://gaa1d59a78302b7-bddistraces.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume",
        type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('ha ocurrido un problema, intentalo nuevamente, ' + xhr.status);
		},
		
		complete: function(xhr, status){
			alert('Resultado de comprobacion -- cod. estado: ' + xhr.status);
		},	
		
        success:function(json){
            console.log(json.items);
			//alert('Bien ');
            //crearRespuestaGastos(respuesta.items)
			
			$("#resultado").empty();
			tabla = "<center> <table border='1'> <tr> <th>ID</th> <th>NOMBRE</th> <th>MARCA</th> <th>MODELO</th> <th>ID CATEGORÍA</th> </tr> </tr>"
			total = 0;
			filas = ""
			for (i=0; i<json.items.length; i++){
				filas += "<tr>";
				filas += "<td>" + json.items[i].id + "</td>";
				filas += "<td>" + json.items[i].name + "</td>";
				filas += "<td>" + json.items[i].brand + "</td>";
				filas += "<td>" + json.items[i].model + "</td>";
				filas += "<td>" + json.items[i].category_id + "</td>";
				
				filas += "<td> <button onclick='borrar_registro("+json.items[i].id+")'>Borrar</button>";//se agrega el boton y este tiene la funcion borrar registro:
				
				filas += "</tr>";
			}
			filas += "</table>"
			$("#resultado").append(tabla + filas + "</center>")
			console.log(json)
			
			
        }

    });
}


//Otra forma de construir la anterior consultar o traer resultado de la tabla gastos es:
//Tiene que descomentar las lineas 20 y 21 de la funcion consultar o traer informacion
//Tambien eliminar todas las lineas de la 23 hasta la linea 41 y descomente esta funcion:

/* 
function crearRespuestaGastos(items){

    let myTable ="<table border='1'>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+items[i].id+"</td>";
        myTable+="<td>"+items[i].nombre+"</td>";
        myTable+="<td>"+items[i].fecha+"</td>";
        myTable+="<td>"+items[i].valor+"</td>";
        myTable+="<td>"+items[i].descripcion+"</td>";
		myTable+="<td>"+items[i].nombre_usuario+"</td>";
        myTable+="<td> <button onclick='borrarElementoRoom("+items[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado").append(myTable);

}
*/


function validarCampo(campoTexto){
	if(campoTexto.val() != ""){
	    return true;
	}
	else{
		return false;
	}
}



//Funcion (GET) para buscar o Consultar por ID

function consultaID(){
	
	let ide = $("#codigo").val();
	//alert(ide);
	
	if( ide != ""){
		$.ajax({
						
			url: 'https://gaa1d59a78302b7-bddistraces.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume/' + ide,
			
			type: 'GET',
			dataType: 'json',

			success: function(json){
				tabla = "<center><table border='1'>";
				filas = "";
				if (json.items.length > 0){
					console.log(json);
					$("#resultado").empty();
					filas += "<tr><th>ID:<td>" + json.items[0].id
					filas += "<tr><th>NOMBRE:<td>" + json.items[0].name
					filas += "<tr><th>MARCA:<td>" + json.items[0].brand
					filas += "<tr><th>MODELO:<td>" + json.items[0].model
					filas += "<tr><th>ID CATEGORÍA:<td>" + json.items[0].category_id
					//filas += "<tr><th>USUARIO:<td>" + json.items[0].nombre_usuario
					$("#resultado").append(tabla + filas + "</center>")
					
				}
				else{
					alert("El registro con ID: "+ ide + " No existe")
				}
				
			},

			error: function(xhr, status){
				alert('ha ocurrido un problema, Error: ' + xhr.status);
			},
			
			complete: function(xhr, status){
				alert('La peticion ha sido realizada,' + xhr.status);
				
			}		

		});
		
	}
	else{
		alert("Debe ingresar ID valido a buscar");
	}
}





//Funcion (POST) Registrar o Guardar toda la informacion en la tabla costume

function guardarInformacion(){
	
	if(!validarCampo($("#name"))){
		alert("Debe ingresar el nombre");
		return;
	}
	
	if(!validarCampo($("#valor"))){
		alert("Debe ingresar un valor");
		return;
	}	
	
    $.ajax({
        url: 'https://gaa1d59a78302b7-bddistraces.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume',
		
		data:{
			name: $("#name").val(),
			brand: $("#brand").val(),			
			model: $("#model").val(),
			category_id: $("#category_id").val()			
		},
		
		type: 'POST',
		
		dataType: 'json',
		
				
        success:function(json){		
        },
		
		error: function(xhr, status){
			if(xhr.status == 200){
				console.log("registro guardado con exito");
			}
			else{
				console.log("Favor revise que los datos esten correctos");
			}
		},
		
		complete: function(xhr, status){
			alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			consultar_todo();
			
		},	
    });
}








//Funcion (PUT) Editar o Actualizar registro de la tabla costume
function editar_Informacion(){
    let myData={
        id:$("#codigo").val(),
        name:$("#name").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val()
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
	
	if(!validarCampo($("#codigo"))){
		alert("Debe ingresar el ID");
		return;
	  }
	
	if (confirm("Está seguro de editar el registro (ID): " + $("#codigo").val() + "  ??")){
		
		$.ajax({
			url: "https://gaa1d59a78302b7-bddistraces.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume",
			type:"PUT",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			success:function(respuesta){
				$("#resultado").empty();

				consultar_todo();
				alert("se ha realizado la Actualicion del registro correctamente")
			}
		});
	}
}






//Funcion (DELETE) Borrar o Eliminar registro de la tabla costume
function borrar_registro(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
	
	
	if (confirm("Está seguro de eliminar el registro (ID): " + idElemento + "  ??")){
	
		$.ajax({
			url:"https://gaa1d59a78302b7-bddistraces.adb.us-sanjose-1.oraclecloudapps.com/ords/admin/costume/costume",
			type:"DELETE",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			
			success:function(respuesta){
				$("#resultado").empty();
				limpiar_formulario();
				consultar_todo();
				alert("El registro se ha eliminado correctamente.")
				
			}
		});
	}
}