let hash = require('object-hash');
let bodyParser = require('body-parser');
let user = require('../models/user.js');
let evt = require('../models/event_info.js');
let assert = require('assert');

//****************************************WORKING CODE**********************************************


module.exports = function loadUserRoutes(router) {
    router.use(bodyParser.json());
    router.post('/signup', (req, res) => {
        //create a variable name different than 'user'
        let userCheck = user.findOne({'userAccount':req.body.userAccount}, (error, userCheck) => {
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
                //let newUser = new user();
                if(req.body.userAccount != '' && req.body.password != '' && req.body.userName != ''){
                    let newUser = new user();
                    newUser.userAccount = req.body.userAccount;
                    newUser.password = hash(req.body.password);
                    if(req.body.userName.length > 15){
                        console.log("username too long");
                        res.status(500).send("username too long");
                    }
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
        let toRemoved = user.findOne({'userAccount': req.body.userAccount}, (error, toRemoved) =>{
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
    router.put('/acceptInvitation/:receiverID', function(req, res){
        let receiver_promise = user.findOne({'_id': req.params.receiverID}).exec();
        let event_promise = evt.findOne({'_id': req.body.eventID}).exec();
        assert.ok(receiver_promise instanceof require('mpromise'));
        receiver_promise.then(function(receiver) 
            {
                if(receiver === undefined || receiver === null)
                {
                    console.log("receiver not found");
                    res.status(404).send("receiver not found");
                }
                else 
                {
                    assert.ok(event_promise instanceof require('mpromise'));
                    console.log("receiver found");
                    event_promise.then(function(evt)
                    {
                            if(evt === undefined || evt === null){
                                console.log("event not found");
                                res.status(404).send("event not found");
                            }
                            else{
                                console.log("event found");
                                if(evt.memberAccount.indexOf(req.params.receiverID) === -1){
                                    evt.memberAccount.push(req.params.receiverID);
                                    evt.save((error) => {
                                        if(error){
                                            console.log("Error: " + error);
                                            res.status(500).send("Error: " + error);
                                        }
                                    });
                                }
                                else{
                                    console.log("user already in this event");
                                    res.status(500).send("user already in this event");
                                }
                                receiverIndex = evt.invitationList.indexOf(req.params.receiverID);
                                if(receiverIndex !== -1){
                                    evt.invitationList.splice(receiverIndex, 1);
                                    evt.save((error) => {
                                        if(error){
                                            console.log("Error: " + error);
                                            res.status(500).send("Error: " + error);
                                        }
                                    });
                                }
                                else{
                                    console.log("user is not invited");
                                    res.status(500).send("user is not invited");
                                }
                            }
                        }).catch((error) => {
                            console.log(error);
                            res.status(500).send("Error: " + error);
                            }); // event_promise
                        if(receiver.eventList.indexOf(req.body.eventID) === -1)
                        {
                            receiver.eventList.push(req.body.eventID);
                            receiver.save((error) => {
                                if(error){
                                    console.log("Error: " + error);
                                    res.status(500).send("Error: " + error);
                                }
                            });
                            response = {
                                receiverID: req.params.receiverID,
                                eventID: req.body.eventID,
                                message:"successfully joined event"
                            };
                            res.status(200).send(response);
                        }
                        else
                        {
                            console.log("user is already in this event");
                            res.status(500).send("user is already in this event");
                        }
                        let eventIndex = receiver.pendingInvites.indexOf(req.body.eventID);
                        if(eventIndex !== -1){
                            receiver.pendingInvites.splice(eventIndex, 1);
                            receiver.save((error) => {
                                if(error){
                                    console.log("Error: " + error);
                                    res.status(500).send("Error: " + error);
                                }
                            });
                        }
                        else{
                            console.log("user does not have pending invitation on this event");
                            res.status(500).send("user does not have pending invitation on this event");
                        }
                } // outest else
            }).catch((error) => {
                console.log(error);
                res.status(500).send("Error: " + error);
            }); // receiver_promise
    }); // put
    //send invitation to other users
    router.put('/sendInvitation', function(req, res){
        let receiver_promise = user.findOne({'userAccount': req.body.userAccount}).exec();
        let event_promise = evt.findOne({'_id': req.body.eventID}).exec();
        assert.ok(receiver_promise instanceof require('mpromise'));
        receiver_promise
            .then(function(receiver)
            {
            if(receiver === undefined || receiver === null){
                console.log("receiver not found");
                res.status(404).send("receiver not found");
            }
            else {
                assert.ok(event_promise instanceof require('mpromise'));
                console.log("receiver found")
                event_promise.then(function(evt){
                    if(evt === undefined || evt === null){
                        console.log("event not found");
                        res.status(404).send("event not found");
                    }
                    else{
                        console.log("event found");
                        let userID = receiver._id;
                        receiverIndex = evt.invitationList.indexOf(receiver._id);
                        if(receiverIndex === -1){
                            evt.invitationList.push(userID);
                            evt.save((error) => {
                                if(error){
                                    console.log("Error: " + error);
                                    res.status(500).send("Error: " + error);
                                }
                            });
                        }
                        else{
                            console.log("user is already invited");
                            res.status(500).send("user is already invited");
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                    res.status(500).send("Error: " + error);
                    });
                let eventIndex = receiver.pendingInvites.indexOf(req.body.eventID);
                if(eventIndex === -1){
                    receiver.pendingInvites.push(req.body.eventID);
                    receiver.save((error) => {
                        if(error){
                            console.log("Error: " + error);
                            res.status(500).send("Error: " + error);
                            return;
                        }
                    });
                    response = {
                        receiverAccount: req.body.userAccount,
                        eventID: req.body.eventID,
                        message: "successfully sent invitation to user " + req.body.userID + " for event " + req.body.eventID
                    };
                    res.status(200).send(response);
                }
                else{
                    console.log("user does not have pending invitation on this event");
                    res.status(500).send("user does not have pending invitation on this event");
                }
 
            }
        }).catch((error) => {
            console.log(error);
            res.status(500).send("Error: " + error);
        });
    });
    //user decline an invitation to an event
    //request: userID, eventID
    router.post('/declineInvitation', function(req, res) {
        let user_promise = user.findOne({'_id': req.body.userID}).exec();
        let event_promise = evt.findOne({'_id': req.body.eventID}).exec();
        assert.ok(user_promise instanceof require('mpromise'));
        user_promise.then(function(user){
            if(user === undefined || user === null)
            {
                console.log("user not found");
                res.status(404).send("user not found");
                return;
            }
            else
            {
                console.log("user found");
                assert.ok(event_promise instanceof require('mpromise'));
                event_promise.then(function(evt){
                    if(evt === undefined || evt === null)
                    {
                        console.log("event not found");
                        res.status(404).send("event not found");
                        return;
                    }
                    else
                    {
                        let userIndex = evt.invitationList.indexOf(req.body.userID);
                        if(userIndex === -1)
                        {
                            console.log("user not invited");
                            res.status(500).send("user not invited");
                        }
                        else
                        {
                            evt.invitationList.splice(userIndex, 1);
                            evt.save((error) => {
                                if(error){
                                    console.log("Error: " + error);
                                    res.status(500).send("Error: " + error);
                                }
                            });
                        }  
                    }
                }).catch((error) => {
                    console.log("Error: " + error);
                    res.status(500).send("Error: " + error);
                });
                let eventIndex = user.pendingInvites.indexOf(req.body.eventID);
                if(eventIndex === -1)
                {
                    console.log("user is not invited");
                    res.status(500).send("user is not invited");
                }
                else
                {
                    user.pendingInvites.splice(eventIndex, 1);
                    user.save((error) => {
                        if(error){
                            console.log("Error: " + error);
                            res.status(500).send("Error: " + error);
                        }
                    });
                    response = {
                        userID: req.body.userID,
                        eventID: req.body.eventID,
                        message: "invitation to event " + req.body.eventID + " successfully decline"
                    };
                    res.status(200).send(response);
                }
            }
        }).catch((error) => {
            console.log("Error: " + error);
            res.status(500).send("Error: " + error);
        });
    });
};















































































//*****************************************BUGGY CODE***********************************************


// module.exports = function loadUserRoutes(router) {
//     router.use(bodyParser.json());


//     router.post('/signup', (req, res) => {
//         //create a variable name different than 'user'
//         let userCheck = user.findOne({'userAccount':req.body.userAccount}, (error, userCheck) => {
//             if(userCheck){
//                 console.log('user exists');
//                 message = {
//                     "userAccount":req.body.userAccount,
//                     "message": "user already exists"
//                 }
//                 res.status(500).json(message);
//                 return;
//             }
//             else{
//                 //console.log("here");
//                 //let newUser = new user();

//                 //BUG2(to fix, uncomment line 261  and line 277, and line 283 and line 284 line285)
//                 //if(req.body.userAccount != '' && req.body.password != '' && req.body.userName != ''){
//                     let newUser = new user();
//                     newUser.userAccount = req.body.userAccount;
//                     newUser.password = hash(req.body.password);
//                     //BUG6(to fix, add username length check)
//                     newUser.userName = req.body.userName;
//                     newUser.eventList = [];
//                     //newUser.password = req.body.password;

//                     newUser.save((error) => {
//                     if(error){
//                         console.log(error);
//                         res.status(500).send('Saving error: ' + error);
//                         return;
//                         }
//                     res.json(newUser);
//                     });
//                 //}
//                 //else{
//                   //  res.status(500).send("bad parameters");
//                 //}
//             }
//         });
//     });



//     router.put('/login', (req, res) => {
//         //BUG3(to fix, uncomment line 289 and line 298)
//         //if(req.body.userAccount == '' || req.body.password == ''){
//             if(req.body.userAccount == ''){
//                 res.status(500).send("empty userAccount");
//                 return;
//             }
//             if(req.body.password == ''){
//                 res.status(500).send("empty password");
//                 return;
//             }
//         //}
//         user.findOne({'userAccount': req.body.userAccount}, (error, user)=>{
//             if(error){
//                 res.send('Error: ' + error);
//             }
//             if(!user){
//                 console.log("no user found");
//                 res.status(402).send("email does not exists");
//                 return;
//             }
//             if(user.password === hash(req.body.password)){
//                 res.json(user);
//             }else{
//                 console.log("password incorrect");
//                 res.status(403).send("password incorrect");
//                 //res.json(null);
//             }
//         });
//     });

//     router.get('/logout', function(req, res){
//         res.end();
//     });

//     //get all usernames
//     router.get('/api/all_useremail', function(req, res){
//         user.find({'userAccount': {$exists:true}}, function(err, data) {
//             if(err){
//                 console.log(err);
//                 return res.status(500).json({msg: 'internal server error'});
//             }
//             res.json(data);
//         });
//     })

//     //delete user
//     router.post('/deleteUser', function(req, res){
//         let toRemoved = user.findOne({'userAccount': req.body.userAccount}, (error, toRemoved) =>{
//             console.log(req.body.email);
//             if(error){
//                 res.send('Error: ' + error);
//                 return;
//             }
//             if(!toRemoved){
//                 console.log('no such user found');
//                 res.status(500).send("internal server error");
//                 return;
//             }
//             response = {
//                 message: 'User successfully deleted',
//                 id:toRemoved._id
//             };
//             toRemoved.remove();
//             res.status(200).send(response);
//             return;

//         });
//     });


 

// //when user join in an event, add that event to user's eventList
//     router.put('/acceptInvitation/:receiverID', function(req, res){
//         let receiver_promise = user.findOne({'_id': req.params.receiverID}).exec();
//         let event_promise = evt.findOne({'_id': req.body.eventID}).exec();
//         assert.ok(receiver_promise instanceof require('mpromise'));
//         receiver_promise.then(function(receiver) 
//             {
//                 if(receiver === undefined || receiver === null)
//                 {
//                     console.log("receiver not found");
//                     res.status(404).send("receiver not found");
//                 }
//                 else 
//                 {
//                     assert.ok(event_promise instanceof require('mpromise'));
//                     console.log("receiver found");
//                     event_promise.then(function(evt)
//                     {
//                             if(evt === undefined || evt === null){
//                                 console.log("event not found");
//                                 res.status(404).send("event not found");
//                             }
//                             else{
//                                 console.log("event found");
//                                 if(evt.memberAccount.indexOf(req.params.receiverID) === -1){
//                                     evt.memberAccount.push(req.params.receiverID);
//                                     evt.save((error) => {
//                                         if(error){
//                                             console.log("Error: " + error);
//                                             res.status(500).send("Error: " + error);
//                                         }
//                                     });
//                                 }
//                                 else{
//                                     console.log("user already in this event");
//                                     res.status(500).send("user already in this event");
//                                 }

//                                 receiverIndex = evt.invitationList.indexOf(req.params.receiverID);
//                                 if(receiverIndex !== -1){
//                                     evt.invitationList.splice(receiverIndex, 1);
//                                     evt.save((error) => {
//                                         if(error){
//                                             console.log("Error: " + error);
//                                             res.status(500).send("Error: " + error);
//                                         }
//                                     });
//                                 }
//                                 else{
//                                     console.log("user is not invited");
//                                     res.status(500).send("user is not invited");
//                                 }
//                             }

//                         }).catch((error) => {
//                             console.log(error);
//                             res.status(500).send("Error: " + error);
//                             }); // event_promise

//                         if(receiver.eventList.indexOf(req.body.eventID) === -1)
//                         {
//                             receiver.eventList.push(req.body.eventID);
//                             receiver.save((error) => {
//                                 if(error){
//                                     console.log("Error: " + error);
//                                     res.status(500).send("Error: " + error);
//                                 }
//                             });

//                             response = {
//                                 receiverID: req.params.receiverID,
//                                 eventID: req.body.eventID,
//                                 message:"successfully joined event"
//                             };
//                             res.status(200).send(response);
//                         }
//                         else
//                         {
//                             console.log("user is already in this event");
//                             res.status(500).send("user is already in this event");
//                         }
//                         let eventIndex = receiver.pendingInvites.indexOf(req.body.eventID);
//                         if(eventIndex !== -1){
//                             receiver.pendingInvites.splice(eventIndex, 1);
//                             receiver.save((error) => {
//                                 if(error){
//                                     console.log("Error: " + error);
//                                     res.status(500).send("Error: " + error);
//                                 }
//                             });
//                         }
//                         else{
//                             console.log("user does not have pending invitation on this event");
//                             res.status(500).send("user does not have pending invitation on this event");
//                         }

//                 } // outest else

//             }).catch((error) => {
//                 console.log(error);
//                 res.status(500).send("Error: " + error);
//             }); // receiver_promise

//     }); // put



//     //send invitation to other users
//     router.put('/sendInvitation', function(req, res){
//         let receiver_promise = user.findOne({'userAccount': req.body.userAccount}).exec();
//         let event_promise = evt.findOne({'_id': req.body.eventID}).exec();
//         assert.ok(receiver_promise instanceof require('mpromise'));
//         receiver_promise.then(function(receiver){
//             if(receiver === undefined || receiver === null){
//                 console.log('receiver not found');
//                 res.status(404).send('receiver not found');
//                 return;
//             }
//             else{
//                 assert.ok(event_promise instanceof require('mpromise'));
//                 console.log('receiver found');
//                 event_promise.then(function(evt){
//                     if(evt === undefined || evt === null){
//                         console.log("event not found");
//                         res.status(404).send("event not found");
//                     }
//                     else{
//                         console.log("event found");
//                         let userID = receiver._id;
//                         if(evt.invitationList.indexOf(userID) === -1){
//                             evt.invitationList.push(userID);
//                             evt.save((error) => {
//                                 if(error){
//                                     console.log("Error: " + error);
//                                     res.statu(500).send("Error: " + error);
//                                 }
//                             });
//                         }
//                         else{
//                             console.log("event already sent invitation");
//                             res.status(500).send("event already sent invitation");
//                         }
//                     }
//                 }).catch((error) => {
//                     console.log("Error: " + error);
//                     res.status(500).send("Error: " + error);
//                     });

//                 if(receiver.pendingInvites.indexOf(req.body.eventID) === -1){
//                     receiver.pendingInvites.push(req.body.eventID);
//                     receiver.save((error) => {
//                         if(error){
//                             console.log("Error: " + error);
//                             res.status(500).send("Error: " + error);
//                             return;
//                         }  
//                     });
//                 }
//                 else{
//                     console.log("receiver already has this invitation");
//                     res.status(500).send("receiver already has this invitation");
//                 }
//                 response = {
//                     receiverAccount: req.body.userAccount,
//                     eventID: req.body.eventID,
//                     message: "invitation sent"
//                 };
//                 res.status(200).send(response);

//             }
//         }).catch((error) => {
//             console.log("Error: " + error);
//             res.status(500).send("Error: "  + error);
//         });
//     });


//     //user decline an invitation to an event
//     //request: userID, eventID
//     router.post('/declineInvitation', function(req, res) {
//         let user_promise = user.findOne({'_id': req.body.userID}).exec();
//         let event_promise = evt.findOne({'_id': req.body.eventID}).exec();
//         assert.ok(user_promise instanceof require('mpromise'));
//         user_promise.then(function(user){
//             if(user === undefined || user === null)
//             {
//                 console.log("user not found");
//                 res.status(404).send("user not found");
//                 return;
//             }
//             else
//             {
//                 console.log("user found");
//                 assert.ok(event_promise instanceof require('mpromise'));
//                 event_promise.then(function(evt){
//                     if(evt === undefined || evt === null)
//                     {
//                         console.log("event not found");
//                         res.status(404).send("event not found");
//                         return;
//                     }
//                     else
//                     {
//                         let userIndex = evt.invitationList.indexOf(req.body.userID);
//                         if(userIndex === -1)
//                         {
//                             console.log("user not invited");
//                             res.status(500).send("user not invited");
//                         }
//                         else
//                         {
//                             evt.invitationList.splice(userIndex, 1);
//                             evt.save((error) => {
//                                 if(error){
//                                     console.log("Error: " + error);
//                                     res.status(500).send("Error: " + error);
//                                 }
//                             });
//                         }  
//                     }
//                 }).catch((error) => {
//                     console.log("Error: " + error);
//                     res.status(500).send("Error: " + error);
//                 });

//                 let eventIndex = user.pendingInvites.indexOf(req.body.eventID);
//                 if(eventIndex === -1)
//                 {
//                     console.log("user is not invited");
//                     res.status(500).send("user is not invited");

//                 }
//                 else
//                 {
//                     user.pendingInvites.splice(eventIndex, 1);
//                     user.save((error) => {
//                         if(error){
//                             console.log("Error: " + error);
//                             res.status(500).send("Error: " + error);
//                         }
//                     });
//                     response = {
//                         userID: req.body.userAccount,
//                         eventID: req.body.eventID,
//                         message: "invitation to event " + req.body.eventID + " successfully decline"
//                     };
//                     res.status(200).send(response);
//                 }
//             }
//         }).catch((error) => {
//             console.log("Error: " + error);
//             res.status(500).send("Error: " + error);
//         });
//     });

// };
