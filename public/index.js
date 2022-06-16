! function(o) {
    console.old = console.log, console.log = function() {
        var n, e, t = "";
        for (e = 0; e < arguments.length; e++) t += '<span class="log-' + typeof(n = arguments[e]) + '">', "object" == typeof n && "object" == typeof JSON && "function" == typeof JSON.stringify ? t += JSON.stringify(n) : t += n, t += "</span>&nbsp;";
        o.innerHTML += t + "<br>", console.old.apply(void 0, arguments)
    }
}
(document.body);




const socket = io();

var nombre = prompt("Nombre de usuario")
if (!nombre) {
    var nombre = prompt("Nombre de usuario")
}

function enviarmensaje() {
    var mensaje = document.getElementById("texto").value
    if (!mensaje) {
        return;
    }
    const d = new Date();
    let hora = d.getHours();
    let minutos = d.getMinutes();
    let segundos = d.getSeconds();

    var fecha = hora + ":" + minutos + ":" + segundos


    socket.emit("msg", JSON.stringify({
        "usuario": nombre,
        "msg": mensaje,
        "tiempo": fecha
    }));
}




socket.on("msg", (arg) => {
    var msg = JSON.parse(arg)
    console.log(msg.tiempo, "|| Usuario: " + msg.usuario + "<br>" + msg.msg)
    window.scrollTo(0, document.body.scrollHeight);
})