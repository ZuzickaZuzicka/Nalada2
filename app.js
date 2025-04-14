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
    try {
        localStorage.setItem("records", JSON.stringify(records));
        console.log("Záznamy boli úspešne uložené do localStorage.");
    } catch (error) {
        console.error("Chyba pri ukladaní záznamov do localStorage:", error);
    }
}

// Načítanie údajov z localStorage
function loadRecords() {
    try {
        const storedRecords = localStorage.getItem("records");
        if (storedRecords) {
            records = JSON.parse(storedRecords);
            console.log("Načítané záznamy:", records);
            updateRecordList();
            updateStats();
        } else {
            console.log("Žiadne údaje v localStorage.");
        }
    } catch (error) {
        console.error("Chyba pri načítavaní údajov z localStorage:", error);
    }
}

// Aktualizácia zoznamu záznamov
function updateRecordList() {
    const recordList = document.getElementById("record-list");
    recordList.innerHTML = ""; // Vyčistiť tabuľku pred aktualizáciou

    // Hlavička tabuľky
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>Dátum</th>
        <th>Čas</th>
        <th>Vracanie</th>
        <th>Impulz</th>
        <th>Jedlo po vracaní</th>
        <th>Komentár</th>
        <th>Angličtina</th>
        <th>Retinol</th>
        <th>Krém</th>
    `;
    recordList.appendChild(headerRow);

    // Záznamy ako riadky
    records.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.time}</td>
            <td>${record.throwUp ? "Áno" : "Nie"}</td>
            <td>${record.trigger || "N/A"}</td>
            <td>${record.foodAfter || "N/A"}</td>
            <td>${record.comments || "N/A"}</td>
            <td>${record.english ? "Áno" : "Nie"}</td>
            <td>${record.retinol ? "Áno" : "Nie"}</td>
            <td>${record.cream || "N/A"}</td>
        `;
        recordList.appendChild(row);
    });
}

// Funkcia toggleHistory
function toggleHistory() {
    const historyDiv = document.getElementById("history");
    console.log("Funkcia toggleHistory spustená.");
    if (historyDiv.style.display === "none") {
        historyDiv.style.display = "block"; // Zobrazenie histórie
        console.log("História zobrazená.");
    } else {
        historyDiv.style.display = "none"; // Skrytie histórie
        console.log("História skrytá.");
    }
}

// Funkcia applyFilter
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
    recordList.innerHTML = ""; // Vyčistiť tabuľku
    filteredRecords.forEach(record => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.time}</td>
            <td>${record.throwUp ? "Áno" : "Nie"}</td>
            <td>${record.trigger || "N/A"}</td>
            <td>${record.foodAfter || "N/A"}</td>
            <td>${record.comments || "N/A"}</td>
            <td>${record.english ? "Áno" : "Nie"}</td>
            <td>${record.retinol ? "Áno" : "Nie"}</td>
            <td>${record.cream || "N/A"}</td>
        `;
        recordList.appendChild(row);
    });
}

// Štatistiky
function updateStats() {
    const stats = document.getElementById("stats");
    stats.innerText = `Celkový počet záznamov: ${records.length}`;
}
