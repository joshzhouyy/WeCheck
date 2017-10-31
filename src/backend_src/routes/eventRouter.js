var bodyParser = require ('body-parser');
var evt = require('../models/event_info.js');
var user = require('../models/user.js');
var evt_user = require('../models/event_expense.js');
var assert = require('assert');

//WORKING CODE
/*module.exports = function loadEventRoutes(router){
	router.use(bodyParser.json());

	//create an event
	router.post('/event/createEvent', (req, res) => {
		var newEvent = new evt();
		newEvent.ownerID = req.body.ownerID;
		console.log("ownerID = " + newEvent.ownerID);
		newEvent.eventName = req.body.eventName;
		newEvent.eventType = req.body.eventType;
		newEvent.eventCategory = req.body.eventCategory;
		newEvent.eventLocation = req.body.eventLocation;
		newEvent.eventTime = req.body.eventTime;
		newEvent.splitType = req.body.splitType;
		newEvent.invitationList = req.body.invitationList;
		newEvent.eventStatus = 'in process';
		newEvent.totalAmount = 0;
		newEvent.memberAccount.push(req.body.ownerID);

		newEvent.save((error) => {
			if(error){
				console.log(error);
				res.status(500).send("Error: " + error);
				return;
			}
		});
			user.findOne({'_id':req.body.ownerID}, (error, user) => {
				if(error){
					console.log("Error: " + error);
					res.status(500).send("Error: " + error);
				}
				else if(user === undefined || user === null){
					console.log("user not found");
					res.status(404).send("user not found");
				}
				else{
					user.eventList.push(newEvent._id);
					user.save((error) => {
						if(error){
							console.log(error);
							res.status(500).send("Error: " + error);
							return;
						}
					});
					res.status(200).json(newEvent);
				}
			});
			
			
		});
			//res.json(newEvent);

	//an user creates an event, then the user becomes the event owner
	router.post('api/user/:userid/createEvent', (req, res) => {
		var newEvent = new evt();
		newEvent.ownerID = req.params.userid;
		console.log("ownerID = " + newEvent.ownerID);
		newEvent.eventName = req.body.eventName;
		newEvent.eventType = req.body.eventType;
		newEvent.eventCategory = req.body.eventCategory;
		newEvent.eventLocation = req.body.eventLocation;
		newEvent.eventTime = req.body.eventTime;
		newEvent.splitType = req.body.splitType;
		newEvent.invitationList = req.body.invitationList;
		newEvent.eventStatus = 'in process';
		newEvent.totalAmount = 0;
		//TODO: possible defect: event member list not include owner
		newEvent.memberAccount.push(req.body.ownerID);

		newEvent.save((error) => {
			if(error){
				console.log(error);
				res.status(500).send("event save error");
				return;
			}
			res.json(200, newEvent);
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
			if(req.body.userID != req.body.ownerID){
				res.send('you do not have the authority to edit this event');
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
			//evt.eventStatus = req.body.eventStatus; //should not be allowed to edit event status
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
		var toRemoved = evt.findOne({'_id':req.params.eventID}, (error, toRemoved) => {
			if(error){
				res.status(500).send('Error: ' + error);
				return;
			}
			else if(!toRemoved){
				res.status(500).send('no such event found');
				return;
			}
			else if(toRemoved.eventStatus === 'in process'){
				res.status(403).send("unable to delete an ongoing event");
				return;
			}
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
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});
	});

	//add a user into an event
	router.put('/event/addMember/:eventID', function(req, res){
		var oldEvt = evt.findOne({'_id':req.params.eventID}, (error, oldEvt) => {
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
	});

	//owner update total amount of an event
	router.put('/event/updateTotal/:userID/:eventID', function(req, res){
		evt.findOne({'_id': req.params.eventID}, (error, evt) => {
			if(error){
				res.status(500).send("Update total error: " + error);
				return;
			}
			else if(req.body.totalAmount === undefined || req.body.totalAmount === null /*|| req.body.totalAmount <= 0*//*){
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
	router.post('/event/individualAmount/:eventID/:userID', function(req, res){
		var est = evt_user.findOne({'eventID':req.params.eventID, 'userID':req.params.userID}, (error, est) => {
			if(error){
				res.status(500).send("Error: " + error);
				return;
			}
			if(est != null){
				res.status(500).send("entry existed");
				return;
			}
		});
		evt.findOne({'_id': req.params.eventID, memberAccount: {"$in":[req.params.userID]}}, (error, evt) => {
			if(error){
				res.status(500).send("Error in findOne: " + error);
				return;
			}
			if(req.body.individualAmount === null || req.body.individualAmount <= 0 || req.body.individualAmount === undefined){
				res.status(500).send("invalid input amount");
				return;
			}
			var event_user = new evt_user();
			event_user.eventID = req.params.eventID;
			event_user.userID = req.params.userID;
			event_user.individualAmount = req.body.individualAmount;
			event_user.save((error) => {
				if(error){
					console.log("Error: " + error);
					res.status(500).send("Error: " + error);
					return;
				}
				res.status(200).json(event_user);
			});
		});
	});

	//get all 'in process' event that an user is in or owns
	router.get('/getAllOnGoingEvent/:userID', function(req, res){
		
		user.findOne({'_id': req.params.userID}, function(error, user) {
			if(error){
				res.status(500).send("Error: " + error);
				return;
			}
			if(!user){
				res.status(404).send("user not found");
				return;
			}
			const eventList = user.eventList;
			evt.find({
				'_id': {$in: eventList},
				'eventStatus':'in process'
			}, function(error, events){
				if(error){
					res.status(500).send("Error: " + error);
					return;
				}
				res.status(200).json(events);
				return;
			});
			
		});
		
	});


	
	//remove specific user from event's userList
	router.put('/removeUser/:eventID', function(req, res){
		var user_promise = user.findOne({'_id':req.body.userID}).exec();
		var event_promise = evt.findOne({'_id':req.params.eventID}).exec();
		assert.ok(user_promise instanceof require('mpromise'));
		user_promise.then(function(user){
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
						var indexToRemove = evt.memberAccount.indexOf(req.body.userID);
						if(indexToRemove !== -1){
							evt.memberAccount.splice(indexToRemove, 1);
							evt.save((error) => {
								if(error){
									console.log("Error: " + error);
									res.status(500).send("Error: " + error);
								}
							})
						}
						else{
							console.log("event does not have user");
							res.status(500).send("event does not have this user");
						}
					}
				}).catch((error) => {
					console.log(error);
					res.status(500).send("Error: " + error);
				});

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
						userID: req.body.userID,
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
		}).catch((error) => {
			console.log("Error: "+ error);
			res.status(500).send("Error: " + error);
		});
	});
}*/


































































//BUGGY CODE
module.exports = function loadEventRoutes(router){
	router.use(bodyParser.json());

	//create an event
	router.post('/event/createEvent', (req, res) => {
		var newEvent = new evt();
		newEvent.ownerID = req.body.ownerID;
		console.log("ownerID = " + newEvent.ownerID);
		newEvent.eventName = req.body.eventName;
		newEvent.eventType = req.body.eventType;
		newEvent.eventCategory = req.body.eventCategory;
		newEvent.eventLocation = req.body.eventLocation;
		newEvent.eventTime = req.body.eventTime;
		newEvent.splitType = req.body.splitType;
		newEvent.invitationList = req.body.invitationList;
		newEvent.eventStatus = 'in process';
		newEvent.totalAmount = 0;
		//BUG9 (to fix,  uncomment line530)
		//newEvent.memberAccount.push(req.body.ownerID);

		newEvent.save((error) => {
			if(error){
				console.log(error);
				res.status(500).send("Error: " + error);
				return;
			}
		});
			user.findOne({'_id':req.body.ownerID}, (error, user) => {
				if(error){
					console.log("Error: " + error);
					res.status(500).send("Error: " + error);
				}
				else if(user === undefined || user === null){
					console.log("user not found");
					res.status(404).send("user not found");
				}
				else{
					user.eventList.push(newEvent._id);
					user.save((error) => {
						if(error){
							console.log(error);
							res.status(500).send("Error: " + error);
							return;
						}
					});
					res.status(200).json(newEvent);
				}
			});
			
			
		});
			//res.json(newEvent);

	//an user creates an event, then the user becomes the event owner
	router.post('api/user/:userid/createEvent', (req, res) => {
		var newEvent = new evt();
		newEvent.ownerID = req.params.userid;
		console.log("ownerID = " + newEvent.ownerID);
		newEvent.eventName = req.body.eventName;
		newEvent.eventType = req.body.eventType;
		newEvent.eventCategory = req.body.eventCategory;
		newEvent.eventLocation = req.body.eventLocation;
		newEvent.eventTime = req.body.eventTime;
		newEvent.splitType = req.body.splitType;
		newEvent.invitationList = req.body.invitationList;
		newEvent.eventStatus = 'in process';
		newEvent.totalAmount = 0;
		//TODO: possible defect: event member list not include owner
		newEvent.memberAccount.push(req.body.ownerID);

		newEvent.save((error) => {
			if(error){
				console.log(error);
				res.status(500).send("event save error");
				return;
			}
			res.json(200, newEvent);
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
			if(req.body.userID != req.body.ownerID){
				res.send('you do not have the authority to edit this event');
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
			//BUG1(to fix, comment out line 595)
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
		evt.findOne({'_id':req.params.eventID}, (error, toRemoved) => {
			if(error){
				res.status(500).send('Error: ' + error);
				return;
			}
			else if(toRemoved === null || toRemoved === undefined){
				res.status(500).send('no such event found');
				return;
			}
			else if(toRemoved.eventStatus === 'deleted'){
				res.status(500).send("cant delete an event more than once");
				return;
			}
			//BUG14 (to fix, add 'else if(toRemoved.eventStatus === 'in process'){})
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
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});
	});

	//add a user into an event
	router.put('/event/addMember/:eventID', function(req, res){
		var oldEvt = evt.findOne({'_id':req.params.eventID}, (error, oldEvt) => {
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
	});

	//owner update total amount of an event
	router.put('/event/updateTotal/:userID/:eventID', function(req, res){
		evt.findOne({'_id': req.params.eventID}, (error, evt) => {
			if(error){
				res.status(500).send("Update total error: " + error);
				return;
			}
			//BUG4(to fix, uncomment the comment part in next line)
			else if(req.body.totalAmount === undefined || req.body.totalAmount === null /*|| req.body.totalAmount <= 0*/){
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
	router.post('/event/individualAmount/:eventID/:userID', function(req, res){
		var est = evt_user.findOne({'eventID':req.params.eventID, 'userID':req.params.userID}, (error, est) => {
			if(error){
				res.status(500).send("Error: " + error);
				return;
			}
			if(est != null){
				res.status(500).send("entry existed");
				return;
			}
		});
		evt.findOne({'_id': req.params.eventID, memberAccount: {"$in":[req.params.userID]}}, (error, evt) => {
			if(error){
				res.status(500).send("Error in findOne: " + error);
				return;
			}
			//BUG5(to fix, uncomment the comment part in the next line)
			if(req.body.individualAmount === null /*|| req.body.individualAmount <= 0 */|| req.body.individualAmount === undefined){
				res.status(500).send("invalid input amount");
				return;
			}
			var event_user = new evt_user();
			event_user.eventID = req.params.eventID;
			event_user.userID = req.params.userID;
			event_user.individualAmount = req.body.individualAmount;
			event_user.save((error) => {
				if(error){
					console.log("Error: " + error);
					res.status(500).send("Error: " + error);
					return;
				}
				res.status(200).json(event_user);
			});
		});
	});

	//get all 'in process' event that an user is in or owns
	router.get('/getAllOnGoingEvent/:userID', function(req, res){
		
		user.findOne({'_id': req.params.userID}, function(error, user) {
			if(error){
				res.status(500).send("Error: " + error);
				return;
			}
			if(!user){
				res.status(404).send("user not found");
				return;
			}
			const eventList = user.eventList;
			evt.find({
				'_id': {$in: eventList},
				'eventStatus':'in process'
			}, function(error, events){
				if(error){
					res.status(500).send("Error: " + error);
					return;
				}
				res.status(200).json(events);
				return;
			});
			
		});
		
	});


	
	//remove specific user from event's userList
	router.put('/removeUser/:eventID', function(req, res){
		var user_promise = user.findOne({'_id':req.body.userID}).exec();
		var event_promise = evt.findOne({'_id':req.params.eventID}).exec();
		assert.ok(user_promise instanceof require('mpromise'));
		user_promise.then(function(user){
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
						var indexToRemove = evt.memberAccount.indexOf(req.body.userID);
						if(indexToRemove !== -1){
							evt.memberAccount.splice(indexToRemove, 1);
							evt.save((error) => {
								if(error){
									console.log("Error: " + error);
									res.status(500).send("Error: " + error);
								}
							})
						}
						else{
							console.log("event does not have user");
							res.status(500).send("event does not have this user");
						}
					}
				}).catch((error) => {
					console.log(error);
					res.status(500).send("Error: " + error);
				});

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
						userID: req.body.userID,
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
		}).catch((error) => {
			console.log("Error: "+ error);
			res.status(500).send("Error: " + error);
		});
	});
}

