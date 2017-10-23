var bodyParser = require ('body-parser');
var evt = require('../models/event_info.js');
var user = require('../models/user.js');


module.exports = function loadEventRoutes(router){
	router.use(bodyParser.json());

	//create an event
	router.post('event/createEvent', (req, res) => {
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

		newEvent.save((error) => {
			if(error){
				console.log(error);
				res.json(null);
				return;
			}
			res.json(newEvent);
			
		});

	});

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
	router.put('event/editEvent/:eventID', (req, res) => {
		evt.findOne({'_id': req.params.eventID}, (error, evt) => {
			if(error){
				res.send('Error:' + error);
				return;
			}
			if(!evt){
				console.log('No such event found!');
				res.json(null);
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
			evt.totalAmount = req.body.totalAmount;

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
	router.post('event/deleteEvent/:eventID', function(req, res){
		var toRemoved = evt.findOne({'_id':req.params.eventID}, (error, toRemoved) => {
			if(error){
				res.status(500).send('Error: ' + error);
				return;
			}
			if(!toRemoved){
				res.status(500).send('no such event found');
				return;
			}
			response = {
				message: "event successfully deleted",
				id: toRemoved._id
			};
			toRemoved.remove();
			res.status(200).send(response);
			return;
		});
	});


	//When a event is complete
	router.put('/event/completeEvent/:eventID', function(req, res){
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
			res.json(evt.invitationList);
			return;
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
	router.get('/api/event/all_event', function(req, res){
		evt.find({'_id': {$exists:true}}, function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});
	});
}

