// 1. VARIABLES GLOBALES
let planetes = [];
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
  const localData = localStorage.getItem("planetes_db"); // ⚠️ CLÉ SPÉCIFIQUE

  if (localData) {
    console.log("💾 Chargement planètes local...");
    planetes = JSON.parse(localData);
    demarrerAffichage();
  } else {
    console.log("🌍 Appel API Planètes...");
    // Système D : On utilise les "users" pour générer des planètes
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        planetes = data.map((user, index) => ({
          nom: user.address.city, // Ex: Gwenborough devient une planète
          type: index % 2 === 0 ? "Tellurique" : "Gazeuse",
          distance: Math.floor(Math.random() * 500) + 50, // Millions km
          statut: index % 3 === 0 ? "Explorée" : "Inconnue"
        }));
        savedata();
        demarrerAffichage();
      })
      .catch((err) => console.error("Erreur API:", err));
  }
}

function demarrerAffichage() {
  lastRenderSource = planetes;
  renderTable();
}

// 3. CRUD
function createPlanet() {
  let nom = document.getElementById("planetName").value.trim();
  let type = document.getElementById("planetType").value;
  let distance = document.getElementById("planetDistance").value.trim();
  let statut = document.getElementById("planetStatus").value;

  if (nom === "" || distance === "") {
    alert("⛔ Nom et Distance sont obligatoires !");
    return;
  }

  const newItem = { nom, type, distance, statut };

  if (indexModification === -1) {
    planetes.push(newItem);
    savedata();
    lastRenderSource = planetes;
    currentPage = Math.ceil(lastRenderSource.length / rowsPerPage);
  } else {
    planetes[indexModification] = newItem;
    resetButton();
    indexModification = -1;
    savedata();
    if (lastRenderSource !== planetes) { searchPlanets(); return; }
  }

  renderTable(lastRenderSource);
  resetForm();
}

function preparerEdition(index) {
  indexModification = index;
  const p = planetes[indexModification];

  document.getElementById("planetName").value = p.nom;
  document.getElementById("planetType").value = p.type;
  document.getElementById("planetDistance").value = p.distance;
  document.getElementById("planetStatus").value = p.statut;

  const btn = document.getElementById("btnSavePlanet");
  btn.innerHTML = "<i class='fa-solid fa-rotate mr-2'></i> Mettre à jour";
  btn.className = "w-full md:w-auto bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded transition flex items-center justify-center";
}

// 4. RECHERCHE (Inclut la distance)
function searchPlanets() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  const filtered = planetes.filter(
    (p) =>
      p.nom.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query) ||
      p.statut.toLowerCase().includes(query) ||
      p.distance.toString().includes(query)
  );

  currentPage = 1;
  renderTable(filtered);
}

function renderTable(sourceDonnees = planetes) {
  lastRenderSource = sourceDonnees;
  const tbody = document.getElementById("planetTableBody");
  tbody.innerHTML = "";

  const totalPages = Math.max(1, Math.ceil(sourceDonnees.length / rowsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = sourceDonnees.slice(start, end);

  pageItems.forEach((p) => {
    const indexReel = planetes.indexOf(p);

    // 🎨 COULEURS STATUT
    let statusColor = "bg-gray-600";
    if (p.statut === "Explorée") statusColor = "bg-green-600";
    if (p.statut === "Ciblée") statusColor = "bg-blue-600";
    if (p.statut === "Colonisée") statusColor = "bg-purple-600";
    if (p.statut === "Inconnue") statusColor = "bg-gray-500 border border-gray-400";

    // 🎨 ICONES TYPE
    let typeIcon = "fa-circle-question";
    let typeClass = "";
    if (p.type === "Tellurique") { typeIcon = "fa-hill-rockslide"; typeClass="text-orange-400"; }
    if (p.type === "Gazeuse") { typeIcon = "fa-cloud"; typeClass="text-blue-300"; }
    if (p.type === "Glacée") { typeIcon = "fa-snowflake"; typeClass="text-cyan-300"; }
    if (p.type === "Naine") { typeIcon = "fa-circle-dot"; typeClass="text-gray-400"; }

    const row = `
      <tr class="border-b border-gray-700 hover:bg-gray-700/50 transition duration-200">
        <td class="p-4 text-white font-semibold text-lg">${p.nom}</td>

        <td class="p-4">
            <span class="flex items-center gap-2 ${typeClass}">
                <i class="fa-solid ${typeIcon}"></i> ${p.type}
            </span>
        </td>

        <td class="p-4 text-gray-300 font-mono">${p.distance} M km</td>

        <td class="p-4">
           <span class="${statusColor} text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
             ${p.statut}
           </span>
        </td>

        <td class="p-4 text-center">
           <button class="text-blue-400 hover:bg-blue-600/20 p-2 rounded mx-1 transition" onclick="voirDetails(${indexReel})"><i class="fa-solid fa-eye text-lg"></i></button>
           <button class="text-yellow-400 hover:bg-yellow-500/20 p-2 rounded mx-1 transition" onclick="preparerEdition(${indexReel})"><i class="fa-solid fa-pen-to-square"></i></button>
           <button class="text-red-400 hover:bg-red-600/20 p-2 rounded mx-1 transition" onclick="supprimer(${indexReel})"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>`;
    tbody.innerHTML += row;
  });
  updatePaginationUI(totalPages);
}

// ... (PAGINATION / CSV / PDF IDEM CARGAISONS) ...
function updatePaginationUI(totalPages) {
  const pageInfo = document.getElementById("pageInfo");
  if(pageInfo) pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;
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

function exportCSV() {
  let csvContent = "\uFEFFNom;Type;Distance;Statut\n";
  lastRenderSource.forEach((p) => {
    csvContent += `${p.nom};${p.type};${p.distance};${p.statut}\n`;
  });
  const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "planetes_orbitmanager.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function savedata() { localStorage.setItem("planetes_db", JSON.stringify(planetes)); }

function resetForm() {
  document.getElementById("planetName").value = "";
  document.getElementById("planetType").value = "Tellurique";
  document.getElementById("planetDistance").value = "";
  document.getElementById("planetStatus").value = "Explorée";
}

function resetButton() {
  const btn = document.getElementById("btnSavePlanet");
  btn.innerHTML = "<i class='fa-solid fa-save mr-2'></i> Enregistrer Planète";
  btn.className = "w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition flex items-center justify-center";
}

let indexToDelete = -1;

function voirDetails(index) {
  const p = planetes[index];
  document.getElementById("detailName").value = p.nom;
  document.getElementById("detailType").value = p.type;
  document.getElementById("detailDistance").value = p.distance + " M km";
  document.getElementById("detailStatus").value = p.statut;

  document.getElementById("btnModalEdit").onclick = function() { closeModal(); preparerEdition(index); };
  document.getElementById("btnModalDelete").onclick = function() { closeModal(); supprimer(index); };
  document.getElementById("modalDetails").classList.remove("hidden");
}

function closeModal() { document.getElementById("modalDetails").classList.add("hidden"); }

function supprimer(index) {
  indexToDelete = index;
  document.getElementById("modalDelete").classList.remove("hidden");
}

function closeDeleteModal() { document.getElementById("modalDelete").classList.add("hidden"); indexToDelete = -1; }

function confirmerSuppressionDefinitive() {
  if (indexToDelete !== -1) {
    planetes.splice(indexToDelete, 1);
    savedata();
    const newSource = lastRenderSource === planetes ? planetes : lastRenderSource.filter(i => planetes.includes(i));
    renderTable(newSource);
    closeDeleteModal();
  }
}

function downloadPDF() {
    const element = document.getElementById("contenuPourPDF");
    const opt = { margin: 1, filename: `Planete_${document.getElementById("detailName").value}.pdf`, image: { type: "jpeg", quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: "in", format: "letter", orientation: "portrait" } };
    html2pdf().set(opt).from(element).save();
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") { closeModal(); closeDeleteModal(); }
});
