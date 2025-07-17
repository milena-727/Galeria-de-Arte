import { db } from "../app/firebaselogin.js";
import { collection,  getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// 🛜 Cargar todas las ilustraciones al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    const querySnapshot = await getDocs(collection(db, "colecciones"));
    querySnapshot.forEach(docSnap => {
        crearCard(docSnap.data(), docSnap.id);
    });
});

// 🎴 Función para crear una card
function crearCard(data, id) {
    const card = document.createElement('div');
    card.className = 'card col-md-3 m-2'; // Coloca cada card en 4 columnas (12/3=4 por columna)
    card.className = 'card m-2';
    card.style.width = '18rem';
    card.setAttribute('data-id', id);

    card.innerHTML = `
  <img src="../img/${data.imagen}" class="card-img-top" alt="${data.titulo}" style="width: 270px; height: 170px;">
  <div class="card-body">
    <h5 class="card-title"><strong>${data.titulo}</strong></h5>
    <p class="card-text" style="font-weight: normal;">${data.descripcion}</p>
    <p class="card-tipo"><strong>Tipo:</strong> <span style="font-weight: normal;">${data.tipo}</span></p>
    <p class="card-pais"><strong>País:</strong> <span style="font-weight: normal;">${data.pais}</span></p>
    <p class="card-autor"><strong>Autor:</strong> <span style="font-weight: normal;">${data.autor}</span></p>
  </div>
`;

    //document.querySelector(".container-card").appendChild(card);
    // Añadir la card a la fila
    document.querySelector("#container-card").appendChild(card);
}
