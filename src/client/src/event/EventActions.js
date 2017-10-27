import axios from 'axios';


export const selectEvent = (eventId) => ({
  type: "SELECT_EVENT",
  eventId
});

export const getOngoingEvents = (userId) => {
  //TODO: use userId to get relavant events
  return new Promise ((resolve, reject) => {
    axios.get('api/all_event', userId)
    .then((response) => {
      const data = response.data;
      if (data !== null && data.length > 0) {
        // console.log(data)
        resolve(data);
      }
      else {
        console.log("Found none events\n");
        // reject([])
      }
    })
    .catch((err) => {
      console.log(err);
      throw error;
    });
  })
}

const getFinishedEvents = () => {

}