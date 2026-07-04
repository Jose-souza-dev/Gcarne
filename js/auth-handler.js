import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Configurações do Firebase (Recuperadas do seu projeto)
const firebaseConfig = {
  apiKey: "AIzaSyDl1xc8pNFKO0ntbwitBFN0wVM2qAHtaSU",
  authDomain: "authentic-32ad2.firebaseapp.com",
  projectId: "authentic-32ad2",
  storageBucket: "authentic-32ad2.firebasestorage.app",
  messagingSenderId: "889249025251",
  appId: "1:889249025251:web:2502a96379d529246c89d6"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// --- FUNÇÕES DE AUTENTICAÇÃO ---

// 1. Login com Google
export const loginGoogle = async () => {
    console.log("Iniciando login com Google...");
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Sucesso no login:", result.user);
        window.location.href = "criar_carne.html";
    } catch (error) {
        console.error("Erro detalhado do Google:", error);
        alert("Erro ao entrar com Google: " + error.message);
    }
};

// 2. Login com E-mail e Senha
export const loginEmail = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "criar_carne.html";
    } catch (error) {
        console.error("Erro E-mail:", error);
        alert("E-mail ou senha incorretos.");
    }
};

// 3. Logout
export const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = "login.html";
    } catch (error) {
        console.error("Erro ao sair:", error);
    }
};

// --- EVENTOS DE INTERFACE ---

document.addEventListener("DOMContentLoaded", () => {
    console.log("Auth Handler carregado e pronto.");

    // Botão Google
    const btnGoogle = document.querySelector(".btn-google");
    if (btnGoogle) {
        btnGoogle.addEventListener("click", (e) => {
            e.preventDefault();
            loginGoogle();
        });
    }

    // Botão Sair (Geral)
    const btnLogout = document.querySelector("#btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    }

    // Botão Sair específico da página de acesso
    const btnLogoutAcesso = document.querySelector("#btn-logout-acesso");
    if (btnLogoutAcesso) {
        btnLogoutAcesso.addEventListener("click", (e) => {
            e.preventDefault();
            logout();
        });
    }
});

// --- MONITOR DE ESTADO E SEGURANÇA ---
onAuthStateChanged(auth, (user) => {
    const path = window.location.pathname;
    const isLoginPage = path.includes("login.html") || path.endsWith("/");
    const isCreatePage = path.includes("criar_carne.html");
    const isAccessPage = path.includes("acesso.html");

    // Verifica se o usuário já validou o código de acesso
    const hasAccess = localStorage.getItem('gcarne_access_token') === 'valid_user';

    if (user) {
        console.log("Usuário logado:", user.email);

        if (!hasAccess) {
            // Se está logado mas não tem código, só pode ficar na página de acesso
            if (!isAccessPage) {
                window.location.href = "acesso.html";
            }
        } else {
            // Se tem acesso e está na login ou acesso, vai para a criação
            if (isLoginPage || isAccessPage) {
                window.location.href = "criar_carne.html";
            }
        }
    } else {
        console.log("Nenhum usuário logado.");
        // Se não está logado, só pode ficar na login
        if (isCreatePage || isAccessPage) {
            window.location.href = "login.html";
        }
    }
});
