var bodyParser = require('body-parser');
var user = require('../models/event.js');

module.exports = function loadUserRoutes(router) {
    router.use(bodyParser.json());

    
    router.post('/createvent', (req, res) => {
        var newEvent = new event();
        newEvent.eventname = req.body.eventname;
        newEvent.status_a = req.body.status_a;
        newEvent.type_a = req.body.type_a;
        newEvent.category = req.body.category;
        newEvent.member_id = req.body.member_id;
        newEvent.event_time = req.body.event_time;
        newEvent.event_location = req.body.event_location;

        newEvent.save((error) => {
            if(error){
                res.json(null);
                return;
            }
            res.json(newEvent);
        });
    });

    

  
};
