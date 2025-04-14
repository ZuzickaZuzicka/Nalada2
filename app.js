let records = [];

// Prihlásenie bez hesla
function accessApp() {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadRecords();
}

// Pridanie záznamu
function addRecord() {
    const date = document.getElementById("record-date").value;
    const time = document.getElementById("record-time").value;
    const throwUp = document.getElementById("throw-up-check").checked;
    const trigger = document.getElementById("trigger").value || "N/A";
    const foodAfter = document.getElementById("food-after").value || "N/A";
    const comments = document.getElementById("comments").value || "N/A";

    if (!date || !time) {
        alert("Dátum a čas sú povinné!");
        return;
    }

    const record = { date, time, throwUp, trigger, foodAfter, comments };
    records.push(record);
    saveRecords();
    updateRecordList();
}

// Uloženie údajov do localStorage
function saveRecords() {
    try {
        localStorage.setItem("records", JSON.stringify(records));
    } catch (error) {
        console.error("Chyba pri ukladaní záznamov:", error);
    }
}

// Načítanie údajov z localStorage
function loadRecords() {
    try {
        const storedRecords = localStorage.getItem("records");
        if (storedRecords) {
            records = JSON.parse(storedRecords);
            updateRecordList();
        }
    } catch (error) {
        console.error("Chyba pri načítaní záznamov:", error);
    }
}

// Aktualizácia zoznamu záznamov
function updateRecordList() {
    const recordList = document.getElementById("record-list");
    recordList.innerHTML = "";

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>Dátum</th>
        <th>Čas</th>
        <th>Vracanie</th>
        <th>Impulz</th>
        <th>Jedlo po vracaní</th>
        <th>Komentár</th>
    `;
    recordList.appendChild(headerRow);

    records.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.time}</td>
            <td>${record.throwUp ? "Áno" : "Nie"}</td>
            <td>${record.trigger}</td>
            <td>${record.foodAfter}</td>
            <td>${record.comments}</td>
        `;
        recordList.appendChild(row);
    });
}

// Funkcia toggleHistory
function toggleHistory() {
    const historyDiv = document.getElementById("history");
    if (historyDiv.style.display === "none") {
        historyDiv.style.display = "block";
    } else {
        historyDiv.style.display = "none";
    }
}

// Filtrovanie záznamov
function applyFilter() {
    const startDate = document.getElementById("filter-date-start").value;
    const startTime = document.getElementById("filter-time-start").value;
    const endDate = document.getElementById("filter-date-end").value;
    const endTime = document.getElementById("filter-time-end").value;

    const startDateTime = startDate && startTime ? new Date(`${startDate}T${startTime}`) : null;
    const endDateTime = endDate && endTime ? new Date(`${endDate}T${endTime}`) : null;

    const filteredRecords = records.filter(record => {
        const recordDateTime = new Date(`${record.date}T${record.time}`);
        return (!startDateTime || recordDateTime >= startDateTime) &&
               (!endDateTime || recordDateTime <= endDateTime);
    });

    const recordList = document.getElementById("record-list");
    recordList.innerHTML = "";

    filteredRecords.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.time}</td>
            <td>${record.throwUp ? "Áno" : "Nie"}</td>
            <td>${record.trigger}</td>
            <td>${record.foodAfter}</td>
            <td>${record.comments}</td>
        `;
        recordList.appendChild(row);
    });
}
