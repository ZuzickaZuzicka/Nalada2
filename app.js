let records = [];

// Prihlásenie
function login() {
    const PASSWORD = "tvojeheslo"; // Statické heslo priamo v kóde
    const passwordInput = document.getElementById("password").value;
    if (passwordInput === PASSWORD) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("app").style.display = "block";
        loadRecords(); // Načítanie údajov
    } else {
        alert("Nesprávne heslo!");
    }
}

// Pridanie záznamu
function addRecord() {
    const date = document.getElementById("record-date").value;
    const time = document.getElementById("record-time").value;
    const throwUp = document.getElementById("throw-up-check").checked;
    const trigger = document.getElementById("trigger").value || "N/A";
    const foodAfter = document.getElementById("food-after").value || "N/A";
    const comments = document.getElementById("comments").value || "N/A";
    const english = document.getElementById("english").checked;
    const retinol = document.getElementById("retinol").checked;
    const cream = document.getElementById("cream").value || "N/A";

    if (!date || !time) {
        alert("Dátum a čas sú povinné!");
        return;
    }

    const record = { date, time, throwUp, trigger, foodAfter, comments, english, retinol, cream };
    records.push(record);
    saveRecords();
    updateRecordList();
    clearForm();
}

// Uloženie údajov do localStorage
function saveRecords() {
    localStorage.setItem("records", JSON.stringify(records));
}

// Načítanie údajov z localStorage
function loadRecords() {
    const storedRecords = localStorage.getItem("records");
    if (storedRecords) {
        records = JSON.parse(storedRecords);
        updateRecordList();
        updateStats();
    }
}

// Aktualizácia zoznamu záznamov
function updateRecordList() {
    const recordList = document.getElementById("record-list");
    recordList.innerHTML = ""; // Vymazanie zoznamu pred aktualizáciou
    records.forEach((record, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${record.date} ${record.time} - ${record.throwUp ? "Vracanie" : "Bez vracania"}
            <br>Impulz: ${record.trigger}
            <br>Jedlo po vracaní: ${record.foodAfter}
            <br>Komentár: ${record.comments}
            <br>Angličtina: ${record.english ? "Áno" : "Nie"}
            <br>Retinol: ${record.retinol ? "Áno" : "Nie"}
            <br>Krém: ${record.cream}
            <button onclick="editRecord(${index})">Upraviť</button>
            <button onclick="deleteRecord(${index})">Vymazať</button>
        `;
        recordList.appendChild(listItem);
    });
}

// Editácia záznamu
function editRecord(index) {
    const record = records[index];
    const newTrigger = prompt("Uprav impulz:", record.trigger || "");
    const newFoodAfter = prompt("Uprav jedlo po vracaní:", record.foodAfter || "");
    const newComments = prompt("Uprav komentár:", record.comments || "");
    const newEnglish = confirm("Učila si sa dnes angličtinu?") ? true : false;
    const newRetinol = confirm("Použila si dnes retinol?") ? true : false;
    const newCream = prompt("Uprav krém:", record.cream || "N/A");

    if (newTrigger !== null) record.trigger = newTrigger;
    if (newFoodAfter !== null) record.foodAfter = newFoodAfter;
    if (newComments !== null) record.comments = newComments;
    record.english = newEnglish;
    record.retinol = newRetinol;
    if (newCream !== null) record.cream = newCream;

    saveRecords();
    updateRecordList();
    updateStats();
}

// Vymazanie záznamu
function deleteRecord(index) {
    if (confirm("Naozaj chceš záznam vymazať?")) {
        records.splice(index, 1);
        saveRecords();
        updateRecordList();
        updateStats();
    }
}

// Prepínanie zobrazenia histórie
function toggleHistory() {
    const historyDiv = document.getElementById("history");
    if (historyDiv.style.display === "none") {
        historyDiv.style.display = "block";
        updateRecordList();
    } else {
        historyDiv.style.display = "none";
    }
}

// Filter záznamov podľa dátumu
function applyFilter() {
    const startDate = document.getElementById("filter-date-start").value;
    const endDate = document.getElementById("filter-date-end").value;
    const filteredRecords = records.filter(record =>
        (!startDate || record.date >= startDate) &&
        (!endDate || record.date <= endDate)
    );
    displayFilteredRecords(filteredRecords);
}

// Zobrazenie filtrovaných záznamov
function displayFilteredRecords(filteredRecords) {
    const recordList = document.getElementById("record-list");
    recordList.innerHTML = "";
    filteredRecords.forEach(record => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${record.date} ${record.time} - ${record.throwUp ? "Vracanie" : "Bez vracania"}
            <br>Impulz: ${record.trigger}
            <br>Jedlo po vracaní: ${record.foodAfter}
            <br>Komentár: ${record.comments}
            <br>Angličtina: ${record.english ? "Áno" : "Nie"}
            <br>Retinol: ${record.retinol ? "Áno" : "Nie"}
            <br>Krém: ${record.cream}
        `;
        recordList.appendChild(listItem);
    });
}

// Tlač záznamov
function printFiltered() {
    const start
