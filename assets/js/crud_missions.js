// 1. VARIABLES GLOBALES
let missions = [];
let lastRenderSource = [];
let indexModification = -1;
let currentPage = 1;
const rowsPerPage = 5;

// 2. INITIALISATION
document.addEventListener("DOMContentLoaded", () => {
  initData();
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");

  if (btnPrev) btnPrev.addEventListener("click", () => goToPage(currentPage - 1));
  if (btnNext) btnNext.addEventListener("click", () => goToPage(currentPage + 1));
});

function initData() {
  const localData = localStorage.getItem("missions_db"); // ⚠️ CLÉ DIFFÉRENTE

  if (localData) {
    console.log("💾 Chargement missions local...");
    missions = JSON.parse(localData);
    demarrerAffichage();
  } else {
    console.log("🌍 Appel API Missions...");
    // On utilise "users" mais on map différemment pour simuler des missions
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        missions = data.map((item) => ({
          nom: "Mission " + item.company.name, // Ex: Mission Romaguera-Crona
          destination: item.address.city,      // Ex: Gwenborough
          statut: "En Préparation"
        }));
        savedata();
        demarrerAffichage();
      })
      .catch((err) => console.error("Erreur API:", err));
  }
}

function demarrerAffichage() {
  lastRenderSource = missions;
  renderTable();
}

// 3. CRUD MISSIONS
function createMission() {
  let nom = document.getElementById("missionName").value.trim();
  let destination = document.getElementById("missionDest").value.trim();
  let statut = document.getElementById("missionStatus").value;

  if (nom === "" || destination === "") {
    alert("⛔ Champs obligatoires !");
    return;
  }

  const nouvelleMission = { nom, destination, statut };

  if (indexModification === -1) {
    missions.push(nouvelleMission); // Ajout
    savedata();
    lastRenderSource = missions;
    currentPage = Math.ceil(lastRenderSource.length / rowsPerPage);
  } else {
    missions[indexModification] = nouvelleMission; // Modif
    resetButton();
    indexModification = -1;
    savedata();
    if (lastRenderSource !== missions) { searchMissions(); return; }
  }

  renderTable(lastRenderSource);
  resetForm();
}

function preparerEdition(index) {
  indexModification = index;
  const m = missions[indexModification];

  document.getElementById("missionName").value = m.nom;
  document.getElementById("missionDest").value = m.destination;
  document.getElementById("missionStatus").value = m.statut;

  const btn = document.getElementById("btnSaveMission");
  btn.innerHTML = "<i class='fa-solid fa-rotate mr-2'></i> Mettre à jour";
  btn.className = "w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition";
}

// 4. RECHERCHE & RENDER
function searchMissions() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = missions.filter(
    (m) =>
      m.nom.toLowerCase().includes(query) ||
      m.destination.toLowerCase().includes(query) ||
      m.statut.toLowerCase().includes(query)
  );
  currentPage = 1;
  renderTable(filtered);
}

function renderTable(sourceDonnees = missions) {
  lastRenderSource = sourceDonnees;
  const tbody = document.getElementById("missionTableBody");
  tbody.innerHTML = "";

  const totalPages = Math.max(1, Math.ceil(sourceDonnees.length / rowsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = sourceDonnees.slice(start, end);

  pageItems.forEach((m) => {
    const indexReel = missions.indexOf(m);


    let colorClass = "bg-gray-600";
    if(m.statut.includes("Cours")) colorClass = "bg-blue-600";
    if(m.statut.includes("Termin")) colorClass = "bg-green-600";
    if(m.statut.includes("Annul")) colorClass = "bg-red-600";

    const row = `
      <tr class="border-b border-gray-700 hover:bg-gray-700/50 transition">
        <td class="p-4 text-white font-semibold">${m.nom}</td>
        <td class="p-4 text-gray-300"><i class="fa-solid fa-location-dot mr-2"></i>${m.destination}</td>
        <td class="p-4">
           <span class="${colorClass} text-white text-xs px-2 py-1 rounded-full uppercase tracking-wider">
             ${m.statut}
           </span>
        </td>
        <td class="p-4 text-center">
           <button class="text-blue-400 hover:bg-blue-600/20 p-2 rounded mx-1" onclick="voirDetails(${indexReel})"><i class="fa-solid fa-eye"></i></button>
           <button class="text-yellow-400 hover:bg-yellow-500/20 p-2 rounded mx-1" onclick="preparerEdition(${indexReel})"><i class="fa-solid fa-pen-to-square"></i></button>
           <button class="text-red-400 hover:bg-red-600/20 p-2 rounded mx-1" onclick="supprimer(${indexReel})"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
  updatePaginationUI(totalPages);
}

function updatePaginationUI(totalPages) {
  const pageInfo = document.getElementById("pageInfo");
  if (pageInfo) pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;

  document.getElementById("btnPrev").disabled = currentPage === 1;
  document.getElementById("btnPrev").classList.toggle("opacity-50", currentPage === 1);
  document.getElementById("btnNext").disabled = currentPage === totalPages;
  document.getElementById("btnNext").classList.toggle("opacity-50", currentPage === totalPages);
}

function goToPage(page) {
    const totalPages = Math.max(1, Math.ceil(lastRenderSource.length / rowsPerPage));
    currentPage = Math.min(Math.max(1, page), totalPages);
    renderTable(lastRenderSource);
}

// 5. EXPORT & UTILS
function exportCSV() {
  // Adaptation pour exporter Nom;Destination;Statut
  let csvContent = "\uFEFFNom;Destination;Statut\n";
  lastRenderSource.forEach((m) => {
    csvContent += `${m.nom};${m.destination};${m.statut}\n`;
  });
  const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "missions_orbitmanager.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function savedata() {
  localStorage.setItem("missions_db", JSON.stringify(missions));
}

function resetForm() {
  document.getElementById("missionName").value = "";
  document.getElementById("missionDest").value = "";
  document.getElementById("missionStatus").value = "En Préparation";
}

function resetButton() {
  const btn = document.getElementById("btnSaveMission");
  btn.innerHTML = "<i class='fa-solid fa-save mr-2'></i> Enregistrer Mission";
  btn.className = "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition";
}

// 6. MODALES
function voirDetails(index) {
  const m = missions[index];
  document.getElementById("detailNom").value = m.nom;
  document.getElementById("detailDest").value = m.destination;
  document.getElementById("detailStatus").value = m.statut;

  document.getElementById("btnModalEdit").onclick = function() { closeModal(); preparerEdition(index); };
  document.getElementById("btnModalDelete").onclick = function() { closeModal(); supprimer(index); };
  document.getElementById("modalDetails").classList.remove("hidden");
}

function closeModal() { document.getElementById("modalDetails").classList.add("hidden"); }

function downloadPDF() {
    const element = document.getElementById("contenuPourPDF");
    const opt = { margin: 1, filename: `Mission_${document.getElementById("detailNom").value}.pdf`, image: { type: "jpeg", quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: "in", format: "letter", orientation: "portrait" } };
    html2pdf().set(opt).from(element).save();
}

function supprimer(index) {
  indexToDelete = index;
  document.getElementById("modalDelete").classList.remove("hidden");
}
function closeDeleteModal() { document.getElementById("modalDelete").classList.add("hidden"); indexToDelete = -1; }

function confirmerSuppressionDefinitive() {
  if (indexToDelete !== -1) {
    missions.splice(indexToDelete, 1);
    savedata();
    // Logique filtre
    const newSource = lastRenderSource === missions ? missions : lastRenderSource.filter(m => missions.includes(m));
    renderTable(newSource);
    closeDeleteModal();
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
    closeDeleteModal();
  }
});
