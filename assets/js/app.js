

document.addEventListener('DOMContentLoaded', () => {

    const user = JSON.parse(localStorage.getItem('orbitUser'));

    if (!user || !user.isLoggedIn) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('userNameDisplay').innerText = user.name;
    document.getElementById('userRoleDisplay').innerText = user.role === 'admin' ? 'Commandant' : 'Officier';

    document.getElementById('logoutBtn').addEventListener('click', () => {
        if(confirm("Voulez-vous vraiment quitter la station ?")) {
            localStorage.removeItem('orbitUser');
            window.location.href = 'index.html';
        }
    });

    initCharts();
});

function initCharts() {
    const ctx1 = document.getElementById('missionsChart').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Mars', 'Lune', 'ISS', 'Kepler-22b', 'Titan'],
            datasets: [{
                label: 'Missions terminées',
                data: [12, 19, 30, 5, 2],
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
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

    const ctx2 = document.getElementById('fleetChart').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['En Mission', 'Maintenance', 'Disponible', 'Perdu'],
            datasets: [{
                data: [45, 15, 35, 5],
                backgroundColor: [
                    '#10b981',
                    '#f59e0b',
                    '#3b82f6',
                    '#ef4444'  
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
