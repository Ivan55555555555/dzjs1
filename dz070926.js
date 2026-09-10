const express = require('express')
const moment = require('moment');

const HOST = 'localhost'
const PORT = 8000

const app = express()

app.get('/timestamp', (req, res) => {
    const now = moment().format('HH:mm:ss');
    res.status(200).json({date: now})
})

app.listen(PORT, HOST, () => {
    console.log(`server is runnig on http://${HOST}:${PORT}/timestamp`)
})