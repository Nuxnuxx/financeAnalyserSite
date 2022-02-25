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

	if (hours == 15){
		let ArrayPush = [];
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
			let StockFinancialRaw = await fetch(apiUrlStock)
			let StockFinancialJson = await StockFinancialRaw.json()

			console.log(StockFinancialJson['financials']['quarterly']['Fiscal Year'].length - 1)

			if(StockFinancialJson['financials']['quarterly']['Fiscal Year'].length - 1 > 0){

				j = StockFinancialJson['financials']['quarterly']['Fiscal Year'].length - 1
				console.log(j)

				if(typeof StockFinancialJson['financials']['quarterly']['valuation_ratios']['Earnings Yield (Joel Greenblatt) %'][j] !== 'undefined'){
					earningyield = StockFinancialJson['financials']['quarterly']['valuation_ratios']['Earnings Yield (Joel Greenblatt) %'][j]
				}else{
					earningyield = 0
				}

				if(typeof StockFinancialJson['financials']['quarterly']['common_size_ratios']['ROCE %'][j] !== 'undefined'){
					roce = StockFinancialJson['financials']['quarterly']['common_size_ratios']['ROCE %'][j]
				}else{
					roce = 0
				}

				if(typeof StockFinancialJson['financials']['quarterly']['common_size_ratios']['ROIC %'][j] !== 'undefined'){
					roic = StockFinancialJson['financials']['quarterly']['common_size_ratios']['ROIC %'][j]
				}else{
					roic = 0
				}

				if(typeof StockFinancialJson['financials']['quarterly']['common_size_ratios']['Debt-to-Equity'][j] !== 'undefined'){
					dter = StockFinancialJson['financials']['quarterly']['common_size_ratios']['Debt-to-Equity'][j]
				}else{
					dter = 0
				}

				if(typeof StockFinancialJson['financials']['quarterly']['Fiscal Year'][j] !== 'undefined'){
					date =  StockFinancialJson['financials']['quarterly']['Fiscal Year'][j]
				}else{
					date = 0
				}
				ArrayPush[i] = new dataStructure(stock, earningyield, roce, roic, dter, date)
				console.log(i,ArrayPush[i])
			}
		}

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': "application/json"
			},
			body: JSON.stringify(ArrayPush)
		}

		// SEND DATA TO POST TO DB
		const apiUrl = '/api'
		const db_write = await fetch(apiUrl,options)
	} else {
		console.log('REFRESH EVERY 10am')
	}
}

setInterval(getDataApi(),3600000)
