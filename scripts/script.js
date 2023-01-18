

import getDataFetch from "../helpers/getData.js";
import deleteDataFetch from "../helpers/deleteData.js";
import {
  btnCategoryFilters,
  btnCategoryFilters2,
} from "../modules/btnCategoryFilters.js";
import { getCategoryFilter } from "../modules/getCategoryFilter.js";
import { printCardsPersonajes } from "../modules/printPersonajes.js";
import postDataFetch from "../helpers/postData.js";

// const dataJson = JSON.stringify(incorrectDataJSON);
// console.log(dataJson);
// console.log(typeof dataJson);

const urlPropiedades = "http://localhost:3000/propiedades";
const urlFavoritos = "http://localhost:3000/favoritos";
let propiedades = [];

const contenedorPropiedades = document.getElementById("contenedorCards");

//-----Capturando el input de búsqueda
const search = document.getElementById("search");

//-----Botones de filtrado--------

//------Capturar el primer conjunto de botones-----
const botonAll = document.getElementById("all");
const botonAndroide = document.getElementById("androide");
const botonHumano = document.getElementById("human");

//Colocamos todos estos botones en un array
const arrayBotones = [botonAll, botonAndroide, botonHumano];

document.addEventListener("DOMContentLoaded", async () => {
  sessionStorage.removeItem("propiedadesDetails");
  sessionStorage.removeItem("propiedadesDetails");
  try {
    propiedades = await getDataFetch(urlPropiedades);
    console.log("linea44", contenedorPropiedades);

    printCardsPersonajes(contenedorPropiedades, propiedades);
    //Ejecutamos la función que nos permite filtrar x categoría
    btnCategoryFilters(arrayBotones, propiedades, contenedorPropiedades);
    //   printCardsPersonajes(contenedorPropiedades, filtros);

    //----Funcionalidad al segundo conjunto de botones
    const parcialCategories = getCategoryFilter(propiedades);
    const categories = ["all2", ...parcialCategories];
    //console.log(categories);
    btnCategoryFilters2(categories, propiedades, contenedorPropiedades);
    
  } catch (error) {
    console.log(error);
    
  }
});

document.addEventListener("click", async ({ target }) => {
  //Funcionalidad de ir a detalles del personaje
  console.log(target);
  if (target.classList.contains("card__img")) {
   
    sessionStorage.setItem("propiedadesDetails", JSON.stringify(target.id));
    location.href = "./pages/propiedadDetails.html";
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
        const idPropiedadDelete = parseInt(target.name);
        const urlDelete = `${urlPropiedades}/${idPropiedadDelete}`;

        try {
          await deleteDataFetch(urlDelete);
          propiedades = await getDataFetch(urlPropiedades);
          printCardsPersonajes(contenedorPropiedades, propiedades);
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
    location.href = "./pages/formPropiedad.html";
  }

  //Para agregar a favoritos
  if (target.classList.contains("card__favorite")) {
    const idFavorito = target.name;
    const urlPropiedadFavorito = `${urlFavoritos}?id=${idFavorito}`;

    const favorito = await getDataFetch(urlPropiedadFavorito);
    //Obtenemos el objeto
    const favoritePropiedad = await getDataFetch(
      `${urlPropiedades}/${idFavorito}`
    );
    if (favorito.length === 0 && Object.entries(favoritePropiedad).length) {
      await postDataFetch(urlFavoritos, favoritePropiedad);
      const data = await getDataFetch(urlFavoritos);
      console.log(data);
    }
  }
});

//filtro buscar

search.addEventListener("submit", async (event) => {
  //.preventDefault() evita que ocurra la acción que viene asociada al submit por defecto (la recarga de la página)
  event.preventDefault();
  try {
    let inputVal = document.getElementById("inputId").value;
    sessionStorage.setItem("searchBottom", JSON.stringify(inputVal));

    let tipoInnmueble = document.getElementById("tipoInnmueble").value;
    sessionStorage.setItem("searchBottom", JSON.stringify(tipoInnmueble));
    const datosPropiedades = await getDataFetch(urlPropiedades);
    if (inputVal && tipoInnmueble) {

      const resultadoBusquedaUbica = datosPropiedades.filter((person) =>
        person.ubicacion.toLowerCase().includes(inputVal.toLowerCase())
      );
      const resultadoBusquedaTipo = resultadoBusquedaUbica.filter((person) =>
        person.tipoInnmueble.toLowerCase().includes(tipoInnmueble.toLowerCase())
      );

      printCardsPersonajes(contenedorPropiedades, resultadoBusquedaTipo);
    }
    if (inputVal && !tipoInnmueble) {

      const resultadoBusquedaUbica = datosPropiedades.filter((person) =>
        person.ubicacion.toLowerCase().includes(inputVal.toLowerCase())
      );
      printCardsPersonajes(contenedorPropiedades, resultadoBusquedaUbica);
    }

    if (!inputVal && tipoInnmueble) {
      console.log("aca entro hola");
      const resultadoBusquedaTipo = datosPropiedades.filter((person) =>
        person.tipoInnmueble.toLowerCase().includes(tipoInnmueble.toLowerCase())
      );
      printCardsPersonajes(contenedorPropiedades, resultadoBusquedaTipo);
    }
  } catch (error) {
    console.log(error);
  }


});