let records = [];

// Prihlásenie bez hesla
function accessApp() {
    document.getElementById("login-screen").style.display = "none"; // Skrytie prihlasovacej obrazovky
    document.getElementById("app").style.display = "block"; // Zobrazenie hlavnej aplikácie
    loadRecords(); // Načítanie existujúcich záznamov z localStorage
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
    records.forEach(record => {
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

// Filter záznamov podľa dátumu a času
function applyFilter() {
    const startDate = document.getElementById("filter-date-start").value;
    const startTime = document.getElementById("filter-time-start").value;
    const endDate = document.getElementById("filter-date-end").value;
    const endTime = document.getElementById("filter-time-end").value;

    const filteredRecords = records.filter(record => {
        const recordDateTime = `${record.date}T${record.time}`;
        const startDateTime = startDate && startTime ? `${startDate}T${startTime}` : null;
        const endDateTime = endDate && endTime ? `${endDate}T${endTime}` : null;

        return (!startDateTime || recordDateTime >= startDateTime) &&
               (!endDateTime || recordDateTime <= endDateTime);
    });

    displayFilteredRecords(filteredRecords);
}

// Zobrazenie filtrovaných záznamov
function displayFilteredRecords(filteredRecords) {
    const recordList = document.getElementById("record-list");
    recordList.innerHTML = ""; // Vymazanie pred zobrazením
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

// Štatistiky
function updateStats() {
    const stats = document.getElementById("stats");
    stats.innerText = `Celkový počet záznamov: ${records.length}`;
}
