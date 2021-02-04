const KEY = "945da0b433d1c512e2248fae93c2da9e";
const IMAGE = "https://image.tmdb.org/t/p/w500";

let info= document.getElementById("info");

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

// document.addEventListener("DOMContentLoaded", opiniones);