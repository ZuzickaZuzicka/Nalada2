let records = [];  

// Prihlásenie na heslo  
document.getElementById("login-button").onclick = accessApp;  

function accessApp() {  
    const passwordInput = prompt("Zadajte heslo:");  
    if (passwordInput === "zuzana") {  
        document.getElementById("login-screen").style.display = "none"; // Skrytie prihlasovacej obrazovky  
        document.getElementById("app").style.display = "block"; // Zobrazenie hlavnej aplikácie  
        loadRecords(); // Načítanie existujúcich záznamov z localStorage  
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
function loadRecords()
