import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { auth } from "./app/firebaselogin.js";
import { loginCheck } from "./app/loginCheck.js";

import "./app/registroForm.js";
import "./app/googleLogin.js";
import "./app/cerrarSesion.js";
import "./app/loginCheck.js";


onAuthStateChanged(auth, async (user) => {
  loginCheck(user);

  if (!user && window.location.pathname.endsWith("admin.html")) {
    window.location.href = "login.html";
  }
});