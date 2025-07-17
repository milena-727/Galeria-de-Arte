import { db } from "./firebaselogin.js";
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Bandera para saber si estamos editando
let modoEdicion = false;
let idActual = null;

// 🛜 Cargar todas las pinturas al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    const querySnapshot = await getDocs(collection(db, "caligrafias"));
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
  <img src="./img/${data.imagen}" class="card-img-top" alt="${data.titulo}" style="width: 270px; height: 170px;">
  <div class="card-body">
    <h5 class="card-title"><strong>${data.titulo}</strong></h5>
    <p class="card-pais"><strong>País:</strong> <span style="font-weight: normal;">${data.pais}</span></p>
    <p class="card-autor"><strong>Autor:</strong> <span style="font-weight: normal;">${data.autor}</span></p>
    <button type="button" class="btn btn-warning btn-editar">Editar</button>
    <button type="button" class="btn btn-danger btn-borrar">Borrar</button>
  </div>
`;

    //document.querySelector(".container-card").appendChild(card);
    // Añadir la card a la fila
    document.querySelector("#container-card-caligrafias").appendChild(card);
}

// ➕ Botón de Agregar Caligrafia
document.addEventListener("DOMContentLoaded", () => {
    const btnAddCard = document.querySelector(".btn-add-caligrafia");
    const formAgregar = document.getElementById("formAgregarCaligrafia");

    btnAddCard.addEventListener("click", () => {
        formAgregar.reset(); // Limpiar form
        modoEdicion = false;
        idActual = null;

        const btnGuardar = document.querySelector("#formAgregarCaligrafia button[type='submit']");
        btnGuardar.textContent = "Guardar Caligrafia";

        const modalLabel = document.querySelector("#agregarCaligrafiaModalLabel");
        modalLabel.textContent = "Agregar Nueva Caligrafia";

        const modalCaligrafia = new bootstrap.Modal(document.getElementById('agregarCaligrafiaModal'));
        modalCaligrafia.show();
    });

    // Guardar (Agregar o Editar)
    formAgregar.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btnGuardar = document.querySelector("#formAgregarCaligrafia button[type='submit']");
        btnGuardar.disabled = true;
        btnGuardar.textContent = modoEdicion ? "Guardando Cambios..." : "Guardando...";

        const nuevaCaligrafia = {
            titulo: document.getElementById("titulo-caligrafia").value.trim(),
            pais: document.getElementById("pais-caligrafia").value.trim(),
            autor: document.getElementById("autor-caligrafia").value.trim(),
            imagen: document.getElementById("imagen-caligrafia").value.trim()
        };

        if (!nuevaCaligrafia.titulo || !nuevaCaligrafia.pais || !nuevaCaligrafia.autor || !nuevaCaligrafia.imagen) {
            alert("Por fa llena todos los campos importantes.");
            btnGuardar.disabled = false;
            btnGuardar.textContent = modoEdicion ? "Guardar Edición" : "Guardar Caligrafia";
            return;
        }

        try {
            if (modoEdicion && idActual) {
                await updateDoc(doc(db, "caligrafias", idActual), nuevaCaligrafia);
                const oldCard = document.querySelector(`[data-id="${idActual}"]`);
                oldCard.remove();
                crearCard(nuevaCaligrafia, idActual);
                console.log("Caligrafia actualizada");
            } else {
                const docRef = await addDoc(collection(db, "caligrafias"), nuevaCaligrafia);
                crearCard(nuevaCaligrafia, docRef.id);
                console.log("Nueva caligrafia agregada");
            }

            const modal = bootstrap.Modal.getInstance(document.getElementById('agregarCaligrafiaModal'));
            modal.hide();
            formAgregar.reset();
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Oops... algo falló 😓");
        } finally {
            btnGuardar.disabled = false;
            btnGuardar.textContent = modoEdicion ? "Guardar Edición" : "Guardar Caligrafia";
            modoEdicion = false;
            idActual = null;
        }
    });
});

// 🧼 Botones de cada card (editar y borrar)
document.querySelector("#container-card-caligrafias").addEventListener("click", async (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const id = card.getAttribute("data-id");

    if (e.target.classList.contains("btn-borrar")) {
        try {
            await deleteDoc(doc(db, "caligrafias", id));
            card.remove();
            console.log("Caligrafia eliminada");
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }

    if (e.target.classList.contains("btn-editar")) {
        abrirModalEdicion(id, card);
    }
});

// ✍️ Editar
function abrirModalEdicion(id, cardElement) {
    const titulo = cardElement.querySelector(".card-title").textContent;
    const pais = cardElement.querySelector(".card-pais span").textContent;
    const autor = cardElement.querySelector(".card-autor span").textContent;
    const imagen = cardElement.querySelector("img").getAttribute("src").replace("./img/", "");

    document.getElementById("titulo-caligrafia").value = titulo;
    document.getElementById("pais-caligrafia").value = pais;
    document.getElementById("autor-caligrafia").value = autor;
    document.getElementById("imagen-caligrafia").value = imagen;

    modoEdicion = true;
    idActual = id;

    const btnGuardar = document.querySelector("#formAgregarCaligrafia button[type='submit']");
    btnGuardar.textContent = "Guardar Edición";

    const modalLabel = document.querySelector("#agregarCaligrafiaModalLabel");
    modalLabel.textContent = "Editar Caligrafia";

    const modal = new bootstrap.Modal(document.getElementById('agregarCaligrafiaModal'));
    modal.show();
}







