require('dotenv').config()
const path = require('path')
const express = require('express')
const parser = require('ua-parser-js')
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
app.get('/api/whoami', (req, res) => {
    let data = JSON.stringify(parser(req.headers['user-agent']))
    let info = JSON.parse(data)
    const user = {
        ipaddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        language:req.headers['accept-language'],
        software: info.ua
    }
    
    res.json(user)
    res.end()
})
app.listen(process.env.PORT, server)
