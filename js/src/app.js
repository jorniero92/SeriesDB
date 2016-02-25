// recoger el valor que se envia en vez de comprobar si hay algo en x casillero
// configurar el manejador de event, de la pagina ya ha sdo cargada
$(document).ready(function(){ // cuando la pagina se ha cargao por completo

	//ponemos el foco en el primer input
	 $(".auto-focus").focus(); 
	//$("#title").focus(); 

	$("form").on("submit", function(){
		//validacion del titulo
		var title = $.trim( $("#title").val());
		if(title == ""){
			alert("El titulo no puede estar vacío");
			return false; //jquery cancela el formulario. Esta mal validado en algun punto
		}

		//validacion de URL
		var url = $.trim($("#cover_url").val());
		var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig;
		if(url != " " && pattern.test(url) == false ){
			alert("La URL de la carátula no es válida");
			return false;
		}

		//validacion de que como mínimo tiene q tener 1 categoria marcada
		//validacion de categorias
								  //elementos que tengan el nombre "category"
		var selectedCategories = $('input[name="category"]:checked');
		if(  selectedCategories.length == 0){
			alert("Seleccion al menos una categoria");
			return false;
		}

		//hacer peticion ajax para enviarlo, se envia de golpe
		$.ajax({	//interconexion de backend y frontend
			// POST = envio datos
			method: 'post', 
			// a la peticion le paso un link
			url: "/api/series/", 
			//Le das undiccionaro, a modo de converion de string a Json
			data: JSON.stringify({	
				// los atos que le das
				title: title, 
				url: url
			}),
			//la forma de avisa al servidor de el idioma con el que hablas
			contentType: 'application/json', 
			success : function(){
				reloadSeries();
				alert("Guardado con exito")
			},
			error: function(){
				alert("Ha surgido algun problema al guardar")
			}
		});

		//alert("Enviando formulario para probarlo");
		return false; //jquery cancela el formulario. Esta mal validado en algun punto

	});
	
	
	function reloadSeries(){
		console.log("Cargando Series");
		//configuro una accion pero la realiza cuando quiera
		$.ajax({
			//en get no hace falta decirle que es JSON
			url: "/api/series/",
			success: function(data){
				console.log("Series recuperadas", data);
				var html = "";
				for(var i in data){
					var id = data[i].id;
					var title = data[i].title;
					var url = data[i].url || "";
					html += "<li>";
					html += title;
					if(url.length > 0)
						html += " (" + url + ") ";
					html += '<button data-serieid="'+ id+ '"> Eliminar</button>"';
					html += "</li>";
				}
				$("#seriesList").html(html);
			}
		});
	}

	//sin parentesis uso la funcion para que la llame cuando le haga falta
	//con parentesis ejecuta la funcion
	$("#reloadSeriesButton").on("click", reloadSeries);

	/*	si lleva parametros la funcion --> llamamos a una funcion anonima

		$("#reloadSeriesButton").on("click", function(){
			reloadSeries(user, pass);
		});
	*/

	reloadSeries();

	// llama a cualquier boton dentro de "seriesList"
	// asi llama al padre y cuando salga el boton y se clicke que se elimine
	$("#seriesList").on("click","button", function(){
		console.log("Elimino la serie");
		var self = this; //this es el elemento
		var id = $(self).data("serieid"); // cojo el valor del atributo data-serieid del boton
		$.ajax({
			url: "/api/series/" + id,
			method: "delete",
			success: function (){ //llamamda asincrona
				//elimino el elemento del DOM
				//si voy al padre del boton estoy en el <li>
				$(self).parent().remove();


			}
		});
	});

});