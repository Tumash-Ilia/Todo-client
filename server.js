const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 8080
const app = express()

/**
 * Server pro zobrazeni FE na heroku
 */

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, "build")))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(PORT)