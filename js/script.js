
const KEY = "945da0b433d1c512e2248fae93c2da9e";
const IMAGE = "https://image.tmdb.org/t/p/w500";

let galeria = document.getElementById("galeria");
let busqueda = document.getElementById("busqueda");
let buscar = document.getElementById("buscar");

const mostrar = () => {    
  // https://test-es.edamam.com
  // 
  https://www.etnassoft.com/api/v1/get/?id=589
  // fetch("https://api.edamam.com/search?q="+busqueda.value+"&app_id="+APP_ID+"&app_key="+APP_KEY)
   //fetch("https://api.spoonacular.com/recipes/complexSearch?query="+busqueda.value+"&apiKey=1b33379a372d43a0b29fca955c6146c6")
   //fetch("https://foodapi.calorieking.com/v1/foods?query=burger&region=us&fields=$summary,mass&CS-8748")
   fetch("https://api.themoviedb.org/3/search/movie?api_key="+KEY+"&language=es&query="+busqueda.value+"&page=1")
  
   .then(datos => datos.json())   
    .then(datos_json => {
      console.log(datos_json);    //hits
      
      console.log(datos_json.results);
      
      const fragment = document.createDocumentFragment();
      for(let i=0; i<datos_json.results.length; i++){
               //console.log(datos_json.results[i].title);        
               let articulo = document.createElement("ARTICLE");
               articulo.classList.add("box");
               let imagen = document.createElement("IMG");
               let ima = datos_json.results[i].poster_path;
               imagen.src=IMAGE+ima;  
               imagen.classList.add("ajustar");
               articulo.appendChild(imagen);
                let sp= document.createElement("P");
              sp.textContent = datos_json.results[i].id;
              sp.style.display = "none";
              articulo.appendChild(sp);
               
               //let titulo = document.createElement("P");
               //titulo.textContent = `Titulo: ${datos_json.results[i].title}`;
               //articulo.appendChild(titulo);
               let popularidad = document.createElement("P");
               popularidad.textContent = `Popularidad: ${datos_json.results[i].popularity}`;
               articulo.appendChild(popularidad);
             fragment.appendChild(articulo);  
      }

      galeria.appendChild(fragment);
      galeria.style.display="flex";
    
})
}


buscar.addEventListener("click", mostrar);

const clickimg = (event) => {   
  //si es una imagen
  let elemento = event.target;

  if(elemento.nodeName=="IMG"){
    //console.log(elemento.nextSibling.textContent);
    let identificador = elemento.nextSibling.textContent
    console.log(identificador);
 
      //me voy al otro html llevandome el identificador
    location.href="contenido.html?data="+identificador;
   
   //let id = getParameterByName('data');;
  //console.log(id);

  //ruta de cada id
  //https://api.themoviedb.org/3/movie/"+identificador+"?api_key="+KEY;
  //fetch("https://api.themoviedb.org/3/movie/"+identificador+"?api_key="+KEY)  
  //.then(datos => datos.json())   
   //.then(datos_json => {
   
   //  console.log(datos_json); 


         
//})//fin fetch

   }//if
}

galeria.addEventListener("click", clickimg);