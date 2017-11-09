var bodyParser = require ('body-parser');
var evt_user = require('../models/event_expense.js');

module.exports = function loadEvent_UserRoutes(router){
	router.use(bodyParser.json());

	//get all event_user entry by event ID
	router.get('/event_user/all/event/:eventID', (req, res) => {
		evt_user.find({'eventID': req.params.eventID}, (error, evt_user) => {
			if(error){
				res.status(500).send("Error: " + error);
				return;
			}
			if(evt_user != ''){
				res.status(200).json(evt_user);
				return;
			}
			res.status(404).json('entry not found');
			return;
		});
	});

	//get all event_user entry by userID
	router.get('/event_user/all/user/:userID', (req, res) => {
		evt_user.find({'userID': req.params.userID}, (error, evt_user) => {
			if(error){
				res.status(500).send("Error: " + error);
				return;
			}
			if(evt_user != ''){
				res.status(200).json(evt_user);
				return;
			}
			res.status(404).send('entry not found');
			return;
		});
	});

}