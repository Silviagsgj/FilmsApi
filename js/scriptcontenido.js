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
//console.log(id);

//Funcion que me da los datos de la pelicula seleccionada
const datosunapelicula = () => { 
    //ruta de cada id 
    fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key="+KEY+"&language=es")  
    .then(datos => datos.json())   
    .then(datos_json => {   
    //console.log(datos_json); 
    let caja = document.createElement("DIV");
    caja.classList.add("info__box2");
   
    let imagen = document.createElement("IMG");
    //Caso de que la pelicula no tenga imagen, le pongo una por defecto y añado su titulo
    if(datos_json.backdrop_path==null){
        imagen.src = "image/b.jpg";            
    }else{
        let ima = datos_json.backdrop_path;
        imagen.src=IMAGE+ima;              
    }

    imagen.classList.add("ajustar2"); 
    caja.appendChild(imagen);
    
    let caja2 = document.createElement("DIV");
    caja2.classList.add("info__box");

    let caja3 = document.createElement("DIV");
    caja3.classList.add("caja3");
    
    let titulopelicula = document.createElement("H3");
    titulopelicula.textContent = datos_json.title;
    titulopelicula.classList.add("info__box--title");
    caja3.appendChild(titulopelicula);

    //si esta vacio no mostrar!!
    let descripcion = document.createElement("P");
    descripcion.textContent =  datos_json.overview;
    descripcion.classList.add("info__box--text");
    caja3.appendChild(descripcion);

    let fecha = document.createElement("P");
    fecha.textContent = `Fecha de estreno: ${datos_json.release_date}`;
    caja3.appendChild(fecha);

    let puntuacion = document.createElement("P");
    puntuacion.textContent = `Puntuación media: ${datos_json.vote_average}`;
    // puntuacion.classList.add("info__box--text");
    caja3.appendChild(puntuacion);

    caja2.appendChild(caja3);
   
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
}//datosunapelicula

//Funcion que me da las opiniones de una pelicula
const mostraropiniones = () => { 
    fetch("https://api.themoviedb.org/3/movie/"+id+"/reviews?api_key="+KEY)
    .then(datos => datos.json())   
     .then(datos_json => {
        console.log(datos_json);
        
        let arti = document.getElementById("arti");        
        if(datos_json.results.length==0){
            // console.log("No hay ninguna opinion");
            let parrafo = document.createElement("P");
            parrafo.textContent = "No hay ninguna opinión";
            parrafo.classList.add("cajaarticulos__p");
            arti.appendChild(parrafo);
        }else{
            //caso de que si haya opiniones
        const fragment = document.createDocumentFragment();   
        //Como máximo voy a mostrar solo 5 opiniones 
        if(datos_json.results.length>5){    
        for(let i=0; i<5; i++){
            let articulo = document.createElement("ARTICLE");
            articulo.classList.add("articlecontainer");

            let cabeceraarti = document.createElement("HEADER");
            cabeceraarti.classList.add("articlecontainer__header");
            cabeceraarti.textContent = datos_json.results[i].author;
            
            articulo.appendChild(cabeceraarti);

            let parrafo = document.createElement("P");
            parrafo.classList.add("articlecontainer__text");
            //Como los comentarios son largos cojo solo una parte
            parrafo.textContent = datos_json.results[i].content.substring(0,350);

            articulo.appendChild(parrafo)
            fragment.appendChild(articulo);
        }//for
        arti.appendChild(fragment);
    }//caso de que haya mas de 5 opiniones
    else{
        //caso de que haya menos de 5 opiniones
        for(let i=0; i<datos_json.results.length; i++){
            let articulo = document.createElement("ARTICLE");
            articulo.classList.add("articlecontainer");

            let cabeceraarti = document.createElement("HEADER");
            cabeceraarti.classList.add("articlecontainer__header");
            cabeceraarti.textContent = datos_json.results[i].author;
            
            articulo.appendChild(cabeceraarti);

            let parrafo = document.createElement("P");
            parrafo.classList.add("articlecontainer__text");
            parrafo.textContent = datos_json.results[i].content.substring(0,350);

            articulo.appendChild(parrafo)
            fragment.appendChild(articulo);
        }//for
        arti.appendChild(fragment);
    }
        }//else
    })//fin fetch
}


//Relacion de dos apis por genero
//Funcion con la que relaciono 2 apis, obtengo el genero de la pelicula con una api y con la otra saco series de ese genero

const dosapis = () => {
fetch("https://api.themoviedb.org/3/movie/"+id+"?api_key="+KEY)  
  .then(datos => datos.json())   
   .then(datos_json => {
       console.log(datos_json);  
       let genero; 
    if(datos_json.genres.length==0){
        console.log("nulo");
        //pongo un genero por defecto
         genero = "comedy";
    }else{
       genero = datos_json.genres[0].name;
    }
     //Saco el primer genero--Si la pelicula tiene varios generos, me quedo solo con el primero    
    //console.log("el genero es: "+genero);
    fetch("https://api.simkl.com/tv/genres/"+genero+"?client_id="+CLIENTID)
    .then(datos => datos.json())   
    .then(datos_json => {
        //console.log(datos_json);
       let arrayrutas = [];
        //me saco 8
    for(let i=0; i<8; i++){
        //guardo las 8 rutas en un array
        //console.log(POSTER+datos_json[i].poster+POSTER2);
        arrayrutas[i] = POSTER+datos_json[i].poster+POSTER2;
    }
    //console.log(arrayrutas);
   
    let im1 =document.getElementById("im1");
    let im2 =document.getElementById("im2");
    let im3 =document.getElementById("im3");
    let im4 =document.getElementById("im4");
    let im5 =document.getElementById("im5");
    let im6 =document.getElementById("im6");
    let im7 =document.getElementById("im7");
    let im8 =document.getElementById("im8");

    im1.src=arrayrutas[0];
    im2.src=arrayrutas[1];
    im3.src=arrayrutas[2];
    im4.src=arrayrutas[3];
    im5.src=arrayrutas[4];
    im6.src=arrayrutas[5];
    im7.src=arrayrutas[6];
    im8.src=arrayrutas[7];
})//fin segundo fetch

})//fin primer fetch

}


document.addEventListener("DOMContentLoaded", 
                            ()=>{
                                datosunapelicula();
                                mostraropiniones();
                                dosapis();
                            });