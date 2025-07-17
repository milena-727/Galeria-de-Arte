import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
import { auth } from "./firebaselogin.js"
import { showMessage } from "./showMessage.js"

const googleButton = document.querySelector("#googleLogin");

// 🛡️ Correos autorizados para acceder como admin
const correosAdmins = [
  "galeria7@galeria.com",
  "user@user.com",
  "galeriashinobi7@gmail.com"
];

if (googleButton) {
  googleButton.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();

    try {
      const credentials = await signInWithPopup(auth, provider);
      const userEmail = credentials.user.email;

      if (correosAdmins.includes(userEmail)) {
        showMessage("Inicio exitoso como admin: " + credentials.user.displayName, "success");
        window.location.href = "admin.html"; // ✅ Solo admins pueden entrar
      } else {
        showMessage("No tienes permiso para entrar como administradora", "error");
        await auth.signOut(); // 🚪 Cierra sesión de inmediato
      }

    } catch (error) {
      console.log("Error al iniciar sesión con Google:", error);
      showMessage("Error al iniciar con Google: " + error.message, "error");
    }
  });
}


















