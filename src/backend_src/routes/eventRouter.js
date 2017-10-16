var bodyParser = require ('body-parser');
var evt = require('../models/event_info.js');

module.exports = function loadEventRoutes(router){
	router.use(bodyParser.json());

	//create an event
	router.post('/createEvent', (req, res) => {
		var newEvent = new evt();
		newEvent.ownerID = req.body.creatorID;
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

	//edit detail of an existing event
	router.put('/editEvent', (req, res) => {
		evt.findOne({'eventName': req.body.eventName}, (error, evt) => {
			if(error){
				res.send('Error:' + error);
				return;
			}
			if(!evt){
				console.log('No such event found!');
				res.json(null);
				return;
			}
			evt.ownerID = req.body.creatorID;
			evt.eventName = req.body.eventName;
			evt.eventType = req.body.eventType;
			evt.eventCategory = req.body.eventCategory;
			evt.eventLocation = req.body.eventLocation;
			evt.eventTime = req.body.eventTime;
			evt.splitType = req.body.splitType;
			evt.invitationList = req.body.invitationList;
			evt.eventStatus = req.body.eventStatus;
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


	//get all stored event
	router.get('/all_event', function(req, res){
		evt.find({'eventName': {$exist:true}}, function(err, data){
			if(err){
				console.log(err);
				return res.status(500).json({msg: 'internal server error'});
			}
			res.json(data);
		});
	});
}