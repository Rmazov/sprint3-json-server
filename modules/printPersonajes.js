export const printCardsPersonajes = (contenedor, arrayPropiedades) => {
    contenedor.innerHTML = "";

    arrayPropiedades.forEach(propiedad => {
        const article = document.createElement("article");
        article.classList.add("main__card");
        article.innerHTML = `
        
                <figure class="card__image">
                    <img id=${propiedad.id} src=${propiedad.image} alt="${propiedad.name}" class="card__img">
                </figure>
               
                
                <button class="card__delete" name='${propiedad.id}'>❌</button>
                <button class="card__edit" name='${propiedad.id}'>✏</button>
                <button class="card__favorite" name='${propiedad.id}'>❤</button>
                
                <h4 class="card__tipo">${propiedad.ubicacion}</h4>
                <h4 class="card__name">${propiedad.tipoInnmueble}</h4>
                <h4 class="card__valor">${propiedad.Precio}</h4>
        `;

        contenedor.appendChild(article);
    });
};