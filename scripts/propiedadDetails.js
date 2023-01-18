import getDataFetch from "../helpers/getData.js";

//Obtener el id del personaje guardado en el sessionStorage
const idPropiedadStr = sessionStorage.getItem("propiedadesDetails")
  ? JSON.parse(sessionStorage.getItem("propiedadesDetails"))
  : null;

const idPropiedad = idPropiedadStr ? parseInt(idPropiedadStr) : null;



//Obtener la información de este personaje realizando una petición GET

const urlPropiedad = `http://localhost:3000/propiedades/${idPropiedad}`;

const title = document.querySelector(".title");
const container = document.querySelector(".main");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const propiedad = await getDataFetch(urlPropiedad);

    title.innerText = `Página de detalles de ${propiedad.name}`;
    //2. Insertar la información
    container.innerHTML = `
        <figure class="main__figure">
            <img src="${propiedad.image}" alt="${propiedad.name}">
         
        </figure>
        <ol>    
                  
            <li>Nombre:  ${propiedad.name}</li>
            <li>Ubicacion:  ${propiedad.ubicacion} </li>
            <li>Área total en metros cuadrados:  ${propiedad.area} </li>
            <li>habitaciones:  ${propiedad.habitaciones} </li>
            <li>Baños:  ${propiedad.baños} </li>
            <li>Tipo Innmueble:  ${propiedad.tipoInnmueble} </li>
            <li>Negocio:  ${propiedad.tipoAcuerdo} </li>
            <li>Precio:  ${propiedad.Precio} </li>
            <li>Número de habitaciones Parqueaderos:  ${propiedad.nParqueaderos} </li>
            <li>Nombre Propietario:   ${propiedad.propietarioNombre} </li>
            <li>Celular Propietario:  ${propiedad.propietarioCeluar} </li>
            <li>Descripción:  ${propiedad.descripción} </li>
        </ol>
`;
  } catch (error) {
    console.log(error);
    alert(error);
  }
});
