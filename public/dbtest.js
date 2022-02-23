async function test(){
	// CREATE A VAR HOURS OF NOW
	var today = new Date()
	var hours = today.getHours()

	if (hours == 10){
		// TAKE LIST OF ALL STOCKS IN NYSE
		// const endpoint = 'exchange_stocks/NYSE'
		// const apiUrlListNyse = `/finance/${endpoint}`
	    const apiUrlListNyse = `/finance`
		// FETCH LIST OF ALL STOCK IN NYSE
		const listNyseRaw = await fetch(apiUrlListNyse)
		// TRANSFORM RESPONSE INTO JSON
		const listNyseJson = await listNyseRaw.json()
		// VERIFY IF CORRECT
		console.log(listNyseJson)


		const options = {
			method: 'POST',
			headers: {
				'Content-Type': "application/json"
			},
			body: JSON.stringify(listNyseJson)
		}
		// SEND DATA TO POST TO DB
		const apiUrl = '/api'
		const db_write = await fetch(apiUrl,options)

	} else {
		console.log('REFRESH EVERY 10am')
	}
}

setInterval(test(),3600000)
