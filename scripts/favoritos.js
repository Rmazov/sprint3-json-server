import getDataFetch from "../helpers/getData.js";
import { printCardsPersonajes } from "../modules/printPersonajes.js";
import deleteDataFetch from "../helpers/deleteData.js";

const urlFavoritos = "http://localhost:3000/favoritos";
const contenedor = document.getElementById("contenedorCards");


document.addEventListener('DOMContentLoaded', async() => {
    console.log(contenedor);
    const favoritos = await getDataFetch(urlFavoritos);
    console.log("",favoritos);
    printCardsPersonajes(contenedor, favoritos);
})

document.addEventListener("click", async ({ target }) => {
    //Funcionalidad de ir a detalles del personaje
    console.log("hola",target);
    if (target.classList.contains("card__img")) {
      
      sessionStorage.setItem("propiedadesDetails", JSON.stringify(target.id));
      location.href = "../pages/propiedadDetails.html";
    }
    //Funcionalidad de eliminar un personaje
    if (target.classList.contains("card__delete")) {
      Swal.fire({
        title: "¿Está usted seguro de eliminar?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          const idPropiedadesDelete = parseInt(target.name);
          const urlDelete = `${urlFavoritos}/${idPropiedadesDelete}`;
  
          try {
            await deleteDataFetch(urlDelete);
            personajes = await getDataFetch(urlFavoritos);
            printCardsPersonajes(contenedorPersonajes, personajes);
          } catch (error) {
            console.log("No se pudo eliminar hay un error" + error);
          }
        }
      });
    }
  
    //Inicio de la funcionalidad de edición
  
    if (target.classList.contains("card__edit")) {
      console.log(target.name);
      sessionStorage.setItem("propiedadesDetails", JSON.stringify(target.name));
      location.href = "../pages/formPropiedad.html";
    }
  
    //Para agregar a favoritos
    if (target.classList.contains("card__favorite")) {
     
      const idFavorito = target.name;
      const urlPropiedadesFavorito = `${urlFavoritos}?id=${idFavorito}`;
  
      const favorito = await getDataFetch(urlPropiedadesFavorito);
      //Obtenemos el objeto
      const favoritePropiedad = await getDataFetch(
        `${urlFavoritos}/${idFavorito}`
      );
      if (favorito.length === 0 && Object.entries(favoritePropiedad).length) {
        await postDataFetch(urlFavoritos, favoritePropiedad);
        const data = await getDataFetch(urlFavoritos);
        console.log(data);
      }
    }
  });