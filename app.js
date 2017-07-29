const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const server = require('http').createServer()
const io = require('socket.io')(server);
io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});


//const io = require('socket.io').listen(3000).sockets;

mongoose.connect(config.database, {useMongoClient: true,});
let db = mongoose.connection;

// Connect to Socket.io
io.on('connection', function(socket){
  let chat = db.collection('chats');

  // Create function to send status
  sendStatus = function(s){
      socket.emit('status', s);
  }

  // Get chats from mongo collection
  chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
      if(err){
          throw err;
      }

      // Emit the messages
      socket.emit('output', res);
  });

  // Handle input events
  socket.on('input', function(data){
      //let interaction = data.interaction;
      let name = data.name;
      let message = data.message;

      // Check for name and message
      if(name == '' || message == ''){
          // Send error status
          sendStatus('Please enter a name and message');
      } else {
          // Insert message
          chat.insert({name: name, message: message}, function(){
              io.emit('output', [data]);

              // Send status object
              sendStatus({
                  message: 'Message sent',
                  clear: true
              });
          });
      }
  });

  // Handle clear
  socket.on('clear', function(data){
      // Remove all chats from collection
      chat.remove({}, function(){
          // Emit cleared
          socket.emit('cleared');
      });
  });
 });
//Check connection
db.once('open',function() {
  console.log('Conneted to MongoDB');
});
//Check for db Errors
db.on('error',function(err){
  console.log(err);
});

const port = 3000;

const app = express();

//MORGAN Middleware
app.use(morgan('dev'));

//CORS Middleware
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//set Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json());

//Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

    while (namespace.length) {
      formParam +='['+ namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Passport config
require('./config/passport')(passport);
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//login Form
app.get('/login', function(req, res){
  res.render('pages/users/login');
});

//Login Process
app.post('/login',function(req, res, next){
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

const index = require('./routes/index');
const user = require('./routes/users');
const settings = require('./routes/settings');
app.use('/',index);
app.use('/users',user);
app.use('/settings',settings);

//Start Server
app.listen(port, function(){
  console.log('Server started on port '+port+'....');
});
