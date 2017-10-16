var hash = require('object-hash');
var bodyParser = require('body-parser');
var user = require('../models/user.js');

module.exports = function loadUserRoutes(router) {
    router.use(bodyParser.json());

    router.get('/userCheck', function(req, res){
        user.findOne({email: req.query.email}, function(err, user){
            console.log(req.query.email)
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
        newUser.email = req.body.email;
        newUser.password = hash(req.body.password)
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
        user.findOne({'email': req.body.email}, (error, user)=>{
            if(error){
                res.send('Error: ' + error);
            }
            if(!user){
                console.log("no user found");
                res.json(null);
                return;
            }
            if(user.password === hash(req.body.password)){
                res.json(user);
            }else{
                console.log("password incorrect");
                res.json(null);
            }
        });
    });

    router.get('/logout', function(req, res){
        res.end();
    });

    //get all usernames
    router.get('/all_useremail', function(req, res){
        user.find({'email': {$exists:true}}, function(err, data) {
            if(err){
                console.log(err);
                return res.status(500).json({msg: 'internal server error'});
            }
            res.json(data);
        });
    })
};
