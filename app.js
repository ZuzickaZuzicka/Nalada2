let records = [];  

// Prihlásenie na heslo  
document.getElementById("login-button").onclick = accessApp;  

function accessApp() {  
    const passwordInput = prompt("Zadajte heslo:");  
    console.log(`Zadané heslo: ${passwordInput}`); // Debug  
    if (passwordInput === "zuzana") {  
        console.log('Prihlásenie úspešné'); // Debug  
        document.getElementById("login-screen").style.display = "none"; // Skrytie prihlasovacej obrazovky  
        document.getElementById("app").style.display = "block"; // Zobrazenie hlavnej aplikácie  
        loadRecords(); // Načítanie existujúcich záznamov z localStorage  
    } else {  
        alert("Nesprávne heslo!");  
    }  
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

    // Hlavička tabuľky  
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

// Funkcia na prepínanie histórie  
function toggleHistory() {  
    const historyDiv = document.getElementById("history");  
    historyDiv.style.display = historyDiv.style.display === "none" ? "block" : "none";  
}  

// Filtro
