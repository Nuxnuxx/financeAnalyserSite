async function getData(){
	const response = await fetch('/api')
	const data = await response.json()
	const table = document.getElementById('myTable');
	let i = 0;
	for(items of data){
		var row = table.insertRow(i+1)
		var cell1 = row.insertCell(0)
		var cell2 = row.insertCell(1)

		cell1.innerHTML = i+1
		cell2.innerHTML = items.symbol
		i++
	}
	console.log(data)
}
getData()
