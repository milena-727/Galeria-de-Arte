import { signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { auth } from "./firebaselogin.js";

document.addEventListener("DOMContentLoaded", () => {
  const cerrarSesion = document.querySelector("#cerrarSesion");

  if (cerrarSesion) {  // 👈 agregamos esta protección
    cerrarSesion.addEventListener("click", async (e) => {
      e.preventDefault(); // no recargues la página por el <a>

      const confirmacion = confirm("¿Estás segura que quieres cerrar sesión? 🔒✨");

      if (confirmacion) {
        try {
          await signOut(auth);
          console.log("Sesión cerrada exitosamente. 🥳");
          window.location.href = "index.html";
        } catch (error) {
          console.error("Error cerrando sesión: 😭", error);
          alert("Oops, algo falló cerrando sesión. Intenta otra vez 🙈");
        }
      } else {
        console.log("Decidiste quedarte un ratito más 💖");
      }
    });
  }

});
