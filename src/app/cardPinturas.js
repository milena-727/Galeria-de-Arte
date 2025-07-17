import { db } from "./firebaselogin.js";
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Bandera para saber si estamos editando
let modoEdicion = false;
let idActual = null;

// 🛜 Cargar todas las pinturas al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    const querySnapshot = await getDocs(collection(db, "pinturas"));
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
    <p class="card-añoCreacion"><strong>Año de Creación:</strong> <span style="font-weight: normal;">${data.año}</span></p>
    <p class="card-pais"><strong>País:</strong> <span style="font-weight: normal;">${data.pais}</span></p>
    <p class="card-autor"><strong>Autor:</strong> <span style="font-weight: normal;">${data.autor}</span></p>
    <button type="button" class="btn btn-warning btn-editar">Editar</button>
    <button type="button" class="btn btn-danger btn-borrar">Borrar</button>
  </div>
`;

    //document.querySelector(".container-card").appendChild(card);
    // Añadir la card a la fila
    document.querySelector("#container-card-pinturas").appendChild(card);
}

// ➕ Botón de Agregar Pinturas
document.addEventListener("DOMContentLoaded", () => {
    const btnAddCard = document.querySelector(".btn-add-pintura");
    const formAgregar = document.getElementById("formAgregarPintura");

    btnAddCard.addEventListener("click", () => {
        formAgregar.reset(); // Limpiar form
        modoEdicion = false;
        idActual = null;

        const btnGuardar = document.querySelector("#formAgregarPintura button[type='submit']");
        btnGuardar.textContent = "Guardar Pintura";

        const modalLabel = document.querySelector("#agregarPinturaModalLabel");
        modalLabel.textContent = "Agregar Nueva Pintura";

        const modalPintura = new bootstrap.Modal(document.getElementById('agregarPinturaModal'));
        modalPintura.show();
    });

    // Guardar (Agregar o Editar)
    formAgregar.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btnGuardar = document.querySelector("#formAgregarPintura button[type='submit']");
        btnGuardar.disabled = true;
        btnGuardar.textContent = modoEdicion ? "Guardando Cambios..." : "Guardando...";

        const nuevaPintura = {
            titulo: document.getElementById("titulo-pintura").value.trim(),
            año: document.getElementById("añoCreacion").value.trim(),
            pais: document.getElementById("pais-pintura").value.trim(),
            autor: document.getElementById("autor-pintura").value.trim(),
            imagen: document.getElementById("imagen-pintura").value.trim()
        };

        if (!nuevaPintura.titulo || !nuevaPintura.pais || !nuevaPintura.autor || !nuevaPintura.imagen) {
            alert("Por fa llena todos los campos importantes.");
            btnGuardar.disabled = false;
            btnGuardar.textContent = modoEdicion ? "Guardar Edición" : "Guardar Pintura";
            return;
        }

        try {
            if (modoEdicion && idActual) {
                await updateDoc(doc(db, "pinturas", idActual), nuevaPintura);
                const oldCard = document.querySelector(`[data-id="${idActual}"]`);
                oldCard.remove();
                crearCard(nuevaPintura, idActual);
                console.log("Pintura actualizada");
            } else {
                const docRef = await addDoc(collection(db, "pinturas"), nuevaPintura);
                crearCard(nuevaPintura, docRef.id);
                console.log("Nueva pintura agregada");
            }

            const modal = bootstrap.Modal.getInstance(document.getElementById('agregarPinturaModal'));
            modal.hide();
            formAgregar.reset();
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Oops... algo falló 😓");
        } finally {
            btnGuardar.disabled = false;
            btnGuardar.textContent = modoEdicion ? "Guardar Edición" : "Guardar Pintura";
            modoEdicion = false;
            idActual = null;
        }
    });
});

// 🧼 Botones de cada card (editar y borrar)
document.querySelector("#container-card-pinturas").addEventListener("click", async (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const id = card.getAttribute("data-id");

    if (e.target.classList.contains("btn-borrar")) {
        try {
            await deleteDoc(doc(db, "pinturas", id));
            card.remove();
            console.log("Pintura eliminada");
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
    const año = cardElement.querySelector(".card-añoCreacion span").textContent;
    const pais = cardElement.querySelector(".card-pais span").textContent;
    const autor = cardElement.querySelector(".card-autor span").textContent;
    const imagen = cardElement.querySelector("img").getAttribute("src").replace("./img/", "");

    document.getElementById("titulo-pintura").value = titulo;
    document.getElementById("añoCreacion").value = año;
    document.getElementById("pais-pintura").value = pais;
    document.getElementById("autor-pintura").value = autor;
    document.getElementById("imagen-pintura").value = imagen;

    modoEdicion = true;
    idActual = id;

    const btnGuardar = document.querySelector("#formAgregarPintura button[type='submit']");
    btnGuardar.textContent = "Guardar Edición";

    const modalLabel = document.querySelector("#agregarPinturaModalLabel");
    modalLabel.textContent = "Editar Pintura";

    const modal = new bootstrap.Modal(document.getElementById('agregarPinturaModal'));
    modal.show();
}







