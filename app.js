let records = [];

// Prihlásenie
function login() {
    const password = document.getElementById("password").value;
    if (password === "tvojeheslo") {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("app").style.display = "block";
        loadRecords(); // Načítanie záznamov pri prihlásení
    } else {
        alert("Nesprávne heslo!");
    }
}

// Pridanie záznamu
function addRecord() {
    const date = document.getElementById("record-date").value;
    const time = document.getElementById("record-time").value;
    const throwUp = document.getElementById("throw-up-check").checked;
    const trigger = document.getElementById("trigger").value;
    const foodAfter = document.getElementById("food-after").value;
    const comments = document.getElementById("comments").value;
    const english = document.getElementById("english").checked;
    const retinol = document.getElementById("retinol").checked;
    const cream = document.getElementById("cream").value;

    if (!date || !time) {
        alert("Dátum a čas sú povinné!");
        return;
    }

    const record = { date, time, throwUp, trigger, foodAfter, comments, english, retinol, cream };
    records.push(record);
    console.log(records); // Sleduj pridanie nového záznamu
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
        console.log(records); // Sleduj načítanie údajov zo storage
        updateRecordList();
    }
}

// Aktualizácia zoznamu záznamov
function updateRecordList() {
    console.log(records); // Sleduj obsah records pri aktualizácii zoznamu
    const recordList = document.getElementById("record-list");
    recordList.innerHTML = ""; // Vyčistenie zoznamu pred aktualizáciou
    records.forEach((record, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${record.date} ${record.time} - ${record.throwUp ? "Vracanie" : "Bez vracania"}
            <br>Impulz: ${record.trigger || "N/A"} 
            <br>Jedlo po vracaní: ${record.foodAfter || "N/A"} 
            <br>Komentár: ${record.comments || "N/A"}
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
    const newEnglish = prompt("Uprav komentár:", record.comments || "");
    const newRetinol = prompt("Uprav komentár:", record.comments || "");
    const newCream = prompt("Uprav komentár:", record.comments || "");
    if (newTrigger !== null) record.trigger = newTrigger;
    if (newFoodAfter !== null) record.foodAfter = newFoodAfter;
    if (newComments !== null) record.comments = newComments;
    if (newEnglish !== null) record.comments = newComments;
    if (newRetinol !== null) record.comments = newComments;
    if (newCream !== null) record.comments = newComments;
    
    saveRecords();
    updateRecordList();
}

// Vymazanie záznamu
function deleteRecord(index) {
    if (confirm("Naozaj chceš záznam vymazať?")) {
        records.splice(index, 1);
        saveRecords();
        updateRecordList();
    }
}

// Prepínanie zobrazenia histórie
function toggleHistory() {
    const historyDiv = document.getElementById("history");
    if (historyDiv.style.display === "none") {
        historyDiv.style.display = "block";
        updateRecordList(); // Aktualizácia zoznamu pri zobrazení histórie
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
            <br>Impulz: ${record.trigger || "N/A"} 
            <br>Jedlo po vracaní: ${record.foodAfter || "N/A"} 
            <br>Komentár: ${record.comments || "N/A"}
            <br>Angličtina: ${record.comments || "N/A"}
            <br>Retinol: ${record.comments || "N/A"}
            <br>Krém: ${record.comments || "N/A"}
        `;
        recordList.appendChild(listItem);
    });
}

// Tlač záznamov
function printFiltered() {
    const startDate = document.getElementById("filter-date-start").value;
    const endDate = document.getElementById("filter-date-end").value;
    const filteredRecords = records.filter(record =>
        (!startDate || record.date >= startDate) &&
        (!endDate || record.date <= endDate)
    );
    const printableContent = filteredRecords.map(record => `
        ${record.date} ${record.time} - ${record.throwUp ? "Vracanie" : "Bez vracania"}
        \nImpulz: ${record.trigger || "N/A"} 
        \nJedlo po vracaní: ${record.foodAfter || "N/A"} 
        \nKomentár: ${record.comments || "N/A"}
        \nAngličtina: ${record.comments || "N/A"}
        \nRetinol: ${record.comments || "N/A"}
        \nKrém: ${record.comments || "N/A"}
    `).join("\n\n");
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`<pre>${printableContent}</pre>`);
    printWindow.document.close();
    printWindow.print();
}

// Vyčistenie formulára
function clearForm() {
    document.getElementById("record-date").value = "";
    document.getElementById("record-time").value = "";
    document.getElementById("throw-up-check").checked = false;
    document.getElementById("trigger").value = "";
    document.getElementById("food-after").value = "";
    document.getElementById("comments").value = "";
    document.getElementById("english").value = "";
    document.getElementById("retinol").value = "";
    document.getElementById("cream").value = "";
}

// Načítanie údajov pri načítaní stránky
window.onload = loadRecords;
