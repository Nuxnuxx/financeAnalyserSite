async function getData(){
	const response = await fetch('/api')
	const data = await response.json()
	display(data)
	console.log(data)
}

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
		cell6.innerHTML = items.detr
		cell7.innerHTML = items.date
		i++
	}
}

getData()
