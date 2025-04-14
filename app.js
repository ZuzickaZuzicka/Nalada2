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

    // Filtrované záznamy ako riadky tabuľky
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
