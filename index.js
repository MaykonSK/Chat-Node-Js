//socket.io necessita a requisição http nativa do node
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

//evento de conexao
//socket é a instancia do cliente
io.on('connection', socket => {

    socket.on('disconnect', () => {
        console.log('[ x ] Socket '+socket.id+' desconectou.')
        
    })

    socket.on('msg', dados => {
        //socket.emit('showmsg', dados);
        //*envia msg para todos, menos para o cliente
        //socket.broadcast.emit('showmsg', dados);
        //*envia msg para todos
        io.emit('showmsg', dados);
        console.log(dados)
    })
})

//utilizar o htpp nativo para criar o servidor
http.listen(80, () => {
    console.log('Servidor rodando')
});
