// assets/js/auth.js

console.log("Système de sécurité chargé...");

// 1. On cible le formulaire
const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

// 2. Les utilisateurs par défaut (Donnés par le prof)
const USERS = [
    {
        email: "admin@app.com",
        password: "admin123",
        role: "admin",
        name: "Commandant Shepard"
    },
    {
        email: "user@app.com",
        password: "user123",
        role: "user",
        name: "Lieutenant Ripley"
    }
];

// 3. Écouter la soumission du formulaire
if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche la page de se recharger

        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

        // Vérification des identifiants
        const userFound = USERS.find(u => u.email === emailInput && u.password === passwordInput);

        if (userFound) {
            // SUCCÈS : On enregistre l'utilisateur dans le navigateur
            // C'est ça la consigne "Stockage de session dans localStorage"
            const sessionData = {
                email: userFound.email,
                role: userFound.role,
                name: userFound.name,
                isLoggedIn: true
            };

            localStorage.setItem('orbitUser', JSON.stringify(sessionData));

            console.log("Connexion réussie ! Redirection...");
            // Redirection vers le tableau de bord
            window.location.href = 'dashboard.html';
        } else {
            // ÉCHEC : On affiche le message d'erreur
            errorMsg.classList.remove('hidden');
            // Petite animation de secousse (optionnel mais stylé)
            loginForm.classList.add('animate-pulse');
            setTimeout(() => loginForm.classList.remove('animate-pulse'), 500);
        }
    });
}

// 4. Sécurité (Bonus) : Si on est déjà connecté, on va direct au dashboard
// Comme ça l'admin ne doit pas se reconnecter à chaque fois
const currentUser = JSON.parse(localStorage.getItem('orbitUser'));
if (currentUser && currentUser.isLoggedIn && window.location.pathname.includes('index.html')) {
    window.location.href = 'dashboard.html';
}
