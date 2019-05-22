var routemodel = require("./Router/route").route
const express = require('express');
const Profile = require('./model/model');

const path = require('path');

const dbConfig = require('./config/database');
const mongoose = require('mongoose');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

// const io = require('socket.io')(server);

//Connexion avec la base de donnée
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Connexion avec succes");    
}).catch(err => {
  console.log('Erreur de la connexion a la base de donnée ', err);
  process.exit();
});

// io.on('connection', (socket) => {
//   console.log("voici socket",socket);

//   socket.on('SEND_MESSAGE', function(data){
//     console.log("voici data ",data);
//     Profile.find()
//     .then(note => {
//       io.emit('RECEIVE_MESSAGE', note);
//         // res.send(note)
//     })
//     .catch(e => {
//         res.status(500).send({ mes: e.mes || "erreur" })
//     });
     
//   })
// });


routemodel(app)


server.listen(8080, () => {
  console.log('Server Demarer');
});

module.exports = app;