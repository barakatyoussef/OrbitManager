

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
  // This file is used across multiple pages.
  // Only render charts if the canvas exists on the current page.
  if (typeof Chart === "undefined") return;

  const readLS = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  };

  const countBy = (arr, field) => {
    const map = {};
    arr.forEach((item) => {
      const k = (item && item[field] ? String(item[field]) : "Inconnu").trim() || "Inconnu";
      map[k] = (map[k] || 0) + 1;
    });
    return {
      labels: Object.keys(map),
      values: Object.values(map),
    };
  };

  // -------- Astronautes (Pie) : répartition des rôles
  const astroCanvas = document.getElementById("chartAstronautes");
  if (astroCanvas) {
    const astronautes = readLS("astronautes");
    const { labels, values } = countBy(astronautes, "role");

    new Chart(astroCanvas, {
      type: "pie",
      data: {
        labels: labels.length ? labels : ["Aucune donnée"],
        datasets: [
          {
            data: values.length ? values : [1],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }

  // -------- Fusées (Donut) : statut
  const fuseeCanvas = document.getElementById("chartFusees");
  if (fuseeCanvas) {
    const fusees = readLS("fusees_db");
    const { labels, values } = countBy(fusees, "statut");

    new Chart(fuseeCanvas, {
      type: "doughnut",
      data: {
        labels: labels.length ? labels : ["Aucune donnée"],
        datasets: [
          {
            data: values.length ? values : [1],
            cutout: "60%",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }

  // -------- Missions (Bar) : par destination
  const missionsCanvas = document.getElementById("chartMissions");
  if (missionsCanvas) {
    const missions = readLS("missions_db");
    const { labels, values } = countBy(missions, "destination");

    new Chart(missionsCanvas, {
      type: "bar",
      data: {
        labels: labels.length ? labels : ["Aucune donnée"],
        datasets: [
          {
            label: "Nombre de missions",
            data: values.length ? values : [0],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true },
        },
        plugins: {
          legend: { display: true, position: "bottom" },
        },
      },
    });
  }

  // -------- Cargaisons (Line) : poids par entrée (index)
  const cargaisonsCanvas = document.getElementById("chartCargaisons");
  if (cargaisonsCanvas) {
    const cargaisons = readLS("cargaisons_db");
    const labels = cargaisons.map((c, i) => (c?.nom ? String(c.nom) : `#${i + 1}`));
    const values = cargaisons.map((c) => {
      const raw = c?.poids ?? 0;
      const num = typeof raw === "number" ? raw : parseFloat(String(raw).replace(",", "."));
      return Number.isFinite(num) ? num : 0;
    });

    new Chart(cargaisonsCanvas, {
      type: "line",
      data: {
        labels: labels.length ? labels : ["Aucune donnée"],
        datasets: [
          {
            label: "Poids",
            data: values.length ? values : [0],
            tension: 0.35,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }

  // -------- Planètes (Area) : distance (line + fill)
  const planetesCanvas = document.getElementById("chartPlanetes");
  if (planetesCanvas) {
    const planetes = readLS("planetes_db");
    const labels = planetes.map((p, i) => (p?.nom ? String(p.nom) : `#${i + 1}`));
    const values = planetes.map((p) => {
      const raw = p?.distance ?? 0;
      const num = typeof raw === "number" ? raw : parseFloat(String(raw).replace(",", "."));
      return Number.isFinite(num) ? num : 0;
    });

    new Chart(planetesCanvas, {
      type: "line",
      data: {
        labels: labels.length ? labels : ["Aucune donnée"],
        datasets: [
          {
            label: "Distance",
            data: values.length ? values : [0],
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
  }
}
