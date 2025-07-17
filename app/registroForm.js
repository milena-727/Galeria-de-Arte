// archivo: src/app/registroForm.js

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
import { auth } from "./firebaselogin.js"
import { showMessage } from "./showMessage.js"

document.addEventListener("DOMContentLoaded", () => {
  const registroForm = document.querySelector("#registroForm")

  if (registroForm) {  // Verifica si el formulario existe
    registroForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = registroForm["email"].value;
      const password = registroForm["password"].value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        showMessage("Cuenta creada: " + userCredential.user.email);
        console.log("Usuario registrado:", userCredential.user);

        // Cerrar el modal (si estás usando Bootstrap)
        const modal = bootstrap.Modal.getInstance(document.getElementById("registroModal"));
        modal.hide();
      } catch (error) {
        showMessage("Error: " + error.message, "error");
      } finally {
        registroForm.reset();
      }
    });
  }
});











