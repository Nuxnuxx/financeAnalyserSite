
async function getData(){
	// SEND GET REQUEST TO API
	const response = await fetch('/api')
	// TRANSFORM IT TO JSON
	const data = await response.json()
	console.log(data)
	display(data)
}

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});


function display(params){
	const table = document.getElementById('myTable');
	let i = 0;
	for(items of params){
		var row = table.insertRow(i+1)
		var cell1 = row.insertCell(0)
		var cell2 = row.insertCell(1)
		var cell3 = row.insertCell(2)
		var cell4 = row.insertCell(3)
		var cell5 = row.insertCell(4)
		var cell6 = row.insertCell(5)
		var cell7 = row.insertCell(6)


		cell1.innerHTML = i+1
		cell2.innerHTML = items.symbol
		cell3.innerHTML = items.earningyield
		cell4.innerHTML = items.roce
		cell5.innerHTML = items.roic
		cell6.innerHTML = items.dter
		cell7.innerHTML = items.date
		i++
	}
}

getData()
