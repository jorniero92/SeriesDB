 module.exports = function (grunt) {
 	//config de grunt
 	var settings = {
 		less: {
 			style: {
 				files: { //archivos a compilar
 					"style.css" : "less/style.less" //destino : origen
 				}

 			}
 		}, //less

 		watch: {
 			styles: {
 				files: { // observar diferentes archivos en diferentes carpetas
 					files: ['less/*.less'], // cuando cambie cualquier archivo .less
 					tasks: ['less'], // ejecuta la tarea less  
 					options: {
 						 spawn: false //para que no se quede tostado, ir mas rapido
 					}
 				}
 			}

 		} //watch

 	};

 	//cargamos cofiguracion de grunt
	grunt.initConfig(settings);

	//cargamos los plugins
	grunt.loadNpmTasks('grunt-contrib-less');
 	grunt.loadNpmTasks('grunt-contrib-watch');

 	//definimos las tareas disponibles para grunt-cli
 	//compila less y se pone a observar y cada cambio compila
 	grunt.registerTask('default', ['less', 'watch']);
 	//solo coge y compila less
 	grunt.registerTask('producction', ['less']);
 };
