// archivo: src/app/iniciarSesion.js

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
import { auth } from "./firebaselogin.js"
import { showMessage } from "./showMessage.js"

const correosAdmins = [
  "galeria7@galeria.com",
  "user@user.com"
];

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm")

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = loginForm["email"].value
    const password = loginForm["password"].value

    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password)
      const correoIngresado = credentials.user.email

      if (correosAdmins.includes(correoIngresado)) {
        showMessage("Inicio exitoso como administradora 🌸")
        console.log("ADMIN ha iniciado sesión:", correoIngresado)

        window.location.href = "admin.html"
      } else {
        showMessage("No tienes permisos para administrar ❌", "error")
        console.warn("Intento de acceso no autorizado por:", correoIngresado)

        // Puedes cerrar sesión para que no quede logueado
        auth.signOut()
      }

    } catch (error) {
      if (error.code === "auth/wrong-password") {
        showMessage("Contraseña incorrecta", "error")
      } else if (error.code === "auth/user-not-found") {
        showMessage("Usuario no encontrado", "error")
      } else {
        showMessage("Error: " + error.message, "error")
      }
    } finally {
      loginForm.reset()
      loginForm["email"].focus()
    }
  })
})


