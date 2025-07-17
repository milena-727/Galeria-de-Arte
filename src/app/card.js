import { db } from "./firebaselogin.js";
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Bandera para saber si estamos editando
let modoEdicion = false;
let idActual = null;

// 🛜 Cargar ilustraciones al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    const querySnapshot = await getDocs(collection(db, "colecciones"));
    querySnapshot.forEach(docSnap => {
        crearCard(docSnap.data(), docSnap.id);
    });
});

// 🎴 Crear una card
function crearCard(data, id) {
    const card = document.createElement('div');
    card.className = 'card m-2';
    card.style.width = '18rem';
    card.setAttribute('data-id', id);

    card.innerHTML = `
        <img src="./img/${data.imagen}" class="card-img-top" alt="${data.titulo}" style="width: 270px; height: 170px;">
        <div class="card-body">
            <h5 class="card-title"><strong>${data.titulo}</strong></h5>
            <p class="card-text" style="font-weight: normal;">${data.descripcion}</p>
            <p class="card-tipo"><strong>Tipo:</strong> <span style="font-weight: normal;">${data.tipo}</span></p>
            <p class="card-pais"><strong>País:</strong> <span style="font-weight: normal;">${data.pais}</span></p>
            <p class="card-autor"><strong>Autor:</strong> <span style="font-weight: normal;">${data.autor}</span></p>
            <button type="button" class="btn btn-warning btn-editar">Editar</button>
            <button type="button" class="btn btn-danger btn-borrar">Borrar</button>
        </div>
    `;

    document.querySelector("#container-card").appendChild(card);
}

// ➕ Botón de Agregar Ilustración
document.addEventListener("DOMContentLoaded", () => {
    const btnAddCard = document.querySelector(".btn-add-ilustracion");
    const formAgregar = document.getElementById("formAgregarIlustracion");

    btnAddCard.addEventListener("click", () => {
        formAgregar.reset(); // Limpiar form
        modoEdicion = false;
        idActual = null;

        const btnGuardar = document.querySelector("#formAgregarIlustracion button[type='submit']");
        btnGuardar.textContent = "Guardar Ilustración";

        const modalLabel = document.querySelector("#agregarIlustracionModalLabel");
        modalLabel.textContent = "Agregar Nueva Ilustración";

        const modalIlustracion = new bootstrap.Modal(document.getElementById('agregarIlustracionModal'));
        modalIlustracion.show();
    });

    // Guardar (Agregar o Editar)
    formAgregar.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btnGuardar = document.querySelector("#formAgregarIlustracion button[type='submit']");
        btnGuardar.disabled = true;
        btnGuardar.textContent = modoEdicion ? "Guardando Cambios..." : "Guardando...";

        const nuevaIlustracion = {
            titulo: document.getElementById("titulo").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            tipo: document.getElementById("tipo").value.trim(),
            pais: document.getElementById("pais").value.trim(),
            autor: document.getElementById("autor").value.trim(),
            imagen: document.getElementById("imagen").value.trim()
        };

        if (!nuevaIlustracion.titulo || !nuevaIlustracion.descripcion || !nuevaIlustracion.imagen) {
            alert("Por fa llena todos los campos importantes.");
            btnGuardar.disabled = false;
            btnGuardar.textContent = modoEdicion ? "Guardar Edición" : "Guardar Ilustración";
            return;
        }

        try {
            if (modoEdicion && idActual) {
                await updateDoc(doc(db, "colecciones", idActual), nuevaIlustracion);
                const oldCard = document.querySelector(`[data-id="${idActual}"]`);
                oldCard.remove();
                crearCard(nuevaIlustracion, idActual);
                console.log("Ilustración actualizada");
            } else {
                const docRef = await addDoc(collection(db, "colecciones"), nuevaIlustracion);
                crearCard(nuevaIlustracion, docRef.id);
                console.log("Nueva ilustración agregada");
            }

            const modal = bootstrap.Modal.getInstance(document.getElementById('agregarIlustracionModal'));
            modal.hide();
            formAgregar.reset();
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Oops... algo falló 😓");
        } finally {
            btnGuardar.disabled = false;
            btnGuardar.textContent = modoEdicion ? "Guardar Edición" : "Guardar Ilustración";
            modoEdicion = false;
            idActual = null;
        }
    });
});

// 🧼 Botones de cada card (editar y borrar)
document.querySelector("#container-card").addEventListener("click", async (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const id = card.getAttribute("data-id");

    if (e.target.classList.contains("btn-borrar")) {
        try {
            await deleteDoc(doc(db, "colecciones", id));
            card.remove();
            console.log("Ilustración eliminada");
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
    const descripcion = cardElement.querySelector(".card-text").textContent;
    const tipo = cardElement.querySelector(".card-tipo span").textContent;
    const pais = cardElement.querySelector(".card-pais span").textContent;
    const autor = cardElement.querySelector(".card-autor span").textContent;
    const imagen = cardElement.querySelector("img").getAttribute("src").replace("./img/", "");

    document.getElementById("titulo").value = titulo;
    document.getElementById("descripcion").value = descripcion;
    document.getElementById("tipo").value = tipo;
    document.getElementById("pais").value = pais;
    document.getElementById("autor").value = autor;
    document.getElementById("imagen").value = imagen;

    modoEdicion = true;
    idActual = id;

    const btnGuardar = document.querySelector("#formAgregarIlustracion button[type='submit']");
    btnGuardar.textContent = "Guardar Edición";

    const modalLabel = document.querySelector("#agregarIlustracionModalLabel");
    modalLabel.textContent = "Editar Ilustración";

    const modal = new bootstrap.Modal(document.getElementById('agregarIlustracionModal'));
    modal.show();
}








