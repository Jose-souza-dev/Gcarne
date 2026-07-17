import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// --- FUNÇÕES DE AUTENTICAÇÃO ---

export const logout = async () => {
    try {
        localStorage.removeItem('gcarne_access_token');
        await signOut(auth);
        window.location.href = "login.html";
    } catch (error) {
        console.error("Erro ao sair:", error);
    }
};

// --- CAPTURA DE CLIQUES GLOBAL ---
document.addEventListener("click", (e) => {
    if (e.target.closest(".btn-google")) {
        e.preventDefault();
        signInWithPopup(auth, provider).catch(err => alert("Erro no login: " + err.message));
    }

    if (e.target.id === "btn-logout" || e.target.id === "btn-logout-acesso") {
        e.preventDefault();
        logout();
    }
});

// --- MONITOR DE ESTADO E SEGURANÇA ---
onAuthStateChanged(auth, async (user) => {
    const path = window.location.pathname;
    const isLoginPage = path.includes("login.html") || path.endsWith("/Gcarne/") || path.endsWith("/");
    const isCreatePage = path.includes("criar_carne.html");
    const isAccessPage = path.includes("acesso.html");

    let hasAccess = localStorage.getItem('gcarne_access_token') === 'valid_user';

    if (user) {
        if (!hasAccess) {
            console.log("Verificando vínculo de e-mail no banco de dados...");
            try {
                const colecoes = ["codigo", "codigos"];
                let vinculado = false;

                for (const colName of colecoes) {
                    const q = query(collection(db, colName), where("email_vinculado", "==", user.email), where("ativo", "==", true));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        vinculado = true;
                        break;
                    }
                }

                if (vinculado) {
                    localStorage.setItem('gcarne_access_token', 'valid_user');
                    hasAccess = true;
                }
            } catch (error) {
                console.error("Erro ao verificar vínculo:", error);
            }
        }

        if (!hasAccess) {
            if (!isAccessPage) window.location.href = "acesso.html";
        } else {
            if (isLoginPage || isAccessPage) window.location.href = "criar_carne.html";
        }
    } else {
        if (isCreatePage || isAccessPage) window.location.href = "login.html";
    }
});
