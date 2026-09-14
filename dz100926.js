const express = require('express');
const moment = require('moment');

const HOST = 'localhost'
const PORT = 8000

const app = express()
app.get('/health', (req, res) => {
    const status = "ok";
    res.status(200).json({"status": status})
})

app.get('/stats', (req, res) => {
    const uptime = process.uptime();
    const nodeVersion = process.version;
    const timestamp = moment().format('HH:mm:ss');
    res.status(200).json({
            "uptime": uptime,
            "nodeVersion": nodeVersion,
            "timestamp": timestamp

    })
})

app.listen(PORT, HOST, () => {
    console.log(`server is runnig on http://${HOST}:${PORT}/health`)
})