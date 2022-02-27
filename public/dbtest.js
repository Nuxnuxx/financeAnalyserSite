function dataStructure(symbol,earningyield,roce,roic,dter,date){
	this.symbol = symbol
	this.earningyield = earningyield
	this.roce = roce
	this.roic = roic
	this.dter = dter
	this.date = date
}
async function getDataApi(){
	// CREATE A VAR HOURS OF NOW
	var today = new Date()
	var hours = today.getHours()

	if (hours == 22){
		let stockDataArray = [];
		// TAKE LIST OF ALL STOCKS IN NYSE
		const exchange = "NYSE"
		const apiUrlListNyse = `/stockList/${exchange}`
		// FETCH LIST OF ALL STOCK IN NYSE
		const listNyseRaw = await fetch(apiUrlListNyse)
		// TRANSFORM RESPONSE INTO JSON
		const listNyseJson = await listNyseRaw.json()
		console.log(listNyseJson)
		for (let i = 0; i < listNyseJson.length; i++)
		{
			let j = 0;
			let earningyield;
			let roce;
			let roic;
			let date;
			let dter;
			let stock = listNyseJson[i]['symbol']
			let apiUrlStock = `/financial/${stock}`
			try {
				let StockFinancialRaw = await fetch(apiUrlStock)
				let StockFinancialJson = await StockFinancialRaw.json()

			if(StockFinancialJson['financials']['quarterly']['Fiscal Year'].length - 1 > 0){

				j = StockFinancialJson['financials']['quarterly']['Fiscal Year'].length - 1
				console.log(j)

				try {
					earningyield = StockFinancialJson['financials']['quarterly']['valuation_ratios']['Earnings Yield (Joel Greenblatt) %'][j]

					roce = StockFinancialJson['financials']['quarterly']['common_size_ratios']['ROCE %'][j]
				
					roic = StockFinancialJson['financials']['quarterly']['common_size_ratios']['ROIC %'][j]

					dter = StockFinancialJson['financials']['quarterly']['common_size_ratios']['Debt-to-Equity'][j]


					date =  StockFinancialJson['financials']['quarterly']['Fiscal Year'][j]

				} catch (error) {
					console.error(error)
					earningyield = 0
					roce = 0 
					roic = 0
					dter = 0
					date = 0
				}

				stockDataArray[i] = new dataStructure(stock, earningyield, roce, roic, dter, date)
				console.log(i,stockDataArray[i])
			}
			} catch (error) {
				console.error(error)
			}
		}

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': "application/json"
			},
			body: JSON.stringify(stockDataArray)
		}

		// SEND DATA TO POST TO DB
		const apiUrl = '/api'
		const db_write = await fetch(apiUrl,options)
	} else {
		console.log('REFRESH EVERY 10am')
	}
}

setInterval(getDataApi(),3600000)
