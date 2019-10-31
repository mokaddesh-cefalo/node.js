process.stdout.write('\u001B[2J\u001B[0;0f');

const server = require('net').createServer();
let counter = 0;
let sockets = {};

server.on('connection', socket => {

    socket.id = counter++;
    sockets[socket.id] = socket;

    console.log('Client connected');
    socket.write("Welcome new client\n");

    
    socket.on('data', data => {
        Object.entries(sockets).forEach(([, cs]) => {
            cs.write(`${socket.id}: `);
            cs.write(`data `);
        });
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.setEncoding('utf8');
    
});

server.listen(8000, () => console.log("Server is running"));