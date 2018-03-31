"use strict";

var encuesta = [];

encuesta = {
  "clasificacion": "null",
  "cuestionario": []
};

var count = 0;

$(document).ready( function(){
  console.log("Conversor corriendo...");
});


//Leer el archivo
$('#Files').change( function(){
  console.log("Se agregó un archivo(s) a Files");

  var file = this.files[0];

  //Reader Object
  var reader = new FileReader();

  reader.onload = function(progressEvent){
    // Leer el archivo completo
    console.log("Leyendo...");
    spliterCreator( this.result );
  };

  //Terminar de leer el archivo
  reader.readAsText(file);
});


function spliterCreator ( content ) {
  content = content.split("\n");
  var status;
  // content.length - 1 Debido a que el archivo siempre guarda un \n extra
  for (var i = 0; i < content.length - 1; i++) {
    // console.log(content[i]);
    status  = cleanLine( content[i] );
  }
}

function cleanLine( eachLine ){
  var word        = eachLine.split(",");
  var linestates  = [];
  var state       = 0;
  var temp        = [];

  linestates[3] = "area";
  linestates[1] = "pregunta";
  linestates[2] = "puntaje";
  linestates[0] = "tipo";
  linestates[4] = "topic";

  temp = {
    "area" : "null",
    "pregunta" : "null",
    "tipo": "null",
    "topic": "null",
  };

  if ( word.length < 5 ) {
    console.log( "El csv que se trata de procesar tiene errores. Consulte las reglas." );
    return 1;
  }

  // Sabemos que la frase siempre tendrá 5 elementos
  switch ( word[0] ) {
    case "intro_quest":
    case "intro_area":
    case "intro_topic":
    case "pregunta":
      state = 0;
      break;
    case "class":
      state = 1;
      // console.log("Es la clasificación");
      break;
    default:
      console.log("No se sabe...");
  }

  // Estado de las preguntas en cuanto al estado
  if ( state == 0 ) {
    for (var i = 0; i < word.length; i++) {
      temp[linestates[i]] = word[i];
    }
    encuesta["cuestionario"][count] = temp;
    count++;
    // console.log(temp);

  } //if
  else{
    // console.log("Es la clasificación");
    encuesta["clasificacion"] = word[1];
  } //else

}
