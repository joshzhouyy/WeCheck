var hash = require('object-hash');
var bodyParser = require('body-parser');
var user = require('../models/user.js');
var evt = require('../models/event_info.js');


module.exports = function loadUserRoutes(router) {
    router.use(bodyParser.json());


    router.post('/signup', (req, res) => {
        //create a variable name different than 'user'
        var userCheck = user.findOne({'userAccount':req.body.userAccount}, (error, userCheck) => {
            if(userCheck){
                console.log('user exists');
                message = {
                    "userAccount":req.body.userAccount,
                    "message": "user already exists"
                }
                res.status(500).json(message);
                return;
            }
            else{
                //console.log("here");
                //var newUser = new user();
                if(req.body.userAccount != '' && req.body.password != '' && req.body.userName != ''){
                    var newUser = new user();
                    newUser.userAccount = req.body.userAccount;
                    newUser.password = hash(req.body.password);
                    newUser.userName = req.body.userName;
                    newUser.eventList = [];
                    //newUser.password = req.body.password;

                    newUser.save((error) => {
                    if(error){
                        console.log(error);
                        res.status(500).send('Saving error: ' + error);
                        return;
                        }
                    res.json(newUser);
                    });
                }
                else{
                    res.status(500).send("bad parameters");
                }
            }
        });
    });



    router.put('/login', (req, res) => {
        if(req.body.userAccount == '' || req.body.password == ''){
            if(req.body.userAccount == ''){
                res.status(500).send("empty userAccount");
                return;
            }
            if(req.body.password == ''){
                res.status(500).send("empty password");
                return;
            }
        }
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


    //when user join in an event, add that event to user's eventList
    router.put('/joinEvent/:userID', function(req, res){

        var flag_1 = user.findOne({'_id': req.params.userID}, (error, user) => {
            if(error){
                console.log(error);
                //res.status(500).send("Error: " + error);
                return 0;
            }
            if(!user){
                console.log("user not found");
                //res.status(404).send("user not found");
                return 0;
            }
            if(user.eventList.indexOf(req.body.eventID) === -1){
                user.eventList.push(req.body.eventID);
                console.log("pushed");
                user.save((error) => {
                    if(error){
                        //res.status(500).send("Error: " + error);
                        console.log("Error: " + error);
                        return 0 ;
                    }
                });
                return 1;
            }
            else{
                console.log("user already in this event");
                return 0;
            }
        });
        
        var flag_2 = evt.findOne({'_id': req.body.eventID}, (error, evt) => {

            if(error){
                //res.status(500).send("Error: " + error);
                console.log("Error: " + error);
                return 0;
            }

            if(!evt){
                user.findOne({"_id":req.params.userID}, (error, user) => {
                    user.eventList.pop();
                });
                //res.status(404).send("event not found");
                console.log("event not found");
                return 0;
            }
            //console.log(evt.eventName);
            if(evt.memberAccount.indexOf(req.params.userID) === -1){
                evt.memberAccount.push(req.params.userID);
                evt.save((error) => {
                    if(error){
                        //res.status(500).send("Error: " + error);
                        console.log("Error: "+ error);
                        return 0;
                    }
                });
                return 1;
            }
            else{
                //res.status(500).send("User already in event");
                console.log("event already has this user");
                return 0;
            }
            console.log(evt.memberAccount);
        });

        //if both check complete, send success response
        response = {
                "userID": req.params.userID,
                "eventID": req.body.eventID,
                "message": "successfully joined event: " + req.body.eventID
            };
            if(flag_1 == 1 && flag_2 == 1){
                res.status(200).send(response);
                return;
            }
            else{
                res.status(500).send("ERROR");
                return;
            }
    
    });

};
