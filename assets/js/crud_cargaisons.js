// 1. VARIABLES GLOBALES
let cargaisons = [];
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
  const localData = localStorage.getItem("cargaisons_db");

  if (localData) {
    console.log("💾 Chargement cargaisons local...");
    cargaisons = JSON.parse(localData);
    demarrerAffichage();
  } else {
    console.log("🌍 Appel API Cargaisons...");
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        cargaisons = data.slice(0, 10).map((item, index) => ({
          nom: "CRG-" + (1000 + index),
          type: index % 2 === 0 ? "Vivres" : "Matériel",
          poids: Math.floor(Math.random() * 500) + 50,
          statut: item.completed ? "Livré" : "En Attente"
        }));
        savedata();
        demarrerAffichage();
      })
      .catch((err) => console.error("Erreur API:", err));
  }
}

function demarrerAffichage() {
  lastRenderSource = cargaisons;
  renderTable();
}

// 3. CRUD
function createCargo() {
  let nom = document.getElementById("cargoName").value.trim();
  let type = document.getElementById("cargoType").value;
  let poids = document.getElementById("cargoWeight").value.trim();
  let statut = document.getElementById("cargoStatus").value;

  if (nom === "" || poids === "") {
    alert("⛔ Nom et Poids obligatoires !");
    return;
  }

  const newItem = { nom, type, poids, statut };

  if (indexModification === -1) {
    cargaisons.push(newItem);
    savedata();
    lastRenderSource = cargaisons;
    currentPage = Math.ceil(lastRenderSource.length / rowsPerPage);
  } else {
    cargaisons[indexModification] = newItem;
    resetButton();
    indexModification = -1;
    savedata();
    if (lastRenderSource !== cargaisons) { searchCargos(); return; }
  }

  renderTable(lastRenderSource);
  resetForm();
}

function preparerEdition(index) {
  indexModification = index;
  const item = cargaisons[indexModification];

  document.getElementById("cargoName").value = item.nom;
  document.getElementById("cargoType").value = item.type;
  document.getElementById("cargoWeight").value = item.poids;
  document.getElementById("cargoStatus").value = item.statut;

  const btn = document.getElementById("btnSaveCargo");
  btn.innerHTML = "<i class='fa-solid fa-rotate mr-2'></i> Mettre à jour";
  btn.className = "w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center";
}

// 4. RECHERCHE (Avec Poids)
function searchCargos() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  const filtered = cargaisons.filter(
    (item) =>
      item.nom.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.statut.toLowerCase().includes(query) ||
      item.poids.toString().includes(query) // ✅ AJOUT : Recherche par poids
  );

  currentPage = 1;
  renderTable(filtered);
}

function renderTable(sourceDonnees = cargaisons) {
  lastRenderSource = sourceDonnees;
  const tbody = document.getElementById("cargoTableBody");
  tbody.innerHTML = "";

  const totalPages = Math.max(1, Math.ceil(sourceDonnees.length / rowsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = sourceDonnees.slice(start, end);

  pageItems.forEach((item) => {
    const indexReel = cargaisons.indexOf(item);

    // 🎨 COULEURS STATUT
    let statusColor = "bg-gray-600";
    if (item.statut === "Livré") statusColor = "bg-green-600";
    if (item.statut === "En Transit") statusColor = "bg-blue-600";
    if (item.statut === "En Attente") statusColor = "bg-orange-600";

    // 🎨 ✅ COULEURS TYPE (Nouveau !)
    let typeColor = "bg-gray-700 text-gray-300"; // Défaut
    let typeIcon = "fa-box";

    if (item.type.includes("Vivres")) {
        typeColor = "bg-green-900/50 text-green-400 border border-green-700/50";
        typeIcon = "fa-apple-whole";
    } else if (item.type.includes("Matériel")) {
        typeColor = "bg-slate-700 text-slate-300 border border-slate-600";
        typeIcon = "fa-toolbox";
    } else if (item.type.includes("Carburant")) {
        typeColor = "bg-red-900/50 text-red-400 border border-red-700/50";
        typeIcon = "fa-gas-pump";
    } else if (item.type.includes("Scientifique")) {
        typeColor = "bg-purple-900/50 text-purple-400 border border-purple-700/50";
        typeIcon = "fa-flask";
    }

    const row = `
      <tr class="border-b border-gray-700 hover:bg-gray-700/50 transition duration-200">
        <td class="p-4 text-white font-semibold">${item.nom}</td>

        <td class="p-4">
            <span class="${typeColor} px-2 py-1 rounded text-xs font-medium flex items-center w-fit gap-2">
                <i class="fa-solid ${typeIcon}"></i> ${item.type}
            </span>
        </td>

        <td class="p-4 text-gray-300 font-mono">${item.poids} kg</td>

        <td class="p-4">
           <span class="${statusColor} text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm">
             ${item.statut}
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

// ... (Le reste : Pagination, Export CSV, Modales ne change pas, mais copie tout pour être sûr)
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
  let csvContent = "\uFEFFRéférence;Type;Poids;Statut\n";
  lastRenderSource.forEach((item) => {
    csvContent += `${item.nom};${item.type};${item.poids};${item.statut}\n`;
  });
  const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "cargaisons.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function savedata() { localStorage.setItem("cargaisons_db", JSON.stringify(cargaisons)); }

function resetForm() {
  document.getElementById("cargoName").value = "";
  document.getElementById("cargoType").value = "Vivres";
  document.getElementById("cargoWeight").value = "";
  document.getElementById("cargoStatus").value = "En Attente";
}

function resetButton() {
  const btn = document.getElementById("btnSaveCargo");
  btn.innerHTML = "<i class='fa-solid fa-save mr-2'></i> Enregistrer";
  btn.className = "w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center";
}

let indexToDelete = -1;

function voirDetails(index) {
  const item = cargaisons[index];
  document.getElementById("detailName").value = item.nom;
  document.getElementById("detailType").value = item.type;
  document.getElementById("detailWeight").value = item.poids;
  document.getElementById("detailStatus").value = item.statut;

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
    cargaisons.splice(indexToDelete, 1);
    savedata();
    const newSource = lastRenderSource === cargaisons ? cargaisons : lastRenderSource.filter(i => cargaisons.includes(i));
    renderTable(newSource);
    closeDeleteModal();
  }
}

function downloadPDF() {
    const element = document.getElementById("contenuPourPDF");
    const opt = { margin: 1, filename: `Cargaison_${document.getElementById("detailName").value}.pdf`, image: { type: "jpeg", quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: "in", format: "letter", orientation: "portrait" } };
    html2pdf().set(opt).from(element).save();
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") { closeModal(); closeDeleteModal(); }
});
