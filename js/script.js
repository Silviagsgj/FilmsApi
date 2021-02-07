const KEY = "945da0b433d1c512e2248fae93c2da9e";
const IMAGE = "https://image.tmdb.org/t/p/w500";

let busqueda = document.getElementById("busqueda");
let buscar = document.getElementById("buscar");
let galeria = document.getElementById("galeria");
let error = document.getElementById("error");

//Funcion que me muestra las peliculas mas vistas de la semana en la galeria por defecto
const masvistas = () => {  
  fetch("https://api.themoviedb.org/3/trending/movie/week?api_key="+KEY)
  .then(datos => datos.json())   
  .then(datos_json => {
    console.log(datos_json);    
    //console.log(datos_json.results);
    const fragment = document.createDocumentFragment();
      //Recorro el array que contiene los datos de las peliculas
      for(let i=0; i<datos_json.results.length; i++){
        //console.log(datos_json.results[i].title);        
        let articulo = document.createElement("ARTICLE");
        articulo.classList.add("box");

        let imagen = document.createElement("IMG");
        //Caso de que la pelicula no tenga imagen, le pongo una por defecto
        if(datos_json.results[i].poster_path==null){
          // let titulo = document.createElement("P");
          // titulo.textContent = datos_json.results[i].title;
          // articulo.appendChild(titulo);
          imagen.src = "image/b.jpg";        
         
        }else{
          let ima = datos_json.results[i].poster_path;
          imagen.src=IMAGE+ima; 
        }         
        imagen.classList.add("ajustar");
        articulo.appendChild(imagen);
        
        //Obtengo el id para llevarlo a la otra pag
        let sp= document.createElement("P");
        sp.textContent = datos_json.results[i].id;
        sp.style.display = "none";
        articulo.appendChild(sp);              
                 
        fragment.appendChild(articulo);  
      }//for

    galeria.appendChild(fragment);  
        
  })
}//mostrar

document.addEventListener("DOMContentLoaded", masvistas);


//Funcion que borra el contenido de la galeria al realizar una nueva busqueda
const borrar = () => {
  //Si tengo algun mensaje de error lo pongo a vacio
  error.textContent="";
  // console.log(galeria.children.length);
  while(galeria.children.length>0){
    //recorro la galeria y borro su contenido
    for(let i=0; i<galeria.children.length; i++){
      galeria.children[i].remove();
    }//for    
  }//if
}//borrar

//Funcion que me muestra una galeria de peliculas 
const mostrar = () => {
    if(busqueda.value==""){ 
        // console.log("Debes introducir una busqueda");        
        error.textContent = "Debes introducir una busqueda";
    }else{ 

  fetch("https://api.themoviedb.org/3/search/movie?api_key="+KEY+"&language=es&query="+busqueda.value+"&page=1")
  .then(datos => datos.json())   
  .then(datos_json => {
    if(datos_json.results.length==0){
      // console.log(busqueda.value);
      error.textContent = "No se ha encontrado ninguna pelicula con este nombre: "+busqueda.value;
    }else{    
    borrar();        
    // console.log(datos_json);    
    console.log(datos_json.results);
    const fragment = document.createDocumentFragment();
      //Recorro el array que contiene los datos de las peliculas
      for(let i=0; i<datos_json.results.length; i++){
        //console.log(datos_json.results[i].title);        
        let articulo = document.createElement("ARTICLE");
        articulo.classList.add("box");

        let imagen = document.createElement("IMG");
        //Caso de que la pelicula no tenga imagen, le pongo una por defecto
        if(datos_json.results[i].poster_path==null){
          imagen.src = "image/b.jpg";     
        }else{
          let ima = datos_json.results[i].poster_path;
          imagen.src=IMAGE+ima;        
        }         
         imagen.classList.add("ajustar");
       
        articulo.appendChild(imagen);
        //Obtengo el id para llevarlo a la otra pag
        let sp= document.createElement("P");
        sp.textContent = datos_json.results[i].id;
        sp.style.display = "none";
        articulo.appendChild(sp);             
                  
        fragment.appendChild(articulo);  
      }//for

    galeria.appendChild(fragment);    
    }//fin else
    busqueda.focus();
  }) 
}//fin de else
}//mostrar

buscar.addEventListener("click", mostrar);


//Funcion que guarda el identificador de la imagen y redirecciona a otra pag
const clickimg = (event) => {  
  let elemento = event.target;
  if(elemento.nodeName=="IMG"){
    //console.log(elemento.nextSibling.textContent);
    let identificador = elemento.nextSibling.textContent
    //console.log(identificador); 
    //Voy al otro html llevandome el identificador
    location.href="contenido.html?data="+identificador;
  }//if
}//clickimg

galeria.addEventListener("click", clickimg);