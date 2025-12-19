// 1. VARIABLES GLOBALES
let fusees = [];
let lastRenderSource = [];
let indexModification = -1;
let currentPage = 1;
const rowsPerPage = 5;

// 2. INITIALISATION (Démarrage)
document.addEventListener("DOMContentLoaded", () => {
  initData();

  // Gestionnaires Pagination
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");

  if (btnPrev) btnPrev.addEventListener("click", () => goToPage(currentPage - 1));
  if (btnNext) btnNext.addEventListener("click", () => goToPage(currentPage + 1));
});

function initData() {
  const localData = localStorage.getItem("fusees_db"); // ⚠️ CLÉ SPÉCIFIQUE

  if (localData) {
    console.log("💾 Chargement fusées local...");
    fusees = JSON.parse(localData);
    demarrerAffichage();
  } else {
    console.log("🌍 Appel API Fusées...");
    // "SYSTÈME D" : On utilise les albums pour simuler des fusées
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => {
        // On prend les 10 premiers items pour l'exemple
        fusees = data.slice(0, 12).map((item, index) => ({
          nom: "Rocket-" + item.title.split(" ")[0].toUpperCase() + " " + (index + 1), // Ex: Rocket-QUIDEM 1
          constructeur: "SpaceX", // Valeur par défaut pour l'exemple
          statut: index % 3 === 0 ? "En Maintenance" : "Opérationnelle"
        }));

        savedata();
        demarrerAffichage();
      })
      .catch((err) => console.error("Erreur API:", err));
  }
}

function demarrerAffichage() {
  lastRenderSource = fusees;
  renderTable();
}

// 3. FONCTIONS CRUD (Create, Update, Delete)
function createFusee() {
  let nom = document.getElementById("fuseeName").value.trim();
  let constructeur = document.getElementById("fuseeMaker").value.trim();
  let statut = document.getElementById("fuseeStatus").value;

  if (nom === "" || constructeur === "") {
    alert("⛔ Stop ! Le nom et le constructeur sont obligatoires !");
    return;
  }

  const nouvelleFusee = { nom, constructeur, statut };

  if (indexModification === -1) {
    // CAS 1 : AJOUT
    fusees.push(nouvelleFusee);
    savedata();
    lastRenderSource = fusees;

    // Aller à la dernière page
    const totalPages = Math.max(1, Math.ceil(lastRenderSource.length / rowsPerPage));
    currentPage = totalPages;
  } else {
    // CAS 2 : MODIFICATION
    fusees[indexModification] = nouvelleFusee;
    resetButton();
    indexModification = -1;
    savedata();

    // Si on est en recherche, on relance le filtre
    if (lastRenderSource !== fusees) {
      searchFusees();
      return;
    }
  }

  renderTable(lastRenderSource);
  resetForm();
}

function preparerEdition(index) {
  indexModification = index;
  const f = fusees[indexModification];

  document.getElementById("fuseeName").value = f.nom;
  document.getElementById("fuseeMaker").value = f.constructeur;
  document.getElementById("fuseeStatus").value = f.statut;

  const btn = document.getElementById("btnSaveFusee");
  btn.innerHTML = "<i class='fa-solid fa-rotate mr-2'></i> Mettre à jour";
  btn.className = "w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition";
}

// 4. RECHERCHE & PAGINATION
function searchFusees() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  const filtered = fusees.filter(
    (f) =>
      f.nom.toLowerCase().includes(query) ||
      f.constructeur.toLowerCase().includes(query) ||
      f.statut.toLowerCase().includes(query)
  );

  currentPage = 1;
  renderTable(filtered);
}

function goToPage(page) {
  const totalPages = Math.max(1, Math.ceil(lastRenderSource.length / rowsPerPage));
  currentPage = Math.min(Math.max(1, page), totalPages);
  renderTable(lastRenderSource);
}

function renderTable(sourceDonnees = fusees) {
  lastRenderSource = sourceDonnees;
  const tbody = document.getElementById("fuseeTableBody");
  tbody.innerHTML = "";

  const totalPages = Math.max(1, Math.ceil(sourceDonnees.length / rowsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = sourceDonnees.slice(start, end);

  pageItems.forEach((f) => {
    const indexReel = fusees.indexOf(f);

    // 🎨 Logique Couleurs d'État
    let badgeColor = "bg-gray-600";
    if (f.statut === "Opérationnelle") badgeColor = "bg-green-600";
    if (f.statut === "En Maintenance") badgeColor = "bg-yellow-600";
    if (f.statut === "En Test") badgeColor = "bg-blue-600";
    if (f.statut.includes("Retirée")) badgeColor = "bg-red-600";

    const row = `
      <tr class="border-b border-gray-700 hover:bg-gray-700/50 transition duration-200">
        <td class="p-4 text-white font-semibold">${f.nom}</td>
        <td class="p-4 text-gray-300">
            <i class="fa-solid fa-industry mr-2 text-xs"></i>${f.constructeur}
        </td>
        <td class="p-4">
           <span class="${badgeColor} text-white text-xs px-2 py-1 rounded-full uppercase tracking-wider font-bold shadow-sm">
             ${f.statut}
           </span>
        </td>
        <td class="p-4 text-center">
           <button class="text-blue-400 hover:bg-blue-600/20 p-2 rounded mx-1 transition" onclick="voirDetails(${indexReel})">
             <i class="fa-solid fa-eye text-lg"></i>
           </button>
           <button class="text-yellow-400 hover:bg-yellow-500/20 p-2 rounded mx-1 transition" onclick="preparerEdition(${indexReel})">
             <i class="fa-solid fa-pen-to-square"></i>
           </button>
           <button class="text-red-400 hover:bg-red-600/20 p-2 rounded mx-1 transition" onclick="supprimer(${indexReel})">
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

// 5. EXPORT CSV
function exportCSV() {
  const dataAExporter = lastRenderSource;
  if (dataAExporter.length === 0) { alert("Rien à exporter !"); return; }

  let csvContent = "\uFEFFModèle;Constructeur;État\n"; // En-tête adapté

  dataAExporter.forEach((f) => {
    const nom = f.nom.replace(/;/g, " ");
    const maker = f.constructeur.replace(/;/g, " ");
    const etat = f.statut.replace(/;/g, " ");
    csvContent += `${nom};${maker};${etat}\n`;
  });

  const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "fusees_orbitmanager.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 6. UTILITAIRES
function savedata() {
  localStorage.setItem("fusees_db", JSON.stringify(fusees));
}

function resetForm() {
  document.getElementById("fuseeName").value = "";
  document.getElementById("fuseeMaker").value = "";
  document.getElementById("fuseeStatus").value = "Opérationnelle";
}

function resetButton() {
  const btn = document.getElementById("btnSaveFusee");
  btn.innerHTML = "<i class='fa-solid fa-save mr-2'></i> Enregistrer Fusée";
  btn.className = "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition";
}

// 7. GESTION MODALES (Détails & Suppression)
let indexToDelete = -1;

function voirDetails(index) {
  const f = fusees[index];

  // Remplissage des inputs readonly
  document.getElementById("detailNom").value = f.nom;
  document.getElementById("detailMaker").value = f.constructeur;
  document.getElementById("detailStatus").value = f.statut;

  // Clic sur Modifier dans la modale
  document.getElementById("btnModalEdit").onclick = function () {
    closeModal();
    preparerEdition(index);
  };

  // Clic sur Supprimer dans la modale
  document.getElementById("btnModalDelete").onclick = function () {
    closeModal();
    supprimer(index);
  };

  document.getElementById("modalDetails").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modalDetails").classList.add("hidden");
}

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
    fusees.splice(indexToDelete, 1);
    savedata();

    // Mise à jour de l'affichage (respect du filtre)
    const newSource = lastRenderSource === fusees
        ? fusees
        : lastRenderSource.filter(f => fusees.includes(f));

    renderTable(newSource);
    closeDeleteModal();
  }
}

// PDF Export
function downloadPDF() {
  const element = document.getElementById("contenuPourPDF");
  const opt = {
    margin: 1,
    filename: `Fiche_Fusee_${document.getElementById("detailNom").value}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().set(opt).from(element).save();
}

// Gestion globale de la touche ECHAP
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
    closeDeleteModal();
  }
});
