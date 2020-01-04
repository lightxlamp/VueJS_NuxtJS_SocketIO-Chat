const app = require('express')()
const server = require('http').createServer(app) // node native 
const io = require('socket.io')(server) // Sockets configurated. Now we can use them

io.on('connection', (socket) => {
    console.log('IO connected');

    socket.on('createMessage', data => {
        setTimeout(() => {
            socket.emit('newMessageStore', {
                text: data.text + ' SERVER'
            })
        }, 500)
    })

    socket.emit('newMessageStore', {
        text: 'WHAT'
    })
})

module.exports = {
    app, server 
} 