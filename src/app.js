require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const mustache = require('mustache-express')
const app = express()

const { server } = require('./utils/server')

app.engine('mst', mustache())
app.set('view engine', 'mustache')
app.set('views', path.join(__dirname, 'views'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index.mst')
})

app.listen(process.env.PORT, server)
