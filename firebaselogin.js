// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5U9wGej1E0Kf9_RfdUWeJF4ZpJoZUfAU",
  authDomain: "fir-login-d6340.firebaseapp.com",
  projectId: "fir-login-d6340",
  storageBucket: "fir-login-d6340.appspot.com",
  messagingSenderId: "418308543440",
  appId: "1:418308543440:web:770fac88bd5bac1a215fd5"
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar auth para usarlo en otros archivos
export const auth = getAuth(app);

// Exportar db para usarlo en otros archivos
export const db = getFirestore(app);

console.log("👉 Firebase conectado:", db);







