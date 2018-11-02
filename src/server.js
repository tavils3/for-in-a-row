var io = require('socket.io')(4000);

var room = [];

io.on('connect', function (socket) {
    socket.on('message', function() {
        var el = room.indexOf(socket.id);
        if (el == -1 && room.length < 2) {
            var playerNum = room.push(socket.id);
            io.to(`${socket.id}`).emit('message', `Игрок ${playerNum}`);
        } else if (el != -1) {
            io.to(`${socket.id}`).emit('message', `Игрок ${el + 1}`);
        } else {
            io.to(`${socket.id}`).emit('message', 'Зритель');
        }
    });
    socket.on('disconnect', function() {
        var el = room.indexOf(socket.id);
        room.splice(el, 1);
    });
});