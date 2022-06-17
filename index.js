var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path')
let APP_PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')));
server.listen(APP_PORT, () => {
    console.log(`SERVER RUNNING ON PORT : ${APP_PORT}`);
});
app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/public/index.html`)
})
app.get('/index.js', function(req, res) {
    res.sendFile(`${__dirname}/public/index.js`)
})
io.on("connection", (socket) => {
    socket.on("msg", (arg) => {
        console.log(arg)
        argu = JSON.parse(arg)
        const d = new Date();
        let hora = d.getHours();
        let minutos = d.getMinutes();
        let segundos = d.getSeconds();

        var fecha = hora + ":" + minutos + ":" + segundos
        argum = JSON.stringify({
            "usuario": argu.usuario,
            "msg": argu.msg,
            "tiempo": fecha
        })
        io.emit('msg', argum)
    });
});
