import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDl1xc8pNFKO0ntbwitBFN0wVM2qAHtaSU",
  authDomain: "authentic-32ad2.firebaseapp.com",
  projectId: "authentic-32ad2",
  storageBucket: "authentic-32ad2.firebasestorage.app",
  messagingSenderId: "889249025251",
  appId: "1:889249025251:web:2502a96379d529246c89d6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// --- FUNÇÕES DE AUTENTICAÇÃO ---

export const logout = async () => {
    try {
        // Limpa a chave de acesso do código
        localStorage.removeItem('gcarne_access_token');
        // Faz logout no Firebase
        await signOut(auth);
        console.log("Logout realizado com sucesso");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Erro ao sair:", error);
    }
};

// --- CAPTURA DE CLIQUES GLOBAL ---
document.addEventListener("click", (e) => {
    // Verifica se clicou no botão de login com Google
    if (e.target.closest(".btn-google")) {
        e.preventDefault();
        signInWithPopup(auth, provider).catch(err => alert("Erro no login: " + err.message));
    }

    // Verifica se clicou em qualquer botão de sair (pelo ID)
    if (e.target.id === "btn-logout" || e.target.id === "btn-logout-acesso") {
        e.preventDefault();
        logout();
    }
});

// --- MONITOR DE ESTADO E SEGURANÇA ---
onAuthStateChanged(auth, (user) => {
    const path = window.location.pathname;
    const isLoginPage = path.includes("login.html") || path.endsWith("/Gcarne/") || path.endsWith("/");
    const isCreatePage = path.includes("criar_carne.html");
    const isAccessPage = path.includes("acesso.html");

    const hasAccess = localStorage.getItem('gcarne_access_token') === 'valid_user';

    if (user) {
        if (!hasAccess) {
            if (!isAccessPage) window.location.href = "acesso.html";
        } else {
            if (isLoginPage || isAccessPage) window.location.href = "criar_carne.html";
        }
    } else {
        if (isCreatePage || isAccessPage) window.location.href = "login.html";
    }
});
