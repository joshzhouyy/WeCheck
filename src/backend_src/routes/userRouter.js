var hash = require('object-hash');
var bodyParser = require('body-parser');
var user = require('../models/user.js');
var evt = require('../models/event_info.js');

module.exports = function loadUserRoutes(router) {
    router.use(bodyParser.json());

    router.get('/api/userCheck', function(req, res){
        user.findOne({'userAccount': req.query.userAccount}, function(err, user){
            console.log(req.query.userAccount)
            if(err){
                console.log(err)
            }
            var message;
            if(user){
                console.log(user)
                message = "user exists";
                console.log(message)
            }
            else{
                message = "uesr does not exist";
                console.log(message)
            }
            res.json({message: message});
        });
    });

    router.post('/signup', (req, res) => {
        //user.dropIndex({"username": 1})
        var newUser = new user();
        newUser.userAccount = req.body.userAccount;
        newUser.password = hash(req.body.password);
        newUser.userName = req.body.userName;
       //newUser.password = req.body.password;

        newUser.save((error) => {
            if(error){
                console.log(error);
                res.json(null);
                return;
            }
            res.json(newUser);
        });
    });


    router.put('/login', (req, res) => {
        user.findOne({'userAccount': req.body.userAccount}, (error, user)=>{
            if(error){
                res.send('Error: ' + error);
            }
            if(!user){
                console.log("no user found");
                res.status(402).send("email does not exists");
                return;
            }
            if(user.password === hash(req.body.password)){
                res.json(user);
            }else{
                console.log("password incorrect");
                res.status(403).send("password incorrect");
                //res.json(null);
            }
        });
    });

    router.get('/logout', function(req, res){
        res.end();
    });

    //get all usernames
    router.get('/api/all_useremail', function(req, res){
        user.find({'userAccount': {$exists:true}}, function(err, data) {
            if(err){
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }
            res.json(data);
        });
    })

    //delete user
    router.post('/deleteUser', function(req, res){
        var toRemoved = user.findOne({'userAccount': req.body.userAccount}, (error, toRemoved) =>{
            console.log(req.body.email);
            if(error){
                res.send('Error: ' + error);
                return;
            }
            if(!toRemoved){
                console.log('no such user found');
                res.status(500).send("internal server error");
                return;
            }
            response = {
                message: 'User successfully deleted',
                id:toRemoved._id
            };
            toRemoved.remove();
            res.status(200).send(response);
            return;

        });
    });

    //get all events of a user
    router.post('/allevents/:userID/events', function(req, res){
        user.findOne({'_id':req.params.userID})
        .exec((error, data_a) => {
            if(error){
                res.status(500).send('Error: ' + error);
                return;
            }
            if(!data_a){
                res.status(500).send('no memberList');
                return;
            }
            
            evt.find({'_id': { $in: user.eventId}})
            .exec((error,data) => {
                if (!data) {
                    res.status(500).send("no data");
                    return;
                }
                res.json(data);
            })
        });
    });
};
