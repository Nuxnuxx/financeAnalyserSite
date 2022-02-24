// DECLARATION MODULE
const express = require('express')
const Datastore = require('nedb')
const fetch = require('node-fetch')
const app = express()
const port = process.env.PORT || 3000
require('dotenv').config()

// START OF SERVER
app.listen(port,() => console.log(`listening at ${port}`))
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

// SETUP DATABASE
const database = new Datastore('database.db')
database.loadDatabase()

// GET SERVER --> CLIENT
app.get('/api', (request,response) => {
	console.log('API GET')
	database.find({}, (err,data) => {
		if (err){
			response.end()
			return
		}
		response.json(data)
	})
})

// POST CLIENT --> SERVER
app.post('/api', (request,response) => {
	console.log('API POST')
	const data = request.body
	database.insert(data)
	response.json(data)
})

// GURUSTOCKS EXTERNAL API --> SERVER
app.get('/finance/', async (request,response) => {
	console.log('FINANCE GET')
	const endpoint = request.params.endpoint
	const apiKey = process.env.API_KEY
	const apiUrl = `https://api.gurufocus.com/public/user/${apiKey}/exchange_stocks/NYSE`
	const fetch_response = await fetch(apiUrl)
	const json = await fetch_response.json()
	response.json(json)
})
