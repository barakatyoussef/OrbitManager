// ==========================================
// 1. VARIABLES GLOBALES
// ==========================================
let astronautes = [];
let lastRenderSource = [];
let indexModification = -1;

// Pagination
let currentPage = 1;
const rowsPerPage = 5;

// ==========================================
// 2. INITIALISATION (Démarrage)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initData();

  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");

  if (btnPrev) {
    btnPrev.addEventListener("click", () => goToPage(currentPage - 1));
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => goToPage(currentPage + 1));
  }
});

function initData() {
  const localData = localStorage.getItem("astronautes");

  if (localData) {
    console.log("💾 Chargement depuis le cache local...");
    astronautes = JSON.parse(localData);
    demarrerAffichage();
  } else {
    console.log("🌍 Appel API en cours...");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        astronautes = users.map((user) => ({
          nom: user.name,
          role: "Spationaute",
          mission: user.company.name,
        }));

        savedata();
        demarrerAffichage();
      })
      .catch((err) => console.error("Erreur API:", err));
  }
}

function demarrerAffichage() {
  lastRenderSource = astronautes;
  renderTable();
}

// ==========================================
// 3. FONCTIONS CRUD (Create, Update, Delete)
// ==========================================
function createAstronaut() {
  let nom = document.getElementById("astroName").value.trim();
  let role = document.getElementById("astroRole").value;
  let mission = document.getElementById("astroMission").value.trim();

  if (nom === "" || mission === "") {
    alert("⛔ Stop ! Tous les champs sont obligatoires habibi !");
    return;
  }

  const nouveauAstronaute = { nom, role, mission };

  // ===========================================
  // LOGIQUE SÉPARÉE : AJOUT vs MODIFICATION
  // ===========================================

  if (indexModification === -1) {
    // --- CAS 1 : AJOUT (Création) ---
    astronautes.push(nouveauAstronaute);
    savedata();

    // On remet la liste complète
    lastRenderSource = astronautes;

    // On calcule la nouvelle dernière page
    const totalPages = Math.max(
      1,
      Math.ceil(lastRenderSource.length / rowsPerPage)
    );

    // 👉 ON VA À LA FIN pour voir le petit nouveau
    currentPage = totalPages;
  } else {
    // --- CAS 2 : MODIFICATION (Edition) ---
    astronautes[indexModification] = nouveauAstronaute;

    // On réinitialise le formulaire et le bouton
    resetButton();
    indexModification = -1;
    savedata();

    // 👉 ICI LE CHANGEMENT : On NE change PAS currentPage.
    // On reste sagement sur la page où on était.

    // Petite astuce : Si on était en recherche, on rafraîchit la source
    // pour être sûr que la modif s'affiche même dans les résultats filtrés
    if (lastRenderSource !== astronautes) {
      // On re-déclenche la recherche pour mettre à jour les données affichées
      searchAstronauts();
      return; // searchAstronauts s'occupe de l'affichage, on arrête là
    }
  }

  // Affichage standard (si on n'est pas passé par le return du search)
  renderTable(lastRenderSource);
  resetForm();
}

function preparerEdition(index) {
  indexModification = index;
  const astro = astronautes[indexModification];

  document.getElementById("astroName").value = astro.nom;
  document.getElementById("astroRole").value = astro.role;
  document.getElementById("astroMission").value = astro.mission;

  const btn = document.getElementById("btnSaveAstro");
  btn.innerHTML = "<i class='fa-solid fa-rotate mr-2'></i> Mettre à jour";
  btn.className =
    "w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition";
}

// ==========================================
// 4. RECHERCHE & PAGINATION
// ==========================================
function searchAstronauts() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  const filtered = astronautes.filter(
    (astro) =>
      astro.nom.toLowerCase().includes(query) ||
      astro.role.toLowerCase().includes(query) ||
      astro.mission.toLowerCase().includes(query)
  );

  currentPage = 1;
  renderTable(filtered);
}

function goToPage(page) {
  const totalPages = Math.max(
    1,
    Math.ceil(lastRenderSource.length / rowsPerPage)
  );
  currentPage = Math.min(Math.max(1, page), totalPages);
  renderTable(lastRenderSource);
}

function renderTable(sourceDonnees = astronautes) {
  lastRenderSource = sourceDonnees;

  const tbody = document.getElementById("astroTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const totalItems = sourceDonnees.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));

  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = sourceDonnees.slice(start, end);

  pageItems.forEach((astro) => {
    const indexReel = astronautes.indexOf(astro);

    const row = `
            <tr class="border-b border-gray-700 hover:bg-gray-700/50 transition duration-200">
                <td class="p-4 text-white font-semibold">${astro.nom}</td>
                <td class="p-4">
                    <span class="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm px-3 py-1 rounded-full">
                        <i class="fa-solid fa-user-astronaut text-xs"></i> ${astro.role}
                    </span>
                </td>
                <td class="p-4 text-gray-300">${astro.mission}</td>
                <td class="p-4 text-center">
                    <button class="text-blue-400 hover:text-white hover:bg-blue-600 p-2 rounded-lg transition-all mx-1" onclick="voirDetails(${indexReel})">
                      <i class="fa-solid fa-eye text-lg"></i>
                    </button>
                    <button class="text-yellow-400 hover:bg-yellow-500/20 p-2 rounded mx-1" onclick="preparerEdition(${indexReel})">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="text-red-400 hover:bg-red-600/20 p-2 rounded mx-1" onclick="supprimer(${indexReel})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>`;
    tbody.innerHTML += row;
  });

  updatePaginationUI(totalPages);
}

function updatePaginationUI(totalPages) {
  const pageInfo = document.getElementById("pageInfo");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");

  if (pageInfo) pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;

  if (btnPrev) {
    btnPrev.disabled = currentPage === 1;
    btnPrev.classList.toggle("opacity-50", currentPage === 1);
  }

  if (btnNext) {
    btnNext.disabled = currentPage === totalPages;
    btnNext.classList.toggle("opacity-50", currentPage === totalPages);
  }
}

// ==========================================
// 5. EXPORT CSV
// ==========================================
function exportCSV() {
  const dataAExporter = lastRenderSource;

  if (dataAExporter.length === 0) {
    alert("Rien à exporter !");
    return;
  }

  let csvContent = "\uFEFF"; // BOM pour Excel
  csvContent += "Nom;Rôle;Mission\n";

  dataAExporter.forEach((astro) => {
    const nom = astro.nom.replace(/;/g, " ");
    const role = astro.role.replace(/;/g, " ");
    const mission = astro.mission.replace(/;/g, " ");

    const row = `${nom};${role};${mission}`;
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "astronautes_orbitmanager.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// 6. UTILITAIRES
// ==========================================
function savedata() {
  localStorage.setItem("astronautes", JSON.stringify(astronautes));
}

function resetForm() {
  document.getElementById("astroName").value = "";
  document.getElementById("astroRole").value = "Commandant";
  document.getElementById("astroMission").value = "";
}

function resetButton() {
  const btn = document.getElementById("btnSaveAstro");
  btn.innerHTML = "<i class='fa-solid fa-save mr-2'></i> Enregistrer";
  btn.className =
    "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition";
}

// ==========================================
// 7. GESTION MODALE DÉTAILS & PDF
// ==========================================
let currentDetailIndex = -1;

function voirDetails(indexOriginal) {
  currentDetailIndex = indexOriginal;
  const astro = astronautes[indexOriginal];

  // Remplissage des inputs
  document.getElementById("detailNom").value = astro.nom;
  document.getElementById("detailRole").value = astro.role;
  document.getElementById("detailMission").value = astro.mission;

  // BOUTON MODIFIER (Dans la modale détails)
  document.getElementById("btnModalEdit").onclick = function () {
    closeModal();
    preparerEdition(indexOriginal);
  };

  // BOUTON SUPPRIMER (Dans la modale détails)
  // ✅ CORRECTION ICI : On ferme juste les détails et on lance la procédure de suppression (qui ouvre la modale rouge)
  document.getElementById("btnModalDelete").onclick = function () {
    closeModal(); // 1. Fermer fiche détails
    supprimer(indexOriginal); // 2. Ouvrir modale suppression
  };

  document.getElementById("modalDetails").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modalDetails").classList.add("hidden");
}

function downloadPDF() {
  const element = document.getElementById("contenuPourPDF");
  const opt = {
    margin: 1,
    filename: `Fiche_${document.getElementById("detailNom").value}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().set(opt).from(element).save();
}

// ==========================================
// 8. GESTION SUPPRESSION (MODALE ROUGE)
// ==========================================
let indexToDelete = -1;

function supprimer(index) {
  indexToDelete = index;
  document.getElementById("modalDelete").classList.remove("hidden");
}

function closeDeleteModal() {
  document.getElementById("modalDelete").classList.add("hidden");
  indexToDelete = -1;
}

function confirmerSuppressionDefinitive() {
  if (indexToDelete !== -1) {
    astronautes.splice(indexToDelete, 1);
    savedata();

    const newSource =
      lastRenderSource === astronautes
        ? astronautes
        : lastRenderSource.filter((a) => astronautes.includes(a));

    renderTable(newSource);
    closeDeleteModal();
  }
}

// Gestion globale de la touche ECHAP pour fermer toutes les modales
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal(); // Ferme détails
    closeDeleteModal(); // Ferme suppression
  }
});

// Fermer au clic en dehors
document.getElementById("modalDetails").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});
// (Optionnel) Si tu veux que le clic en dehors ferme aussi la modale suppression
/* document.getElementById("modalDelete").addEventListener("click", function (e) {
    if (e.target === this) closeDeleteModal();
}); */
