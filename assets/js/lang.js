const translations = {
    fr: {
        // --- SIDEBAR (Menu Gauche) ---
        sidebar_dashboard: "Tableau de Bord",
        sidebar_astro: "Astronautes",
        sidebar_rockets: "Fusées",
        sidebar_missions: "Missions",
        sidebar_cargo: "Cargaisons",
        sidebar_planets: "Planètes", // ✅ C'était la ligne manquante !

        // --- HEADER ---
        header_admin: "Admin",
        logout_btn: "Déconnexion",

        // --- DASHBOARD (Cartes & Graphes) ---
        page_dashboard: "Vue Globale",
        card_astro: "Astronautes Actifs",
        card_missions: "Missions Totales",
        card_cargo: "Logistique (Poids)",
        card_budget: "Coût Flotte",
        graph_overview: "Aperçu des Modules",
        graph_astro: "Astronautes • Répartition des rôles",
        graph_rockets: "Fusées • Statut",
        graph_missions: "Missions • Par destination",
        graph_cargo: "Cargaisons • Poids par entrée",
        graph_planets: "Planètes • Distance",

        // --- PAGE ASTRONAUTES ---
        page_astro: "Gestion Astronautes",
        astro_new: "Nouvel Astronaute",
        lbl_name: "Nom de l'Astronaute",
        lbl_role: "Grade / Rôle",
        lbl_mission: "Mission Assignée",
        btn_save: "Enregistrer",
        btn_csv: "Exporter CSV",
        th_name: "Nom",
        th_role: "Grade",
        th_mission: "Mission",
        th_actions: "Actions",

        // --- PAGE FUSÉES ---
        page_rockets: "Parc de Fusées",
        rocket_new: "Nouvelle Fusée",
        lbl_model: "Nom du Modèle",
        lbl_maker: "Constructeur",
        lbl_status_tech: "État Technique",
        btn_save_rocket: "Enregistrer Fusée",
        // Options Fusées
        opt_operational: "Opérationnelle ✅",
        opt_maintenance: "En Maintenance 🛠️",
        opt_test: "En Test ⚠️",
        opt_retired: "Retirée du service 🛑",
        // Tableau Fusées
        th_model: "Modèle",
        th_maker: "Constructeur",
        th_status: "État",
        // Modales Fusées
        modal_rocket_title: "Fiche Technique",
        lbl_model_modal: "Modèle",
        lbl_maker_modal: "Constructeur",
        lbl_status_tech_modal: "État Technique",
        delete_rocket_title: "Démanteler la fusée ?",
        warn_irreversible_rocket: "Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cette fusée de la flotte ?",

        // --- PAGE MISSIONS ---
        page_missions: "Gestion des Missions",
        mission_new: "Nouvelle Mission",
        lbl_mission_name: "Nom de la Mission",
        lbl_mission_status: "Statut Actuel",
        lbl_mission_dest: "Destination",
        btn_save_mission: "Enregistrer Mission",
        // Options Missions
        opt_prep: "En Préparation 🛠️",
        opt_ongoing: "En Cours 🚀",
        opt_finished: "Terminée ✅",
        opt_cancelled: "Annulée ❌",
        // Tableau Missions
        th_mission: "Mission",
        th_dest: "Destination",
        th_status: "Statut",
        // Modales Missions
        modal_mission_title: "Détails Mission",
        lbl_mission_name_modal: "Nom de la Mission",
        lbl_mission_dest_modal: "Destination",
        lbl_mission_status_modal: "Statut Actuel",
        delete_mission_title: "Supprimer la mission ?",
        warn_irreversible_mission: "Cette action est irréversible. La mission sera supprimée de l'historique.",

        // --- PAGE CARGAISONS ---
        page_cargaisons: "Logistique & Cargaisons",
        cargo_new: "Nouvelle Cargaison",
        lbl_ref: "Référence / Nom",
        lbl_type: "Type de Contenu",
        lbl_weight: "Poids (kg)",
        lbl_status: "État Livraison",
        // Options Cargaisons
        opt_food: "Vivres 🍎",
        opt_material: "Matériel 🛠️",
        opt_fuel: "Carburant ⛽",
        opt_science: "Scientifique 🔬",
        stat_pending: "En Attente ⏳",
        stat_transit: "En Transit 🚚",
        stat_delivered: "Livré ✅",
        // Tableau Cargaisons
        th_ref: "Référence",
        th_type: "Type",
        th_weight: "Poids",
        th_status: "Statut",
        // Modales Cargaisons
        modal_cargo_title: "Bordereau Cargaison",
        delete_cargo_title: "Supprimer la cargaison ?",
        warn_irreversible_cargo: "Cette action est irréversible. La cargaison sera retirée de l'inventaire.",

        // --- PAGE PLANÈTES ---
        page_planets: "Systèmes Planétaires",
        planet_new: "Nouvelle Planète",
        lbl_planet_name: "Nom de la Planète",
        lbl_planet_type: "Type Planétaire",
        lbl_planet_dist: "Distance (Millions km)",
        lbl_planet_status: "Statut d'Exploration",
        btn_save_planet: "Enregistrer",
        // Options Planètes
        opt_telluric: "Tellurique (Rocheuse) 🪨",
        opt_gas: "Géante Gazeuse ☁️",
        opt_ice: "Géante de Glace ❄️",
        opt_dwarf: "Planète Naine 🌑",
        opt_explored: "Explorée ✅",
        opt_targeted: "Ciblée (Prochaine Mission) 🎯",
        opt_unknown: "Inconnue / Hostile ⚠️",
        opt_colonized: "Colonisée 🏙️",
        // Tableau Planètes
        th_planet_name: "Nom",
        th_planet_type: "Type",
        th_planet_dist: "Distance (Terre)",
        th_planet_status: "Statut",
        // Modales Planètes
        modal_planet_title: "Données Planétaires",
        lbl_planet_name_modal: "Nom",
        lbl_planet_type_modal: "Type",
        lbl_planet_dist_modal: "Distance",
        lbl_planet_status_modal: "Statut",
        delete_planet_title: "Supprimer la planète ?",
        warn_irreversible_planet: "Cette action est irréversible. Les données géologiques seront perdues.",

        // --- BOUTONS COMMUNS ---
        btn_cancel: "Annuler",
        btn_confirm_delete: "Oui, supprimer"
    },

    en: {
        // --- SIDEBAR ---
        sidebar_dashboard: "Dashboard",
        sidebar_astro: "Astronauts",
        sidebar_rockets: "Rockets",
        sidebar_missions: "Missions",
        sidebar_cargo: "Cargo",
        sidebar_planets: "Planets",

        // --- HEADER ---
        header_admin: "Admin",
        logout_btn: "Logout",

        // --- DASHBOARD ---
        page_dashboard: "Global View",
        card_astro: "Active Astronauts",
        card_missions: "Total Missions",
        card_cargo: "Logistics (Weight)",
        card_budget: "Fleet Cost",
        graph_overview: "Modules Overview",
        graph_astro: "Astronauts • Role Distribution",
        graph_rockets: "Rockets • Status",
        graph_missions: "Missions • By Destination",
        graph_cargo: "Cargo • Weight per Entry",
        graph_planets: "Planets • Distance",

        // --- ASTRONAUTS ---
        page_astro: "Astronaut Management",
        astro_new: "New Astronaut",
        lbl_name: "Astronaut Name",
        lbl_role: "Rank / Role",
        lbl_mission: "Assigned Mission",
        btn_save: "Save",
        btn_csv: "Export CSV",
        th_name: "Name",
        th_role: "Rank",
        th_mission: "Mission",
        th_actions: "Actions",

        // --- ROCKETS ---
        page_rockets: "Rocket Fleet",
        rocket_new: "New Rocket",
        lbl_model: "Model Name",
        lbl_maker: "Manufacturer",
        lbl_status_tech: "Technical Status",
        btn_save_rocket: "Save Rocket",
        opt_operational: "Operational ✅",
        opt_maintenance: "In Maintenance 🛠️",
        opt_test: "Testing ⚠️",
        opt_retired: "Retired 🛑",
        th_model: "Model",
        th_maker: "Manufacturer",
        th_status: "Status",
        modal_rocket_title: "Technical Sheet",
        lbl_model_modal: "Model",
        lbl_maker_modal: "Manufacturer",
        lbl_status_tech_modal: "Technical Status",
        delete_rocket_title: "Dismantle Rocket?",
        warn_irreversible_rocket: "This action is irreversible. Are you sure you want to permanently delete this rocket from the fleet?",

        // --- MISSIONS ---
        page_missions: "Mission Control",
        mission_new: "New Mission",
        lbl_mission_name: "Mission Name",
        lbl_mission_status: "Current Status",
        lbl_mission_dest: "Destination",
        btn_save_mission: "Save Mission",
        opt_prep: "In Preparation 🛠️",
        opt_ongoing: "Ongoing 🚀",
        opt_finished: "Completed ✅",
        opt_cancelled: "Cancelled ❌",
        th_mission: "Mission",
        th_dest: "Destination",
        th_status: "Status",
        modal_mission_title: "Mission Details",
        lbl_mission_name_modal: "Mission Name",
        lbl_mission_dest_modal: "Destination",
        lbl_mission_status_modal: "Current Status",
        delete_mission_title: "Delete Mission?",
        warn_irreversible_mission: "This action is irreversible. The mission will be removed from history.",

        // --- CARGO ---
        page_cargaisons: "Logistics & Cargo",
        cargo_new: "New Cargo",
        lbl_ref: "Reference / Name",
        lbl_type: "Content Type",
        lbl_weight: "Weight (kg)",
        lbl_status: "Delivery Status",
        opt_food: "Food Supplies 🍎",
        opt_material: "Material 🛠️",
        opt_fuel: "Fuel ⛽",
        opt_science: "Scientific 🔬",
        stat_pending: "Pending ⏳",
        stat_transit: "In Transit 🚚",
        stat_delivered: "Delivered ✅",
        th_ref: "Reference",
        th_type: "Type",
        th_weight: "Weight",
        th_status: "Status",
        modal_cargo_title: "Cargo Manifest",
        delete_cargo_title: "Delete Cargo?",
        warn_irreversible_cargo: "This action is irreversible. The cargo will be removed from inventory.",

        // --- PLANETS ---
        page_planets: "Planetary Systems",
        planet_new: "New Planet",
        lbl_planet_name: "Planet Name",
        lbl_planet_type: "Planetary Type",
        lbl_planet_dist: "Distance (Million km)",
        lbl_planet_status: "Exploration Status",
        btn_save_planet: "Save",
        opt_telluric: "Terrestrial (Rocky) 🪨",
        opt_gas: "Gas Giant ☁️",
        opt_ice: "Ice Giant ❄️",
        opt_dwarf: "Dwarf Planet 🌑",
        opt_explored: "Explored ✅",
        opt_targeted: "Targeted (Next Mission) 🎯",
        opt_unknown: "Unknown / Hostile ⚠️",
        opt_colonized: "Colonized 🏙️",
        th_planet_name: "Name",
        th_planet_type: "Type",
        th_planet_dist: "Distance (Earth)",
        th_planet_status: "Status",
        modal_planet_title: "Planetary Data",
        lbl_planet_name_modal: "Name",
        lbl_planet_type_modal: "Type",
        lbl_planet_dist_modal: "Distance",
        lbl_planet_status_modal: "Status",
        delete_planet_title: "Delete Planet?",
        warn_irreversible_planet: "This action is irreversible. Geological data will be lost.",

        // --- COMMON ---
        btn_cancel: "Cancel",
        btn_confirm_delete: "Yes, delete"
    },

    ar: {
        // --- SIDEBAR ---
        sidebar_dashboard: "لوحة القيادة",
        sidebar_astro: "رواد الفضاء",
        sidebar_rockets: "الصواريخ",
        sidebar_missions: "المهام",
        sidebar_cargo: "الشحنات",
        sidebar_planets: "الكواكب",

        // --- HEADER ---
        header_admin: "مسؤول",
        logout_btn: "خروج",

        // --- DASHBOARD ---
        page_dashboard: "نظرة عامة",
        card_astro: "رواد فضاء نشطون",
        card_missions: "إجمالي المهام",
        card_cargo: "اللوجستيات (الوزن)",
        card_budget: "تكلفة الأسطول",
        graph_overview: "نظرة عامة على الوحدات",
        graph_astro: "رواد الفضاء • توزيع الأدوار",
        graph_rockets: "الصواريخ • الحالة",
        graph_missions: "المهام • حسب الوجهة",
        graph_cargo: "الشحنات • الوزن لكل مدخل",
        graph_planets: "الكواكب • المسافة",

        // --- ASTRONAUTS ---
        page_astro: "إدارة رواد الفضاء",
        astro_new: "رائد فضاء جديد",
        lbl_name: "اسم رائد الفضاء",
        lbl_role: "الرتبة / الدور",
        lbl_mission: "المهمة المعينة",
        btn_save: "حفظ",
        btn_csv: "تصدير CSV",
        th_name: "الاسم",
        th_role: "الرتبة",
        th_mission: "المهمة",
        th_actions: "إجراءات",

        // --- ROCKETS ---
        page_rockets: "إدارة الصواريخ",
        rocket_new: "صاروخ جديد",
        lbl_model: "اسم الطراز",
        lbl_maker: "الشركة المصنعة",
        lbl_status_tech: "الحالة الفنية",
        btn_save_rocket: "حفظ الصاروخ",
        opt_operational: "جاهز للعمل ✅",
        opt_maintenance: "تحت الصيانة 🛠️",
        opt_test: "قيد الاختبار ⚠️",
        opt_retired: "خارج الخدمة 🛑",
        th_model: "الطراز",
        th_maker: "المصنع",
        th_status: "الحالة",
        modal_rocket_title: "ورقة فنية",
        lbl_model_modal: "الطراز",
        lbl_maker_modal: "المصنع",
        lbl_status_tech_modal: "الحالة الفنية",
        delete_rocket_title: "تفكيك الصاروخ؟",
        warn_irreversible_rocket: "هذا الإجراء لا رجعة فيه. هل أنت متأكد أنك تريد حذف هذا الصاروخ نهائياً من الأسطول؟",

        // --- MISSIONS ---
        page_missions: "إدارة المهام",
        mission_new: "مهمة جديدة",
        lbl_mission_name: "اسم المهمة",
        lbl_mission_status: "الحالة الحالية",
        lbl_mission_dest: "الوجهة",
        btn_save_mission: "حفظ المهمة",
        opt_prep: "قيد التحضير 🛠️",
        opt_ongoing: "جارية 🚀",
        opt_finished: "مكتملة ✅",
        opt_cancelled: "ملغاة ❌",
        th_mission: "المهمة",
        th_dest: "الوجهة",
        th_status: "الحالة",
        modal_mission_title: "تفاصيل المهمة",
        lbl_mission_name_modal: "اسم المهمة",
        lbl_mission_dest_modal: "الوجهة",
        lbl_mission_status_modal: "الحالة الحالية",
        delete_mission_title: "حذف المهمة؟",
        warn_irreversible_mission: "هذا الإجراء لا رجعة فيه. سيتم حذف المهمة من السجل.",

        // --- CARGO ---
        page_cargaisons: "اللوجستيات والشحنات",
        cargo_new: "شحنة جديدة",
        lbl_ref: "المرجع / الاسم",
        lbl_type: "نوع المحتوى",
        lbl_weight: "الوزن (كجم)",
        lbl_status: "حالة التسليم",
        opt_food: "إمدادات غذائية 🍎",
        opt_material: "معدات 🛠️",
        opt_fuel: "وقود ⛽",
        opt_science: "علمي 🔬",
        stat_pending: "قيد الانتظار ⏳",
        stat_transit: "في الطريق 🚚",
        stat_delivered: "تم التسليم ✅",
        th_ref: "المرجع",
        th_type: "النوع",
        th_weight: "الوزن",
        th_status: "الحالة",
        modal_cargo_title: "قائمة الشحن",
        delete_cargo_title: "حذف الشحنة؟",
        warn_irreversible_cargo: "هذا الإجراء لا رجعة فيه. ستتم إزالة الشحنة من المخزون.",

        // --- PLANETS ---
        page_planets: "الأنظمة الكوكبية",
        planet_new: "كوكب جديد",
        lbl_planet_name: "اسم الكوكب",
        lbl_planet_type: "نوع الكوكب",
        lbl_planet_dist: "المسافة (مليون كم)",
        lbl_planet_status: "حالة الاستكشاف",
        btn_save_planet: "حفظ",
        opt_telluric: "صخري (أرضي) 🪨",
        opt_gas: "عملاق غازي ☁️",
        opt_ice: "عملاق جليدي ❄️",
        opt_dwarf: "كوكب قزم 🌑",
        opt_explored: "مستكشف ✅",
        opt_targeted: "مستهدف (المهمة القادمة) 🎯",
        opt_unknown: "مجهول / عدائي ⚠️",
        opt_colonized: "مستعمر 🏙️",
        th_planet_name: "الاسم",
        th_planet_type: "النوع",
        th_planet_dist: "المسافة (عن الأرض)",
        th_planet_status: "الحالة",
        modal_planet_title: "بيانات الكوكب",
        lbl_planet_name_modal: "الاسم",
        lbl_planet_type_modal: "النوع",
        lbl_planet_dist_modal: "المسافة",
        lbl_planet_status_modal: "الحالة",
        delete_planet_title: "حذف الكوكب؟",
        warn_irreversible_planet: "هذا الإجراء لا رجعة فيه. سيتم فقدان البيانات الجيولوجية.",

        // --- COMMON ---
        btn_cancel: "إلغاء",
        btn_confirm_delete: "نعم، حذف"
    }
};

function changeLanguage(lang) {
    // 1. Sauvegarder la langue
    localStorage.setItem('orbitLang', lang);

    // 2. Gérer le RTL (Arabe) ou LTR
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.classList.add('font-arabic');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.classList.remove('font-arabic');
    }

    // 3. Remplacer les textes
    const keys = translations[lang];
    if (!keys) return; // Sécurité si la langue n'existe pas

    for (const key in keys) {
        const element = document.getElementById('t-' + key);
        if (element) {
            // Si c'est un <input> avec placeholder
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
               // On pourrait traduire le placeholder si on veut, mais ici on gère innerText
            }
            // Si c'est un select option, ou span, ou h2...
            element.innerText = keys[key];
        }
    }

    // 4. Mettre à jour le selecteur (si présent)
    const select = document.getElementById('langSelector');
    if (select) select.value = lang;
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('orbitLang') || 'fr';
    changeLanguage(savedLang);

    // Écouteur sur le selecteur
    const select = document.getElementById('langSelector');
    if (select) {
        select.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
});
