var express = require('express');
var path = require('path');
var cors = require('cors');
var socketIO = require('socket.io');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

var mongooseURL = process.env.MONGOLAB_URL || 'mongodb://admin:admin@ds139844.mlab.com:39844/wecheckdb';

mongoose.connect(mongooseURL,{useMongoClient:true}, function(err){
//MongoClient.connect(mongooseURL, function(err){
    if(err){
        console.log("Fail to connect to mongoose.");
        console.log(err);
    }else{

    console.log("Connected to mongoose.");
    }
});

const app = express();
const port = 3000;
app.use(cors())

//load routes
const userRouter = express.Router();
const eventRouter = express.Router();
require('./routes/userRouter')(userRouter);
require('./routes/eventRouter')(eventRouter);
app.use('', userRouter);
app.use('', eventRouter);

//app.use('/', express.static(path.join(__dirname, '../..', 'static')));
app.use('/', express.static(__dirname + '/../client/dist/'));

//run server
const server = app.listen(port, function(err){
    if(err){
        console.log('err when listening');
        return;
    }
    console.log("port: localhost: " + port);
});

//const io = new SocketIO(server, {path: '/api/split'});
//const socketEvents = require('./socketEvents')(io);
