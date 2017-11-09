let bodyParser = require ('body-parser');
let evt = require('../models/event_info.js');
let user = require('../models/user.js');
let evt_user = require('../models/event_expense.js');
let assert = require('assert');

//********************************WORKING CODE**************************************

// module.exports = function loadEventRoutes(router){
// 	router.use(bodyParser.json());

// 	//create an event
// 	router.post('/event/createEvent', (req, res) => {
// 		let newEvent = new evt();
// 		newEvent.ownerID = req.body.ownerID;
// 		let user_promise = user.findOne({'_id': req.body.ownerID}).exec();
// 		assert.ok(user_promise instanceof require('mpromise'));
// 		user_promise.then(function(user){
// 			if(user === undefined || user === null)
// 			{
// 				console.log("invalid owner");
// 				res.status(500).send("invalid owner");
// 				return;
// 			}
// 			else
// 			{
// 				console.log("valid owner");
// 				let newEvent = new evt();
// 				newEvent.ownerID = req.body.ownerID;
// 				newEvent.ownerAccount = user.userAccount;
// 				newEvent.eventName = req.body.eventName;
// 				newEvent.eventType = req.body.eventType;
// 				newEvent.eventCategory = req.body.eventCategory;
// 				newEvent.eventLocation = req.body.eventLocation;
// 				newEvent.eventTime = req.body.eventTime;
// 				newEvent.splitType = req.body.splitType;
// 				newEvent.invitationList = req.body.invitationList;
// 				newEvent.eventStatus = 'in process';
// 				newEvent.totalAmount = 0;
// 				newEvent.paidAmount = 0;
// 				newEvent.memberAccount.push(req.body.ownerID);

// 				newEvent.save((error)=>{
// 					if(error)
// 					{
// 						console.log(error);
// 						res.status(500).send(error);
// 						return;
// 					}
// 				});

// 				user.eventList.push(newEvent._id);
// 				user.save((error)=>{
// 					if(error)
// 					{
// 						console.log(error);
// 						res.status(500).send(error);
// 						return;
// 					}
// 				});
// 				//console.log(newEvent._id);
// 				res.status(200).json(newEvent);
// 				return;
// 			}
// 		}).catch((error) => {
// 			console.log(error);
// 			res.status(500).send(error);
// 			return;
// 		});


			
			
// 	});

// 	//edit detail of an existing event
// 	router.put('/editEvent/:eventID', (req, res) => {
// 		evt.findOne({'_id': req.params.eventID}, (error, evt) => {
// 			if(error){
// 				res.send('Error:' + error);
// 				return;
// 			}
// 			if(!evt){
// 				console.log('No such event found!');
// 				//res.json(null);
// 				res.status(404).send("No such event found!");
// 				return;
// 			}
// 			//check if user has authority to edit event
// 			if(req.body.userID !== req.body.ownerID){
// 				res.status(500).send('you do not have the authority to edit this event');
// 				return;
// 			}
			
// 			evt.ownerID = req.body.ownerID;
// 			evt.eventName = req.body.eventName;
// 			evt.eventType = req.body.eventType;
// 			evt.eventCategory = req.body.eventCategory;
// 			evt.eventLocation = req.body.eventLocation;
// 			evt.eventTime = req.body.eventTime;
// 			evt.splitType = req.body.splitType;
// 			evt.invitationList = req.body.invitationList;
// 			//evt.eventStatus = req.body.eventStatus; //should not be allowed to edit event status
// 			//evt.totalAmount = req.body.totalAmount;

// 			evt.save((error) => {
// 				if(error){
// 					console.log(error);
// 					//should return json of event before modification, need to be tested
// 					res.json(evt);
// 					return;
// 				}
// 				//return json of event after modification
// 				res.json(evt);
// 			});
// 		});
// 	})

// 	//delete an event from database
// 	router.post('/deleteEvent/:eventID', function(req, res){
// 		console.log(req.params.eventID);
// 		let toRemoved = evt.findOne({'_id':req.params.eventID}, (error, toRemoved) => {
// 			if(error){
// 				res.status(500).send('Error: ' + error);
// 				return;
// 			}
// 			else if(!toRemoved){
// 				res.status(500).send('no such event found');
// 				return;
// 			}
// 			else if(toRemoved.eventStatus === 'in process'){
// 				res.status(403).send("unable to delete an ongoing event");
// 				return;
// 			}
// 			else if(toRemoved.eventStatus === 'deleted'){
// 				res.status(500).send("cannot delete an event more than once");
// 				return;
// 			}
// 			else{
// 				response = {
// 				message: "event successfully deleted",
// 				id: toRemoved._id
// 				};
// 				toRemoved.eventStatus = 'deleted';
// 				toRemoved.save((error)=> {
// 					if(error){
// 						res.status(500).send("Error: " + error);
// 						return;
// 					}
// 				});
// 				res.status(200).send(response);
// 				return;
// 			}
// 		});
// 	});


// 	//When a event is complete
// 	router.put('/completeEvent/:eventID', function(req, res){
// 		console.log("event id = " + req.params.eventID);
// 		evt.findOne({'_id':req.params.eventID},(error, evt) => {
// 			if(error){
// 				res.status(500).send('Find Error: '+ error);
// 				return;
// 			}
// 			evt.eventStatus = 'completed';
// 			evt.save((error) => {
// 				if(error){
// 					res.status.send('Save error: ' + error);
// 					console.log(error);
// 					return;
// 				}
// 				//return json of event after modification
// 				//res.json(evt);
// 				res.status(200).send("event " + req.params.eventID + " is complete!" );
// 				return;
// 			});

// 		});
// 	});


// 	//get the member list for a event
// 	router.get('/api/event/eventMember/:eventID', function(req, res){
// 		evt.findOne({'_id':req.params.eventID}, (error, evt) => {
// 			if(error){
// 				res.status(500).send('Error: ' + error);
// 				return;
// 			}
// 			else{
// 				const memberList = evt.memberAccount;
// 				//console.log(memberList);
// 				user.find({'_id': {$in: memberList}}, (error, users) => {
// 					console.log(users.length);
// 					if(users.length !== memberList.length){
// 						console.log("some users not found");
// 						res.status(500).send("some users not found");					}
// 					else if(error){
// 						console.log("Error: " + error);
// 						res.status(500).send("Error: " + error);
// 					}
// 					else{
// 						res.status(200).json(users);
// 					}
// 				})
				
// 			}
// 		});
// 	});

// 	//get all event that a user owns
//     router.get('/event/:userid', function(req, res){
//         evt.find({'ownerID':req.params.userid}, (error, evt) => {
//         	if(error){
//         		res.status(500).end('Error: ' + error);
//         		return;
//         	}
//         	res.json(200, evt);
//         	return;
//         });
//     });


//     //get one event by eventID
//     router.get('/api/event/:eventID', function(req, res){
//     	evt.findOne({'_id':req.params.eventID}, (error, evt) => {
//     		if(error){
//     			res.status(500).send('Error: ' + error);
//     			return;
//     		}
//     		res.json(200, evt);
//     		return;
//     	});
//     });

// 	//get all stored event
// 	router.get('/api/all_event', function(req, res){
// 		evt.find({'eventName': {$exists:true}}, function(err, data){
// 			if(err){
// 				console.log(err);
// 				return res.status(500).json({msg: 'internal ser error'});
// 			}
// 			res.json(data);
// 		});
// 	});

// 	//add a user into an event(deprecated api)
// 	router.put('/event/addMember/:eventID', function(req, res){
// 		let oldEvt = evt.findOne({'_id':req.params.eventID}, (error, oldEvt) => {
// 			if(error){
// 				res.status(500).send('Error: ' + error);
// 				return;
// 			}
// 			oldEvt.memberAccount.push(req.body.userID);
// 			oldEvt.save((error) => {
// 				if(error){
// 					console.log(error);
// 					//should return json of event before modification, need to be tested
// 					res.status(501).send('failed to add member');
// 					res.json(oldEvt);
// 					return;
// 				}
// 				//return json of event after modification
// 				res.json(oldEvt);
// 			});
// 		});
// 	});

//   router.put('/event/updateTotal/:userID/:eventID', function(req, res){
//     evt.findOne({'_id': req.params.eventID}, (error, evt) => {
//       if(error){
//         res.status(500).send("Update total error: " + error);
//         return;
//       }
//       else if(req.body.totalAmount === undefined || req.body.totalAmount === null || req.body.totalAmount <= 0){
//         res.status(504).send('Error: invalid amount');
//         return;
//       }
//       else if(req.params.userID != evt.ownerID){
//         res.status(501).send('Error: unauthorized');
//         return;
//       }
//       else{
//         evt.totalAmount = req.body.totalAmount;
//         evt.save((error) => {
//           if(error){
//             res.status(500).send("Error:" + error);
//             return;
//           }
//         });
//       res.status(200).json(evt);
//       return;
//       }

//     });
//   });


// 	//individual enters their own amount in an event
// 	router.put('/event/individualAmount/:eventID/:userID', function(req, res){
// 		if(req.body.individualAmount === null || req.body.individualAmount <= 0 || req.body.individualAmount === undefined)
// 				{
// 					res.status(500).send("invalid input amount");
// 					return;
// 				}
// 		else
// 		{
// 			evt_user.findOne({'eventID':req.params.eventID, 'userID':req.params.userID}, (error, est) => {
// 				if(error){
// 					res.status(500).send("Error: " + error);
// 					return;
// 				}
// 				else if(est != null){
// 					console.log("entry found");

// 					est.individualAmount = req.body.individualAmount;
// 					est.save((error) => {
// 						if(error){
// 							console.log("Error: " + error);
// 							res.status(500).send("Error: " + error);
// 						}
// 					});
// 					res.status(200).json(est);
// 					return;
// 				}
// 				else
// 				{
// 					evt.findOne({'_id': req.params.eventID, memberAccount: {"$in":[req.params.userID]}}, (error, evt) => {
// 					if(error)
// 					{
// 						res.status(500).send("Error in findOne: " + error);
// 						return;
// 					}
// 					let event_user = new evt_user();
// 					event_user.eventID = req.params.eventID;
// 					event_user.userID = req.params.userID;
// 					//event_user.userAccount = 
// 					event_user.individualAmount = req.body.individualAmount;
// 					event_user.save((error) => {
// 						if(error)
// 						{
// 							console.log("Error: " + error);
// 							res.status(500).send("Error: " + error);
// 							return;
// 						}
// 						res.status(200).json(event_user);
// 						return;
// 					});
// 					});
// 				}
// 			});
// 		}
		
// 	});

// 	//get all 'in process' event that an user is in or owns
// 	router.get('/getAllOnGoingEvent/:userID', function(req, res){
		
// 		user.findOne({'_id': req.params.userID}, function(error, user) {
// 			if(error){
// 				res.status(500).send("Error: " + error);
// 				return;
// 			}
// 			else if(user === undefined || user === null){
// 				res.status(404).send("user not found");
// 				return;
// 			}
// 			else{
// 				const eventList = user.eventList;
// 				//console.log(eventList);
// 				evt.find({
// 					'_id': {$in: eventList},
// 					'eventStatus':'in process'
// 				}, function(error, events){
// 					console.log(events);
// 					if(error){
// 						res.status(500).send("Error: " + error);
// 						return;
// 					}
// 					res.status(200).json(events);
// 					return;
// 				});
// 			}
// 		});
		
// 	});

// 	//get all finished event
// 	router.get('/getAllFinishedEvent/:userID', function(req, res){
		
// 		user.findOne({'_id': req.params.userID}, function(error, user) {
// 			if(error){
// 				res.status(500).send("Error: " + error);
// 				return;
// 			}
// 			else if(user === undefined || user === null){
// 				res.status(404).send("user not found");
// 				return;
// 			}
// 			else{
// 				const eventList = user.eventList;
// 				evt.find({
// 					'_id': {$in: eventList},
// 					'eventStatus':'completed'
// 				}, function(error, events){
// 					if(error){
// 						res.status(500).send("Error: " + error);
// 						return;
// 					}
// 					res.status(200).json(events);
// 					return;
// 				});
// 			}
			
// 		});
		
// 	});


	
// 	//remove specific user from event's userList
// 	router.put('/removeUser/:eventID', function(req, res){
// 		let user_promise = user.findOne({'userAccount':req.body.userAccount}).exec();
// 		let event_promise = evt.findOne({'_id':req.params.eventID}).exec();
// 		assert.ok(user_promise instanceof require('mpromise'));
// 		user_promise.then(function(user){
// 			let flag = 0; //flag to indicate if owner is trying to remove self
// 			if(user === undefined || user === null){
// 				console.log("user not found");
// 				res.status(404).send("user not found");
// 			}
// 			else{
// 				assert.ok(event_promise instanceof require('mpromise'));
// 				console.log("user found");
// 				event_promise.then(function(evt){
// 					if(evt === undefined || evt === null){
// 						console.log('event not found');
// 						res.status(404).send('event not found');
// 					}
// 					else{
// 						console.log("event found");
// 						let userID = user._id;
// 						if(userID === evt.ownerID)
// 						{
// 							console.log("cannot remove self");
// 							res.status(403).send("cannot remove self");
// 							flag = 1;
// 							return;
// 						}
// 						else
// 						{

// 							let indexToRemove = evt.memberAccount.indexOf(userID);
// 							if(indexToRemove !== -1)
// 							{
// 								evt.memberAccount.splice(indexToRemove, 1);
// 								evt.save((error) => {
// 									if(error){
// 										console.log("Error: " + error);
// 										res.status(500).send("Error: " + error);
// 									}
// 								})
// 							}
// 							else
// 							{
// 								console.log("event does not have user");
// 								res.status(500).send("event does not have this user");
// 								return;
// 							}
// 						}
// 					}
// 				}).catch((error) => {
// 					console.log(error);
// 					res.status(500).send("Error: " + error);
// 				});


// 				if(flag === 1)
// 				{
// 					console.log("owner trying to remove self");
// 					res.status(403).send("owner trying to remove self");
// 					return;
// 				}
// 				else
// 				{
// 					//get index of the event from user's eventList
// 					indexToDelete = user.eventList.indexOf(req.params.eventID);
// 					if(indexToDelete !== -1){
// 						user.eventList.splice(indexToDelete, 1);
// 						user.save((error) => {
// 							if(error){
// 								console.log("Error: " + error);
// 								res.status(500).send("Error: " + error);
// 							}
// 						});
// 						response = {
// 							userAccount: req.body.userAccount,
// 							eventID: req.params.eventID,
// 							message: "user successfully removed from event"
// 						};
// 						res.status(200).send(response);
// 					}
// 					else{
// 						console.log("user is not in this event");
// 						res.status(500).send("user is not in this event");
// 					}
// 				}
// 			}
// 		}).catch((error) => {
// 			console.log("Error: "+ error);
// 			res.status(500).send("Error: " + error);
// 		});
// 	});
// }


































































//***********************************BUGGY CODE*******************************************

module.exports = function loadEventRoutes(router){
	router.use(bodyParser.json());

	//create an event
	router.post('/event/createEvent', (req, res) => {
		let newEvent = new evt();
		newEvent.ownerID = req.body.ownerID;
		let user_promise = user.findOne({'_id': req.body.ownerID}).exec();
		assert.ok(user_promise instanceof require('mpromise'));
		user_promise.then(function(user){
			if(user === undefined || user === null)
			{
				console.log("invalid owner");
				res.status(500).send("invalid owner");
				return;
			}
			else
			{
				console.log("valid owner");
				let newEvent = new evt();
				newEvent.ownerID = req.body.ownerID;
				newEvent.ownerAccount = user.userAccount;
				newEvent.eventName = req.body.eventName;
				newEvent.eventType = req.body.eventType;
				newEvent.eventCategory = req.body.eventCategory;
				newEvent.eventLocation = req.body.eventLocation;
				newEvent.eventTime = req.body.eventTime;
				newEvent.splitType = req.body.splitType;
				newEvent.invitationList = req.body.invitationList;
				newEvent.eventStatus = 'in process';
				newEvent.totalAmount = 0;
				newEvent.paidAmount = 0;
				//bug 9
				//newEvent.memberAccount.push(req.body.ownerID);

				newEvent.save((error)=>{
					if(error)
					{
						console.log(error);
						res.status(500).send(error);
						return;
					}
				});

				user.eventList.push(newEvent._id);
				user.save((error)=>{
					if(error)
					{
						console.log(error);
						res.status(500).send(error);
						return;
					}
				});
				//console.log(newEvent._id);
				res.status(200).json(newEvent);
				return;
			}
		}).catch((error) => {
			console.log(error);
			res.status(500).send(error);
			return;
		});


			
			
	});

	//edit detail of an existing event
	router.put('/editEvent/:eventID', (req, res) => {
		evt.findOne({'_id': req.params.eventID}, (error, evt) => {
			if(error){
				res.send('Error:' + error);
				return;
			}
			if(!evt){
				console.log('No such event found!');
				//res.json(null);
				res.status(404).send("No such event found!");
				return;
			}
			//check if user has authority to edit event
			if(req.body.userID !== req.body.ownerID){
				res.status(500).send('you do not have the authority to edit this event');
				return;
			}
			
			evt.ownerID = req.body.ownerID;
			evt.eventName = req.body.eventName;
			evt.eventType = req.body.eventType;
			evt.eventCategory = req.body.eventCategory;
			evt.eventLocation = req.body.eventLocation;
			evt.eventTime = req.body.eventTime;
			evt.splitType = req.body.splitType;
			evt.invitationList = req.body.invitationList;
			//bug1
			evt.eventStatus = req.body.eventStatus; //should not be allowed to edit event status
			//evt.totalAmount = req.body.totalAmount;

			evt.save((error) => {
				if(error){
					console.log(error);
					//should return json of event before modification, need to be tested
					res.json(evt);
					return;
				}
				//return json of event after modification
				res.json(evt);
			});
		});
	})

	//delete an event from database
	router.post('/deleteEvent/:eventID', function(req, res){
		console.log(req.params.eventID);
		let toRemoved = evt.findOne({'_id':req.params.eventID}, (error, toRemoved) => {
			if(error){
				res.status(500).send('Error: ' + error);
				return;
			}
			else if(!toRemoved){
				res.status(500).send('no such event found');
				return;
			}
			//bug14
			// else if(toRemoved.eventStatus === 'in process'){
			// 	res.status(403).send("unable to delete an ongoing event");
			// 	return;
			// }
			else if(toRemoved.eventStatus === 'deleted'){
				res.status(500).send("cannot delete an event more than once");
				return;
			}
			else{
				response = {
				message: "event successfully deleted",
				id: toRemoved._id
				};
				toRemoved.eventStatus = 'deleted';
				toRemoved.save((error)=> {
					if(error){
						res.status(500).send("Error: " + error);
						return;
					}
				});
				res.status(200).send(response);
				return;
			}
		});
	});


	//When a event is complete
	router.put('/completeEvent/:eventID', function(req, res){
		console.log("event id = " + req.params.eventID);
		evt.findOne({'_id':req.params.eventID},(error, evt) => {
			if(error){
				res.status(500).send('Find Error: '+ error);
				return;
			}
			evt.eventStatus = 'completed';
			evt.save((error) => {
				if(error){
					res.status.send('Save error: ' + error);
					console.log(error);
					return;
				}
				//return json of event after modification
				//res.json(evt);
				res.status(200).send("event " + req.params.eventID + " is complete!" );
				return;
			});

		});
	});


	//get the member list for a event
	router.get('/api/event/eventMember/:eventID', function(req, res){
		evt.findOne({'_id':req.params.eventID}, (error, evt) => {
			if(error){
				res.status(500).send('Error: ' + error);
				return;
			}
			else{
				const memberList = evt.memberAccount;
				//console.log(memberList);
				user.find({'_id': {$in: memberList}}, (error, users) => {
					console.log(users.length);
					if(users.length !== memberList.length){
						console.log("some users not found");
						res.status(500).send("some users not found");					}
					else if(error){
						console.log("Error: " + error);
						res.status(500).send("Error: " + error);
					}
					else{
						res.status(200).json(users);
					}
				})
				
			}
		});
	});

	//get all event that a user owns
    router.get('/event/:userid', function(req, res){
        evt.find({'ownerID':req.params.userid}, (error, evt) => {
        	if(error){
        		res.status(500).end('Error: ' + error);
        		return;
        	}
        	res.json(200, evt);
        	return;
        });
    });


    //get one event by eventID
    router.get('/api/event/:eventID', function(req, res){
    	evt.findOne({'_id':req.params.eventID}, (error, evt) => {
    		if(error){
    			res.status(500).send('Error: ' + error);
    			return;
    		}
    		res.json(200, evt);
    		return;
    	});
    });

	//get all stored event
	router.get('/api/all_event', function(req, res){
		evt.find({'eventName': {$exists:true}}, function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal ser error'});
			}
			res.json(data);
		});
	});

	//add a user into an event(do not use this deprecated api)
	/*router.put('/event/addMember/:eventID', function(req, res){
		let oldEvt = evt.findOne({'_id':req.params.eventID}, (error, oldEvt) => {
			if(error){
				res.status(500).send('Error: ' + error);
				return;
			}
			oldEvt.memberAccount.push(req.body.userID);
			oldEvt.save((error) => {
				if(error){
					console.log(error);
					//should return json of event before modification, need to be tested
					res.status(501).send('failed to add member');
					res.json(oldEvt);
					return;
				}
				//return json of event after modification
				res.json(oldEvt);
			});
		});
	});*/

  router.put('/event/updateTotal/:userID/:eventID', function(req, res){
    evt.findOne({'_id': req.params.eventID}, (error, evt) => {
      if(error){
        res.status(500).send("Update total error: " + error);
        return;
      }
<<<<<<< HEAD
      else if(req.body.totalAmount === undefined || req.body.totalAmount === null || req.body.totalAmount < 0){
=======
      //bug4 
      else if(req.body.totalAmount === undefined || req.body.totalAmount === null){
>>>>>>> 8e1866508e8a5ce55fa9874b3e989e6103cc1035
        res.status(504).send('Error: invalid amount');
        return;
      }
      else if(req.params.userID != evt.ownerID){
        res.status(501).send('Error: unauthorized');
        return;
      }
      else{
        evt.totalAmount = req.body.totalAmount;
        evt.save((error) => {
          if(error){
            res.status(500).send("Error:" + error);
            return;
          }
        });
      res.status(200).json(evt);
      return;
      }

    });
  });


	//individual enters their own amount in an event
	router.put('/event/individualAmount/:eventID/:userID', function(req, res){
		//bug5
		if(req.body.individualAmount === null ||  req.body.individualAmount === undefined)
				{
					res.status(500).send("invalid input amount");
					return;
				}
		else
		{
			evt_user.findOne({'eventID':req.params.eventID, 'userID':req.params.userID}, (error, est) => {
				if(error){
					res.status(500).send("Error: " + error);
					return;
				}
				else if(est != null){
					console.log("entry found");

					est.individualAmount = req.body.individualAmount;
					est.save((error) => {
						if(error){
							console.log("Error: " + error);
							res.status(500).send("Error: " + error);
						}
					});
					res.status(200).json(est);
					return;
				}
				else
				{
					evt.findOne({'_id': req.params.eventID, memberAccount: {"$in":[req.params.userID]}}, (error, evt) => {
					if(error)
					{
						res.status(500).send("Error in findOne: " + error);
						return;
					}
					let event_user = new evt_user();
					event_user.eventID = req.params.eventID;
					event_user.userID = req.params.userID;
					//event_user.userAccount = 
					event_user.individualAmount = req.body.individualAmount;
					event_user.save((error) => {
						if(error)
						{
							console.log("Error: " + error);
							res.status(500).send("Error: " + error);
							return;
						}
						res.status(200).json(event_user);
						return;
					});
					});
				}
			});
		}
		
	});

	//get all 'in process' event that an user is in or owns
	router.get('/getAllOnGoingEvent/:userID', function(req, res){
		
		user.findOne({'_id': req.params.userID}, function(error, user) {
			if(error){
				res.status(500).send("Error: " + error);
				return;
			}
			else if(user === undefined || user === null){
				res.status(404).send("user not found");
				return;
			}
			else{
				const eventList = user.eventList;
				//console.log(eventList);
				evt.find({
					'_id': {$in: eventList},
					'eventStatus':'in process'
				}, function(error, events){
					console.log(events);
					if(error){
						res.status(500).send("Error: " + error);
						return;
					}
					res.status(200).json(events);
					return;
				});
			}
		});
		
	});

	//get all finished event
	router.get('/getAllFinishedEvent/:userID', function(req, res){
		
		user.findOne({'_id': req.params.userID}, function(error, user) {
			if(error){
				res.status(500).send("Error: " + error);
				return;
			}
			else if(user === undefined || user === null){
				res.status(404).send("user not found");
				return;
			}
			else{
				const eventList = user.eventList;
				evt.find({
					'_id': {$in: eventList},
					'eventStatus':'completed'
				}, function(error, events){
					if(error){
						res.status(500).send("Error: " + error);
						return;
					}
					res.status(200).json(events);
					return;
				});
			}
			
		});
		
	});


	
	//remove specific user from event's userList
	router.put('/removeUser/:eventID', function(req, res){
		let user_promise = user.findOne({'userAccount':req.body.userAccount}).exec();
		let event_promise = evt.findOne({'_id':req.params.eventID}).exec();
		assert.ok(user_promise instanceof require('mpromise'));
		user_promise.then(function(user){
			let flag = 0; //flag to indicate if owner is trying to remove self
			if(user === undefined || user === null){
				console.log("user not found");
				res.status(404).send("user not found");
			}
			else{
				assert.ok(event_promise instanceof require('mpromise'));
				console.log("user found");
				event_promise.then(function(evt){
					if(evt === undefined || evt === null){
						console.log('event not found');
						res.status(404).send('event not found');
					}
					else{
						console.log("event found");
						let userID = user._id;
						if(userID === evt.ownerID)
						{
							console.log("cannot remove self");
							res.status(403).send("cannot remove self");
							flag = 1;
							return;
						}
						else
						{

							let indexToRemove = evt.memberAccount.indexOf(userID);
							if(indexToRemove !== -1)
							{
								evt.memberAccount.splice(indexToRemove, 1);
								evt.save((error) => {
									if(error){
										console.log("Error: " + error);
										res.status(500).send("Error: " + error);
									}
								})
							}
							else
							{
								console.log("event does not have user");
								res.status(500).send("event does not have this user");
								return;
							}
						}
					}
				}).catch((error) => {
					console.log(error);
					res.status(500).send("Error: " + error);
				});


				if(flag === 1)
				{
					console.log("owner trying to remove self");
					res.status(403).send("owner trying to remove self");
					return;
				}
				else
				{
					//get index of the event from user's eventList
					indexToDelete = user.eventList.indexOf(req.params.eventID);
					if(indexToDelete !== -1){
						user.eventList.splice(indexToDelete, 1);
						user.save((error) => {
							if(error){
								console.log("Error: " + error);
								res.status(500).send("Error: " + error);
							}
						});
						response = {
							userAccount: req.body.userAccount,
							eventID: req.params.eventID,
							message: "user successfully removed from event"
						};
						res.status(200).send(response);
					}
					else{
						console.log("user is not in this event");
						res.status(500).send("user is not in this event");
					}
				}
			}
		}).catch((error) => {
			console.log("Error: "+ error);
			res.status(500).send("Error: " + error);
		});
	});
}
