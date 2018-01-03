const WebSocket = require('ws')
const SocketServer = WebSocket.Server
const findStock = require('./findStock.js')
const saveStock = require('./saveStock.js')

module.exports = (server) => {
    const wss = new SocketServer({server: server})
    wss.on('connection', (ws) => {
        console.log('client connected')
        ws.on('message', (search_term) => {
            findStock(search_term, (response1) => {
                if (response1.error) return res.send(response1)
                saveStock(response1.data_table, (response2) => {
                    if (response2.error === false) {
                        wss.clients.forEach((client) => {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(response2.message)
                            }
                        })
                    }
                })
            })
        })
    })
}