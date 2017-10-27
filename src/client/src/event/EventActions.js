import axios from 'axios';


export const selectEvent = (eventId) => {
  
  return ({
    type: "SELECT_EVENT",
    eventId
  });
}

const getOngoingEvents = (userId) => {
  //TODO: use userId to get relavant events
  axios.get('api/all_event', events)
    .then((response) => {
      if (response !== null && response.length > 0) {
        return response;
      }
      else {
        console.log("Found none events\n");
        return [];
      }
    })
    .catch((err) => {
      console.log("err " + err + "\n");
      return null;
    });
}

const getFinishedEvents = () => {

}