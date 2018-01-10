const WebSocket = require('ws')
const SocketServer = WebSocket.Server
const findStock = require('./findStock.js')
const addStock = require('./addStock.js')
const deleteStock = require('./deleteStock.js')

module.exports = (server) => {
    const wss = new SocketServer({server: server})
    wss.on('connection', (ws) => {
        console.log('client connected')
        ws.on('message', (msg) => {
            let msg_json = JSON.parse(msg)
            switch (msg_json.action) {
                case 'add':
                    findStock(msg_json.ticker, (response1) => {
                        if (response1.error) return ws.send(JSON.stringify(response1))
                        addStock(response1.dataset, (response2) => {
                            if (response2.error === false) {
                                wss.clients.forEach((client) => {
                                    if (client.readyState === WebSocket.OPEN) {
                                        client.send(JSON.stringify(response2))
                                    }
                                })
                            }
                        })
                    })
                case 'delete':
                    deleteStock(msg_json.ticker, (response) => {
                        if (response.error === false) {
                            wss.clients.forEach((client) => {
                                if (client.readyState === WebSocket.OPEN) {
                                    client.send(JSON.stringify(response))
                                }
                            })
                        }

                    })
            }
        })
    })
}