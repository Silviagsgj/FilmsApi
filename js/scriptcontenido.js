const KEY = "945da0b433d1c512e2248fae93c2da9e";
const IMAGE = "https://image.tmdb.org/t/p/w500";

const CLIENTID= "9bd2530ef98e5812cba0e70ac384ede44dab7390175a077d865c3f2d580f30b0";
const POSTER = "https://simkl.net/posters/";
const POSTER2 = "_c.jpg";

let info= document.getElementById("info");

//Funcion que me coge el parametro del GET URL
const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let id = getParameterByName('data');
  console.log(id);
const datosunapelicula = () => {   



  //ruta de cada id
  //https://api.themoviedb.org/3/movie/"+identificador+"?api_key="+KEY;
  fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key="+KEY+"&language=es")  
  .then(datos => datos.json())   
   .then(datos_json => {
   
    console.log(datos_json); 
    let caja = document.createElement("DIV");
    caja.classList.add("info__box");

    //algunas pueden que no tengan!!
    let imagen = document.createElement("IMG");
    let ima = datos_json.backdrop_path;
    imagen.src=IMAGE+ima;  
    imagen.classList.add("ajustar2");

    caja.appendChild(imagen);
    
    let caja2 = document.createElement("DIV");
    caja2.classList.add("info__box");
    
    let titulopelicula = document.createElement("H3");
    titulopelicula.textContent = datos_json.title;
    titulopelicula.classList.add("info__box--title");
    caja2.appendChild(titulopelicula);

    //si esta vacio no mostrar!!
    let descripcion = document.createElement("P");
    descripcion.textContent =  datos_json.overview;
    // descripcion.classList.add("info__box--text");
    caja2.appendChild(descripcion);

    let fecha = document.createElement("P");
    fecha.textContent = `Fecha de estreno: ${datos_json.release_date}`;
    caja2.appendChild(fecha);

    let puntuacion = document.createElement("P");
    puntuacion.textContent = `Puntuación media: ${datos_json.vote_average}`;
    // puntuacion.classList.add("info__box--text");
    caja2.appendChild(puntuacion);


    // let texto = document.createElement("SPAN");
    // texto.textContent = "Generos:";
    // caja2.appendChild(texto);
  
    const fragment = document.createDocumentFragment();
     let generos = document.createElement("DIV");
    generos.classList.add("info__box--textge")
                    for (let i = 0; i < datos_json.genres.length; i++) {
                        let generosconte = document.createElement("SPAN");
                        generosconte.innerText= datos_json.genres[i].name;


                        fragment.appendChild(generosconte);   
                    }
        generos.appendChild(fragment);
        caja2.appendChild(generos);     
         info.appendChild(caja);
         info.appendChild(caja2);
})//fin fetch

}


document.addEventListener("DOMContentLoaded", datosunapelicula);



const opiniones = () => {   
    // fetch("https://api.themoviedb.org/3/review/22?api_key="+KEY+"&language=es")  
   
    // fetch("https://api.themoviedb.org/3/movie/"+id+"/reviews?api_key="+KEY)
    // .then(datos => datos.json())   
    //  .then(datos_json => {

    //     // let opinion = document.getElementById("opi");
    //     // opinion.textContent="fdsdf";
    //     console.log(datos_json.results[0].content);
    //     console.log(datos_json);

    //     let cajaarticulos = document.getElementById("cajaarticulos");
    //     const fragment = document.createDocumentFragment();
    //     for (let i = 0; i < datos_json.results.length; i++) {
            
    //         let articulo = document.createElement("ARTICLE");   
    //         articulo.classList.add("articlecontainer")   
            
    //         let opinion = document.createElement("P");
    //         opinion.textContent = datos_json.results[i].content;
    //         articulo.appendChild(opinion);

    //         // datos_json.results[i].author;
    //         // datos_json.results[i].author;
    //         // opinion.textContent=datos_json.results[i].content;
            
    //         fragment.appendChild(articulo);  
    //     }
    //     cajaarticulos.appendChild(fragment);

    // })//fin fetch
}

//document.addEventListener("DOMContentLoaded", opiniones); 





//Relacion de dos apis por genero

// let arrayimagenes = document.querySelectorAll(".images__container");


fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key="+KEY)  
  .then(datos => datos.json())   
   .then(datos_json => {

    //Saco el primer genero
    let genero = datos_json.genres[0].name;
    console.log(genero);

fetch("https://api.simkl.com/tv/genres/"+genero+"?client_id="+CLIENTID)
  .then(datos => datos.json())   
   .then(datos_json => {

    console.log(datos_json);
    let arrayrutas = [];
    //me saco 6
    for(let i=0; i<6; i++){
        //guardo las 6 rutas en un array

        //console.log(POSTER+datos_json[i].poster+POSTER2);
        arrayrutas[i] = POSTER+datos_json[i].poster+POSTER2;
        
         
    }

    console.log(arrayrutas);
   
    //Recorro la clase y le asigno su src por posiciones del array

    // NO LO MUESTRA???
//     for(let j=0; j<arrayimagenes.length; j++){
//         //como son del mismo tamaño igualo
//              arrayimagenes[j].setAttribute("src", arrayrutas[j]);
//              console.log(arrayimagenes[j].getAttribute("src"));
//   }

//CAMBIAR ESTO -- PRUEBA
let im1 =document.getElementById("im1");
let im2 =document.getElementById("im2");
let im3 =document.getElementById("im3");
let im4 =document.getElementById("im4");
let im5 =document.getElementById("im5");
let im6 =document.getElementById("im6");


im1.src=arrayrutas[0];
im2.src=arrayrutas[1];
im3.src=arrayrutas[2];
im4.src=arrayrutas[3];
im5.src=arrayrutas[4];
im6.src=arrayrutas[5];


})//fin segundo fetch


   })//fin primer fetch


