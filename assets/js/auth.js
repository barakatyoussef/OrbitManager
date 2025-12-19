console.log("Système de sécurité chargé...");


const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

// 2. Les utilisateurs par défaut
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

if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('email').value;
        const passwordInput = document.getElementById('password').value;

        // Vérification des identifiants
        const userFound = USERS.find(u => u.email === emailInput && u.password === passwordInput);

        if (userFound) {
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
            loginForm.classList.add('animate-pulse');
            setTimeout(() => loginForm.classList.remove('animate-pulse'), 500);
        }
    });
}

// 4.Si on est déjà connecté, on va direct au dashboard
const currentUser = JSON.parse(localStorage.getItem('orbitUser'));
if (currentUser && currentUser.isLoggedIn && window.location.pathname.includes('index.html')) {
    window.location.href = 'dashboard.html';
}
