const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const modules = require('./modules')
const ejs = require('ejs')
const path = require('path')
const cors = require('cors')

app.set('views', path.resolve(__dirname, './views/'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(modules)
app.listen(PORT, console.log(PORT))