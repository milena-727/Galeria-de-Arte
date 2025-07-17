const slider = document.querySelector(".sliderArtistas"); // nombre correcto
const flechaIzquierda = document.querySelector(".flecha-izquierda");
const flechaDerecha = document.querySelector(".flecha-derecha");

// Movimiento del slider con botones
flechaIzquierda.addEventListener("click", () => {
    slider.scrollBy({ left: -250, behavior: "smooth" });
});

flechaDerecha.addEventListener("click", () => {
    slider.scrollBy({ left: 350, behavior: "smooth" });
});

// Modal de "Saber más"
const modal = document.getElementById("modal-artista"); // Correcto
const modalImg = document.getElementById("modal-img-artista");
const modalDesc = document.getElementById("modal-desc");
const cerrar = document.querySelector(".cerrar");

// Ojo: busca todas las tarjetas y botones
const tarjetas = document.querySelectorAll(".card-artistas");
const botones = document.querySelectorAll(".saber-mas-btn");

botones.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        const img = tarjetas[i].querySelector("img").src;
        const nombre = tarjetas[i].querySelectorAll("p")[0].innerText;
        const pais = tarjetas[i].querySelectorAll("p")[1].innerText;
        const estilo = tarjetas[i].querySelectorAll("p")[2].innerText;
        const descripcion = tarjetas[i].querySelector(".descripcion")?.innerText || "Sin descripción disponible";


        modal.style.display = "flex";
        modalImg.src = img;
        modalDesc.innerHTML = `
            <p><strong>${nombre}</strong></p>
            <p><strong>${pais}</strong></p>
            <p><strong>${estilo}</strong></p>
            <br>
            <p>${descripcion}</p>
`;

    });
});

cerrar.addEventListener("click", () => {
    modal.style.display = "none";
});
