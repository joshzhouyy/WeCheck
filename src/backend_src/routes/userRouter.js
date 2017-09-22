var bodyParser = require('body-parser');
var user = require('../models/user.js');

module.exports = function loadUserRoutes(router) {
    router.use(bodyParser.json());

    router.post('/signup', (req, res) => {
        var newUser = new user();
        newUser.username = req.body.username;
        newUser.password = req.body.password;

        newUser.save((error) => {
            if(error){
                res.json(null);
                return;
            }
            res.json(newUser);
        });
    });

    router.post('/createvent', (req, res) => {
        var newEvent = new user();
        newEvent.eventname = req.body.eventname;
        newEvent.status = req.body.status;
        newEvent.type = req.body.type;
        newEvent.category = req.body.category;

        newEvent.save((error) => {
            if(error){
                res.json(null);
                return;
            }
            res.json(newEvent);
        });
    });

    router.post('/login', (req, res) => {
        user.findOne({'username': req.body.username}, (error, user)=>{
            if(error){
                res.send('Error: ' + error);
            }
            if(!user){
                res.json(null);
            }
            if(user.password == req.body.password){
                res.json(user);
            }else{
                res.json(null);
            }
        });
    });

    router.get('/logout', function(req, res){
        res.end();
    });

    //get all usernames
    router.get('/all_usernames', function(req, res){
        user.find({'username': {$exists:true}}, function(err, data) {
            if(err){
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }
            res.json(data);
        });
    })
};
