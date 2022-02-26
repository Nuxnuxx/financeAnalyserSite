
async function getData(){
	// SEND GET REQUEST TO API
	const response = await fetch('/api')
	// TRANSFORM IT TO JSON
	const data = await response.json()
	console.log(data)
	display(data)
}

async function sortInt(params){
	// DELETE ALL CHILD TR
	var tableHeaderRowCount = 1;
	var table = document.getElementById('myTable');
	var rowCount = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount);
	}

	const response = await fetch('/api')
	const data = await response.json()
	data.sort((a,b) => a[params] - b[params])
	console.log("data sorted",data)
	display(data)
}

// async function sortString(params){
// 	// DELETE ALL CHILD TR
// 	var tableHeaderRowCount = 1;
// 	var table = document.getElementById('myTable');
// 	var rowCount = table.rows.length;
// 	for (var i = tableHeaderRowCount; i < rowCount; i++) {
// 		table.deleteRow(tableHeaderRowCount);
// 	}

// 	const response = await fetch('/api')
// 	const data = await response.json()
// 	data.sort(function (a, b){
// 		return a.localeCompare(b)
// 	})
// 	console.log("data sorted",data)
// 	display(data)
// }


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
