async function getData(){
	const response = await fetch('/api')
	const data = await response.json()
	for(items of data){
		const root = document.createElement('div');
		const geo = document.createElement('div');
		geo.textContent = `${items.latitude}°, ${items.longitude}°`
		root.append(geo)
		document.body.append(root)
	}
	console.log(data)
}
getData()
