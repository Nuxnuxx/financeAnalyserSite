document.getElementById('geolocate').addEventListener('click', event => {
	if('geolocation' in navigator){
		console.log('geolocation available')
		navigator.geolocation.getCurrentPosition(async position => {
			const latitude = position.coords.latitude
			const longitude = position.coords.longitude
			document.getElementById('lat').textContent = latitude
			document.getElementById('lon').textContent = longitude
			const data = {latitude,longitude};
			const options = {
				method: 'POST',
				headers: {
					'Content-Type': "application/json"
				},
				body: JSON.stringify(data)
			}
			const apiUrl = '/api'
			const response = await fetch(apiUrl,options)
			const json = await response.json()
			console.log(json)
		})
	} else {
		console.log('geolocation not available')
	}
})
