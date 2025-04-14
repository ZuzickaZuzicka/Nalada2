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
        localStorage.setItem("records", JSON.stringify(records)); // Uloženie celého poľa 'records'
        console.log("Záznamy boli úspešne uložené do localStorage.");
    } catch (error) {
        console.error("Chyba pri ukladaní záznamov do localStorage:", error);
    }
}

// Načítanie údajov z localStorage
function loadRecords() {
    try {
        const storedRecords = localStorage.getItem("records"); // Načítanie zo 'localStorage'
        if (storedRecords) {
            records = JSON.parse(storedRecords); // Parsovanie JSON údajov na pole
            updateRecordList(); // Aktualizácia vizuálneho zoznamu
            updateStats(); // Aktualizácia štatistík
        } else {
            console.log("Žiadne existujúce záznamy v localStorage.");
        }
    } catch (error) {
        console.error("Chyba pri načítavaní záznamov z localStorage:", error);
    }
}


// Aktualizácia zoznamu záznamov
function updateRecordList() {
    const recordList = document.getElementById("record-list");
    recordList.innerHTML = ""; // Vyčistenie zoznamu pred aktualizáciou
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


// Štatistiky
function updateStats() {
    const stats = document.getElementById("stats");
    stats.innerText = `Celkový počet záznamov: ${records.length}`;
}
