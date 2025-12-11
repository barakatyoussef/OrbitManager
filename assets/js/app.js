// assets/js/app.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. VÉRIFICATION SÉCURITÉ (Est-ce que l'utilisateur est connecté ?)
    const user = JSON.parse(localStorage.getItem('orbitUser'));

    if (!user || !user.isLoggedIn) {
        // Pas connecté ? Retour à la case départ !
        window.location.href = 'index.html';
        return;
    }

    // 2. UI UPDATE (Afficher le nom de l'utilisateur)
    document.getElementById('userNameDisplay').innerText = user.name;
    document.getElementById('userRoleDisplay').innerText = user.role === 'admin' ? 'Commandant' : 'Officier';

    // 3. GESTION DÉCONNEXION
    document.getElementById('logoutBtn').addEventListener('click', () => {
        if(confirm("Voulez-vous vraiment quitter la station ?")) {
            localStorage.removeItem('orbitUser');
            window.location.href = 'index.html';
        }
    });

    // 4. GRAPHIQUES (Chart.js Configuration) [cite: 62]
    initCharts();
});

function initCharts() {
    // Graphique 1 : Missions (Bar Chart)
    const ctx1 = document.getElementById('missionsChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Mars', 'Lune', 'ISS', 'Kepler-22b', 'Titan'],
            datasets: [{
                label: 'Missions terminées',
                data: [12, 19, 30, 5, 2],
                backgroundColor: 'rgba(59, 130, 246, 0.6)', // Bleu
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#374151' }, ticks: { color: '#9ca3af' } },
                x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
            }
        }
    });

    // Graphique 2 : Flotte (Doughnut Chart)
    const ctx2 = document.getElementById('fleetChart').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['En Mission', 'Maintenance', 'Disponible', 'Perdu'],
            datasets: [{
                data: [45, 15, 35, 5],
                backgroundColor: [
                    '#10b981', // Vert (En mission)
                    '#f59e0b', // Jaune (Maintenance)
                    '#3b82f6', // Bleu (Dispo)
                    '#ef4444'  // Rouge (Perdu)
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#d1d5db' } }
            }
        }
    });
}
