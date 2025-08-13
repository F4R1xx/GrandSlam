// firebase.js

// Funções necessárias dos SDKs do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAfOkIBpZ4jhZrB_0g7iAxpISJbTx6-1p0",
    authDomain: "grandslam-40d42.firebaseapp.com",
    databaseURL: "https://grandslam-40d42-default-rtdb.firebaseio.com",
    projectId: "grandslam-40d42",
    storageBucket: "grandslam-40d42.firebasestorage.app",
    messagingSenderId: "988717988540",
    appId: "1:988717988540:web:f78c0b885b0954417f2eb9"
};

// Inicializa o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// Obtém e exporta os serviços de Autenticação e Realtime Database
export const auth = getAuth(app);
export const db = getDatabase(app);

// Cria e exporta o provedor de autenticação do Google
export const googleProvider = new GoogleAuthProvider();
