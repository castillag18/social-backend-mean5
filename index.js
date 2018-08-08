'use strict'
//importar mis configuraciones predeterminadas
const config = require('./config/config');
//importar el app pre-configurado
const app = require('./app');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fetch = require('node-fetch')

const { green, yellow, cyan } = require('chalk');

io.on('connection', socket => {
  let i = 0;
  let x = 0;
  socket.on('message', data => {
    i += 1;
    console.log(i, data);
    io.emit('message', { message: i + 'backend' });
  });

  socket.on('imageChange', data => {
    x += 1;
    console.log(x, data);
    io.emit('message', data);
  });

  socket.on('chaton', data => {
    console.log('llegó');
    io.emit('chaton', data);
  })

});

setInterval(() => {
  fetch('https://backend-mean5-project.herokuapp.com/app/get')
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
    });

    fetch('https://frontend-mean5-project.herokuapp.com') 
    .then(function (myJson) {
      console.log(myJson);
    });

}, 300000)
 

//abri un server
server.listen(config.port, () => {
  console.log(`${cyan(`[${require('./package.json').name}]`)} ${green(`[${config.resMsg.serverOn.toUpperCase(r => r)}]`)} [Port:${yellow(` ${config.port}`)}]`)
});



