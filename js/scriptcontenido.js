const KEY = "945da0b433d1c512e2248fae93c2da9e";
const IMAGE = "https://image.tmdb.org/t/p/w500";


//Funcion que me coge el parametro del GET URL
const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


const datosunapelicula = () => {   

let id = getParameterByName('data');
  console.log(id);

  //ruta de cada id
  //https://api.themoviedb.org/3/movie/"+identificador+"?api_key="+KEY;
  fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key="+KEY+"&language=es")  
  .then(datos => datos.json())   
   .then(datos_json => {
   
    console.log(datos_json); 


         
})//fin fetch

}


document.addEventListener("DOMContentLoaded", datosunapelicula);

