let hash = require('object-hash');
let bodyParser = require('body-parser');
let user = require('../models/user.js');
let evt = require('../models/event_info.js');
let evt_user = require('../models/event_expense.js');
let assert = require('assert');


//****************************************WORKING CODE**********************************************


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
//                 if(req.body.userAccount != '' && req.body.password != '' && req.body.userName != ''){
//                     let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//                     if(re.test(req.body.userAccount) === false){
//                         console.log("invalid email");
//                         res.status(500).send("invalid email!");
//                         return;
//                     }
//                     else
//                     {
//                         let newUser = new user();
//                         newUser.userAccount = req.body.userAccount;
//                         newUser.password = hash(req.body.password);
//                         if(req.body.userName.length > 15){
//                             console.log("username too long");
//                             res.status(500).send("username too long");
//                         }
//                         newUser.userName = req.body.userName;
//                         newUser.eventList = [];
//                         //newUser.password = req.body.password;

//                         newUser.save((error) => {
//                         if(error){
//                             console.log(error);
//                             res.status(500).send('Saving error: ' + error);
//                             return;
//                         }
//                         res.json(newUser);
//                         });
//                     }
//                 }
//                 else{
//                     res.status(500).send("bad parameters");
//                 }
//             }
//         });
//     });



//     router.put('/login', (req, res) => {
//         if(req.body.userAccount == '' || req.body.password == ''){
//             if(req.body.userAccount == ''){
//                 res.status(500).send("empty userAccount");
//                 return;
//             }
//             if(req.body.password == ''){
//                 res.status(500).send("empty password");
//                 return;
//             }
//         }
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


//     //when user join in an event, add that event to user's eventList
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
//         receiver_promise
//             .then(function(receiver)
//             {
//             let flag
//             if(receiver === undefined || receiver === null){
//                 console.log("receiver not found");
//                 throw new Error("receiver not found");
//                 return;
//             }
//             else {
//                 assert.ok(event_promise instanceof require('mpromise'));
//                 console.log("receiver found")
//                 event_promise.then(function(evt){
//                     if(evt === undefined || evt === null){
//                         console.log("event not found");
//                         throw new Error("event not found");
//                         return;

//                     }
//                     else if(evt.ownerID === receiver._id)
//                     {
//                         console.log("cannot invite self");
//                         throw new Error("cannot invite self");
//                         return;
//                     }
//                     else if(evt.ownerID === receiver._id)
//                     {
//                         console.log("cannot invite self");
//                         return;
//                     }
//                     else{
//                         console.log("event found");
//                         let userID = receiver._id;
//                         receiverIndex = evt.invitationList.indexOf(receiver._id);
//                         if(receiverIndex === -1){
//                             evt.invitationList.push(userID);
//                             evt.save((error) => {
//                                 if(error){
//                                     console.log("Error: " + error);
//                                     return;
//                                     //res.status(500).send("Error: " + error);
//                                 }
//                             });
//                         }
//                         else{
//                             console.log("user is already invited");
//                             throw new Error("user is already invited");
//                             return;
//                             //res.status(500).send("user is already invited");
//                         }
//                     }
//                 }).catch((error) => {
//                     console.log(error);
//                     //res.status(500).send("Error: " + error);
//                     return;
//                     });

//                 let eventIndex = receiver.pendingInvites.indexOf(req.body.eventID);
//                 if(eventIndex === -1){
//                     receiver.pendingInvites.push(req.body.eventID);
//                     receiver.save((error) => {
//                         if(error){
//                             console.log("Error: " + error);
//                             //res.status(500).send("Error: " + error);
//                             return;
//                         }
//                     });
//                     response = {
//                         receiverAccount: req.body.userAccount,
//                         eventID: req.body.eventID,
//                         message: "successfully sent invitation to user " + receiver.userAccount + " for event " + req.body.eventID
//                     };
//                     res.status(200).send(response);
//                 }
//                 else{
//                     //console.log(eventIndex);
//                     console.log("user already invited to this event");
//                     throw new Error("user already invited to this event");
//                     //res.status(500).send("user already invited to this event");
//                     return;
//                 }
 
//             }
//         }).catch((error) => {
//             console.log("err")
//             //console.log(JSON.stringify(error));
//             res.status(500).send("Error: " + error);
//             return;
//             //res.status(500).send("Error: " + error);
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
//                         userID: req.body.userID,
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


//     //user paid their individual amount
//     /*router.put('/paidIndividual/'){

//     }*/


//     //for event owner to verify that 
//     //the individual input amounts add up to total amount
//     router.put('/verifyAmount/:eventID', function(req, res){
//         //let sum = 0;
//         //let individualAmountList = [];
//         let evt_promise = evt.findOne({'_id': req.params.eventID}).exec();
//         let evt_user_promise = evt_user.find({'eventID': req.params.eventID}).exec();
//         assert.ok(evt_promise instanceof require('mpromise'));
//         evt_promise.then(function(evt){
//             if(evt === undefined || evt === null)
//             {
//                 console.log("Event not found");
//                 res.status(500).send("event not found");
//                 return;
//             }
//             else
//             {
//                 console.log("event found");
//                 assert.ok(evt_user_promise instanceof require('mpromise'));
//                 evt_user_promise.then(function(evt_users){
//                     let sum = 0;
//                     if(evt_users === undefined || evt_users === null)
//                     {
//                         console.log("event individual amount not found");
//                         res.status(404).send("event individual amount not found");
//                         return;
//                     }
//                     else if(evt_users.length !== evt.memberAccount.length)
//                     {
//                         console.log("number of event member and individual amount number not match");
//                         res.status(500).send("number of event member and individual amount number not match");
//                         return;
//                     }
//                     else
//                     {
//                         evt_users.forEach(function(element){
//                             console.log(element);
//                             sum += element.individualAmount;
//                             console.log("sum = " + sum);
//                         });
//                         let inputList = [];
//                         if(sum !== evt.totalAmount)
//                         {
//                             console.log("amount incorrect, need to re-verify");
//                             //let inputList = [];
//                             evt_users.forEach(function(element){
//                                 entry = {
//                                     individualAmount:element.individualAmount,
//                                     userID: element.userID
//                                 }
//                                 //inputList.push(element);
//                                 inputList.push(entry);
//                                 element.individualAmount = 0;
//                                 element.save((error) => {
//                                     if(error){
//                                         console.log("Error: " + error);
//                                         res.status(500).send("Error: " + error);
//                                     }
//                                 });
//                             });
//                             console.log(inputList);
//                             res.status(200).json(inputList);
//                             //throw new Error("amount incorrect , need to re-verify");
//                         }
//                         else
//                         {
//                             evt_users.forEach(function(element){
//                                 entry = {
//                                     individualAmount: element.individualAmount,
//                                     userID: element.userID
//                                 }
//                                 inputList.push(entry);
//                                 element.save((error) => {
//                                     if(error){
//                                         console.log("Error: " + error);
//                                         res.status(500).send("Error: " + error);
//                                     }
//                                 });
//                             });
//                             res.status(200).json(inputList);
//                             return;
//                         }
//                     }
//                 }).catch((error) => {
//                     console.log("Error: " + error);
//                     res.status(500).send("Error: " + error);
//                     return;
//                     });

//             }//outest else
//         }).catch((error) => {
//             console.log("Error: " + error);
//             res.status(500).send("Error: " + error);
//             return;
//             });
//     });


//     //get all pending invitations of an user
//     router.get('/allInvitations/:userID', function(req, res){
//         user.findOne({'_id': req.params.userID}, (error, user) => {
//             if(error)
//             {
//                 console.log("Error: " + error);
//                 res.status(500).send("Error: " + error);
//                 return;
//             }
//             else if(user === undefined || user === null)
//             {
//                 console.log("user not found");
//                 res.status(404).send("user not found");
//                 return;
//             }
//             else
//             {
//                 let invitations = user.pendingInvites;
//                 evt.find({'_id': {$in: invitations}}, (error, evts) => {

//                 })
//                 let evt_promise = evt.find({'_id': {$in: invitations}}).exec();
//                 assert.ok(evt_promise instanceof require('mpromise'));
//                 evt_promise.then(function(evts){
//                     if(evts === null || evts === undefined)
//                     {
//                         console.log("invitations not found");
//                         res.status(500).send("invitations not found");
//                         return;
//                     }
//                     else
//                     {
//                         res.status(200).json(evts);
//                         return;
//                     }
//                 }).catch((error) => {
//                     console.log("Error: " + error);
//                     res.status(500).send("Error: " + error);
//                     return;
//                 });
//             }

//         });
//     });

// };
















































































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

                //bug2
                //if(req.body.userAccount != '' && req.body.password != '' && req.body.userName != ''){
                    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    if(re.test(req.body.userAccount) === false){
                        console.log("invalid email");
                        res.status(500).send("invalid email!");
                        return;
                    }
                    else
                    {
                        let newUser = new user();
                        newUser.userAccount = req.body.userAccount;
                        newUser.password = hash(req.body.password);
                        //bug 6

                        // if(req.body.userName.length > 15){
                        //     console.log("username too long");
                        //     res.status(500).send("username too long");
                        // }
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
               // }
                //else{
                  //  res.status(500).send("bad parameters");
                //}
            }
        });
    });



    router.put('/login', (req, res) => {
        //bug 3
        // if(req.body.userAccount == '' || req.body.password == ''){
        //     if(req.body.userAccount == ''){
        //         res.status(500).send("empty userAccount");
        //         return;
        //     }
        //     if(req.body.password == ''){
        //         res.status(500).send("empty password");
        //         return;
        //     }
        // }
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
            let flag
            if(receiver === undefined || receiver === null){
                console.log("receiver not found");
                throw new Error("receiver not found");
                return;
            }
            else {
                assert.ok(event_promise instanceof require('mpromise'));
                console.log("receiver found")
                event_promise.then(function(evt){
                    if(evt === undefined || evt === null){
                        console.log("event not found");
                        throw new Error("event not found");
                        return;

                    }
                    else if(evt.ownerID === receiver._id)
                    {
                        console.log("cannot invite self");
                        throw new Error("cannot invite self");
                        return;
                    }
                    else if(evt.ownerID === receiver._id)
                    {
                        console.log("cannot invite self");
                        return;
                    }
                    else{
                        console.log("event found");
                        let userID = receiver._id;
                        //bug13
                        evt.memberAccount.push(userID);
                        receiverIndex = evt.invitationList.indexOf(receiver._id);
                        if(receiverIndex === -1){
                            evt.invitationList.push(userID);
                            evt.save((error) => {
                                if(error){
                                    console.log("Error: " + error);
                                    return;
                                    //res.status(500).send("Error: " + error);
                                }
                            });
                        }
                        else{
                            console.log("user is already invited");
                            throw new Error("user is already invited");
                            return;
                            //res.status(500).send("user is already invited");
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                    //res.status(500).send("Error: " + error);
                    return;
                    });

                let eventIndex = receiver.pendingInvites.indexOf(req.body.eventID);
                if(eventIndex === -1){
                    receiver.pendingInvites.push(req.body.eventID);
                    receiver.save((error) => {
                        if(error){
                            console.log("Error: " + error);
                            //res.status(500).send("Error: " + error);
                            return;
                        }
                    });
                    response = {
                        receiverAccount: req.body.userAccount,
                        eventID: req.body.eventID,
                        message: "successfully sent invitation to user " + receiver.userAccount + " for event " + req.body.eventID
                    };
                    res.status(200).send(response);
                }
                else{
                    //console.log(eventIndex);
                    console.log("user already invited to this event");
                    throw new Error("user already invited to this event");
                    //res.status(500).send("user already invited to this event");
                    return;
                }
 
            }
        }).catch((error) => {
            console.log("err")
            //console.log(JSON.stringify(error));
            res.status(500).send("Error: " + error);
            return;
            //res.status(500).send("Error: " + error);
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


    //user paid their individual amount
    /*router.put('/paidIndividual/'){

    }*/


    //for event owner to verify that 
    //the individual input amounts add up to total amount
    router.put('/verifyAmount/:eventID', function(req, res){
        //let sum = 0;
        //let individualAmountList = [];
        let evt_promise = evt.findOne({'_id': req.params.eventID}).exec();
        let evt_user_promise = evt_user.find({'eventID': req.params.eventID}).exec();
        assert.ok(evt_promise instanceof require('mpromise'));
        evt_promise.then(function(evt){
            if(evt === undefined || evt === null)
            {
                console.log("Event not found");
                res.status(500).send("event not found");
                return;
            }
            else
            {
                console.log("event found");
                assert.ok(evt_user_promise instanceof require('mpromise'));
                evt_user_promise.then(function(evt_users){
                    let sum = 0;
                    if(evt_users === undefined || evt_users === null)
                    {
                        console.log("event individual amount not found");
                        res.status(404).send("event individual amount not found");
                        return;
                    }
                    else if(evt_users.length !== evt.memberAccount.length)
                    {
                        console.log("number of event member and individual amount number not match");
                        res.status(500).send("number of event member and individual amount number not match");
                        return;
                    }
                    else
                    {
                        evt_users.forEach(function(element){
                            console.log(element);
                            sum += element.individualAmount;
                            console.log("sum = " + sum);
                        });
                        let inputList = [];
                        if(sum !== evt.totalAmount)
                        {
                            console.log("amount incorrect, need to re-verify");
                            //let inputList = [];
                            evt_users.forEach(function(element){
                                entry = {
                                    individualAmount:element.individualAmount,
                                    userID: element.userID
                                }
                                //inputList.push(element);
                                inputList.push(entry);
                                element.individualAmount = 0;
                                element.save((error) => {
                                    if(error){
                                        console.log("Error: " + error);
                                        res.status(500).send("Error: " + error);
                                    }
                                });
                            });
                            console.log(inputList);
                            res.status(200).json(inputList);
                            //throw new Error("amount incorrect , need to re-verify");
                        }
                        else
                        {
                            evt_users.forEach(function(element){
                                entry = {
                                    individualAmount: element.individualAmount,
                                    userID: element.userID
                                }
                                inputList.push(entry);
                                element.save((error) => {
                                    if(error){
                                        console.log("Error: " + error);
                                        res.status(500).send("Error: " + error);
                                    }
                                });
                            });
                            res.status(200).json(inputList);
                            return;
                        }
                    }
                }).catch((error) => {
                    console.log("Error: " + error);
                    res.status(500).send("Error: " + error);
                    return;
                    });

            }//outest else
        }).catch((error) => {
            console.log("Error: " + error);
            res.status(500).send("Error: " + error);
            return;
            });
    });


    //get all pending invitations of an user
    router.get('/allInvitations/:userID', function(req, res){
        user.findOne({'_id': req.params.userID}, (error, user) => {
            if(error)
            {
                console.log("Error: " + error);
                res.status(500).send("Error: " + error);
                return;
            }
            else if(user === undefined || user === null)
            {
                console.log("user not found");
                res.status(404).send("user not found");
                return;
            }
            else
            {
                let invitations = user.pendingInvites;
                evt.find({'_id': {$in: invitations}}, (error, evts) => {

                })
                let evt_promise = evt.find({'_id': {$in: invitations}}).exec();
                assert.ok(evt_promise instanceof require('mpromise'));
                evt_promise.then(function(evts){
                    if(evts === null || evts === undefined)
                    {
                        console.log("invitations not found");
                        res.status(500).send("invitations not found");
                        return;
                    }
                    else
                    {
                        res.status(200).json(evts);
                        return;
                    }
                }).catch((error) => {
                    console.log("Error: " + error);
                    res.status(500).send("Error: " + error);
                    return;
                });
            }

        });
    });

};



