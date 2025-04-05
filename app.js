let moods = []; // Ukladanie nálad
let throwUps = []; // Ukladanie vracania

// Funkcia na zaznamenanie nálady
function recordMood(mood) {
    let currentDate = new Date();
    let moodData = {
        date: currentDate.toISOString().split('T')[0],
        time: currentDate.toLocaleTimeString(),
        mood: mood
    };
    moods.push(moodData);
    updateMoodList();
}

// Funkcia na aktualizáciu zoznamu nálad
function updateMoodList() {
    let moodList = document.getElementById("mood-list");
    moodList.innerHTML = "";
    moods.forEach((moodData, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `${moodData.date} ${moodData.time}: ${moodData.mood} <button onclick="editMood(${index})">Upravit</button>`;
        moodList.appendChild(listItem);
    });
}

// Funkcia na editovanie nálady
function editMood(index) {
    let newMood = prompt("Zadaj novú náladu:", moods[index].mood);
    if (newMood) {
        moods[index].mood = newMood;
        updateMoodList();
    }
}

// Funkcia na zaznamenanie vracania
function recordThrowUp() {
    let reason = document.getElementById("reason").value;
    let currentDate = new Date();
    let throwUpData = {
        date: currentDate.toISOString().split('T')[0],
        time: currentDate.toLocaleTimeString(),
        reason: reason
    };
    throwUps.push(throwUpData);
    updateThrowUpList();
    document.getElementById("reason").value = ""; // Vymazať pole komentára po zaznamenaní
}

// Funkcia na aktualizáciu zoznamu vracania
function updateThrowUpList() {
    let throwUpList = document.getElementById("throw-up-list");
    throwUpList.innerHTML = "";
    throwUps.forEach((throwUpData, index) => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `${throwUpData.date} ${throwUpData.time}: ${throwUpData.reason} <button onclick="editThrowUp(${index})">Upravit</button>`;
        throwUpList.appendChild(listItem);
    });
}

// Funkcia na editovanie vracania
function editThrowUp(index) {
    let newReason = prompt("Zadaj nový komentár k vracaniu:", throwUps[index].reason);
    if (newReason) {
        throwUps[index].reason = newReason;
        updateThrowUpList();
    }
}
